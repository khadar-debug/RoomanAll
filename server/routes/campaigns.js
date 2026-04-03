import { Router } from "express";
import { store, nextId } from "../data/store.js";
const router = Router();

router.get("/", (req, res) => {
  let campaigns = [...store.campaigns];
  const { status, type } = req.query;
  if (status) campaigns = campaigns.filter(c => c.status === status);
  if (type) campaigns = campaigns.filter(c => c.type === type);
  res.json({ success: true, count: campaigns.length, campaigns });
});

router.get("/:id", (req, res) => {
  const campaign = store.campaigns.find(c => c.id === Number(req.params.id));
  if (!campaign) return res.status(404).json({ error: "Campaign not found" });
  res.json({ success: true, campaign });
});

router.post("/", (req, res) => {
  const { name, type, startDate, endDate, budget } = req.body;
  if (!name) return res.status(400).json({ error: "Campaign name is required" });
  const campaign = { id: nextId("campaigns"), name, type: type || "Email", status: "Active", startDate: startDate || "", endDate: endDate || "", budget: Number(budget) || 0, spent: 0, leads: 0, conversions: 0, roi: 0 };
  store.campaigns.push(campaign);
  res.status(201).json({ success: true, campaign });
});

router.put("/:id", (req, res) => {
  const idx = store.campaigns.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Campaign not found" });
  store.campaigns[idx] = { ...store.campaigns[idx], ...req.body, id: store.campaigns[idx].id };
  res.json({ success: true, campaign: store.campaigns[idx] });
});

router.delete("/:id", (req, res) => {
  const idx = store.campaigns.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Campaign not found" });
  const deleted = store.campaigns.splice(idx, 1);
  res.json({ success: true, deleted: deleted[0] });
});

export default router;
