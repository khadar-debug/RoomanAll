import { useState } from "react";
import {
  BookOpen, GraduationCap, Calendar, Search, Plus, Edit, Trash2, Eye, X, Check,
  Clock, FileText, Upload, Video, ChevronDown, ChevronRight, Code, ListChecks,
  Folder, FolderOpen, Layers, Users, Home, Monitor, AlertCircle, CheckCircle,
  Settings, BarChart2, Megaphone, GitBranch, Award, Database, Brain, Cloud, Shield,
  Terminal, Save, Copy, ArrowUp, ArrowDown, FileCode, Globe, Link, Play, HelpCircle,
  PenTool
} from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";

// ===== Utility Components =====
const ABadge = ({ children, color = "blue" }) => {
  const c = { blue: "bg-blue-100 text-blue-800", green: "bg-green-100 text-green-800", yellow: "bg-yellow-100 text-yellow-800", red: "bg-red-100 text-red-800", purple: "bg-purple-100 text-purple-800", gray: "bg-gray-100 text-gray-700", indigo: "bg-indigo-100 text-indigo-800", orange: "bg-orange-100 text-orange-800" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c[color] || c.blue}`}>{children}</span>;
};

const AModal = ({ isOpen, onClose, title, children, wide }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className={`bg-white rounded-xl shadow-xl ${wide ? "max-w-5xl" : "max-w-2xl"} w-full max-h-[90vh] overflow-y-auto m-4`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color = "indigo", sub }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5">
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded-lg bg-${color}-50`}><Icon size={20} className={`text-${color}-600`} /></div>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
  </div>
);

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4"];
const categoryIcons = { AI: Brain, "Data Science": Database, Cloud: Cloud, "Cyber Security": Shield, General: Code, "Full Stack": Terminal };

const InputField = ({ label, value, onChange, type = "text", placeholder, required, rows }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    {rows ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
    )}
  </div>
);

const SelectField = ({ label, value, onChange, options, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
      {options.map((o, i) => <option key={i} value={typeof o === "string" ? o : o.value}>{typeof o === "string" ? o : o.label}</option>)}
    </select>
  </div>
);

// ===== MAIN ADMIN COMPONENT =====
export default function LMSAdminModule({ showToast }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  // Courses
  const [courses, setCourses] = useState([
    { id: 1, name: "AI & Machine Learning", code: "AIML-2026", category: "AI", duration: "24 weeks", status: "Published", description: "Comprehensive AI & ML program", instructor: "Dr. Ramesh K.", maxStudents: 60, fee: 95000, moduleCount: 6, lessonCount: 17, enrollmentCount: 22 },
    { id: 2, name: "Data Science & Analytics", code: "DS-2026", category: "Data Science", duration: "20 weeks", status: "Published", description: "End-to-end data science program", instructor: "Prof. Meena S.", maxStudents: 50, fee: 85000, moduleCount: 2, lessonCount: 0, enrollmentCount: 15 },
    { id: 3, name: "Cloud Computing (AWS/Azure)", code: "CLD-2026", category: "Cloud", duration: "16 weeks", status: "Published", description: "Master cloud platforms", instructor: "Vikram P.", maxStudents: 45, fee: 75000, moduleCount: 2, lessonCount: 0, enrollmentCount: 12 },
    { id: 4, name: "Cyber Security", code: "SEC-2026", category: "Cyber Security", duration: "20 weeks", status: "Draft", description: "Network security & ethical hacking", instructor: "Arun T.", maxStudents: 40, fee: 90000, moduleCount: 1, lessonCount: 0, enrollmentCount: 8 },
  ]);
  const [courseModal, setCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [cf, setCf] = useState({ name: "", code: "", category: "AI", duration: "", description: "", instructor: "", maxStudents: 50, fee: 0 });

  // Modules (Syllabus)
  const [modules, setModules] = useState([
    { id: 1, courseId: 1, title: "Python Foundations for AI", description: "Core Python skills for AI/ML", order: 1, status: "Published", durationWeeks: 3, totalLessons: 7 },
    { id: 2, courseId: 1, title: "Mathematics for ML", description: "Linear algebra, probability, calculus", order: 2, status: "Published", durationWeeks: 2, totalLessons: 4 },
    { id: 3, courseId: 1, title: "Machine Learning Fundamentals", description: "Supervised & unsupervised learning", order: 3, status: "Published", durationWeeks: 4, totalLessons: 6 },
    { id: 4, courseId: 1, title: "Deep Learning & Neural Networks", description: "CNNs, RNNs, Transformers", order: 4, status: "Draft", durationWeeks: 5, totalLessons: 0 },
    { id: 5, courseId: 1, title: "NLP & GenAI", description: "LLMs, RAG, fine-tuning", order: 5, status: "Draft", durationWeeks: 4, totalLessons: 0 },
    { id: 6, courseId: 1, title: "Capstone & Deployment", description: "End-to-end ML project", order: 6, status: "Draft", durationWeeks: 6, totalLessons: 0 },
    { id: 7, courseId: 2, title: "Data Fundamentals & Python", description: "Python, Pandas, NumPy", order: 1, status: "Published", durationWeeks: 3, totalLessons: 0 },
    { id: 8, courseId: 2, title: "Statistical Analysis", description: "Descriptive & inferential stats", order: 2, status: "Published", durationWeeks: 3, totalLessons: 0 },
    { id: 9, courseId: 3, title: "Cloud Foundations", description: "Cloud concepts, IAM, networking", order: 1, status: "Published", durationWeeks: 3, totalLessons: 0 },
    { id: 10, courseId: 3, title: "AWS Core Services", description: "EC2, S3, Lambda, RDS", order: 2, status: "Published", durationWeeks: 4, totalLessons: 0 },
    { id: 11, courseId: 4, title: "Security Fundamentals", description: "CIA triad, threat landscape", order: 1, status: "Draft", durationWeeks: 3, totalLessons: 0 },
  ]);
  const [moduleModal, setModuleModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [mf, setMf] = useState({ courseId: "", title: "", description: "", durationWeeks: 2, status: "Draft" });

  // Lessons
  const [lessons, setLessons] = useState([
    { id: 1, moduleId: 1, courseId: 1, day: 1, title: "Python Basics & Environment Setup", type: "video", duration: "45 min", status: "Published", videoUrl: "", notes: "Install Python, set up Jupyter & VS Code." },
    { id: 2, moduleId: 1, courseId: 1, day: 2, title: "Control Flow & Functions", type: "video", duration: "50 min", status: "Published", videoUrl: "", notes: "Loops, conditionals, functions, lambda." },
    { id: 3, moduleId: 1, courseId: 1, day: 3, title: "OOP in Python", type: "video", duration: "55 min", status: "Published", videoUrl: "", notes: "Classes, inheritance, polymorphism." },
    { id: 4, moduleId: 1, courseId: 1, day: 4, title: "NumPy for Numerical Computing", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "Arrays, broadcasting, linear algebra." },
    { id: 5, moduleId: 1, courseId: 1, day: 5, title: "Pandas for Data Manipulation", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "DataFrames, cleaning, groupby, merge." },
    { id: 6, moduleId: 1, courseId: 1, day: 6, title: "Data Visualization", type: "video", duration: "50 min", status: "Published", videoUrl: "", notes: "Matplotlib & Seaborn." },
    { id: 7, moduleId: 1, courseId: 1, day: 7, title: "Assignment: EDA on Real Dataset", type: "assignment", duration: "2 hrs", status: "Published", videoUrl: "", notes: "EDA on Titanic dataset." },
    { id: 8, moduleId: 2, courseId: 1, day: 8, title: "Linear Algebra Essentials", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "Vectors, matrices, eigenvalues." },
    { id: 9, moduleId: 2, courseId: 1, day: 9, title: "Probability & Statistics", type: "video", duration: "55 min", status: "Published", videoUrl: "", notes: "Distributions, Bayes theorem." },
    { id: 10, moduleId: 2, courseId: 1, day: 10, title: "Calculus for Optimization", type: "video", duration: "50 min", status: "Published", videoUrl: "", notes: "Derivatives, gradient descent." },
    { id: 11, moduleId: 2, courseId: 1, day: 11, title: "Math Foundations Quiz", type: "assessment", duration: "1 hr", status: "Published", videoUrl: "", notes: "30 MCQ + 5 problems." },
    { id: 12, moduleId: 3, courseId: 1, day: 12, title: "Intro to Machine Learning", type: "video", duration: "45 min", status: "Published", videoUrl: "", notes: "Types of ML, ML pipeline." },
    { id: 13, moduleId: 3, courseId: 1, day: 13, title: "Linear & Logistic Regression", type: "video", duration: "60 min", status: "Published", videoUrl: "", notes: "Regression, gradient descent." },
    { id: 14, moduleId: 3, courseId: 1, day: 14, title: "Decision Trees & Random Forests", type: "video", duration: "55 min", status: "Published", videoUrl: "", notes: "Information gain, ensemble." },
    { id: 15, moduleId: 3, courseId: 1, day: 15, title: "SVM & KNN", type: "video", duration: "50 min", status: "Draft", videoUrl: "", notes: "Kernel trick, distance metrics." },
    { id: 16, moduleId: 3, courseId: 1, day: 16, title: "Model Evaluation & Tuning", type: "video", duration: "55 min", status: "Draft", videoUrl: "", notes: "Metrics, cross-validation." },
    { id: 17, moduleId: 3, courseId: 1, day: 17, title: "Build ML Pipeline", type: "assignment", duration: "3 hrs", status: "Draft", videoUrl: "", notes: "End-to-end scikit-learn pipeline." },
  ]);
  const [lessonModal, setLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [lf, setLf] = useState({ moduleId: "", courseId: "", title: "", type: "video", duration: "", notes: "", videoUrl: "", status: "Draft" });

  // Assignments
  const [assignments, setAssignments] = useState([
    { id: 1, courseId: 1, moduleId: 1, title: "Python Data Structures Lab", type: "coding", dueDate: "2026-04-05", maxScore: 100, submissions: 18, status: "Active", instructions: "Implement stack, queue, linked list, BST.", allowedLanguages: "python", estimatedTime: "2 hours" },
    { id: 2, courseId: 1, moduleId: 2, title: "Linear Algebra Problem Set", type: "written", dueDate: "2026-04-10", maxScore: 50, submissions: 12, status: "Active", instructions: "Solve 15 linear algebra problems.", allowedLanguages: "", estimatedTime: "1.5 hours" },
    { id: 3, courseId: 1, moduleId: 3, title: "Build a Classifier", type: "project", dueDate: "2026-04-20", maxScore: 200, submissions: 5, status: "Active", instructions: "Compare 3+ classification models.", allowedLanguages: "python", estimatedTime: "4 hours" },
    { id: 4, courseId: 2, moduleId: 7, title: "EDA with Pandas", type: "coding", dueDate: "2026-04-08", maxScore: 100, submissions: 15, status: "Active", instructions: "EDA on e-commerce dataset.", allowedLanguages: "python", estimatedTime: "2 hours" },
  ]);
  const [assignModal, setAssignModal] = useState(false);
  const [editingAssign, setEditingAssign] = useState(null);
  const [af, setAf] = useState({ courseId: "", moduleId: "", title: "", type: "coding", dueDate: "", maxScore: 100, instructions: "", allowedLanguages: "python", estimatedTime: "" });

  // Assessments
  const [assessments, setAssessments] = useState([
    { id: 1, courseId: 1, moduleId: 3, title: "ML Fundamentals Quiz", type: "quiz", totalQuestions: 20, duration: 30, maxScore: 100, status: "Published", passingScore: 60, attempts: 2 },
    { id: 2, courseId: 1, moduleId: null, title: "Mid-term Assessment", type: "exam", totalQuestions: 50, duration: 120, maxScore: 200, status: "Published", passingScore: 80, attempts: 1 },
    { id: 3, courseId: 2, moduleId: 7, title: "Data Science Basics Quiz", type: "quiz", totalQuestions: 15, duration: 20, maxScore: 75, status: "Published", passingScore: 45, attempts: 3 },
  ]);
  const [assessModal, setAssessModal] = useState(false);
  const [editingAssess, setEditingAssess] = useState(null);
  const [asf, setAsf] = useState({ courseId: "", moduleId: "", title: "", type: "quiz", duration: 30, maxScore: 100, passingScore: 40, attempts: 1, instructions: "" });

  // Questions bank for an assessment
  const [questions, setQuestions] = useState([
    { id: 1, assessmentId: 1, questionText: "Which is NOT a type of machine learning?", type: "mcq", options: ["Supervised", "Unsupervised", "Compiled Learning", "Reinforcement"], correctAnswer: 2, marks: 5 },
    { id: 2, assessmentId: 1, questionText: "What does a cost function measure?", type: "mcq", options: ["Model complexity", "Prediction error", "Training data size", "Feature count"], correctAnswer: 1, marks: 5 },
    { id: 3, assessmentId: 1, questionText: "Overfitting occurs when:", type: "mcq", options: ["Good train, bad test", "Model too simple", "Too much data", "Normalized features"], correctAnswer: 0, marks: 5 },
  ]);
  const [qModal, setQModal] = useState(false);
  const [editingQ, setEditingQ] = useState(null);
  const [qf, setQf] = useState({ assessmentId: "", questionText: "", type: "mcq", option1: "", option2: "", option3: "", option4: "", correctAnswer: 0, marks: 5 });
  const [viewAssessId, setViewAssessId] = useState(null);

  // Resources
  const [resources, setResources] = useState([
    { id: 1, courseId: 1, moduleId: 1, title: "Python Cheat Sheet", type: "pdf", size: "2.4 MB" },
    { id: 2, courseId: 1, moduleId: 2, title: "Linear Algebra Reference", type: "pdf", size: "5.1 MB" },
    { id: 3, courseId: 1, moduleId: null, title: "ML Project Starter Template", type: "zip", size: "12 MB" },
  ]);
  const [resModal, setResModal] = useState(false);
  const [rf, setRf] = useState({ courseId: "", moduleId: "", title: "", type: "pdf", size: "" });

  // Announcements
  const [announcements, setAnnouncements] = useState([
    { id: 1, courseId: 1, title: "Mid-term exam schedule updated", content: "Mid-term moved to April 15.", author: "Dr. Ramesh K.", createdAt: "2026-03-25", priority: "high" },
    { id: 2, courseId: null, title: "Platform maintenance on April 2", content: "LMS down 2 AM - 6 AM IST.", author: "Admin", createdAt: "2026-03-30", priority: "medium" },
  ]);
  const [annModal, setAnnModal] = useState(false);
  const [annF, setAnnF] = useState({ courseId: "", title: "", content: "", priority: "medium" });

  // Syllabus view
  const [syllCourseId, setSyllCourseId] = useState(1);
  const [expandedModules, setExpandedModules] = useState({});

  // Filter states
  const [courseFilter, setCourseFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");

  // Next IDs
  const nextId = (arr) => arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;

  // Admin tabs
  const adminTabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "syllabus", label: "Syllabus Builder", icon: Layers },
    { id: "lessons", label: "Lessons & Content", icon: Video },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "assessments", label: "Assessments", icon: ListChecks },
    { id: "questions", label: "Question Bank", icon: HelpCircle },
    { id: "resources", label: "Resources", icon: Folder },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "enrollments", label: "Enrollments", icon: Users },
  ];

  const getCourseName = (id) => courses.find(c => c.id === Number(id))?.name || "—";
  const getModuleName = (id) => modules.find(m => m.id === Number(id))?.title || "—";

  // ====== DASHBOARD ======
  const renderDashboard = () => {
    const totalStudents = new Set(
      [{ id: 1, n: 22 }, { id: 2, n: 15 }, { id: 3, n: 12 }, { id: 4, n: 8 }].flatMap(c => Array.from({ length: c.n }, (_, i) => `${c.id}-${i}`))
    ).size;
    const courseData = courses.map(c => ({ name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name, Enrolled: c.enrollmentCount, Modules: c.moduleCount, Lessons: c.lessonCount }));
    const statusData = [
      { name: "Published", value: courses.filter(c => c.status === "Published").length },
      { name: "Draft", value: courses.filter(c => c.status === "Draft").length },
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} label="Total Courses" value={courses.length} color="indigo" sub={`${courses.filter(c => c.status === "Published").length} published`} />
          <StatCard icon={Layers} label="Total Modules" value={modules.length} color="blue" />
          <StatCard icon={Video} label="Total Lessons" value={lessons.length} color="green" sub={`${lessons.filter(l => l.status === "Published").length} published`} />
          <StatCard icon={Users} label="Total Enrolled" value={totalStudents} color="purple" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={FileText} label="Assignments" value={assignments.length} color="orange" />
          <StatCard icon={ListChecks} label="Assessments" value={assessments.length} color="red" />
          <StatCard icon={HelpCircle} label="Questions" value={questions.length} color="yellow" />
          <StatCard icon={Folder} label="Resources" value={resources.length} color="blue" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Enrollment by Course</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={courseData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="Enrolled" fill="#4F46E5" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Course Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart><Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Announcements</h3>
          {announcements.slice(0, 5).map(a => (
            <div key={a.id} className="flex items-start gap-3 py-3 border-b last:border-0">
              <Megaphone size={16} className={a.priority === "high" ? "text-red-500 mt-0.5" : "text-yellow-500 mt-0.5"} />
              <div>
                <div className="text-sm font-medium text-gray-900">{a.title}</div>
                <div className="text-xs text-gray-500">{a.courseId ? getCourseName(a.courseId) : "All Courses"} · {a.createdAt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ====== COURSES TAB ======
  const openCourseModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setCf({ name: course.name, code: course.code, category: course.category, duration: course.duration, description: course.description, instructor: course.instructor, maxStudents: course.maxStudents, fee: course.fee });
    } else {
      setEditingCourse(null);
      setCf({ name: "", code: "", category: "AI", duration: "", description: "", instructor: "", maxStudents: 50, fee: 0 });
    }
    setCourseModal(true);
  };

  const saveCourse = () => {
    if (!cf.name || !cf.code) return showToast("Name and code are required", "error");
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...c, ...cf } : c));
      showToast("Course updated successfully");
    } else {
      setCourses(prev => [...prev, { id: nextId(prev), ...cf, status: "Draft", moduleCount: 0, lessonCount: 0, enrollmentCount: 0 }]);
      showToast("Course created successfully");
    }
    setCourseModal(false);
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setModules(prev => prev.filter(m => m.courseId !== id));
    setLessons(prev => prev.filter(l => l.courseId !== id));
    setAssignments(prev => prev.filter(a => a.courseId !== id));
    setAssessments(prev => prev.filter(a => a.courseId !== id));
    showToast("Course deleted");
  };

  const toggleCourseStatus = (id) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "Published" ? "Draft" : "Published" } : c));
    showToast("Course status updated");
  };

  const renderCourses = () => {
    const filtered = courses.filter(c =>
      (courseFilter === "all" || c.status === courseFilter) &&
      (c.name.toLowerCase().includes(searchQ.toLowerCase()) || c.code.toLowerCase().includes(searchQ.toLowerCase()))
    );
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search courses..." className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-64" /></div>
            <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="all">All Status</option><option value="Published">Published</option><option value="Draft">Draft</option>
            </select>
          </div>
          <button onClick={() => openCourseModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> New Course</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr><th className="px-4 py-3">Course</th><th className="px-4 py-3">Code</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Instructor</th><th className="px-4 py-3">Modules</th><th className="px-4 py-3">Lessons</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Fee</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(c => {
                const Icon = categoryIcons[c.category] || Code;
                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2"><Icon size={16} className="text-indigo-500" /> {c.name}</td>
                    <td className="px-4 py-3 text-gray-600">{c.code}</td>
                    <td className="px-4 py-3"><ABadge color="purple">{c.category}</ABadge></td>
                    <td className="px-4 py-3 text-gray-600">{c.instructor}</td>
                    <td className="px-4 py-3 text-gray-600">{modules.filter(m => m.courseId === c.id).length}</td>
                    <td className="px-4 py-3 text-gray-600">{lessons.filter(l => l.courseId === c.id).length}</td>
                    <td className="px-4 py-3"><ABadge color={c.status === "Published" ? "green" : "yellow"}>{c.status}</ABadge></td>
                    <td className="px-4 py-3 text-gray-600">₹{Number(c.fee).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleCourseStatus(c.id)} className="p-1.5 text-gray-400 hover:text-green-600 rounded" title="Toggle publish">{c.status === "Published" ? <Eye size={15} /> : <Globe size={15} />}</button>
                        <button onClick={() => openCourseModal(c)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit size={15} /></button>
                        <button onClick={() => deleteCourse(c.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No courses found</div>}
        </div>
      </div>
    );
  };

  // ====== SYLLABUS BUILDER ======
  const toggleModuleExpand = (id) => setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));

  const openModuleModal = (mod = null) => {
    if (mod) {
      setEditingModule(mod);
      setMf({ courseId: String(mod.courseId), title: mod.title, description: mod.description, durationWeeks: mod.durationWeeks, status: mod.status });
    } else {
      setEditingModule(null);
      setMf({ courseId: String(syllCourseId), title: "", description: "", durationWeeks: 2, status: "Draft" });
    }
    setModuleModal(true);
  };

  const saveModule = () => {
    if (!mf.title || !mf.courseId) return showToast("Title and course are required", "error");
    if (editingModule) {
      setModules(prev => prev.map(m => m.id === editingModule.id ? { ...m, ...mf, courseId: Number(mf.courseId) } : m));
      showToast("Module updated");
    } else {
      const courseModules = modules.filter(m => m.courseId === Number(mf.courseId));
      setModules(prev => [...prev, { id: nextId(prev), ...mf, courseId: Number(mf.courseId), order: courseModules.length + 1, totalLessons: 0 }]);
      showToast("Module created");
    }
    setModuleModal(false);
  };

  const deleteModule = (id) => {
    setModules(prev => prev.filter(m => m.id !== id));
    setLessons(prev => prev.filter(l => l.moduleId !== id));
    showToast("Module deleted");
  };

  const renderSyllabus = () => {
    const courseModules = modules.filter(m => m.courseId === Number(syllCourseId)).sort((a, b) => a.order - b.order);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Course:</label>
            <select value={syllCourseId} onChange={e => setSyllCourseId(Number(e.target.value))} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button onClick={() => openModuleModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Add Module</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200">
          {courseModules.length === 0 && <div className="text-center py-12 text-gray-400">No modules yet. Click "Add Module" to create your syllabus.</div>}
          {courseModules.map((mod, mi) => {
            const modLessons = lessons.filter(l => l.moduleId === mod.id).sort((a, b) => a.order || a.day - (b.order || b.day));
            const expanded = expandedModules[mod.id];
            return (
              <div key={mod.id} className="border-b last:border-0">
                <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleModuleExpand(mod.id)}>
                  <div className="flex items-center gap-3">
                    {expanded ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">{mi + 1}</span>
                      <div>
                        <div className="font-medium text-gray-900">{mod.title}</div>
                        <div className="text-xs text-gray-500">{mod.description} · {mod.durationWeeks} weeks · {modLessons.length} lessons</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <ABadge color={mod.status === "Published" ? "green" : "yellow"}>{mod.status}</ABadge>
                    <button onClick={() => openModuleModal(mod)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={15} /></button>
                    <button onClick={() => deleteModule(mod.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </div>
                {expanded && (
                  <div className="bg-gray-50 px-5 pb-4">
                    {modLessons.length === 0 && <div className="text-center py-4 text-gray-400 text-sm">No lessons in this module yet.</div>}
                    {modLessons.map((les, li) => (
                      <div key={les.id} className="flex items-center justify-between py-2 px-4 bg-white rounded-lg mb-2 border border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400 w-8">Day {les.day}</span>
                          {les.type === "video" ? <Video size={14} className="text-blue-500" /> : les.type === "assignment" ? <FileText size={14} className="text-orange-500" /> : <ListChecks size={14} className="text-purple-500" />}
                          <span className="text-sm text-gray-800">{les.title}</span>
                          <ABadge color="gray">{les.type}</ABadge>
                          <span className="text-xs text-gray-400">{les.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ABadge color={les.status === "Published" ? "green" : "yellow"}>{les.status}</ABadge>
                          <button onClick={() => openLessonModal(les)} className="p-1 text-gray-400 hover:text-blue-600"><Edit size={14} /></button>
                          <button onClick={() => { setLessons(prev => prev.filter(l => l.id !== les.id)); showToast("Lesson deleted"); }} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => { setLf({ moduleId: mod.id, courseId: mod.courseId, title: "", type: "video", duration: "", notes: "", videoUrl: "", status: "Draft" }); setEditingLesson(null); setLessonModal(true); }} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 mt-2 px-4"><Plus size={14} /> Add Lesson to this Module</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ====== LESSONS ======
  const openLessonModal = (les = null) => {
    if (les) {
      setEditingLesson(les);
      setLf({ moduleId: les.moduleId, courseId: les.courseId, title: les.title, type: les.type, duration: les.duration, notes: les.notes, videoUrl: les.videoUrl || "", status: les.status });
    } else {
      setEditingLesson(null);
      setLf({ moduleId: "", courseId: "", title: "", type: "video", duration: "", notes: "", videoUrl: "", status: "Draft" });
    }
    setLessonModal(true);
  };

  const saveLesson = () => {
    if (!lf.title || !lf.moduleId) return showToast("Title and module are required", "error");
    const cId = lf.courseId || modules.find(m => m.id === Number(lf.moduleId))?.courseId || "";
    if (editingLesson) {
      setLessons(prev => prev.map(l => l.id === editingLesson.id ? { ...l, ...lf, courseId: Number(cId), moduleId: Number(lf.moduleId) } : l));
      showToast("Lesson updated");
    } else {
      const dayNum = lessons.filter(l => l.courseId === Number(cId)).length + 1;
      setLessons(prev => [...prev, { id: nextId(prev), ...lf, courseId: Number(cId), moduleId: Number(lf.moduleId), day: dayNum, order: dayNum }]);
      showToast("Lesson created");
    }
    setLessonModal(false);
  };

  const [lessonCourseFilter, setLessonCourseFilter] = useState("all");
  const renderLessons = () => {
    let filtered = [...lessons];
    if (lessonCourseFilter !== "all") filtered = filtered.filter(l => l.courseId === Number(lessonCourseFilter));
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <select value={lessonCourseFilter} onChange={e => setLessonCourseFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="all">All Courses</option>
              {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button onClick={() => openLessonModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Add Lesson</button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr><th className="px-4 py-3">Day</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Module</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Duration</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{l.day}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{l.title}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{getCourseName(l.courseId)}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{getModuleName(l.moduleId)}</td>
                  <td className="px-4 py-3"><ABadge color={l.type === "video" ? "blue" : l.type === "assignment" ? "orange" : "purple"}>{l.type}</ABadge></td>
                  <td className="px-4 py-3 text-gray-600">{l.duration}</td>
                  <td className="px-4 py-3"><ABadge color={l.status === "Published" ? "green" : "yellow"}>{l.status}</ABadge></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openLessonModal(l)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={15} /></button>
                      <button onClick={() => { setLessons(prev => prev.filter(x => x.id !== l.id)); showToast("Lesson deleted"); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-8 text-gray-400">No lessons found</div>}
        </div>
      </div>
    );
  };

  // ====== ASSIGNMENTS ======
  const openAssignModal = (a = null) => {
    if (a) {
      setEditingAssign(a);
      setAf({ courseId: a.courseId, moduleId: a.moduleId || "", title: a.title, type: a.type, dueDate: a.dueDate, maxScore: a.maxScore, instructions: a.instructions || "", allowedLanguages: a.allowedLanguages || "", estimatedTime: a.estimatedTime || "" });
    } else {
      setEditingAssign(null);
      setAf({ courseId: "", moduleId: "", title: "", type: "coding", dueDate: "", maxScore: 100, instructions: "", allowedLanguages: "python", estimatedTime: "" });
    }
    setAssignModal(true);
  };

  const saveAssignment = () => {
    if (!af.title || !af.courseId) return showToast("Title and course are required", "error");
    if (editingAssign) {
      setAssignments(prev => prev.map(a => a.id === editingAssign.id ? { ...a, ...af, courseId: Number(af.courseId), moduleId: af.moduleId ? Number(af.moduleId) : null } : a));
      showToast("Assignment updated");
    } else {
      setAssignments(prev => [...prev, { id: nextId(prev), ...af, courseId: Number(af.courseId), moduleId: af.moduleId ? Number(af.moduleId) : null, submissions: 0, status: "Active" }]);
      showToast("Assignment created");
    }
    setAssignModal(false);
  };

  const renderAssignments = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-end"><button onClick={() => openAssignModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> New Assignment</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Module</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Due Date</th><th className="px-4 py-3">Max Score</th><th className="px-4 py-3">Submissions</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignments.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{a.title}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{getCourseName(a.courseId)}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{a.moduleId ? getModuleName(a.moduleId) : "—"}</td>
                <td className="px-4 py-3"><ABadge color={a.type === "coding" ? "blue" : a.type === "written" ? "green" : "purple"}>{a.type}</ABadge></td>
                <td className="px-4 py-3 text-gray-600">{a.dueDate}</td>
                <td className="px-4 py-3 text-gray-600">{a.maxScore}</td>
                <td className="px-4 py-3 text-gray-600">{a.submissions}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => openAssignModal(a)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={15} /></button>
                    <button onClick={() => { setAssignments(prev => prev.filter(x => x.id !== a.id)); showToast("Assignment deleted"); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {assignments.length === 0 && <div className="text-center py-8 text-gray-400">No assignments yet</div>}
      </div>
    </div>
  );

  // ====== ASSESSMENTS ======
  const openAssessModal = (a = null) => {
    if (a) {
      setEditingAssess(a);
      setAsf({ courseId: a.courseId, moduleId: a.moduleId || "", title: a.title, type: a.type, duration: a.duration, maxScore: a.maxScore, passingScore: a.passingScore, attempts: a.attempts, instructions: a.instructions || "" });
    } else {
      setEditingAssess(null);
      setAsf({ courseId: "", moduleId: "", title: "", type: "quiz", duration: 30, maxScore: 100, passingScore: 40, attempts: 1, instructions: "" });
    }
    setAssessModal(true);
  };

  const saveAssessment = () => {
    if (!asf.title || !asf.courseId) return showToast("Title and course are required", "error");
    if (editingAssess) {
      setAssessments(prev => prev.map(a => a.id === editingAssess.id ? { ...a, ...asf, courseId: Number(asf.courseId), moduleId: asf.moduleId ? Number(asf.moduleId) : null } : a));
      showToast("Assessment updated");
    } else {
      setAssessments(prev => [...prev, { id: nextId(prev), ...asf, courseId: Number(asf.courseId), moduleId: asf.moduleId ? Number(asf.moduleId) : null, totalQuestions: 0, status: "Draft" }]);
      showToast("Assessment created");
    }
    setAssessModal(false);
  };

  const renderAssessments = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-end"><button onClick={() => openAssessModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> New Assessment</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Questions</th><th className="px-4 py-3">Duration</th><th className="px-4 py-3">Max Score</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assessments.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{a.title}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{getCourseName(a.courseId)}</td>
                <td className="px-4 py-3"><ABadge color={a.type === "quiz" ? "blue" : "red"}>{a.type}</ABadge></td>
                <td className="px-4 py-3 text-gray-600">{questions.filter(q => q.assessmentId === a.id).length}/{a.totalQuestions}</td>
                <td className="px-4 py-3 text-gray-600">{a.duration} min</td>
                <td className="px-4 py-3 text-gray-600">{a.maxScore}</td>
                <td className="px-4 py-3"><ABadge color={a.status === "Published" ? "green" : "yellow"}>{a.status}</ABadge></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewAssessId(a.id)} className="p-1.5 text-gray-400 hover:text-purple-600" title="Manage questions"><HelpCircle size={15} /></button>
                    <button onClick={() => { setAssessments(prev => prev.map(x => x.id === a.id ? { ...x, status: x.status === "Published" ? "Draft" : "Published" } : x)); showToast("Status updated"); }} className="p-1.5 text-gray-400 hover:text-green-600"><Globe size={15} /></button>
                    <button onClick={() => openAssessModal(a)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={15} /></button>
                    <button onClick={() => { setAssessments(prev => prev.filter(x => x.id !== a.id)); setQuestions(prev => prev.filter(q => q.assessmentId !== a.id)); showToast("Assessment deleted"); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {assessments.length === 0 && <div className="text-center py-8 text-gray-400">No assessments yet</div>}
      </div>
    </div>
  );

  // ====== QUESTION BANK ======
  const openQModal = (q = null, assessId = null) => {
    if (q) {
      setEditingQ(q);
      setQf({ assessmentId: q.assessmentId, questionText: q.questionText, type: q.type, option1: q.options?.[0] || "", option2: q.options?.[1] || "", option3: q.options?.[2] || "", option4: q.options?.[3] || "", correctAnswer: q.correctAnswer, marks: q.marks });
    } else {
      setEditingQ(null);
      setQf({ assessmentId: assessId || viewAssessId || "", questionText: "", type: "mcq", option1: "", option2: "", option3: "", option4: "", correctAnswer: 0, marks: 5 });
    }
    setQModal(true);
  };

  const saveQuestion = () => {
    if (!qf.questionText || !qf.assessmentId) return showToast("Question text and assessment are required", "error");
    const opts = [qf.option1, qf.option2, qf.option3, qf.option4].filter(Boolean);
    if (qf.type === "mcq" && opts.length < 2) return showToast("Provide at least 2 options", "error");
    if (editingQ) {
      setQuestions(prev => prev.map(q => q.id === editingQ.id ? { ...q, questionText: qf.questionText, type: qf.type, options: opts, correctAnswer: Number(qf.correctAnswer), marks: Number(qf.marks), assessmentId: Number(qf.assessmentId) } : q));
      showToast("Question updated");
    } else {
      setQuestions(prev => [...prev, { id: nextId(prev), assessmentId: Number(qf.assessmentId), questionText: qf.questionText, type: qf.type, options: opts, correctAnswer: Number(qf.correctAnswer), marks: Number(qf.marks) }]);
      showToast("Question added");
    }
    setQModal(false);
  };

  const renderQuestions = () => {
    const filteredQ = viewAssessId ? questions.filter(q => q.assessmentId === viewAssessId) : questions;
    const assess = viewAssessId ? assessments.find(a => a.id === viewAssessId) : null;
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <select value={viewAssessId || ""} onChange={e => setViewAssessId(e.target.value ? Number(e.target.value) : null)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="">All Assessments</option>
              {assessments.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
            {assess && <ABadge color="indigo">{filteredQ.length} questions · {filteredQ.reduce((s, q) => s + q.marks, 0)} marks total</ABadge>}
          </div>
          <button onClick={() => openQModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Add Question</button>
        </div>
        <div className="space-y-3">
          {filteredQ.map((q, qi) => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">{qi + 1}</span>
                    <span className="text-sm font-medium text-gray-900">{q.questionText}</span>
                    <ABadge color="gray">{q.marks} marks</ABadge>
                  </div>
                  {q.type === "mcq" && q.options && (
                    <div className="grid grid-cols-2 gap-2 ml-9">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`text-sm px-3 py-1.5 rounded-lg ${oi === q.correctAnswer ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-gray-600"}`}>
                          {String.fromCharCode(65 + oi)}. {opt} {oi === q.correctAnswer && <CheckCircle size={12} className="inline ml-1" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button onClick={() => openQModal(q)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit size={15} /></button>
                  <button onClick={() => { setQuestions(prev => prev.filter(x => x.id !== q.id)); showToast("Question deleted"); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          ))}
          {filteredQ.length === 0 && <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">No questions yet. Add questions to build your assessment.</div>}
        </div>
      </div>
    );
  };

  // ====== RESOURCES ======
  const renderResources = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-end"><button onClick={() => { setRf({ courseId: "", moduleId: "", title: "", type: "pdf", size: "" }); setResModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Upload Resource</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Module</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Size</th><th className="px-4 py-3">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {resources.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2"><FileText size={15} className="text-red-400" /> {r.title}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{getCourseName(r.courseId)}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{r.moduleId ? getModuleName(r.moduleId) : "Course-level"}</td>
                <td className="px-4 py-3"><ABadge color={r.type === "pdf" ? "red" : r.type === "zip" ? "blue" : "gray"}>{r.type}</ABadge></td>
                <td className="px-4 py-3 text-gray-600">{r.size}</td>
                <td className="px-4 py-3">
                  <button onClick={() => { setResources(prev => prev.filter(x => x.id !== r.id)); showToast("Resource deleted"); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && <div className="text-center py-8 text-gray-400">No resources uploaded</div>}
      </div>
    </div>
  );

  // ====== ANNOUNCEMENTS ======
  const renderAnnouncements = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-end"><button onClick={() => { setAnnF({ courseId: "", title: "", content: "", priority: "medium" }); setAnnModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> New Announcement</button></div>
      <div className="space-y-3">
        {announcements.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Megaphone size={20} className={a.priority === "high" ? "text-red-500 mt-0.5" : a.priority === "medium" ? "text-yellow-500 mt-0.5" : "text-blue-500 mt-0.5"} />
                <div>
                  <div className="font-medium text-gray-900">{a.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{a.content}</div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>{a.courseId ? getCourseName(a.courseId) : "All Courses"}</span>
                    <span>{a.createdAt}</span>
                    <ABadge color={a.priority === "high" ? "red" : a.priority === "medium" ? "yellow" : "blue"}>{a.priority}</ABadge>
                  </div>
                </div>
              </div>
              <button onClick={() => { setAnnouncements(prev => prev.filter(x => x.id !== a.id)); showToast("Announcement deleted"); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {announcements.length === 0 && <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">No announcements</div>}
      </div>
    </div>
  );

  // ====== ENROLLMENTS VIEW ======
  const [enrollments] = useState([
    { id: 1, studentName: "Rahul Sharma", courseId: 1, progress: 65, enrolledDate: "2026-01-15", status: "Active" },
    { id: 2, studentName: "Anitha K.", courseId: 2, progress: 40, enrolledDate: "2026-02-01", status: "Active" },
    { id: 3, studentName: "Mohammed Faisal", courseId: 3, progress: 80, enrolledDate: "2026-01-10", status: "Active" },
    { id: 4, studentName: "Sneha Reddy", courseId: 4, progress: 25, enrolledDate: "2026-03-01", status: "Active" },
  ]);

  const renderEnrollments = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-600">
            <tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Course</th><th className="px-4 py-3">Progress</th><th className="px-4 py-3">Enrolled</th><th className="px-4 py-3">Status</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {enrollments.map(e => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{e.studentName}</td>
                <td className="px-4 py-3 text-xs text-gray-600">{getCourseName(e.courseId)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2"><div className="w-24 bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full bg-indigo-600" style={{ width: `${e.progress}%` }}></div></div><span className="text-xs text-gray-600">{e.progress}%</span></div>
                </td>
                <td className="px-4 py-3 text-gray-600">{e.enrolledDate}</td>
                <td className="px-4 py-3"><ABadge color={e.status === "Active" ? "green" : "gray"}>{e.status}</ABadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ====== MAIN RENDER ======
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">LMS Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Manage courses, syllabus, content, assignments, and assessments</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1.5 overflow-x-auto">
        {adminTabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${activeTab === t.id ? "bg-indigo-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && renderDashboard()}
      {activeTab === "courses" && renderCourses()}
      {activeTab === "syllabus" && renderSyllabus()}
      {activeTab === "lessons" && renderLessons()}
      {activeTab === "assignments" && renderAssignments()}
      {activeTab === "assessments" && renderAssessments()}
      {activeTab === "questions" && renderQuestions()}
      {activeTab === "resources" && renderResources()}
      {activeTab === "announcements" && renderAnnouncements()}
      {activeTab === "enrollments" && renderEnrollments()}

      {/* ===== MODALS ===== */}

      {/* Course Modal */}
      <AModal isOpen={courseModal} onClose={() => setCourseModal(false)} title={editingCourse ? "Edit Course" : "Create New Course"} wide>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Course Name" value={cf.name} onChange={v => setCf({ ...cf, name: v })} placeholder="e.g. AI & Machine Learning" required />
          <InputField label="Course Code" value={cf.code} onChange={v => setCf({ ...cf, code: v })} placeholder="e.g. AIML-2026" required />
          <SelectField label="Category" value={cf.category} onChange={v => setCf({ ...cf, category: v })} options={["AI", "Data Science", "Cloud", "Cyber Security", "Full Stack", "DevOps", "General"]} />
          <InputField label="Duration" value={cf.duration} onChange={v => setCf({ ...cf, duration: v })} placeholder="e.g. 24 weeks" />
          <InputField label="Instructor" value={cf.instructor} onChange={v => setCf({ ...cf, instructor: v })} placeholder="Instructor name" />
          <InputField label="Max Students" value={cf.maxStudents} onChange={v => setCf({ ...cf, maxStudents: Number(v) })} type="number" />
          <InputField label="Fee (₹)" value={cf.fee} onChange={v => setCf({ ...cf, fee: Number(v) })} type="number" />
        </div>
        <InputField label="Description" value={cf.description} onChange={v => setCf({ ...cf, description: v })} rows={3} placeholder="Course description..." />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setCourseModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={saveCourse} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Save size={16} /> {editingCourse ? "Update" : "Create"} Course</button>
        </div>
      </AModal>

      {/* Module Modal */}
      <AModal isOpen={moduleModal} onClose={() => setModuleModal(false)} title={editingModule ? "Edit Module" : "Add Module"}>
        <SelectField label="Course" value={String(mf.courseId)} onChange={v => setMf({ ...mf, courseId: v })} options={[{ value: "", label: "Select course..." }, ...courses.map(c => ({ value: String(c.id), label: c.name }))]} required />
        <InputField label="Module Title" value={mf.title} onChange={v => setMf({ ...mf, title: v })} placeholder="e.g. Python Foundations" required />
        <InputField label="Description" value={mf.description} onChange={v => setMf({ ...mf, description: v })} rows={2} placeholder="Module description..." />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Duration (weeks)" value={mf.durationWeeks} onChange={v => setMf({ ...mf, durationWeeks: Number(v) })} type="number" />
          <SelectField label="Status" value={mf.status} onChange={v => setMf({ ...mf, status: v })} options={["Draft", "Published"]} />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setModuleModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={saveModule} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Save size={16} /> {editingModule ? "Update" : "Add"} Module</button>
        </div>
      </AModal>

      {/* Lesson Modal */}
      <AModal isOpen={lessonModal} onClose={() => setLessonModal(false)} title={editingLesson ? "Edit Lesson" : "Add Lesson"} wide>
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Course" value={lf.courseId} onChange={v => { setLf({ ...lf, courseId: v, moduleId: "" }); }} options={[{ value: "", label: "Select course..." }, ...courses.map(c => ({ value: String(c.id), label: c.name }))]} required />
          <SelectField label="Module" value={lf.moduleId} onChange={v => setLf({ ...lf, moduleId: v })} options={[{ value: "", label: "Select module..." }, ...modules.filter(m => !lf.courseId || m.courseId === Number(lf.courseId)).map(m => ({ value: String(m.id), label: m.title }))]} required />
          <InputField label="Lesson Title" value={lf.title} onChange={v => setLf({ ...lf, title: v })} placeholder="e.g. Python Basics & Setup" required />
          <SelectField label="Type" value={lf.type} onChange={v => setLf({ ...lf, type: v })} options={["video", "assignment", "assessment", "reading", "lab", "live"]} />
          <InputField label="Duration" value={lf.duration} onChange={v => setLf({ ...lf, duration: v })} placeholder="e.g. 45 min" />
          <SelectField label="Status" value={lf.status} onChange={v => setLf({ ...lf, status: v })} options={["Draft", "Published"]} />
        </div>
        <InputField label="Video URL" value={lf.videoUrl} onChange={v => setLf({ ...lf, videoUrl: v })} placeholder="https://..." />
        <InputField label="Lesson Notes / Content" value={lf.notes} onChange={v => setLf({ ...lf, notes: v })} rows={4} placeholder="Day-wise notes, key topics, reading material..." />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setLessonModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={saveLesson} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Save size={16} /> {editingLesson ? "Update" : "Add"} Lesson</button>
        </div>
      </AModal>

      {/* Assignment Modal */}
      <AModal isOpen={assignModal} onClose={() => setAssignModal(false)} title={editingAssign ? "Edit Assignment" : "Create Assignment"} wide>
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Course" value={af.courseId} onChange={v => setAf({ ...af, courseId: v })} options={[{ value: "", label: "Select course..." }, ...courses.map(c => ({ value: String(c.id), label: c.name }))]} required />
          <SelectField label="Module" value={af.moduleId} onChange={v => setAf({ ...af, moduleId: v })} options={[{ value: "", label: "Course-level" }, ...modules.filter(m => !af.courseId || m.courseId === Number(af.courseId)).map(m => ({ value: String(m.id), label: m.title }))]} />
          <InputField label="Title" value={af.title} onChange={v => setAf({ ...af, title: v })} placeholder="Assignment title" required />
          <SelectField label="Type" value={af.type} onChange={v => setAf({ ...af, type: v })} options={["coding", "written", "project", "lab", "presentation"]} />
          <InputField label="Due Date" value={af.dueDate} onChange={v => setAf({ ...af, dueDate: v })} type="date" />
          <InputField label="Max Score" value={af.maxScore} onChange={v => setAf({ ...af, maxScore: Number(v) })} type="number" />
          <InputField label="Allowed Languages" value={af.allowedLanguages} onChange={v => setAf({ ...af, allowedLanguages: v })} placeholder="python, javascript, sql" />
          <InputField label="Estimated Time" value={af.estimatedTime} onChange={v => setAf({ ...af, estimatedTime: v })} placeholder="e.g. 2 hours" />
        </div>
        <InputField label="Instructions" value={af.instructions} onChange={v => setAf({ ...af, instructions: v })} rows={4} placeholder="Detailed assignment instructions..." />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setAssignModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={saveAssignment} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Save size={16} /> {editingAssign ? "Update" : "Create"} Assignment</button>
        </div>
      </AModal>

      {/* Assessment Modal */}
      <AModal isOpen={assessModal} onClose={() => setAssessModal(false)} title={editingAssess ? "Edit Assessment" : "Create Assessment"} wide>
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Course" value={asf.courseId} onChange={v => setAsf({ ...asf, courseId: v })} options={[{ value: "", label: "Select course..." }, ...courses.map(c => ({ value: String(c.id), label: c.name }))]} required />
          <SelectField label="Module (optional)" value={asf.moduleId} onChange={v => setAsf({ ...asf, moduleId: v })} options={[{ value: "", label: "Course-level" }, ...modules.filter(m => !asf.courseId || m.courseId === Number(asf.courseId)).map(m => ({ value: String(m.id), label: m.title }))]} />
          <InputField label="Title" value={asf.title} onChange={v => setAsf({ ...asf, title: v })} placeholder="Assessment title" required />
          <SelectField label="Type" value={asf.type} onChange={v => setAsf({ ...asf, type: v })} options={["quiz", "exam", "practical", "viva"]} />
          <InputField label="Duration (minutes)" value={asf.duration} onChange={v => setAsf({ ...asf, duration: Number(v) })} type="number" />
          <InputField label="Max Score" value={asf.maxScore} onChange={v => setAsf({ ...asf, maxScore: Number(v) })} type="number" />
          <InputField label="Passing Score" value={asf.passingScore} onChange={v => setAsf({ ...asf, passingScore: Number(v) })} type="number" />
          <InputField label="Max Attempts" value={asf.attempts} onChange={v => setAsf({ ...asf, attempts: Number(v) })} type="number" />
        </div>
        <InputField label="Instructions" value={asf.instructions} onChange={v => setAsf({ ...asf, instructions: v })} rows={3} placeholder="Assessment instructions for students..." />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setAssessModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={saveAssessment} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Save size={16} /> {editingAssess ? "Update" : "Create"} Assessment</button>
        </div>
      </AModal>

      {/* Question Modal */}
      <AModal isOpen={qModal} onClose={() => setQModal(false)} title={editingQ ? "Edit Question" : "Add Question"} wide>
        <SelectField label="Assessment" value={qf.assessmentId} onChange={v => setQf({ ...qf, assessmentId: v })} options={[{ value: "", label: "Select assessment..." }, ...assessments.map(a => ({ value: String(a.id), label: a.title }))]} required />
        <InputField label="Question" value={qf.questionText} onChange={v => setQf({ ...qf, questionText: v })} rows={2} placeholder="Enter the question..." required />
        <SelectField label="Type" value={qf.type} onChange={v => setQf({ ...qf, type: v })} options={["mcq", "true_false", "short_answer", "coding"]} />
        {(qf.type === "mcq" || qf.type === "true_false") && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><input type="radio" name="correct" checked={Number(qf.correctAnswer) === 0} onChange={() => setQf({ ...qf, correctAnswer: 0 })} /><input value={qf.option1} onChange={e => setQf({ ...qf, option1: e.target.value })} placeholder="Option A" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
              <div className="flex items-center gap-2"><input type="radio" name="correct" checked={Number(qf.correctAnswer) === 1} onChange={() => setQf({ ...qf, correctAnswer: 1 })} /><input value={qf.option2} onChange={e => setQf({ ...qf, option2: e.target.value })} placeholder="Option B" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
              <div className="flex items-center gap-2"><input type="radio" name="correct" checked={Number(qf.correctAnswer) === 2} onChange={() => setQf({ ...qf, correctAnswer: 2 })} /><input value={qf.option3} onChange={e => setQf({ ...qf, option3: e.target.value })} placeholder="Option C" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
              <div className="flex items-center gap-2"><input type="radio" name="correct" checked={Number(qf.correctAnswer) === 3} onChange={() => setQf({ ...qf, correctAnswer: 3 })} /><input value={qf.option4} onChange={e => setQf({ ...qf, option4: e.target.value })} placeholder="Option D" className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
            </div>
            <p className="text-xs text-gray-400">Select the radio button next to the correct answer</p>
          </div>
        )}
        <InputField label="Marks" value={qf.marks} onChange={v => setQf({ ...qf, marks: Number(v) })} type="number" />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setQModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={saveQuestion} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Save size={16} /> {editingQ ? "Update" : "Add"} Question</button>
        </div>
      </AModal>

      {/* Resource Modal */}
      <AModal isOpen={resModal} onClose={() => setResModal(false)} title="Upload Resource">
        <SelectField label="Course" value={rf.courseId} onChange={v => setRf({ ...rf, courseId: v })} options={[{ value: "", label: "Select course..." }, ...courses.map(c => ({ value: String(c.id), label: c.name }))]} required />
        <SelectField label="Module (optional)" value={rf.moduleId} onChange={v => setRf({ ...rf, moduleId: v })} options={[{ value: "", label: "Course-level" }, ...modules.filter(m => !rf.courseId || m.courseId === Number(rf.courseId)).map(m => ({ value: String(m.id), label: m.title }))]} />
        <InputField label="Title" value={rf.title} onChange={v => setRf({ ...rf, title: v })} placeholder="Resource title" required />
        <div className="grid grid-cols-2 gap-4">
          <SelectField label="Type" value={rf.type} onChange={v => setRf({ ...rf, type: v })} options={["pdf", "zip", "doc", "ppt", "image", "video", "link"]} />
          <InputField label="Size" value={rf.size} onChange={v => setRf({ ...rf, size: v })} placeholder="e.g. 2.4 MB" />
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-2">
          <Upload size={32} className="mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">PDF, ZIP, DOC, PPT, Images, Videos (max 50 MB)</p>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setResModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={() => { if (!rf.title || !rf.courseId) return showToast("Title and course required", "error"); setResources(prev => [...prev, { id: nextId(prev), ...rf, courseId: Number(rf.courseId), moduleId: rf.moduleId ? Number(rf.moduleId) : null }]); setResModal(false); showToast("Resource added"); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Upload size={16} /> Upload</button>
        </div>
      </AModal>

      {/* Announcement Modal */}
      <AModal isOpen={annModal} onClose={() => setAnnModal(false)} title="New Announcement">
        <SelectField label="Course (leave empty for all)" value={annF.courseId} onChange={v => setAnnF({ ...annF, courseId: v })} options={[{ value: "", label: "All Courses" }, ...courses.map(c => ({ value: String(c.id), label: c.name }))]} />
        <InputField label="Title" value={annF.title} onChange={v => setAnnF({ ...annF, title: v })} placeholder="Announcement title" required />
        <InputField label="Content" value={annF.content} onChange={v => setAnnF({ ...annF, content: v })} rows={3} placeholder="Announcement details..." />
        <SelectField label="Priority" value={annF.priority} onChange={v => setAnnF({ ...annF, priority: v })} options={["low", "medium", "high"]} />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={() => setAnnModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={() => { if (!annF.title) return showToast("Title is required", "error"); setAnnouncements(prev => [...prev, { id: nextId(prev), ...annF, courseId: annF.courseId ? Number(annF.courseId) : null, author: "Admin", createdAt: new Date().toISOString().split("T")[0] }]); setAnnModal(false); showToast("Announcement published"); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2"><Megaphone size={16} /> Publish</button>
        </div>
      </AModal>
    </div>
  );
}
