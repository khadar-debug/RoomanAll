import { Router } from "express";
import { store, nextId } from "../data/store.js";
const router = Router();

router.get("/", (req, res) => {
  let deals = [...store.deals];
  const { stage, owner, course, search } = req.query;
  if (stage) deals = deals.filter(d => d.stage === stage);
  if (owner) deals = deals.filter(d => d.owner === owner);
  if (course) deals = deals.filter(d => d.course === course);
  if (search) deals = deals.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: deals.length, deals });
});

router.get("/:id", (req, res) => {
  const deal = store.deals.find(d => d.id === Number(req.params.id));
  if (!deal) return res.status(404).json({ error: "Deal not found" });
  res.json({ success: true, deal });
});

router.post("/", (req, res) => {
  const { name, contact, email, value, stage, probability, course, closeDate, owner } = req.body;
  if (!name) return res.status(400).json({ error: "Deal name is required" });
  const deal = { id: nextId("deals"), name, contact: contact || "", email: email || "", value: Number(value) || 0, stage: stage || "Qualification", probability: Number(probability) || 20, course: course || "", closeDate: closeDate || "", owner: owner || "Unassigned" };
  store.deals.push(deal);
  res.status(201).json({ success: true, deal });
});

router.put("/:id", (req, res) => {
  const idx = store.deals.findIndex(d => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Deal not found" });
  store.deals[idx] = { ...store.deals[idx], ...req.body, id: store.deals[idx].id };
  res.json({ success: true, deal: store.deals[idx] });
});

router.patch("/:id/stage", (req, res) => {
  const deal = store.deals.find(d => d.id === Number(req.params.id));
  if (!deal) return res.status(404).json({ error: "Deal not found" });
  deal.stage = req.body.stage;
  const probMap = { "Qualification": 20, "Proposal": 40, "Negotiation": 60, "Closed Won": 100, "Closed Lost": 0 };
  deal.probability = probMap[deal.stage] ?? deal.probability;
  res.json({ success: true, deal });
});

router.delete("/:id", (req, res) => {
  const idx = store.deals.findIndex(d => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Deal not found" });
  const deleted = store.deals.splice(idx, 1);
  res.json({ success: true, deleted: deleted[0] });
});

router.get("/analytics/pipeline", (req, res) => {
  const pipeline = {};
  let totalValue = 0, wonValue = 0;
  store.deals.forEach(d => {
    pipeline[d.stage] = (pipeline[d.stage] || 0) + d.value;
    totalValue += d.value;
    if (d.stage === "Closed Won") wonValue += d.value;
  });
  res.json({ success: true, pipeline, totalValue, wonValue, winRate: store.deals.length ? Math.round(store.deals.filter(d => d.stage === "Closed Won").length / store.deals.length * 100) : 0 });
});

export default router;
