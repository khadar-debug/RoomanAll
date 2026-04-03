import { Router } from "express";
import { store } from "../data/store.js";
const router = Router();

// === Company / Organization ===
router.get("/company", (req, res) => res.json({ success: true, company: store.settings.company }));
router.put("/company", (req, res) => { store.settings.company = { ...store.settings.company, ...req.body }; res.json({ success: true, company: store.settings.company }); });

// === Users ===
router.get("/users", (req, res) => res.json({ success: true, users: store.users }));
router.post("/users", (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email required" });
  const id = store.users.length ? Math.max(...store.users.map(u => u.id)) + 1 : 1;
  const user = { id, name, email, role: role || "Counsellor", status: "Active", lastLogin: "Never" };
  store.users.push(user);
  res.status(201).json({ success: true, user });
});
router.put("/users/:id", (req, res) => {
  const idx = store.users.findIndex(u => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  store.users[idx] = { ...store.users[idx], ...req.body, id: store.users[idx].id };
  res.json({ success: true, user: store.users[idx] });
});
router.delete("/users/:id", (req, res) => {
  const idx = store.users.findIndex(u => u.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "User not found" });
  store.users.splice(idx, 1);
  res.json({ success: true });
});

// === Channels ===
router.get("/channels", (req, res) => res.json({ success: true, channels: store.settings.channels }));
router.get("/channels/:channel", (req, res) => {
  const channel = store.settings.channels[req.params.channel];
  if (!channel) return res.status(404).json({ error: "Channel not found" });
  res.json({ success: true, channel });
});
router.put("/channels/:channel", (req, res) => {
  if (!store.settings.channels[req.params.channel]) store.settings.channels[req.params.channel] = {};
  store.settings.channels[req.params.channel] = { ...store.settings.channels[req.params.channel], ...req.body };
  res.json({ success: true, channel: store.settings.channels[req.params.channel] });
});

// === Integrations ===
router.get("/integrations", (req, res) => res.json({ success: true, integrations: store.settings.integrations }));
router.put("/integrations/:name", (req, res) => {
  if (!store.settings.integrations[req.params.name]) store.settings.integrations[req.params.name] = {};
  store.settings.integrations[req.params.name] = { ...store.settings.integrations[req.params.name], ...req.body };
  res.json({ success: true, integration: store.settings.integrations[req.params.name] });
});

export default router;
