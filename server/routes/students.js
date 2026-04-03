import { Router } from "express";
import { store, nextId } from "../data/store.js";
const router = Router();

router.get("/", (req, res) => {
  let students = [...store.students];
  const { status, course, batch, mentor, search } = req.query;
  if (status) students = students.filter(s => s.status === status);
  if (course) students = students.filter(s => s.course === course);
  if (batch) students = students.filter(s => s.batch === batch);
  if (mentor) students = students.filter(s => s.mentor === mentor);
  if (search) students = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: students.length, students });
});

router.get("/:id", (req, res) => {
  const student = store.students.find(s => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  const payments = store.payments.filter(p => p.studentId === student.id);
  res.json({ success: true, student, payments });
});

router.post("/", (req, res) => {
  const { name, email, phone, course, batch, startDate, endDate, fees, paid, mentor } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });
  const student = { id: nextId("students"), name, email, phone: phone || "", course: course || "", batch: batch || "TBD", startDate: startDate || "", endDate: endDate || "", status: "Active", progress: 0, fees: Number(fees) || 0, paid: Number(paid) || 0, mentor: mentor || "TBD" };
  store.students.push(student);
  res.status(201).json({ success: true, student });
});

router.put("/:id", (req, res) => {
  const idx = store.students.findIndex(s => s.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Student not found" });
  store.students[idx] = { ...store.students[idx], ...req.body, id: store.students[idx].id };
  res.json({ success: true, student: store.students[idx] });
});

router.patch("/:id/progress", (req, res) => {
  const student = store.students.find(s => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  student.progress = Math.min(100, Math.max(0, Number(req.body.progress) || student.progress));
  if (student.progress === 100) student.status = "Completed";
  res.json({ success: true, student });
});

router.patch("/:id/payment", (req, res) => {
  const student = store.students.find(s => s.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  const amount = Number(req.body.amount);
  if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });
  student.paid += amount;
  const payment = { id: `pay_${Date.now()}`, studentId: student.id, studentName: student.name, amount, method: req.body.method || "Online", status: "captured", date: new Date().toISOString().split("T")[0], receipt: `RCT-${Date.now().toString(36).toUpperCase().slice(-5)}` };
  store.payments.push(payment);
  res.json({ success: true, student, payment });
});

router.delete("/:id", (req, res) => {
  const idx = store.students.findIndex(s => s.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Student not found" });
  const deleted = store.students.splice(idx, 1);
  res.json({ success: true, deleted: deleted[0] });
});

router.get("/analytics/summary", (req, res) => {
  const total = store.students.length;
  const active = store.students.filter(s => s.status === "Active").length;
  const completed = store.students.filter(s => s.status === "Completed").length;
  const avgProgress = Math.round(store.students.reduce((a, s) => a + s.progress, 0) / total);
  const totalFees = store.students.reduce((a, s) => a + s.fees, 0);
  const totalPaid = store.students.reduce((a, s) => a + s.paid, 0);
  const totalDue = totalFees - totalPaid;
  res.json({ success: true, total, active, completed, avgProgress, totalFees, totalPaid, totalDue });
});

export default router;
