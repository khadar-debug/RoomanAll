import { Router } from "express";
import { store } from "../data/store.js";
const router = Router();

// ===== Initialize LMS data =====
if (!store.lms) {
  store.lms = {
    courses: [],
    modules: [],
    lessons: [],
    enrollments: [],
    assignments: [],
    assessments: [],
    questions: [],
    projects: [],
    discussions: [],
    leaderboard: [],
    resources: [],
    announcements: [],
    contentUploads: [],
    nextId: { course: 1, module: 1, lesson: 1, enrollment: 1, assignment: 1, assessment: 1, question: 1, project: 1, discussion: 1, resource: 1, announcement: 1, upload: 1 },
  };

  // Seed with sample data
  const seed = store.lms;
  seed.courses = [
    { id: 1, name: "AI & Machine Learning", code: "AIML-2026", category: "AI", duration: "24 weeks", totalDays: 120, status: "Published", description: "Comprehensive AI & ML program covering Python, math foundations, supervised/unsupervised learning, deep learning, NLP, and deployment.", thumbnail: "", instructor: "Dr. Ramesh K.", maxStudents: 60, fee: 95000, createdAt: "2026-01-01" },
    { id: 2, name: "Data Science & Analytics", code: "DS-2026", category: "Data Science", duration: "20 weeks", totalDays: 100, status: "Published", description: "End-to-end data science with statistics, Python, SQL, visualization, ML, and capstone project.", thumbnail: "", instructor: "Prof. Meena S.", maxStudents: 50, fee: 85000, createdAt: "2026-01-05" },
    { id: 3, name: "Cloud Computing (AWS/Azure)", code: "CLD-2026", category: "Cloud", duration: "16 weeks", totalDays: 80, status: "Published", description: "Master cloud platforms with hands-on labs in AWS and Azure, DevOps, CI/CD, and infrastructure as code.", thumbnail: "", instructor: "Vikram P.", maxStudents: 45, fee: 75000, createdAt: "2026-01-10" },
    { id: 4, name: "Cyber Security", code: "SEC-2026", category: "Cyber Security", duration: "20 weeks", totalDays: 100, status: "Draft", description: "Network security, ethical hacking, penetration testing, SIEM, incident response, and compliance.", thumbnail: "", instructor: "Arun T.", maxStudents: 40, fee: 90000, createdAt: "2026-02-01" },
  ];
  seed.nextId.course = 5;

  seed.modules = [
    { id: 1, courseId: 1, title: "Python Foundations for AI", description: "Core Python skills needed for AI/ML development", order: 1, status: "Published", durationWeeks: 3, totalLessons: 7 },
    { id: 2, courseId: 1, title: "Mathematics for ML", description: "Linear algebra, probability, statistics, and calculus for machine learning", order: 2, status: "Published", durationWeeks: 2, totalLessons: 4 },
    { id: 3, courseId: 1, title: "Machine Learning Fundamentals", description: "Supervised and unsupervised learning algorithms", order: 3, status: "Published", durationWeeks: 4, totalLessons: 6 },
    { id: 4, courseId: 1, title: "Deep Learning & Neural Networks", description: "Neural networks, CNNs, RNNs, Transformers", order: 4, status: "Draft", durationWeeks: 5, totalLessons: 6 },
    { id: 5, courseId: 1, title: "NLP & GenAI", description: "Natural language processing, LLMs, RAG, fine-tuning", order: 5, status: "Draft", durationWeeks: 4, totalLessons: 5 },
    { id: 6, courseId: 1, title: "Capstone & Deployment", description: "End-to-end ML project with cloud deployment", order: 6, status: "Draft", durationWeeks: 6, totalLessons: 4 },
    { id: 7, courseId: 2, title: "Data Fundamentals & Python", description: "Python, Pandas, NumPy for data analysis", order: 1, status: "Published", durationWeeks: 3, totalLessons: 5 },
    { id: 8, courseId: 2, title: "Statistical Analysis", description: "Descriptive & inferential statistics", order: 2, status: "Published", durationWeeks: 3, totalLessons: 5 },
    { id: 9, courseId: 3, title: "Cloud Foundations", description: "Cloud concepts, IAM, networking, storage", order: 1, status: "Published", durationWeeks: 3, totalLessons: 5 },
    { id: 10, courseId: 3, title: "AWS Core Services", description: "EC2, S3, Lambda, RDS, VPC", order: 2, status: "Published", durationWeeks: 4, totalLessons: 5 },
    { id: 11, courseId: 4, title: "Security Fundamentals", description: "CIA triad, threat landscape, security frameworks", order: 1, status: "Draft", durationWeeks: 3, totalLessons: 5 },
  ];
  seed.nextId.module = 12;

  seed.lessons = [
    // Module 1: Python Foundations (courseId: 1)
    { id: 1, moduleId: 1, courseId: 1, day: 1, title: "Python Basics & Environment Setup", type: "video", duration: "45 min", status: "Published", videoUrl: "", notes: "Install Python 3.11, Jupyter Notebook, VS Code. Set up virtual environments.", resources: [], order: 1 },
    { id: 2, moduleId: 1, courseId: 1, day: 2, title: "Control Flow & Functions", type: "video", duration: "50 min", status: "Published", videoUrl: "", notes: "If/elif/else, loops, list comprehensions, functions, lambda.", resources: [], order: 2 },
    { id: 3, moduleId: 1, courseId: 1, day: 3, title: "OOP in Python", type: "video", duration: "55 min", status: "Published", videoUrl: "", notes: "Classes, inheritance, polymorphism, special methods.", resources: [], order: 3 },
    { id: 4, moduleId: 1, courseId: 1, day: 4, title: "NumPy for Numerical Computing", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "NumPy arrays, broadcasting, linear algebra operations.", resources: [], order: 4 },
    { id: 5, moduleId: 1, courseId: 1, day: 5, title: "Pandas for Data Manipulation", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "DataFrames, cleaning, filtering, groupby, merge.", resources: [], order: 5 },
    { id: 6, moduleId: 1, courseId: 1, day: 6, title: "Data Visualization", type: "video", duration: "50 min", status: "Published", videoUrl: "", notes: "Matplotlib, Seaborn visualizations.", resources: [], order: 6 },
    { id: 7, moduleId: 1, courseId: 1, day: 7, title: "Assignment: EDA on Real Dataset", type: "assignment", duration: "2 hrs", status: "Published", videoUrl: "", notes: "Exploratory data analysis on Titanic dataset.", resources: [], order: 7 },
    // Module 2: Math for ML
    { id: 8, moduleId: 2, courseId: 1, day: 8, title: "Linear Algebra Essentials", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "Vectors, matrices, eigenvalues, SVD.", resources: [], order: 1 },
    { id: 9, moduleId: 2, courseId: 1, day: 9, title: "Probability & Statistics", type: "video", duration: "55 min", status: "Published", videoUrl: "", notes: "Distributions, Bayes theorem, hypothesis testing.", resources: [], order: 2 },
    { id: 10, moduleId: 2, courseId: 1, day: 10, title: "Calculus for Optimization", type: "video", duration: "50 min", status: "Published", videoUrl: "", notes: "Derivatives, gradient descent, learning rate.", resources: [], order: 3 },
    { id: 11, moduleId: 2, courseId: 1, day: 11, title: "Math Foundations Quiz", type: "assessment", duration: "1 hr", status: "Published", videoUrl: "", notes: "30 MCQ + 5 numerical problems.", resources: [], order: 4 },
    // Module 3: ML Fundamentals
    { id: 12, moduleId: 3, courseId: 1, day: 12, title: "Introduction to Machine Learning", type: "video", duration: "45 min", status: "Published", videoUrl: "", notes: "Types of ML, ML pipeline overview.", resources: [], order: 1 },
    { id: 13, moduleId: 3, courseId: 1, day: 13, title: "Linear & Logistic Regression", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "Regression, cost function, gradient descent, logistic regression.", resources: [], order: 2 },
    { id: 14, moduleId: 3, courseId: 1, day: 14, title: "Decision Trees & Random Forests", type: "video", duration: "55 min", status: "Published", videoUrl: "", notes: "Information gain, Gini impurity, ensemble methods.", resources: [], order: 3 },
    { id: 15, moduleId: 3, courseId: 1, day: 15, title: "SVM & KNN", type: "video", duration: "50 min", status: "Draft", videoUrl: "", notes: "Kernel trick, distance metrics.", resources: [], order: 4 },
    { id: 16, moduleId: 3, courseId: 1, day: 16, title: "Model Evaluation & Tuning", type: "video", duration: "55 min", status: "Draft", videoUrl: "", notes: "Metrics, cross-validation, hyperparameter tuning.", resources: [], order: 5 },
    { id: 17, moduleId: 3, courseId: 1, day: 17, title: "Coding Assignment: Build ML Pipeline", type: "assignment", duration: "3 hrs", status: "Draft", videoUrl: "", notes: "End-to-end ML pipeline with scikit-learn.", resources: [], order: 6 },
  ];
  seed.nextId.lesson = 18;

  seed.enrollments = [
    { id: 1, studentId: 1, courseId: 1, progress: 65, enrolledDate: "2026-01-15", status: "Active", studentName: "Rahul Sharma" },
    { id: 2, studentId: 2, courseId: 2, progress: 40, enrolledDate: "2026-02-01", status: "Active", studentName: "Anitha K." },
    { id: 3, studentId: 3, courseId: 3, progress: 80, enrolledDate: "2026-01-10", status: "Active", studentName: "Mohammed Faisal" },
    { id: 4, studentId: 4, courseId: 4, progress: 25, enrolledDate: "2026-03-01", status: "Active", studentName: "Sneha Reddy" },
  ];
  seed.nextId.enrollment = 5;

  seed.assignments = [
    { id: 1, courseId: 1, moduleId: 1, title: "Python Data Structures Lab", type: "coding", dueDate: "2026-04-05", maxScore: 100, submissions: 18, status: "Active", instructions: "Complete the Python data structures exercises. Implement stack, queue, linked list, and binary search tree from scratch.", allowedLanguages: ["python"], estimatedTime: "2 hours" },
    { id: 2, courseId: 1, moduleId: 2, title: "Linear Algebra Problem Set", type: "written", dueDate: "2026-04-10", maxScore: 50, submissions: 12, status: "Active", instructions: "Solve the 15 linear algebra problems covering matrices, eigenvalues, and SVD.", allowedLanguages: [], estimatedTime: "1.5 hours" },
    { id: 3, courseId: 1, moduleId: 3, title: "Build a Classifier", type: "project", dueDate: "2026-04-20", maxScore: 200, submissions: 5, status: "Active", instructions: "Build and compare at least 3 classification models on the provided dataset. Submit a Jupyter notebook with EDA, training, evaluation, and a written analysis.", allowedLanguages: ["python"], estimatedTime: "4 hours" },
    { id: 4, courseId: 2, moduleId: 7, title: "EDA with Pandas", type: "coding", dueDate: "2026-04-08", maxScore: 100, submissions: 15, status: "Active", instructions: "Perform exploratory data analysis on the e-commerce dataset using Pandas.", allowedLanguages: ["python"], estimatedTime: "2 hours" },
  ];
  seed.nextId.assignment = 5;

  seed.assessments = [
    { id: 1, courseId: 1, moduleId: 3, title: "ML Fundamentals Quiz", type: "quiz", totalQuestions: 20, duration: 30, maxScore: 100, status: "Published", passingScore: 60, attempts: 2, shuffleQuestions: true, showAnswers: true, instructions: "Answer all 20 multiple-choice questions. Each question carries 5 marks." },
    { id: 2, courseId: 1, moduleId: null, title: "Mid-term Assessment", type: "exam", totalQuestions: 50, duration: 120, maxScore: 200, status: "Published", passingScore: 80, attempts: 1, shuffleQuestions: false, showAnswers: false, instructions: "Comprehensive exam covering modules 1-3. Mix of MCQ, short answer, and coding." },
    { id: 3, courseId: 2, moduleId: 7, title: "Data Science Basics Quiz", type: "quiz", totalQuestions: 15, duration: 20, maxScore: 75, status: "Published", passingScore: 45, attempts: 3, shuffleQuestions: true, showAnswers: true, instructions: "15 questions on Python, Pandas, and data fundamentals." },
  ];
  seed.nextId.assessment = 4;

  seed.questions = [
    { id: 1, assessmentId: 1, questionText: "Which of the following is NOT a type of machine learning?", type: "mcq", options: ["Supervised Learning", "Unsupervised Learning", "Compiled Learning", "Reinforcement Learning"], correctAnswer: 2, marks: 5, order: 1 },
    { id: 2, assessmentId: 1, questionText: "What is the purpose of a cost/loss function in ML?", type: "mcq", options: ["To increase model complexity", "To measure prediction error", "To generate training data", "To split the dataset"], correctAnswer: 1, marks: 5, order: 2 },
    { id: 3, assessmentId: 1, questionText: "Overfitting occurs when:", type: "mcq", options: ["Model performs well on training but poorly on test data", "Model is too simple", "Training data is too large", "Features are normalized"], correctAnswer: 0, marks: 5, order: 3 },
    { id: 4, assessmentId: 1, questionText: "Which algorithm uses the concept of 'margin maximization'?", type: "mcq", options: ["Decision Tree", "K-Nearest Neighbors", "Support Vector Machine", "Naive Bayes"], correctAnswer: 2, marks: 5, order: 4 },
    { id: 5, assessmentId: 1, questionText: "Random Forest is an example of:", type: "mcq", options: ["Boosting", "Bagging", "Stacking", "Dimensionality Reduction"], correctAnswer: 1, marks: 5, order: 5 },
  ];
  seed.nextId.question = 6;

  seed.projects = [
    { id: 1, courseId: 1, title: "End-to-End ML Pipeline", description: "Build a complete ML pipeline from data ingestion to deployment on cloud.", githubRepo: "", milestones: [
      { id: 1, title: "Data Collection & Preprocessing", description: "Gather, clean, and prepare dataset", dueDate: "2026-04-15", status: "Not Started" },
      { id: 2, title: "Model Training & Evaluation", description: "Train multiple models and evaluate performance", dueDate: "2026-05-01", status: "Not Started" },
      { id: 3, title: "API & Deployment", description: "Build REST API and deploy to cloud", dueDate: "2026-05-15", status: "Not Started" },
      { id: 4, title: "Documentation & Presentation", description: "Write documentation and present project", dueDate: "2026-05-30", status: "Not Started" },
    ], maxScore: 500, status: "Active", teamSize: "1-3" },
    { id: 2, courseId: 2, title: "Business Analytics Dashboard", description: "Create an interactive analytics dashboard using real-world e-commerce data.", githubRepo: "", milestones: [
      { id: 1, title: "Data Analysis", description: "Analyze the dataset and identify key metrics", dueDate: "2026-04-20", status: "Not Started" },
      { id: 2, title: "Dashboard Development", description: "Build interactive dashboard with Plotly/Streamlit", dueDate: "2026-05-10", status: "Not Started" },
      { id: 3, title: "Presentation", description: "Present findings and recommendations", dueDate: "2026-05-25", status: "Not Started" },
    ], maxScore: 400, status: "Active", teamSize: "1-2" },
  ];
  seed.nextId.project = 3;

  seed.discussions = [
    { id: 1, courseId: 1, author: "Rahul Sharma", title: "Confusion about gradient descent convergence", content: "Can someone explain why my loss isn't decreasing after 100 epochs?", replies: 5, createdAt: "2026-03-28T10:30:00Z", pinned: false },
    { id: 2, courseId: 1, author: "Sneha Reddy", title: "Best resources for deep learning", content: "Looking for additional reading beyond course materials.", replies: 8, createdAt: "2026-03-27T14:15:00Z", pinned: true },
  ];
  seed.nextId.discussion = 3;

  seed.leaderboard = [
    { studentId: 1, name: "Rahul Sharma", courseId: 1, points: 850, rank: 1, streak: 12, badges: 5 },
    { studentId: 4, name: "Sneha Reddy", courseId: 1, points: 820, rank: 2, streak: 15, badges: 4 },
    { studentId: 2, name: "Anitha K.", courseId: 2, points: 780, rank: 1, streak: 8, badges: 3 },
    { studentId: 3, name: "Mohammed Faisal", courseId: 3, points: 900, rank: 1, streak: 20, badges: 6 },
  ];

  seed.resources = [
    { id: 1, courseId: 1, moduleId: 1, title: "Python Cheat Sheet", type: "pdf", url: "", size: "2.4 MB", uploadedAt: "2026-01-15" },
    { id: 2, courseId: 1, moduleId: 2, title: "Linear Algebra Reference", type: "pdf", url: "", size: "5.1 MB", uploadedAt: "2026-01-20" },
    { id: 3, courseId: 1, moduleId: null, title: "ML Project Starter Template", type: "zip", url: "", size: "12 MB", uploadedAt: "2026-02-01" },
  ];
  seed.nextId.resource = 4;

  seed.announcements = [
    { id: 1, courseId: 1, title: "Mid-term exam schedule updated", content: "The mid-term has been moved to April 15. Please prepare accordingly.", author: "Dr. Ramesh K.", createdAt: "2026-03-25", priority: "high" },
    { id: 2, courseId: null, title: "Platform maintenance on April 2", content: "LMS will be under maintenance from 2 AM to 6 AM IST.", author: "Admin", createdAt: "2026-03-30", priority: "medium" },
  ];
  seed.nextId.announcement = 3;
}

const nid = (type) => store.lms.nextId[type]++;

// ==========================================
// ===== COURSE MANAGEMENT (Admin CRUD) =====
// ==========================================
router.get("/courses", (req, res) => {
  let courses = [...store.lms.courses];
  if (req.query.status) courses = courses.filter(c => c.status === req.query.status);
  if (req.query.category) courses = courses.filter(c => c.category === req.query.category);
  // Enrich with module/lesson counts
  courses = courses.map(c => ({
    ...c,
    moduleCount: store.lms.modules.filter(m => m.courseId === c.id).length,
    lessonCount: store.lms.lessons.filter(l => l.courseId === c.id).length,
    enrollmentCount: store.lms.enrollments.filter(e => e.courseId === c.id).length,
  }));
  res.json({ success: true, courses });
});

router.get("/courses/:id", (req, res) => {
  const course = store.lms.courses.find(c => c.id === Number(req.params.id));
  if (!course) return res.status(404).json({ error: "Course not found" });
  const modules = store.lms.modules.filter(m => m.courseId === course.id).sort((a, b) => a.order - b.order);
  const enrichedModules = modules.map(mod => ({
    ...mod,
    lessons: store.lms.lessons.filter(l => l.moduleId === mod.id).sort((a, b) => a.order - b.order),
  }));
  res.json({ success: true, course: { ...course, modules: enrichedModules } });
});

router.post("/courses", (req, res) => {
  const { name, code, category, duration, totalDays, description, instructor, maxStudents, fee } = req.body;
  if (!name || !code) return res.status(400).json({ error: "Name and code are required" });
  const id = nid("course");
  const course = { id, name, code, category: category || "General", duration: duration || "12 weeks", totalDays: totalDays || 60, status: "Draft", description: description || "", thumbnail: "", instructor: instructor || "", maxStudents: maxStudents || 50, fee: fee || 0, createdAt: new Date().toISOString().split("T")[0] };
  store.lms.courses.push(course);
  res.status(201).json({ success: true, course });
});

router.put("/courses/:id", (req, res) => {
  const idx = store.lms.courses.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Course not found" });
  store.lms.courses[idx] = { ...store.lms.courses[idx], ...req.body, id: store.lms.courses[idx].id };
  res.json({ success: true, course: store.lms.courses[idx] });
});

router.delete("/courses/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = store.lms.courses.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Course not found" });
  store.lms.courses.splice(idx, 1);
  store.lms.modules = store.lms.modules.filter(m => m.courseId !== id);
  store.lms.lessons = store.lms.lessons.filter(l => l.courseId !== id);
  store.lms.assignments = store.lms.assignments.filter(a => a.courseId !== id);
  store.lms.assessments = store.lms.assessments.filter(a => a.courseId !== id);
  res.json({ success: true });
});

// ==========================================
// ===== MODULE / SYLLABUS MANAGEMENT =====
// ==========================================
router.get("/modules", (req, res) => {
  let modules = [...store.lms.modules];
  if (req.query.courseId) modules = modules.filter(m => m.courseId === Number(req.query.courseId));
  modules.sort((a, b) => a.order - b.order);
  res.json({ success: true, modules });
});

router.post("/modules", (req, res) => {
  const { courseId, title, description, durationWeeks, status } = req.body;
  if (!courseId || !title) return res.status(400).json({ error: "courseId and title are required" });
  const existingModules = store.lms.modules.filter(m => m.courseId === Number(courseId));
  const order = existingModules.length + 1;
  const id = nid("module");
  const mod = { id, courseId: Number(courseId), title, description: description || "", order, status: status || "Draft", durationWeeks: durationWeeks || 2, totalLessons: 0 };
  store.lms.modules.push(mod);
  res.status(201).json({ success: true, module: mod });
});

router.put("/modules/:id", (req, res) => {
  const idx = store.lms.modules.findIndex(m => m.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Module not found" });
  store.lms.modules[idx] = { ...store.lms.modules[idx], ...req.body, id: store.lms.modules[idx].id };
  res.json({ success: true, module: store.lms.modules[idx] });
});

router.delete("/modules/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = store.lms.modules.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ error: "Module not found" });
  store.lms.modules.splice(idx, 1);
  store.lms.lessons = store.lms.lessons.filter(l => l.moduleId !== id);
  res.json({ success: true });
});

router.put("/modules/reorder", (req, res) => {
  const { courseId, moduleOrder } = req.body; // moduleOrder = [{ id, order }]
  if (!courseId || !moduleOrder) return res.status(400).json({ error: "courseId and moduleOrder required" });
  moduleOrder.forEach(({ id, order }) => {
    const mod = store.lms.modules.find(m => m.id === id);
    if (mod) mod.order = order;
  });
  res.json({ success: true });
});

// ==========================================
// ===== LESSON / CONTENT MANAGEMENT =====
// ==========================================
router.get("/lessons", (req, res) => {
  let lessons = [...store.lms.lessons];
  if (req.query.moduleId) lessons = lessons.filter(l => l.moduleId === Number(req.query.moduleId));
  if (req.query.courseId) lessons = lessons.filter(l => l.courseId === Number(req.query.courseId));
  lessons.sort((a, b) => a.order - b.order);
  res.json({ success: true, lessons });
});

router.post("/lessons", (req, res) => {
  const { moduleId, courseId, title, type, duration, notes, videoUrl, status } = req.body;
  if (!moduleId || !title) return res.status(400).json({ error: "moduleId and title are required" });
  const existingLessons = store.lms.lessons.filter(l => l.moduleId === Number(moduleId));
  const order = existingLessons.length + 1;
  const maxDay = store.lms.lessons.filter(l => l.courseId === Number(courseId)).length + 1;
  const id = nid("lesson");
  const lesson = { id, moduleId: Number(moduleId), courseId: Number(courseId), day: maxDay, title, type: type || "video", duration: duration || "45 min", status: status || "Draft", videoUrl: videoUrl || "", notes: notes || "", resources: [], order };
  store.lms.lessons.push(lesson);
  // Update module lesson count
  const mod = store.lms.modules.find(m => m.id === Number(moduleId));
  if (mod) mod.totalLessons = store.lms.lessons.filter(l => l.moduleId === mod.id).length;
  res.status(201).json({ success: true, lesson });
});

router.put("/lessons/:id", (req, res) => {
  const idx = store.lms.lessons.findIndex(l => l.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Lesson not found" });
  store.lms.lessons[idx] = { ...store.lms.lessons[idx], ...req.body, id: store.lms.lessons[idx].id };
  res.json({ success: true, lesson: store.lms.lessons[idx] });
});

router.delete("/lessons/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = store.lms.lessons.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).json({ error: "Lesson not found" });
  const lesson = store.lms.lessons[idx];
  store.lms.lessons.splice(idx, 1);
  // Update module lesson count
  const mod = store.lms.modules.find(m => m.id === lesson.moduleId);
  if (mod) mod.totalLessons = store.lms.lessons.filter(l => l.moduleId === mod.id).length;
  res.json({ success: true });
});

// ==========================================
// ===== ENROLLMENTS =====
// ==========================================
router.get("/enrollments", (req, res) => {
  let enrollments = [...store.lms.enrollments];
  if (req.query.studentId) enrollments = enrollments.filter(e => e.studentId === Number(req.query.studentId));
  if (req.query.courseId) enrollments = enrollments.filter(e => e.courseId === Number(req.query.courseId));
  res.json({ success: true, enrollments });
});

router.post("/enrollments", (req, res) => {
  const { studentId, courseId, studentName } = req.body;
  if (!studentId || !courseId) return res.status(400).json({ error: "studentId and courseId required" });
  const exists = store.lms.enrollments.find(e => e.studentId === Number(studentId) && e.courseId === Number(courseId));
  if (exists) return res.status(400).json({ error: "Student already enrolled in this course" });
  const id = nid("enrollment");
  const enrollment = { id, studentId: Number(studentId), courseId: Number(courseId), progress: 0, enrolledDate: new Date().toISOString().split("T")[0], status: "Active", studentName: studentName || "" };
  store.lms.enrollments.push(enrollment);
  res.status(201).json({ success: true, enrollment });
});

router.put("/enrollments/:id", (req, res) => {
  const idx = store.lms.enrollments.findIndex(e => e.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Enrollment not found" });
  store.lms.enrollments[idx] = { ...store.lms.enrollments[idx], ...req.body, id: store.lms.enrollments[idx].id };
  res.json({ success: true, enrollment: store.lms.enrollments[idx] });
});

// ==========================================
// ===== ASSIGNMENTS =====
// ==========================================
router.get("/assignments", (req, res) => {
  let assignments = [...store.lms.assignments];
  if (req.query.courseId) assignments = assignments.filter(a => a.courseId === Number(req.query.courseId));
  if (req.query.moduleId) assignments = assignments.filter(a => a.moduleId === Number(req.query.moduleId));
  res.json({ success: true, assignments });
});

router.post("/assignments", (req, res) => {
  const { courseId, moduleId, title, type, dueDate, maxScore, instructions, allowedLanguages, estimatedTime } = req.body;
  if (!title || !courseId) return res.status(400).json({ error: "Title and courseId required" });
  const id = nid("assignment");
  const assignment = { id, courseId: Number(courseId), moduleId: moduleId ? Number(moduleId) : null, title, type: type || "coding", dueDate: dueDate || "", maxScore: maxScore || 100, submissions: 0, status: "Active", instructions: instructions || "", allowedLanguages: allowedLanguages || [], estimatedTime: estimatedTime || "" };
  store.lms.assignments.push(assignment);
  res.status(201).json({ success: true, assignment });
});

router.put("/assignments/:id", (req, res) => {
  const idx = store.lms.assignments.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Assignment not found" });
  store.lms.assignments[idx] = { ...store.lms.assignments[idx], ...req.body, id: store.lms.assignments[idx].id };
  res.json({ success: true, assignment: store.lms.assignments[idx] });
});

router.delete("/assignments/:id", (req, res) => {
  const idx = store.lms.assignments.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Assignment not found" });
  store.lms.assignments.splice(idx, 1);
  res.json({ success: true });
});

// ==========================================
// ===== ASSESSMENTS & QUESTIONS =====
// ==========================================
router.get("/assessments", (req, res) => {
  let assessments = [...store.lms.assessments];
  if (req.query.courseId) assessments = assessments.filter(a => a.courseId === Number(req.query.courseId));
  res.json({ success: true, assessments });
});

router.get("/assessments/:id", (req, res) => {
  const assessment = store.lms.assessments.find(a => a.id === Number(req.params.id));
  if (!assessment) return res.status(404).json({ error: "Assessment not found" });
  const questions = store.lms.questions.filter(q => q.assessmentId === assessment.id).sort((a, b) => a.order - b.order);
  res.json({ success: true, assessment: { ...assessment, questions } });
});

router.post("/assessments", (req, res) => {
  const { courseId, moduleId, title, type, totalQuestions, duration, maxScore, passingScore, attempts, shuffleQuestions, showAnswers, instructions } = req.body;
  if (!title || !courseId) return res.status(400).json({ error: "Title and courseId required" });
  const id = nid("assessment");
  const assessment = { id, courseId: Number(courseId), moduleId: moduleId ? Number(moduleId) : null, title, type: type || "quiz", totalQuestions: totalQuestions || 10, duration: duration || 30, maxScore: maxScore || 100, status: "Draft", passingScore: passingScore || 40, attempts: attempts || 1, shuffleQuestions: shuffleQuestions !== false, showAnswers: showAnswers !== false, instructions: instructions || "" };
  store.lms.assessments.push(assessment);
  res.status(201).json({ success: true, assessment });
});

router.put("/assessments/:id", (req, res) => {
  const idx = store.lms.assessments.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Assessment not found" });
  store.lms.assessments[idx] = { ...store.lms.assessments[idx], ...req.body, id: store.lms.assessments[idx].id };
  res.json({ success: true, assessment: store.lms.assessments[idx] });
});

router.delete("/assessments/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = store.lms.assessments.findIndex(a => a.id === id);
  if (idx === -1) return res.status(404).json({ error: "Assessment not found" });
  store.lms.assessments.splice(idx, 1);
  store.lms.questions = store.lms.questions.filter(q => q.assessmentId !== id);
  res.json({ success: true });
});

// Questions
router.get("/assessments/:id/questions", (req, res) => {
  const questions = store.lms.questions.filter(q => q.assessmentId === Number(req.params.id)).sort((a, b) => a.order - b.order);
  res.json({ success: true, questions });
});

router.post("/assessments/:id/questions", (req, res) => {
  const assessmentId = Number(req.params.id);
  const { questionText, type, options, correctAnswer, marks } = req.body;
  if (!questionText) return res.status(400).json({ error: "questionText is required" });
  const existing = store.lms.questions.filter(q => q.assessmentId === assessmentId);
  const id = nid("question");
  const question = { id, assessmentId, questionText, type: type || "mcq", options: options || [], correctAnswer: correctAnswer ?? 0, marks: marks || 5, order: existing.length + 1 };
  store.lms.questions.push(question);
  // Update assessment question count
  const asmt = store.lms.assessments.find(a => a.id === assessmentId);
  if (asmt) asmt.totalQuestions = store.lms.questions.filter(q => q.assessmentId === assessmentId).length;
  res.status(201).json({ success: true, question });
});

router.put("/questions/:id", (req, res) => {
  const idx = store.lms.questions.findIndex(q => q.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Question not found" });
  store.lms.questions[idx] = { ...store.lms.questions[idx], ...req.body, id: store.lms.questions[idx].id };
  res.json({ success: true, question: store.lms.questions[idx] });
});

router.delete("/questions/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = store.lms.questions.findIndex(q => q.id === id);
  if (idx === -1) return res.status(404).json({ error: "Question not found" });
  const q = store.lms.questions[idx];
  store.lms.questions.splice(idx, 1);
  const asmt = store.lms.assessments.find(a => a.id === q.assessmentId);
  if (asmt) asmt.totalQuestions = store.lms.questions.filter(qn => qn.assessmentId === q.assessmentId).length;
  res.json({ success: true });
});

// ==========================================
// ===== CODE EXECUTION (Simulated) =====
// ==========================================
router.post("/code/run", (req, res) => {
  const { language, code } = req.body;
  if (!code) return res.status(400).json({ error: "Code is required" });
  let output = "";
  const lang = (language || "python").toLowerCase();
  if (lang === "python") {
    if (code.includes("print")) output = "Hello, World!\n>>> Program executed successfully";
    else if (code.includes("import")) output = "Module imported successfully\n>>> Ready";
    else output = ">>> Code executed (no output)";
  } else if (lang === "javascript") {
    if (code.includes("console.log")) output = "Hello, World!\n> Program completed";
    else output = "> Code executed (no output)";
  } else if (lang === "sql") {
    output = "Query executed successfully.\nRows affected: 5\n+----+--------+-------+\n| id | name   | score |\n+----+--------+-------+\n|  1 | Rahul  |  85   |\n|  2 | Anitha |  72   |\n+----+--------+-------+";
  } else if (lang === "bash") {
    output = "$ Command executed\nSuccess";
  } else {
    output = `Executed ${lang} code successfully`;
  }
  res.json({ success: true, output, executionTime: `${(Math.random() * 2 + 0.1).toFixed(2)}s`, language: lang });
});

// ==========================================
// ===== PROJECTS =====
// ==========================================
router.get("/projects", (req, res) => {
  let projects = [...store.lms.projects];
  if (req.query.courseId) projects = projects.filter(p => p.courseId === Number(req.query.courseId));
  res.json({ success: true, projects });
});

router.post("/projects", (req, res) => {
  const { courseId, title, description, githubRepo, milestones, maxScore, teamSize } = req.body;
  if (!title || !courseId) return res.status(400).json({ error: "Title and courseId required" });
  const id = nid("project");
  const project = { id, courseId: Number(courseId), title, description: description || "", githubRepo: githubRepo || "", milestones: milestones || [], maxScore: maxScore || 300, status: "Active", teamSize: teamSize || "1-3" };
  store.lms.projects.push(project);
  res.status(201).json({ success: true, project });
});

router.put("/projects/:id", (req, res) => {
  const idx = store.lms.projects.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Project not found" });
  store.lms.projects[idx] = { ...store.lms.projects[idx], ...req.body, id: store.lms.projects[idx].id };
  res.json({ success: true, project: store.lms.projects[idx] });
});

router.delete("/projects/:id", (req, res) => {
  const idx = store.lms.projects.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Project not found" });
  store.lms.projects.splice(idx, 1);
  res.json({ success: true });
});

// ==========================================
// ===== RESOURCES =====
// ==========================================
router.get("/resources", (req, res) => {
  let resources = [...store.lms.resources];
  if (req.query.courseId) resources = resources.filter(r => r.courseId === Number(req.query.courseId));
  if (req.query.moduleId) resources = resources.filter(r => r.moduleId === Number(req.query.moduleId));
  res.json({ success: true, resources });
});

router.post("/resources", (req, res) => {
  const { courseId, moduleId, title, type, url, size } = req.body;
  if (!title || !courseId) return res.status(400).json({ error: "Title and courseId required" });
  const id = nid("resource");
  const resource = { id, courseId: Number(courseId), moduleId: moduleId ? Number(moduleId) : null, title, type: type || "pdf", url: url || "", size: size || "", uploadedAt: new Date().toISOString().split("T")[0] };
  store.lms.resources.push(resource);
  res.status(201).json({ success: true, resource });
});

router.delete("/resources/:id", (req, res) => {
  const idx = store.lms.resources.findIndex(r => r.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Resource not found" });
  store.lms.resources.splice(idx, 1);
  res.json({ success: true });
});

// ==========================================
// ===== ANNOUNCEMENTS =====
// ==========================================
router.get("/announcements", (req, res) => {
  let announcements = [...store.lms.announcements];
  if (req.query.courseId) announcements = announcements.filter(a => a.courseId === Number(req.query.courseId) || a.courseId === null);
  res.json({ success: true, announcements });
});

router.post("/announcements", (req, res) => {
  const { courseId, title, content, priority } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const id = nid("announcement");
  const announcement = { id, courseId: courseId ? Number(courseId) : null, title, content: content || "", author: "Admin", createdAt: new Date().toISOString().split("T")[0], priority: priority || "medium" };
  store.lms.announcements.push(announcement);
  res.status(201).json({ success: true, announcement });
});

router.delete("/announcements/:id", (req, res) => {
  const idx = store.lms.announcements.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Announcement not found" });
  store.lms.announcements.splice(idx, 1);
  res.json({ success: true });
});

// ==========================================
// ===== DISCUSSIONS =====
// ==========================================
router.get("/discussions", (req, res) => {
  let discussions = [...store.lms.discussions];
  if (req.query.courseId) discussions = discussions.filter(d => d.courseId === Number(req.query.courseId));
  res.json({ success: true, discussions });
});

router.post("/discussions", (req, res) => {
  const { courseId, author, title, content } = req.body;
  if (!title || !courseId) return res.status(400).json({ error: "Title and courseId required" });
  const id = nid("discussion");
  const discussion = { id, courseId: Number(courseId), author: author || "Anonymous", title, content: content || "", replies: 0, createdAt: new Date().toISOString(), pinned: false };
  store.lms.discussions.push(discussion);
  res.status(201).json({ success: true, discussion });
});

// ==========================================
// ===== LEADERBOARD =====
// ==========================================
router.get("/leaderboard", (req, res) => {
  let leaderboard = [...store.lms.leaderboard];
  if (req.query.courseId) leaderboard = leaderboard.filter(l => l.courseId === Number(req.query.courseId));
  leaderboard.sort((a, b) => b.points - a.points);
  res.json({ success: true, leaderboard });
});

// ==========================================
// ===== ADMIN DASHBOARD STATS =====
// ==========================================
router.get("/dashboard", (req, res) => {
  res.json({
    success: true,
    dashboard: {
      totalCourses: store.lms.courses.length,
      publishedCourses: store.lms.courses.filter(c => c.status === "Published").length,
      draftCourses: store.lms.courses.filter(c => c.status === "Draft").length,
      totalModules: store.lms.modules.length,
      totalLessons: store.lms.lessons.length,
      totalEnrollments: store.lms.enrollments.length,
      activeEnrollments: store.lms.enrollments.filter(e => e.status === "Active").length,
      avgProgress: store.lms.enrollments.length ? Math.round(store.lms.enrollments.reduce((a, e) => a + e.progress, 0) / store.lms.enrollments.length) : 0,
      totalAssignments: store.lms.assignments.length,
      totalAssessments: store.lms.assessments.length,
      totalProjects: store.lms.projects.length,
      totalResources: store.lms.resources.length,
      totalDiscussions: store.lms.discussions.length,
      courseCategories: [...new Set(store.lms.courses.map(c => c.category))],
    },
  });
});

// ===== FULL SYLLABUS VIEW (course + modules + lessons in tree) =====
router.get("/syllabus/:courseId", (req, res) => {
  const courseId = Number(req.params.courseId);
  const course = store.lms.courses.find(c => c.id === courseId);
  if (!course) return res.status(404).json({ error: "Course not found" });
  const modules = store.lms.modules.filter(m => m.courseId === courseId).sort((a, b) => a.order - b.order);
  const syllabus = modules.map(mod => ({
    ...mod,
    lessons: store.lms.lessons.filter(l => l.moduleId === mod.id).sort((a, b) => a.order - b.order),
    assignments: store.lms.assignments.filter(a => a.moduleId === mod.id),
    assessments: store.lms.assessments.filter(a => a.moduleId === mod.id),
  }));
  res.json({ success: true, course, syllabus });
});

export default router;
