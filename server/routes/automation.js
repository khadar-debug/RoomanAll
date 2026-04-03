import { Router } from "express";
import { store } from "../data/store.js";
const router = Router();

router.get("/rules", (req, res) => {
  let rules = [...store.automationRules];
  const { type, status } = req.query;
  if (type) rules = rules.filter(r => r.type === type);
  if (status) rules = rules.filter(r => r.status === status);
  res.json({ success: true, count: rules.length, rules });
});

router.get("/rules/:id", (req, res) => {
  const rule = store.automationRules.find(r => r.id === Number(req.params.id));
  if (!rule) return res.status(404).json({ error: "Rule not found" });
  res.json({ success: true, rule });
});

router.post("/rules", (req, res) => {
  const { name, trigger, action, type } = req.body;
  if (!name) return res.status(400).json({ error: "Rule name is required" });
  const id = store.automationRules.length ? Math.max(...store.automationRules.map(r => r.id)) + 1 : 1;
  const rule = { id, name, trigger: trigger || "", action: action || "", status: "Active", type: type || "workflow" };
  store.automationRules.push(rule);
  res.status(201).json({ success: true, rule });
});

router.put("/:id", (req, res) => {
  const idx = store.automationRules.findIndex(r => r.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Rule not found" });
  store.automationRules[idx] = { ...store.automationRules[idx], ...req.body, id: store.automationRules[idx].id };
  res.json({ success: true, rule: store.automationRules[idx] });
});

router.patch("/rules/:id/toggle", (req, res) => {
  const rule = store.automationRules.find(r => r.id === Number(req.params.id));
  if (!rule) return res.status(404).json({ error: "Rule not found" });
  rule.status = rule.status === "Active" ? "Inactive" : "Active";
  res.json({ success: true, rule });
});

router.delete("/rules/:id", (req, res) => {
  const idx = store.automationRules.findIndex(r => r.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Rule not found" });
  store.automationRules.splice(idx, 1);
  res.json({ success: true });
});

export default router;
