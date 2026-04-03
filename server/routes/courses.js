import { Router } from "express";
import { store, nextId } from "../data/store.js";
const router = Router();

router.get("/", (req, res) => {
  let courses = [...store.courses];
  const { status, category, search } = req.query;
  if (status) courses = courses.filter(c => c.status === status);
  if (category) courses = courses.filter(c => c.category === category);
  if (search) courses = courses.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  res.json({ success: true, count: courses.length, courses });
});

router.get("/:id", (req, res) => {
  const course = store.courses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ error: "Course not found" });
  const enrolledStudents = store.students.filter(s => s.course === course.name);
  res.json({ success: true, course, enrolledStudents: enrolledStudents.length });
});

router.post("/", (req, res) => {
  const { name, duration, fee, category, modules: mods } = req.body;
  if (!name) return res.status(400).json({ error: "Course name is required" });
  const course = { id: nextId("courses"), name, duration: duration || "6 months", fee: Number(fee) || 0, students: 0, batches: 0, rating: 0, status: "Active", category: category || "General", modules: Number(mods) || 0 };
  store.courses.push(course);
  res.status(201).json({ success: true, course });
});

router.put("/:id", (req, res) => {
  const idx = store.courses.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Course not found" });
  store.courses[idx] = { ...store.courses[idx], ...req.body, id: store.courses[idx].id };
  res.json({ success: true, course: store.courses[idx] });
});

router.delete("/:id", (req, res) => {
  const idx = store.courses.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Course not found" });
  const deleted = store.courses.splice(idx, 1);
  res.json({ success: true, deleted: deleted[0] });
});

export default router;
