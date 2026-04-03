import { Router } from "express";
import { store } from "../data/store.js";
const router = Router();

router.get("/", (req, res) => {
  let tickets = [...store.tickets];
  const { status, priority, category, assignedTo, search } = req.query;
  if (status) tickets = tickets.filter(t => t.status === status);
  if (priority) tickets = tickets.filter(t => t.priority === priority);
  if (category) tickets = tickets.filter(t => t.category === category);
  if (assignedTo) tickets = tickets.filter(t => t.assignedTo === assignedTo);
  if (search) tickets = tickets.filter(t => t.subject.toLowerCase().includes(search.toLowerCase()) || t.student.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: tickets.length, tickets });
});

router.get("/:id", (req, res) => {
  const ticket = store.tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  res.json({ success: true, ticket });
});

router.post("/", (req, res) => {
  const { subject, student, priority, category, assignedTo, description } = req.body;
  if (!subject) return res.status(400).json({ error: "Subject is required" });
  const count = store.tickets.length + 1;
  const ticket = { id: `TKT-${String(count).padStart(3, "0")}`, subject, student: student || "", priority: priority || "Medium", status: "Open", category: category || "General", created: new Date().toISOString().split("T")[0], assignedTo: assignedTo || "Unassigned", description: description || "" };
  store.tickets.push(ticket);
  res.status(201).json({ success: true, ticket });
});

router.put("/:id", (req, res) => {
  const idx = store.tickets.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Ticket not found" });
  store.tickets[idx] = { ...store.tickets[idx], ...req.body, id: store.tickets[idx].id };
  res.json({ success: true, ticket: store.tickets[idx] });
});

router.patch("/:id/status", (req, res) => {
  const ticket = store.tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "Ticket not found" });
  ticket.status = req.body.status;
  res.json({ success: true, ticket });
});

router.delete("/:id", (req, res) => {
  const idx = store.tickets.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Ticket not found" });
  const deleted = store.tickets.splice(idx, 1);
  res.json({ success: true, deleted: deleted[0] });
});

export default router;
