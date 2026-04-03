import { Router } from "express";
import { store } from "../data/store.js";
const router = Router();

// Dashboard summary
router.get("/dashboard", (req, res) => {
  const totalLeads = store.leads.length;
  const totalStudents = store.students.length;
  const activeStudents = store.students.filter(s => s.status === "Active").length;
  const totalRevenue = store.students.reduce((a, s) => a + s.paid, 0);
  const pendingFees = store.students.reduce((a, s) => a + (s.fees - s.paid), 0);
  const totalDeals = store.deals.length;
  const dealPipelineValue = store.deals.filter(d => !["Closed Won", "Closed Lost"].includes(d.stage)).reduce((a, d) => a + d.value, 0);
  const wonDeals = store.deals.filter(d => d.stage === "Closed Won").reduce((a, d) => a + d.value, 0);
  const openTickets = store.tickets.filter(t => t.status === "Open").length;
  const campaignROI = store.campaigns.filter(c => c.roi > 0).reduce((a, c) => a + c.roi, 0) / (store.campaigns.filter(c => c.roi > 0).length || 1);

  res.json({ success: true, dashboard: { totalLeads, totalStudents, activeStudents, totalRevenue, pendingFees, totalDeals, dealPipelineValue, wonDeals, openTickets, activeCampaigns: store.campaigns.filter(c => c.status === "Active").length, avgCampaignROI: Math.round(campaignROI) } });
});

// Revenue analytics
router.get("/revenue", (req, res) => {
  const revenueByMonth = [
    { month: "Oct", revenue: 2800000, enrollments: 45 },
    { month: "Nov", revenue: 3200000, enrollments: 52 },
    { month: "Dec", revenue: 2600000, enrollments: 38 },
    { month: "Jan", revenue: 3800000, enrollments: 61 },
    { month: "Feb", revenue: 4200000, enrollments: 68 },
    { month: "Mar", revenue: 4800000, enrollments: 75 },
  ];
  const totalRevenue = revenueByMonth.reduce((a, m) => a + m.revenue, 0);
  const totalEnrollments = revenueByMonth.reduce((a, m) => a + m.enrollments, 0);
  res.json({ success: true, revenueByMonth, totalRevenue, totalEnrollments });
});

// Course-wise distribution
router.get("/courses", (req, res) => {
  const distribution = store.courses.map(c => ({ name: c.name, students: c.students, revenue: c.students * c.fee, fee: c.fee, rating: c.rating }));
  res.json({ success: true, distribution });
});

// Lead funnel
router.get("/lead-funnel", (req, res) => {
  const funnel = {};
  store.leads.forEach(l => { funnel[l.status] = (funnel[l.status] || 0) + 1; });
  const sources = {};
  store.leads.forEach(l => { sources[l.source] = (sources[l.source] || 0) + 1; });
  res.json({ success: true, funnel, sources, conversionRate: store.leads.length ? Math.round(store.leads.filter(l => l.status === "Enrolled").length / store.leads.length * 100) : 0 });
});

// Payment analytics
router.get("/payments", (req, res) => {
  const totalCollected = store.payments.reduce((a, p) => a + p.amount, 0);
  const byMethod = {};
  store.payments.forEach(p => { byMethod[p.method] = (byMethod[p.method] || 0) + p.amount; });
  res.json({ success: true, totalCollected, transactionCount: store.payments.length, byMethod, recentPayments: store.payments.slice(-10) });
});

export default router;
