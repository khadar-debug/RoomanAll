import { Router } from "express";
import { store, nextId } from "../data/store.js";
const router = Router();

// GET all leads (with optional filters)
router.get("/", (req, res) => {
  let leads = [...store.leads];
  const { status, source, course, assignedTo, search } = req.query;
  if (status) leads = leads.filter(l => l.status === status);
  if (source) leads = leads.filter(l => l.source === source);
  if (course) leads = leads.filter(l => l.course === course);
  if (assignedTo) leads = leads.filter(l => l.assignedTo === assignedTo);
  if (search) leads = leads.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: leads.length, leads });
});

// GET single lead
router.get("/:id", (req, res) => {
  const lead = store.leads.find(l => l.id === Number(req.params.id));
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json({ success: true, lead });
});

// POST create lead
router.post("/", (req, res) => {
  const { name, email, phone, source, course, city, assignedTo } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email are required" });
  const lead = { id: nextId("leads"), name, email, phone: phone || "", source: source || "Website", course: course || "", status: "New", score: 50, assignedTo: assignedTo || "Unassigned", date: new Date().toISOString().split("T")[0], city: city || "" };
  store.leads.push(lead);
  res.status(201).json({ success: true, lead });
});

// PUT update lead
router.put("/:id", (req, res) => {
  const idx = store.leads.findIndex(l => l.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Lead not found" });
  store.leads[idx] = { ...store.leads[idx], ...req.body, id: store.leads[idx].id };
  res.json({ success: true, lead: store.leads[idx] });
});

// PATCH update lead status
router.patch("/:id/status", (req, res) => {
  const lead = store.leads.find(l => l.id === Number(req.params.id));
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  lead.status = req.body.status;
  res.json({ success: true, lead });
});

// DELETE lead
router.delete("/:id", (req, res) => {
  const idx = store.leads.findIndex(l => l.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Lead not found" });
  const deleted = store.leads.splice(idx, 1);
  res.json({ success: true, deleted: deleted[0] });
});

// POST convert lead to student
router.post("/:id/convert", (req, res) => {
  const lead = store.leads.find(l => l.id === Number(req.params.id));
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  const student = { id: nextId("students"), name: lead.name, email: lead.email, phone: lead.phone, course: lead.course, batch: req.body.batch || "TBD", startDate: req.body.startDate || new Date().toISOString().split("T")[0], endDate: "", status: "Active", progress: 0, fees: req.body.fees || 0, paid: 0, mentor: req.body.mentor || "TBD" };
  store.students.push(student);
  lead.status = "Enrolled";
  res.json({ success: true, student, message: "Lead converted to student" });
});

// GET lead analytics
router.get("/analytics/summary", (req, res) => {
  const total = store.leads.length;
  const byStatus = {};
  const bySource = {};
  const byCourse = {};
  store.leads.forEach(l => {
    byStatus[l.status] = (byStatus[l.status] || 0) + 1;
    bySource[l.source] = (bySource[l.source] || 0) + 1;
    byCourse[l.course] = (byCourse[l.course] || 0) + 1;
  });
  res.json({ success: true, total, byStatus, bySource, byCourse });
});

export default router;
