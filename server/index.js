import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import crypto from "node:crypto";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Route imports
import leadsRouter from "./routes/leads.js";
import studentsRouter from "./routes/students.js";
import coursesRouter from "./routes/courses.js";
import dealsRouter from "./routes/deals.js";
import campaignsRouter from "./routes/campaigns.js";
import ticketsRouter from "./routes/tickets.js";
import socialRouter from "./routes/social.js";
import analyticsRouter from "./routes/analytics.js";
import automationRouter from "./routes/automation.js";
import settingsRouter from "./routes/settings.js";
import lmsRouter from "./routes/lms.js";
import aiTutorRouter from "./routes/ai-tutor.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());

// ===== MOUNT ALL ROUTES =====
app.use("/api/leads", leadsRouter);
app.use("/api/students", studentsRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/deals", dealsRouter);
app.use("/api/campaigns", campaignsRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/social", socialRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/automation", automationRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/lms", lmsRouter);
app.use("/api/ai-tutor", aiTutorRouter);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ===== HEALTH CHECK =====
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", gateway: "razorpay", connected: true, merchantId: process.env.RAZORPAY_MERCHANT_ID });
});

// ===== GET RAZORPAY KEY (public key only - safe for frontend) =====
app.get("/api/payment/key", (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// ===== CREATE ORDER =====
// Called when a student initiates a fee payment
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", studentName, studentEmail, studentPhone, courseId, courseName, studentId, feeType = "Course Fee" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: `rcpt_${Date.now()}_${studentId || "guest"}`,
      notes: {
        studentName,
        studentEmail,
        studentPhone,
        courseId: String(courseId || ""),
        courseName: courseName || "",
        studentId: String(studentId || ""),
        feeType,
        createdBy: "Rooman CRM",
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Failed to create payment order", details: error.message });
  }
});

// ===== VERIFY PAYMENT =====
// Called after Razorpay checkout completes - verifies the signature
app.post("/api/payment/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing payment verification parameters" });
    }

    // Verify signature using HMAC SHA256
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Fetch payment details from Razorpay
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      // In production, save to database here:
      // await db.payments.create({ orderId, paymentId, amount, studentId, ... })

      res.json({
        success: true,
        message: "Payment verified successfully",
        payment: {
          id: payment.id,
          orderId: razorpay_order_id,
          amount: payment.amount / 100, // Convert paise back to rupees
          currency: payment.currency,
          status: payment.status,
          method: payment.method,
          email: payment.email,
          contact: payment.contact,
          studentName: payment.notes?.studentName,
          courseName: payment.notes?.courseName,
          feeType: payment.notes?.feeType,
          paidAt: new Date().toISOString(),
        },
      });
    } else {
      res.status(400).json({ success: false, error: "Payment verification failed - invalid signature" });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    res.status(500).json({ error: "Payment verification error", details: error.message });
  }
});

// ===== FETCH PAYMENT STATUS =====
// Check status of a specific payment
app.get("/api/payment/:paymentId", async (req, res) => {
  try {
    const payment = await razorpay.payments.fetch(req.params.paymentId);
    res.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        email: payment.email,
        createdAt: payment.created_at,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment", details: error.message });
  }
});

// ===== FETCH ORDER PAYMENTS =====
// Get all payments for a specific order
app.get("/api/payment/order/:orderId", async (req, res) => {
  try {
    const payments = await razorpay.orders.fetchPayments(req.params.orderId);
    res.json({ success: true, payments: payments.items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order payments", details: error.message });
  }
});

// ===== REFUND PAYMENT =====
// Issue a full or partial refund
app.post("/api/payment/refund", async (req, res) => {
  try {
    const { paymentId, amount, reason = "Student requested refund" } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "Payment ID is required" });
    }

    const refundOptions = { notes: { reason, processedBy: "Rooman CRM" } };
    if (amount) {
      refundOptions.amount = Math.round(amount * 100); // partial refund in paise
    }

    const refund = await razorpay.payments.refund(paymentId, refundOptions);

    res.json({
      success: true,
      refund: {
        id: refund.id,
        paymentId: refund.payment_id,
        amount: refund.amount / 100,
        status: refund.status,
      },
    });
  } catch (error) {
    console.error("Refund failed:", error);
    res.status(500).json({ error: "Refund failed", details: error.message });
  }
});

// ===== RAZORPAY WEBHOOK =====
// Receives real-time payment events from Razorpay
app.post("/api/webhook/razorpay", express.raw({ type: "application/json" }), (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (webhookSecret) {
    const signature = req.headers["x-razorpay-signature"];
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }
  }

  const event = JSON.parse(req.body);
  console.log(`Webhook received: ${event.event}`);

  switch (event.event) {
    case "payment.captured":
      console.log("Payment captured:", event.payload.payment.entity.id);
      // In production: update student payment status in database
      break;
    case "payment.failed":
      console.log("Payment failed:", event.payload.payment.entity.id);
      // In production: notify student/admin about failed payment
      break;
    case "refund.processed":
      console.log("Refund processed:", event.payload.refund.entity.id);
      break;
    default:
      console.log("Unhandled event:", event.event);
  }

  res.json({ status: "ok" });
});

// ===== GENERATE FEE RECEIPT =====
app.post("/api/receipt/generate", async (req, res) => {
  try {
    const { paymentId, studentName, courseName, amount, feeType } = req.body;
    const receiptNumber = `RCT-${Date.now().toString(36).toUpperCase()}`;

    // In production, generate a PDF receipt and store it
    res.json({
      success: true,
      receipt: {
        receiptNumber,
        paymentId,
        studentName,
        courseName,
        amount,
        feeType,
        issuedDate: new Date().toISOString(),
        company: "Rooman Technologies Pvt. Ltd.",
        gst: "29AABCR1234M1ZP",
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Receipt generation failed", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Rooman CRM Backend running on http://localhost:${PORT}`);
  console.log(`📦 Razorpay Merchant: ${process.env.RAZORPAY_MERCHANT_ID}`);
  console.log(`🔑 Using Key: ${process.env.RAZORPAY_KEY_ID?.substring(0, 12)}...`);
  console.log(`🌐 Frontend: ${process.env.FRONTEND_URL}`);
  console.log(`\n📋 API Routes:`);
  console.log(`   /api/leads          - Lead management (CRUD, convert, analytics)`);
  console.log(`   /api/students       - Student management (CRUD, progress, payments)`);
  console.log(`   /api/courses        - Course management (CRUD)`);
  console.log(`   /api/deals          - Deals & pipeline (CRUD, stages, analytics)`);
  console.log(`   /api/campaigns      - Campaign management (CRUD)`);
  console.log(`   /api/tickets        - Support tickets (CRUD, status)`);
  console.log(`   /api/social         - Social media (posts, messages, analytics)`);
  console.log(`   /api/analytics      - Dashboard, revenue, funnel, payments`);
  console.log(`   /api/automation     - Workflow & scoring rules (CRUD, toggle)`);
  console.log(`   /api/settings       - Company, users, channels, integrations`);
  console.log(`   /api/lms            - LMS (courses, assignments, code lab, projects)`);
  console.log(`   /api/payment        - Razorpay payments (create, verify, refund)`);
  console.log(`   /api/webhook        - Razorpay webhook receiver\n`);
});
