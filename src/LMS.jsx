import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  BookOpen, GraduationCap, DollarSign, Calendar, Search, Bell, ChevronDown, ChevronRight, Plus,
  Edit, Trash2, Eye, X, Check, Star, Clock, Target, Award, FileText, Globe, ArrowUp, ArrowDown,
  CheckCircle, AlertCircle, Download, Upload, Video, Link, ExternalLink, MessageCircle, Code,
  Play, PlayCircle, Terminal, GitBranch, GitPullRequest, Trophy, Medal, Flame, Brain, Cloud,
  Shield, Database, Cpu, Lock, Unlock, ChevronLeft, Copy, RotateCcw, Timer, ListChecks,
  FileCode, Folder, FolderOpen, MessageSquarePlus, Flag, Bookmark, CircleDot, Lightbulb,
  Rocket, Sparkles, Users, Home, Monitor, Layers
} from "lucide-react";

// ===== BADGE & UTILITY COMPONENTS =====
const LBadge = ({ children, color = "blue" }) => {
  const colors = { blue: "bg-blue-100 text-blue-800", green: "bg-green-100 text-green-800", yellow: "bg-yellow-100 text-yellow-800", red: "bg-red-100 text-red-800", purple: "bg-purple-100 text-purple-800", gray: "bg-gray-100 text-gray-700", indigo: "bg-indigo-100 text-indigo-800", pink: "bg-pink-100 text-pink-800", orange: "bg-orange-100 text-orange-800" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.blue}`}>{children}</span>;
};

const LProgress = ({ value, max = 100, color = "indigo" }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = { indigo: "bg-indigo-600", green: "bg-green-500", blue: "bg-blue-500", yellow: "bg-yellow-500", red: "bg-red-500", purple: "bg-purple-500" };
  return <div className="w-full bg-gray-200 rounded-full h-2"><div className={`h-2 rounded-full ${colors[color] || colors.indigo}`} style={{ width: `${pct}%` }}></div></div>;
};

const LModal = ({ isOpen, onClose, title, children, wide }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className={`bg-white rounded-xl shadow-xl ${wide ? "max-w-4xl" : "max-w-lg"} w-full max-h-[90vh] overflow-y-auto m-4`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded"><X size={18} /></button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
};

// ===== LMS SAMPLE DATA =====
const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const courseIcons = { "AI & Machine Learning": Brain, "Data Science": Database, "Cloud Computing": Cloud, "Cyber Security": Shield, "Full Stack Development": Code, "DevOps Engineering": Terminal };
const courseColors = { "AI & Machine Learning": "#8B5CF6", "Data Science": "#3B82F6", "Cloud Computing": "#06B6D4", "Cyber Security": "#EF4444", "Full Stack Development": "#10B981", "DevOps Engineering": "#F59E0B" };

const lmsCourses = [
  {
    id: 1, name: "AI & Machine Learning", duration: "24 weeks", totalDays: 120, completedDays: 54,
    modules: [
      { id: 1, title: "Module 1: Python Foundations for AI", days: "Week 1-3", status: "completed", lessons: [
        { id: 1, day: 1, title: "Python Basics & Environment Setup", type: "video", duration: "45 min", status: "completed", videoUrl: "#", notes: "Install Python 3.11, Jupyter Notebook, VS Code. Set up virtual environments using venv. Introduction to Python syntax, variables, data types (int, float, str, bool, list, dict, tuple, set)." },
        { id: 2, day: 2, title: "Control Flow & Functions", type: "video", duration: "50 min", status: "completed", videoUrl: "#", notes: "If/elif/else statements, for loops, while loops, list comprehensions. Defining functions, parameters, return values, lambda functions, *args and **kwargs." },
        { id: 3, day: 3, title: "OOP in Python", type: "video", duration: "55 min", status: "completed", videoUrl: "#", notes: "Classes, objects, inheritance, polymorphism, encapsulation. Special methods (__init__, __str__, __repr__). Abstract classes and interfaces." },
        { id: 4, day: 4, title: "NumPy for Numerical Computing", type: "video", duration: "60 min", status: "completed", videoUrl: "#", notes: "NumPy arrays, array operations, broadcasting, indexing, slicing. Linear algebra operations, random number generation. Performance comparison with Python lists." },
        { id: 5, day: 5, title: "Pandas for Data Manipulation", type: "video", duration: "60 min", status: "completed", videoUrl: "#", notes: "Series and DataFrame objects. Reading CSV/Excel/JSON files. Data cleaning, filtering, groupby, merge, pivot tables. Handling missing values." },
        { id: 6, day: 6, title: "Data Visualization (Matplotlib & Seaborn)", type: "video", duration: "50 min", status: "completed", videoUrl: "#", notes: "Line plots, bar charts, histograms, scatter plots, heatmaps. Customizing plots, subplots, annotations. Seaborn statistical visualizations." },
        { id: 7, day: 7, title: "Assignment: EDA on Real Dataset", type: "assignment", duration: "2 hrs", status: "completed", notes: "Perform exploratory data analysis on the Titanic dataset. Clean data, create visualizations, and present insights." },
      ]},
      { id: 2, title: "Module 2: Mathematics for ML", days: "Week 4-5", status: "completed", lessons: [
        { id: 8, day: 8, title: "Linear Algebra Essentials", type: "video", duration: "60 min", status: "completed", videoUrl: "#", notes: "Vectors, matrices, matrix multiplication. Eigenvalues and eigenvectors. Singular Value Decomposition (SVD). Applications in ML: PCA, dimensionality reduction." },
        { id: 9, day: 9, title: "Probability & Statistics", type: "video", duration: "55 min", status: "completed", videoUrl: "#", notes: "Probability distributions (Normal, Binomial, Poisson). Bayes theorem, conditional probability. Hypothesis testing, p-values, confidence intervals." },
        { id: 10, day: 10, title: "Calculus for Optimization", type: "video", duration: "50 min", status: "completed", videoUrl: "#", notes: "Derivatives, partial derivatives, chain rule. Gradient descent algorithm. Learning rate, convergence, local vs global minima." },
        { id: 11, day: 11, title: "Assessment: Math Foundations Quiz", type: "assessment", duration: "1 hr", status: "completed", notes: "30 MCQ + 5 numerical problems covering linear algebra, probability, and calculus." },
      ]},
      { id: 3, title: "Module 3: Machine Learning Fundamentals", days: "Week 6-9", status: "in_progress", lessons: [
        { id: 12, day: 12, title: "Introduction to Machine Learning", type: "video", duration: "45 min", status: "completed", videoUrl: "#", notes: "Types of ML: Supervised, Unsupervised, Reinforcement. ML pipeline: data collection, preprocessing, training, evaluation, deployment." },
        { id: 13, day: 13, title: "Linear & Logistic Regression", type: "video", duration: "60 min", status: "completed", videoUrl: "#", notes: "Simple and multiple linear regression. Cost function, gradient descent. Logistic regression for classification. Sigmoid function, decision boundary." },
        { id: 14, day: 14, title: "Decision Trees & Random Forests", type: "video", duration: "55 min", status: "in_progress", videoUrl: "#", notes: "Decision tree algorithm, information gain, Gini impurity. Pruning techniques. Random Forest ensemble. Bagging vs Boosting." },
        { id: 15, day: 15, title: "SVM & KNN", type: "video", duration: "50 min", status: "locked", videoUrl: "#", notes: "Support Vector Machines: kernel trick, margin maximization. K-Nearest Neighbors: distance metrics, choosing K." },
        { id: 16, day: 16, title: "Model Evaluation & Tuning", type: "video", duration: "55 min", status: "locked", videoUrl: "#", notes: "Accuracy, Precision, Recall, F1-Score, ROC-AUC. Cross-validation, Grid Search, Random Search. Overfitting vs Underfitting. Regularization (L1, L2)." },
        { id: 17, day: 17, title: "Coding Assignment: Build ML Pipeline", type: "assignment", duration: "3 hrs", status: "locked", notes: "Build a complete ML pipeline using scikit-learn. Includes data preprocessing, model training, evaluation, and hyperparameter tuning on the Boston Housing dataset." },
      ]},
      { id: 4, title: "Module 4: Deep Learning & Neural Networks", days: "Week 10-14", status: "locked", lessons: [
        { id: 18, day: 18, title: "Neural Network Basics", type: "video", duration: "60 min", status: "locked", videoUrl: "#", notes: "Perceptron, activation functions, forward propagation, backpropagation." },
        { id: 19, day: 19, title: "TensorFlow & Keras", type: "video", duration: "65 min", status: "locked", videoUrl: "#", notes: "Building neural networks with TensorFlow/Keras. Sequential and Functional API." },
        { id: 20, day: 20, title: "CNNs for Computer Vision", type: "video", duration: "60 min", status: "locked", videoUrl: "#", notes: "Convolution, pooling, CNN architectures (LeNet, VGG, ResNet). Image classification, object detection." },
        { id: 21, day: 21, title: "RNNs, LSTMs & Transformers", type: "video", duration: "65 min", status: "locked", videoUrl: "#", notes: "Sequence models, vanishing gradient problem. LSTM and GRU. Attention mechanism, Transformers architecture." },
        { id: 22, day: 22, title: "NLP with Transformers", type: "video", duration: "60 min", status: "locked", videoUrl: "#", notes: "BERT, GPT, Text classification, Named Entity Recognition, Sentiment Analysis using HuggingFace." },
        { id: 23, day: 23, title: "Project: End-to-End ML Application", type: "project", duration: "2 weeks", status: "locked", notes: "Build a complete ML application: problem definition, data collection, model training, API creation (Flask/FastAPI), and deployment." },
      ]},
      { id: 5, title: "Module 5: MLOps & Deployment", days: "Week 15-18", status: "locked", lessons: [
        { id: 24, day: 24, title: "Model Deployment with Flask/FastAPI", type: "video", duration: "55 min", status: "locked", videoUrl: "#", notes: "Creating REST APIs for ML models. Request/response handling. Model serialization with pickle/joblib." },
        { id: 25, day: 25, title: "Docker & Containerization", type: "video", duration: "50 min", status: "locked", videoUrl: "#", notes: "Dockerfile, docker-compose. Containerizing ML applications." },
        { id: 26, day: 26, title: "CI/CD for ML (MLOps)", type: "video", duration: "60 min", status: "locked", videoUrl: "#", notes: "MLflow, DVC, model versioning, experiment tracking, automated retraining." },
        { id: 27, day: 27, title: "Cloud Deployment (AWS/GCP)", type: "video", duration: "55 min", status: "locked", videoUrl: "#", notes: "AWS SageMaker, GCP Vertex AI. Deploying models to cloud endpoints." },
      ]},
      { id: 6, title: "Module 6: Capstone & Certification", days: "Week 19-24", status: "locked", lessons: [
        { id: 28, day: 28, title: "Capstone Project", type: "project", duration: "4 weeks", status: "locked", notes: "Industry-level project. End-to-end ML solution with deployment. Mentor-reviewed." },
        { id: 29, day: 29, title: "Final Assessment", type: "assessment", duration: "3 hrs", status: "locked", notes: "Comprehensive exam: MCQ + coding challenges + system design." },
        { id: 30, day: 30, title: "Certification & Portfolio Review", type: "video", duration: "30 min", status: "locked", notes: "Review portfolio, GitHub profile, resume preparation. Certificate ceremony." },
      ]},
    ]
  },
];

const lmsAssignments = [
  { id: 1, title: "EDA on Titanic Dataset", course: "AI & Machine Learning", module: "Python Foundations", dueDate: "2026-03-10", status: "Submitted", grade: "A", score: 92, feedback: "Excellent analysis! Good use of visualizations. Consider adding more statistical tests.", submittedDate: "2026-03-09", language: "python" },
  { id: 2, title: "Linear Algebra Problem Set", course: "AI & Machine Learning", module: "Mathematics for ML", dueDate: "2026-03-18", status: "Graded", grade: "A+", score: 98, feedback: "Perfect understanding of eigenvalue decomposition.", submittedDate: "2026-03-17", language: "python" },
  { id: 3, title: "Build ML Pipeline with Scikit-learn", course: "AI & Machine Learning", module: "ML Fundamentals", dueDate: "2026-04-05", status: "Pending", grade: null, score: null, feedback: null, submittedDate: null, language: "python" },
  { id: 4, title: "CNN Image Classifier", course: "AI & Machine Learning", module: "Deep Learning", dueDate: "2026-04-20", status: "Locked", grade: null, score: null, feedback: null, submittedDate: null, language: "python" },
];

const lmsAssessments = [
  { id: 1, title: "Python Fundamentals Quiz", course: "AI & Machine Learning", module: "Python Foundations", type: "MCQ", questions: 25, duration: "30 min", status: "Completed", score: 88, totalMarks: 100, date: "2026-03-05", passingScore: 60 },
  { id: 2, title: "Math Foundations Assessment", course: "AI & Machine Learning", module: "Mathematics for ML", type: "MCQ + Numerical", questions: 35, duration: "60 min", status: "Completed", score: 92, totalMarks: 100, date: "2026-03-20", passingScore: 60 },
  { id: 3, title: "ML Algorithms Mid-term", course: "AI & Machine Learning", module: "ML Fundamentals", type: "MCQ + Coding", questions: 20, duration: "90 min", status: "Upcoming", score: null, totalMarks: 100, date: "2026-04-10", passingScore: 60 },
  { id: 4, title: "Deep Learning Assessment", course: "AI & Machine Learning", module: "Deep Learning", type: "Coding Challenge", questions: 10, duration: "120 min", status: "Locked", score: null, totalMarks: 100, date: "2026-05-01", passingScore: 60 },
];

const lmsProjects = [
  { id: 1, title: "Sentiment Analysis Web App", course: "AI & Machine Learning", description: "Build a sentiment analysis tool using BERT that classifies movie reviews as positive/negative. Deploy with Flask and create a web interface.", techStack: ["Python", "TensorFlow", "Flask", "HTML/CSS"], githubUrl: "https://github.com/student/sentiment-analyzer", status: "In Progress", progress: 45, mentor: "Dr. Ramesh K.", deadline: "2026-05-15", milestones: [
    { name: "Data Collection & Preprocessing", status: "completed" },
    { name: "Model Training (BERT fine-tuning)", status: "completed" },
    { name: "API Development (Flask)", status: "in_progress" },
    { name: "Frontend Development", status: "pending" },
    { name: "Deployment & Documentation", status: "pending" },
  ]},
  { id: 2, title: "Real-time Object Detection", course: "AI & Machine Learning", description: "Implement YOLOv8 for real-time object detection on video streams. Support custom object training.", techStack: ["Python", "PyTorch", "OpenCV", "Streamlit"], githubUrl: "", status: "Not Started", progress: 0, mentor: "Dr. Ramesh K.", deadline: "2026-06-30", milestones: [
    { name: "Research & Dataset Preparation", status: "pending" },
    { name: "YOLOv8 Training", status: "pending" },
    { name: "Real-time Inference Pipeline", status: "pending" },
    { name: "Streamlit Dashboard", status: "pending" },
    { name: "Documentation & Demo Video", status: "pending" },
  ]},
];

const lmsDiscussions = [
  { id: 1, title: "Best approach for handling imbalanced datasets?", author: "Sneha Reddy", course: "AI & Machine Learning", replies: 12, likes: 8, date: "2026-03-29", tags: ["ML", "Data Preprocessing"] },
  { id: 2, title: "TensorFlow vs PyTorch - which to learn first?", author: "Rohan Gupta", course: "AI & Machine Learning", replies: 23, likes: 15, date: "2026-03-28", tags: ["Deep Learning", "Framework"] },
  { id: 3, title: "How to optimize hyperparameters efficiently?", author: "Priyanka S.", course: "AI & Machine Learning", replies: 7, likes: 5, date: "2026-03-27", tags: ["ML", "Optimization"] },
  { id: 4, title: "Study group for Math Module?", author: "Arun Kumar", course: "AI & Machine Learning", replies: 18, likes: 11, date: "2026-03-26", tags: ["Study Group", "Mathematics"] },
  { id: 5, title: "Share your EDA notebooks!", author: "Divya Lakshmi", course: "AI & Machine Learning", replies: 9, likes: 6, date: "2026-03-25", tags: ["Python", "EDA"] },
];

const leaderboard = [
  { rank: 1, name: "Meera Joshi", score: 2840, assignments: 12, assessments: 5, streak: 45, badge: "Gold" },
  { rank: 2, name: "Sneha Reddy", score: 2650, assignments: 11, assessments: 5, streak: 38, badge: "Gold" },
  { rank: 3, name: "Priyanka S.", score: 2480, assignments: 10, assessments: 4, streak: 32, badge: "Silver" },
  { rank: 4, name: "Divya Lakshmi", score: 2320, assignments: 10, assessments: 4, streak: 28, badge: "Silver" },
  { rank: 5, name: "Arun Kumar", score: 2150, assignments: 9, assessments: 4, streak: 22, badge: "Bronze" },
  { rank: 6, name: "Rohan Gupta", score: 1890, assignments: 7, assessments: 3, streak: 15, badge: "Bronze" },
];

const weeklyActivityData = [
  { day: "Mon", hours: 3.5, lessons: 2 }, { day: "Tue", hours: 2.0, lessons: 1 },
  { day: "Wed", hours: 4.0, lessons: 3 }, { day: "Thu", hours: 1.5, lessons: 1 },
  { day: "Fri", hours: 3.0, lessons: 2 }, { day: "Sat", hours: 5.0, lessons: 4 },
  { day: "Sun", hours: 2.5, lessons: 2 },
];

const codeTemplates = {
  python: `# AI & Machine Learning - Code Lab
# Write your Python code here

import numpy as np
import pandas as pd

# Example: Create a simple dataset
data = {
    'feature1': np.random.randn(100),
    'feature2': np.random.randn(100),
    'target': np.random.randint(0, 2, 100)
}
df = pd.DataFrame(data)

print("Dataset shape:", df.shape)
print("\\nFirst 5 rows:")
print(df.head())
print("\\nStatistics:")
print(df.describe())
`,
  javascript: `// Full Stack Development - Code Lab
// Write your JavaScript code here

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  filter(predicate) {
    return new DataProcessor(this.data.filter(predicate));
  }

  map(transform) {
    return new DataProcessor(this.data.map(transform));
  }

  summary() {
    return { count: this.data.length, data: this.data };
  }
}

const students = [
  { name: "Sneha", course: "AI", score: 92 },
  { name: "Arun", course: "FullStack", score: 85 },
  { name: "Meera", course: "AI", score: 98 },
];

const result = new DataProcessor(students)
  .filter(s => s.score > 90)
  .summary();

console.log("High scorers:", JSON.stringify(result, null, 2));
`,
  sql: `-- Data Science - SQL Lab
-- Practice SQL queries here

-- Create a sample students table
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  course TEXT,
  score INTEGER,
  enrolled_date DATE
);

-- Insert sample data
INSERT INTO students VALUES (1, 'Sneha Reddy', 'AI & ML', 92, '2026-02-15');
INSERT INTO students VALUES (2, 'Arun Kumar', 'Full Stack', 85, '2025-10-01');
INSERT INTO students VALUES (3, 'Meera Joshi', 'Data Science', 98, '2025-09-15');

-- Query: Top performers
SELECT name, course, score
FROM students
WHERE score > 90
ORDER BY score DESC;
`,
  bash: `#!/bin/bash
# DevOps / Cloud - Shell Scripting Lab

echo "=== System Information ==="
echo "Hostname: $(hostname)"
echo "OS: $(uname -s)"
echo "Date: $(date)"

echo ""
echo "=== Docker Status ==="
# docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"

echo ""
echo "=== Disk Usage ==="
df -h | head -5

echo ""
echo "=== Memory Usage ==="
free -m 2>/dev/null || echo "Memory info not available"
`,
};

const sampleQuizQuestions = [
  { id: 1, question: "Which of the following is NOT a supervised learning algorithm?", options: ["Linear Regression", "K-Means Clustering", "Random Forest", "Logistic Regression"], correct: 1, explanation: "K-Means is an unsupervised clustering algorithm. It groups data without labeled outputs." },
  { id: 2, question: "What does the 'learning rate' control in gradient descent?", options: ["The number of features", "The size of steps toward the minimum", "The number of training epochs", "The batch size"], correct: 1, explanation: "Learning rate determines how big each step is when updating weights during gradient descent optimization." },
  { id: 3, question: "Which activation function is commonly used in the output layer for binary classification?", options: ["ReLU", "Tanh", "Sigmoid", "Softmax"], correct: 2, explanation: "Sigmoid squashes output between 0 and 1, making it ideal for binary classification probabilities." },
  { id: 4, question: "What is the purpose of regularization in machine learning?", options: ["Speed up training", "Prevent overfitting", "Increase model complexity", "Reduce training data needed"], correct: 1, explanation: "Regularization adds a penalty term to prevent the model from fitting noise in the training data (overfitting)." },
  { id: 5, question: "In a confusion matrix, what does 'recall' measure?", options: ["True positives / (True positives + False positives)", "True positives / (True positives + False negatives)", "True negatives / Total predictions", "Correct predictions / Total predictions"], correct: 1, explanation: "Recall (sensitivity) measures the proportion of actual positives that were correctly identified." },
];

// ===== MAIN LMS MODULE =====
export default function LMSModule({ showToast }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCourse] = useState(lmsCourses[0]);
  const [expandedModule, setExpandedModule] = useState(3);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Code Lab state
  const [codeLanguage, setCodeLanguage] = useState("python");
  const [codeContent, setCodeContent] = useState(codeTemplates.python);
  const [codeOutput, setCodeOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // Coding Lab + AI Tutor state
  const [codingLabActive, setCodingLabActive] = useState(false);
  const [codingTasks, setCodingTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [labCode, setLabCode] = useState("");
  const [labOutput, setLabOutput] = useState("");
  const [labRunning, setLabRunning] = useState(false);
  const [labSubmitting, setLabSubmitting] = useState(false);
  const [labPoints, setLabPoints] = useState(0);
  const [labRightTab, setLabRightTab] = useState("editor"); // editor | videos | references
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [testResults, setTestResults] = useState(null);
  const [showTaskPanel, setShowTaskPanel] = useState(true);

  const API_BASE = "http://localhost:5000/api/ai-tutor";

  const loadCodingTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/coding-tasks`);
      const data = await res.json();
      if (data.success) {
        setCodingTasks(data.data);
        if (data.data.length > 0) {
          setCurrentTask(data.data[0]);
          setLabCode(data.data[0].starterCode || "");
          setCurrentTaskIndex(0);
        }
      }
    } catch (e) { console.error("Failed to load coding tasks", e); }
  };

  const openCodingLab = (taskId) => {
    setCodingLabActive(true);
    setTestResults(null);
    setLabOutput("");
    setChatMessages([{ type: "tutor", message: "Welcome to the Coding Lab! I'm your AI Tutor. I'll help you work through this task step by step. Feel free to ask me anything — whether you need a hint, want me to explain a concept, or help debug your code.", timestamp: new Date().toISOString() }]);
    setHintIndex(0);
    setLabPoints(0);
    if (codingTasks.length === 0) {
      loadCodingTasks().then(() => {
        if (taskId) {
          const idx = codingTasks.findIndex(t => t.id === taskId);
          if (idx >= 0) { setCurrentTask(codingTasks[idx]); setLabCode(codingTasks[idx].starterCode || ""); setCurrentTaskIndex(idx); }
        }
      });
    } else if (taskId) {
      const idx = codingTasks.findIndex(t => t.id === taskId);
      if (idx >= 0) { setCurrentTask(codingTasks[idx]); setLabCode(codingTasks[idx].starterCode || ""); setCurrentTaskIndex(idx); }
    }
  };

  const runLabCode = async () => {
    if (!labCode.trim()) return;
    setLabRunning(true);
    setLabOutput("Running...\n");
    try {
      const res = await fetch(`${API_BASE}/code/run`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: labCode, language: currentTask?.language || "python" }) });
      const data = await res.json();
      if (data.success) { setLabOutput(data.output || "No output"); }
      else { setLabOutput(`Error: ${data.error || "Execution failed"}`); }
    } catch (e) { setLabOutput("Error: Could not connect to server"); }
    setLabRunning(false);
  };

  const submitLabCode = async () => {
    if (!currentTask || !labCode.trim()) return;
    setLabSubmitting(true);
    setTestResults(null);
    try {
      const res = await fetch(`${API_BASE}/coding-tasks/${currentTask.id}/submit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: labCode, language: currentTask.language }) });
      const data = await res.json();
      setTestResults(data);
      if (data.passed === data.total) { setLabPoints(prev => prev + (currentTask.points || 20)); showToast(`All tests passed! +${currentTask.points || 20} points`); }
      else { showToast(`${data.passed}/${data.total} tests passed. Keep trying!`); }
    } catch (e) { showToast("Submission failed"); }
    setLabSubmitting(false);
  };

  const getHint = async () => {
    if (!currentTask) return;
    if (currentTask.hints && hintIndex < currentTask.hints.length) {
      const hint = currentTask.hints[hintIndex];
      setChatMessages(prev => [...prev, { type: "tutor", message: `💡 Hint ${hintIndex + 1}/${currentTask.hints.length}: ${hint}`, timestamp: new Date().toISOString() }]);
      setHintIndex(prev => prev + 1);
    } else {
      setChatMessages(prev => [...prev, { type: "tutor", message: "You've used all available hints for this task. Try reviewing the concepts or ask me a specific question!", timestamp: new Date().toISOString() }]);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || chatSending) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { type: "user", message: msg, timestamp: new Date().toISOString() }]);
    setChatSending(true);
    try {
      const res = await fetch(`${API_BASE}/ai-tutor/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: msg, taskId: currentTask?.id, code: labCode, language: currentTask?.language }) });
      const data = await res.json();
      if (data.success) {
        setChatMessages(prev => [...prev, { type: "tutor", message: data.reply, suggestions: data.suggestions, timestamp: new Date().toISOString() }]);
      }
    } catch (e) { setChatMessages(prev => [...prev, { type: "tutor", message: "Sorry, I'm having trouble connecting. Please try again.", timestamp: new Date().toISOString() }]); }
    setChatSending(false);
  };

  const skipTask = () => {
    if (currentTaskIndex < codingTasks.length - 1) {
      const nextIdx = currentTaskIndex + 1;
      setCurrentTask(codingTasks[nextIdx]);
      setLabCode(codingTasks[nextIdx].starterCode || "");
      setCurrentTaskIndex(nextIdx);
      setTestResults(null);
      setLabOutput("");
      setHintIndex(0);
      setChatMessages(prev => [...prev, { type: "tutor", message: `Moving to the next task: "${codingTasks[nextIdx].title}". Let me know if you need help!`, timestamp: new Date().toISOString() }]);
    } else { showToast("This is the last task!"); }
  };

  // Assessment state
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Discussion state
  const [newDiscussion, setNewDiscussion] = useState("");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "curriculum", label: "Curriculum", icon: BookOpen },
    { id: "codelab", label: "Code Lab", icon: Terminal },
    { id: "assignments", label: "Assignments", icon: FileCode },
    { id: "assessments", label: "Assessments", icon: ListChecks },
    { id: "projects", label: "Projects", icon: GitBranch },
    { id: "discussions", label: "Discussions", icon: MessageCircle },
    { id: "resources", label: "Resources", icon: Download },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "certificates", label: "Certificates", icon: Award },
  ];

  const CourseIcon = courseIcons[selectedCourse.name] || Brain;
  const courseColor = courseColors[selectedCourse.name] || "#4F46E5";

  const totalLessons = selectedCourse.modules.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = selectedCourse.modules.reduce((s, m) => s + m.lessons.filter(l => l.status === "completed").length, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  const runCode = () => {
    setIsRunning(true);
    setCodeOutput("Running...\n");
    setTimeout(() => {
      if (codeLanguage === "python") {
        setCodeOutput(`$ python main.py\nDataset shape: (100, 3)\n\nFirst 5 rows:\n   feature1  feature2  target\n0    0.4967    -0.1383       1\n1   -0.1383     0.6477       0\n2    0.6477    -0.2342       1\n3    1.5230    -0.2342       0\n4   -0.2342    -0.4695       1\n\nStatistics:\n       feature1  feature2     target\ncount  100.0000  100.0000  100.00000\nmean     0.0594    0.0376    0.49000\nstd      0.9873    1.0184    0.50252\nmin     -2.5529   -2.3015    0.00000\nmax      2.3876    2.7509    1.00000\n\n✅ Execution completed in 0.34s`);
      } else if (codeLanguage === "javascript") {
        setCodeOutput(`$ node main.js\nHigh scorers: {\n  "count": 2,\n  "data": [\n    { "name": "Sneha", "course": "AI", "score": 92 },\n    { "name": "Meera", "course": "AI", "score": 98 }\n  ]\n}\n\n✅ Execution completed in 0.12s`);
      } else if (codeLanguage === "sql") {
        setCodeOutput(`$ sqlite3 < query.sql\nname          | course       | score\n--------------+--------------+------\nMeera Joshi   | Data Science | 98\nSneha Reddy   | AI & ML      | 92\n\n2 rows returned\n\n✅ Execution completed in 0.08s`);
      } else {
        setCodeOutput(`$ bash script.sh\n=== System Information ===\nHostname: rooman-lab\nOS: Linux\nDate: Tue Mar 31 10:30:00 IST 2026\n\n=== Disk Usage ===\nFilesystem  Size  Used  Avail  Use%\n/dev/sda1    50G   23G    27G   46%\n\n✅ Execution completed in 0.21s`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const openLesson = (lesson) => { setSelectedLesson(lesson); setModalType("lesson"); setShowModal(true); };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${courseColor}20` }}>
            <CourseIcon size={22} style={{ color: courseColor }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Learning Management System</h2>
            <p className="text-sm text-gray-500">{selectedCourse.name} · {selectedCourse.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{overallProgress}% Complete</p>
            <p className="text-xs text-gray-500">{completedLessons}/{totalLessons} lessons</p>
          </div>
          <div className="w-32"><LProgress value={overallProgress} color={overallProgress >= 80 ? "green" : "indigo"} /></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-6 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <Flame size={16} className="mx-auto text-orange-500 mb-1" /><p className="text-lg font-bold text-gray-900">38</p><p className="text-xs text-gray-500">Day Streak</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <Clock size={16} className="mx-auto text-blue-500 mb-1" /><p className="text-lg font-bold text-gray-900">21.5h</p><p className="text-xs text-gray-500">This Week</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <FileCode size={16} className="mx-auto text-green-500 mb-1" /><p className="text-lg font-bold text-gray-900">{lmsAssignments.filter(a => a.status === "Submitted" || a.status === "Graded").length}/{lmsAssignments.length}</p><p className="text-xs text-gray-500">Assignments</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <ListChecks size={16} className="mx-auto text-purple-500 mb-1" /><p className="text-lg font-bold text-gray-900">{lmsAssessments.filter(a => a.status === "Completed").length}/{lmsAssessments.length}</p><p className="text-xs text-gray-500">Assessments</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <Trophy size={16} className="mx-auto text-yellow-500 mb-1" /><p className="text-lg font-bold text-gray-900">#2</p><p className="text-xs text-gray-500">Leaderboard</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
          <Star size={16} className="mx-auto text-indigo-500 mb-1" /><p className="text-lg font-bold text-gray-900">2650</p><p className="text-xs text-gray-500">XP Points</p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1.5 px-3 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              <tab.icon size={14} />{tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {/* ===== DASHBOARD ===== */}
          {activeTab === "dashboard" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {/* Continue Learning */}
                <div className="col-span-2 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Continue Learning</h4>
                  {selectedCourse.modules.filter(m => m.status === "in_progress").map(m => {
                    const nextLesson = m.lessons.find(l => l.status === "in_progress" || l.status === "locked");
                    return nextLesson ? (
                      <div key={m.id} className="border border-indigo-200 bg-indigo-50/50 rounded-lg p-4 cursor-pointer hover:bg-indigo-50" onClick={() => openLesson(nextLesson)}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-indigo-600 font-medium">{m.title}</p>
                            <p className="text-sm font-medium text-gray-900 mt-1">Day {nextLesson.day}: {nextLesson.title}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">{nextLesson.type === "video" ? <PlayCircle size={12} /> : <FileCode size={12} />}{nextLesson.type}</span>
                              <span className="flex items-center gap-1"><Clock size={12} />{nextLesson.duration}</span>
                            </div>
                          </div>
                          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-1"><Play size={14} /> Continue</button>
                        </div>
                      </div>
                    ) : null;
                  })}
                  {/* Weekly Activity */}
                  <h4 className="text-sm font-semibold text-gray-700 pt-2">Weekly Activity</h4>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={weeklyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#4F46E5" name="Hours" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Sidebar */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700">Upcoming</h4>
                  {[
                    { title: "ML Algorithms Mid-term", date: "Apr 10", type: "Assessment", icon: ListChecks, color: "red" },
                    { title: "ML Pipeline Assignment Due", date: "Apr 5", type: "Assignment", icon: FileCode, color: "orange" },
                    { title: "Live Session: CNN Deep Dive", date: "Apr 3", type: "Live Class", icon: Video, color: "blue" },
                    { title: "Project Milestone 3 Due", date: "Apr 15", type: "Project", icon: GitBranch, color: "purple" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${item.color}-100`}><item.icon size={14} className={`text-${item.color}-600`} /></div>
                      <div><p className="text-sm font-medium text-gray-800">{item.title}</p><p className="text-xs text-gray-500">{item.date} · {item.type}</p></div>
                    </div>
                  ))}
                  <h4 className="text-sm font-semibold text-gray-700 pt-2">Announcements</h4>
                  {[
                    { text: "New batch of GPU servers available for deep learning assignments", time: "2 hrs ago" },
                    { text: "Guest lecture by Dr. Andrew Ng on Reinforcement Learning - April 12", time: "1 day ago" },
                  ].map((a, i) => (
                    <div key={i} className="p-2.5 bg-yellow-50 border border-yellow-100 rounded-lg">
                      <p className="text-xs text-gray-700">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== CURRICULUM ===== */}
          {activeTab === "curriculum" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">{selectedCourse.modules.length} modules · {totalLessons} lessons · {overallProgress}% complete</p>
              </div>
              {selectedCourse.modules.map(mod => (
                <div key={mod.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${mod.status === "completed" ? "bg-green-100 text-green-700" : mod.status === "in_progress" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"}`}>
                        {mod.status === "completed" ? <Check size={16} /> : mod.id}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{mod.title}</p>
                        <p className="text-xs text-gray-500">{mod.days} · {mod.lessons.length} lessons</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <LBadge color={mod.status === "completed" ? "green" : mod.status === "in_progress" ? "blue" : "gray"}>{mod.status === "completed" ? "Completed" : mod.status === "in_progress" ? "In Progress" : "Locked"}</LBadge>
                      {expandedModule === mod.id ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                    </div>
                  </button>
                  {expandedModule === mod.id && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                      {mod.lessons.map(lesson => (
                        <div key={lesson.id} onClick={() => lesson.status !== "locked" && openLesson(lesson)} className={`flex items-center justify-between px-6 py-3 border-b border-gray-100 last:border-0 ${lesson.status === "locked" ? "opacity-50" : "hover:bg-white cursor-pointer"}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${lesson.status === "completed" ? "bg-green-500 text-white" : lesson.status === "in_progress" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                              {lesson.status === "completed" ? <Check size={12} /> : lesson.status === "locked" ? <Lock size={12} /> : <CircleDot size={12} />}
                            </div>
                            <div>
                              <p className="text-sm text-gray-800"><span className="text-gray-400 mr-2">Day {lesson.day}</span>{lesson.title}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  {lesson.type === "video" && <><PlayCircle size={10} /> Video</>}
                                  {lesson.type === "assignment" && <><FileCode size={10} /> Assignment</>}
                                  {lesson.type === "assessment" && <><ListChecks size={10} /> Assessment</>}
                                  {lesson.type === "project" && <><GitBranch size={10} /> Project</>}
                                </span>
                                <span className="text-xs text-gray-400">{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                          {lesson.status !== "locked" && <ChevronRight size={14} className="text-gray-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ===== CODE LAB (Rooman-style with AI Tutor) ===== */}
          {activeTab === "codelab" && !codingLabActive && (
            <div className="space-y-4">
              {/* Quick Practice Section - original code lab */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Quick Practice Editor</h4>
                  <p className="text-xs text-gray-500">Free-form code editor for practice</p>
                </div>
                <button onClick={() => { openCodingLab(); loadCodingTasks(); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                  <Rocket size={14} /> Open Coding Lab with AI Tutor
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select value={codeLanguage} onChange={(e) => { setCodeLanguage(e.target.value); setCodeContent(codeTemplates[e.target.value]); setCodeOutput(""); }} className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
                    <option value="python">Python 3.11</option>
                    <option value="javascript">JavaScript (Node.js)</option>
                    <option value="sql">SQL (SQLite)</option>
                    <option value="bash">Bash / Shell</option>
                  </select>
                  <LBadge color="green">Ready</LBadge>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setCodeContent(codeTemplates[codeLanguage]); setCodeOutput(""); }} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RotateCcw size={14} /> Reset</button>
                  <button onClick={runCode} disabled={isRunning} className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-1.5">
                    {isRunning ? <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Running...</> : <><Play size={14} /> Run Code</>}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 text-gray-300 px-3 py-1.5 text-xs flex items-center justify-between">
                    <span>main.{codeLanguage === "python" ? "py" : codeLanguage === "javascript" ? "js" : codeLanguage === "sql" ? "sql" : "sh"}</span>
                    <button onClick={() => { navigator.clipboard?.writeText(codeContent); showToast("Code copied!"); }} className="hover:text-white"><Copy size={12} /></button>
                  </div>
                  <textarea value={codeContent} onChange={(e) => setCodeContent(e.target.value)} className="w-full h-[350px] bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none" spellCheck="false" />
                </div>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 text-gray-300 px-3 py-1.5 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1"><Terminal size={12} /> Output</span>
                    <button onClick={() => setCodeOutput("")} className="hover:text-white text-xs">Clear</button>
                  </div>
                  <pre className="w-full h-[350px] bg-gray-950 text-gray-300 font-mono text-sm p-4 overflow-auto whitespace-pre-wrap">{codeOutput || "Click 'Run Code' to execute your program."}</pre>
                </div>
              </div>

              {/* Coding Tasks Section */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2"><Brain size={16} className="text-indigo-600" /> Coding Challenges with AI Tutor</h4>
                <div className="grid grid-cols-3 gap-3">
                  {(codingTasks.length > 0 ? codingTasks : [
                    { id: 1, title: "Java Countdown Timer", language: "java", difficulty: "Easy", points: 20, category: "Loops" },
                    { id: 2, title: "Python List Filter", language: "python", difficulty: "Easy", points: 20, category: "Functions" },
                    { id: 3, title: "JS Product Catalog", language: "javascript", difficulty: "Medium", points: 30, category: "Objects" },
                    { id: 4, title: "SQL Revenue Report", language: "sql", difficulty: "Medium", points: 30, category: "Aggregation" },
                    { id: 5, title: "Python ML Preprocessing", language: "python", difficulty: "Hard", points: 50, category: "ML" },
                  ]).map(task => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer" onClick={() => { loadCodingTasks(); openCodingLab(task.id); }}>
                      <div className="flex items-center justify-between mb-2">
                        <LBadge color={task.difficulty === "Easy" ? "green" : task.difficulty === "Medium" ? "yellow" : "red"}>{task.difficulty}</LBadge>
                        <span className="text-xs font-medium text-indigo-600">{task.points} pts</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{task.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <LBadge color="indigo">{task.language?.toUpperCase()}</LBadge>
                        <span className="text-xs text-gray-500">{task.category}</span>
                      </div>
                      <button className="mt-3 w-full bg-indigo-50 text-indigo-600 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-100 flex items-center justify-center gap-1"><Rocket size={12} /> Start Challenge</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== CODING LAB - Full Screen with AI Tutor (Rooman Style) ===== */}
          {activeTab === "codelab" && codingLabActive && (
            <div className="space-y-0 -m-4">
              {/* Top Bar */}
              <div className="bg-gray-900 text-white px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setCodingLabActive(false)} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm"><ChevronLeft size={16} /> Back</button>
                  <div className="w-px h-5 bg-gray-700"></div>
                  <Brain size={18} className="text-indigo-400" />
                  <span className="text-sm font-medium">Coding Lab</span>
                  {currentTask && <LBadge color="indigo">{currentTask.language?.toUpperCase()}</LBadge>}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Target size={14} className="text-yellow-400" />
                    <span>Tasks {codingTasks.length}</span>
                    <span className="text-gray-500">|</span>
                    <span>{currentTask?.points || 20} pts</span>
                  </div>
                  <div className="bg-indigo-600/30 border border-indigo-500/50 px-3 py-1 rounded-lg text-sm font-medium text-indigo-300">
                    <Trophy size={14} className="inline mr-1" />{labPoints} pts
                  </div>
                </div>
              </div>

              {/* Split Panel */}
              <div className="flex" style={{ height: "calc(100vh - 320px)", minHeight: "500px" }}>
                {/* LEFT PANEL: AI Tutor + Task */}
                <div className="w-[400px] border-r border-gray-200 flex flex-col bg-gray-50">
                  {/* Task Card */}
                  {showTaskPanel && currentTask && (
                    <div className="border-b border-gray-200 bg-white p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-900">{currentTask.title}</h4>
                        <button onClick={() => setShowTaskPanel(false)} className="text-gray-400 hover:text-gray-600"><ChevronDown size={14} /></button>
                      </div>
                      <div className="flex items-center gap-2">
                        <LBadge color={currentTask.difficulty === "Easy" ? "green" : currentTask.difficulty === "Medium" ? "yellow" : "red"}>{currentTask.difficulty}</LBadge>
                        <LBadge color="indigo">{currentTask.category}</LBadge>
                        <span className="text-xs text-gray-500">Task {currentTaskIndex + 1}/{codingTasks.length}</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">Objective</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{currentTask.objective}</p>
                      </div>
                      {currentTask.constraints && currentTask.constraints.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-700 mb-1">Constraints</p>
                          <ul className="text-xs text-gray-600 space-y-0.5">
                            {currentTask.constraints.map((c, i) => <li key={i} className="flex items-start gap-1"><span className="text-indigo-500 mt-0.5">•</span>{c}</li>)}
                          </ul>
                        </div>
                      )}
                      {/* Test Results */}
                      {testResults && (
                        <div className={`rounded-lg p-2.5 text-xs ${testResults.passed === testResults.total ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"}`}>
                          <p className="font-semibold mb-1">{testResults.passed === testResults.total ? "✅ All Tests Passed!" : `⚠️ ${testResults.passed}/${testResults.total} Tests Passed`}</p>
                          {testResults.results?.map((r, i) => (
                            <div key={i} className="flex items-center gap-1.5 mt-0.5">
                              {r.passed ? <CheckCircle size={10} className="text-green-500" /> : <AlertCircle size={10} className="text-red-500" />}
                              <span className={r.passed ? "text-green-700" : "text-red-700"}>{r.testCase}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {!showTaskPanel && (
                    <button onClick={() => setShowTaskPanel(true)} className="bg-white border-b border-gray-200 px-4 py-2 text-xs text-indigo-600 hover:bg-indigo-50 flex items-center gap-1"><ChevronRight size={12} /> Show Task Details</button>
                  )}

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-sm ${msg.type === "user" ? "bg-indigo-600 text-white rounded-br-md" : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"}`}>
                          {msg.type === "tutor" && <div className="flex items-center gap-1.5 mb-1.5"><Brain size={12} className="text-indigo-600" /><span className="text-xs font-semibold text-indigo-600">AI Tutor</span></div>}
                          <p className="whitespace-pre-line text-xs leading-relaxed">{msg.message}</p>
                          {msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {msg.suggestions.map((s, j) => (
                                <button key={j} onClick={() => { setChatInput(s); }} className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 border border-indigo-200">{s}</button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {chatSending && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 shadow-sm">
                          <div className="flex items-center gap-2"><div className="flex gap-1"><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:"0.1s"}}></div><div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:"0.2s"}}></div></div><span className="text-xs text-gray-400">AI Tutor is thinking...</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-gray-200 bg-white p-3 space-y-2">
                    <div className="flex gap-2">
                      <button onClick={getHint} className="flex-1 bg-yellow-50 border border-yellow-300 text-yellow-700 py-2 rounded-lg text-xs font-medium hover:bg-yellow-100 flex items-center justify-center gap-1"><Lightbulb size={12} /> Give a Hint</button>
                      <button onClick={submitLabCode} disabled={labSubmitting} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-1">
                        {labSubmitting ? <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div></> : <><CheckCircle size={12} /> Evaluate & Submit</>}
                      </button>
                    </div>
                    <button onClick={skipTask} className="w-full border border-gray-300 text-gray-600 py-1.5 rounded-lg text-xs hover:bg-gray-50 flex items-center justify-center gap-1"><ChevronRight size={12} /> Skip Task</button>
                    {/* Chat Input */}
                    <div className="flex gap-2">
                      <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChatMessage(); } }} placeholder="Ask AI Tutor a question..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-indigo-500" />
                      <button onClick={sendChatMessage} disabled={chatSending || !chatInput.trim()} className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"><MessageCircle size={14} /></button>
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL: Code Editor + Console */}
                <div className="flex-1 flex flex-col">
                  {/* Tab Bar: Editor / Videos / References */}
                  <div className="flex items-center justify-between bg-gray-100 border-b border-gray-200 px-2">
                    <div className="flex">
                      {[{ id: "editor", label: "EDITOR", icon: Code }, { id: "videos", label: "VIDEOS", icon: Video }, { id: "references", label: "REFERENCES", icon: BookOpen }].map(tab => (
                        <button key={tab.id} onClick={() => setLabRightTab(tab.id)} className={`flex items-center gap-1 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${labRightTab === tab.id ? "border-indigo-600 text-indigo-600 bg-white" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                          <tab.icon size={12} />{tab.label}
                        </button>
                      ))}
                    </div>
                    {labRightTab === "editor" && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white bg-indigo-600 px-2 py-0.5 rounded">{(currentTask?.language || "python").toUpperCase()}</span>
                        <button onClick={() => setLabCode(currentTask?.starterCode || "")} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"><RotateCcw size={11} /> CLEAR</button>
                        <button onClick={runLabCode} disabled={labRunning} className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-1">
                          {labRunning ? <div className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Play size={11} />} RUN
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Editor Content */}
                  {labRightTab === "editor" && (
                    <div className="flex-1 flex flex-col">
                      <textarea value={labCode} onChange={(e) => setLabCode(e.target.value)} className="flex-1 bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none" spellCheck="false" placeholder="// Write your code here..." />
                      {/* Console */}
                      <div className="border-t border-gray-700">
                        <div className="bg-gray-800 text-gray-300 px-3 py-1.5 text-xs flex items-center justify-between">
                          <span className="flex items-center gap-1 font-medium"><Terminal size={12} /> CONSOLE</span>
                          <button onClick={() => setLabOutput("")} className="hover:text-white text-[10px]">Clear</button>
                        </div>
                        <pre className="h-[120px] bg-gray-950 text-gray-300 font-mono text-xs p-3 overflow-auto whitespace-pre-wrap">{labOutput || "// Output will appear here after running your code"}</pre>
                      </div>
                    </div>
                  )}

                  {/* Videos Tab */}
                  {labRightTab === "videos" && (
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      <p className="text-sm text-gray-500">Related video tutorials for this task</p>
                      {[
                        { title: `${currentTask?.language || "Programming"} - Getting Started`, duration: "12:30", instructor: "Dr. Ramesh K." },
                        { title: `${currentTask?.category || "Concepts"} Deep Dive`, duration: "18:45", instructor: "Prof. Lakshmi S." },
                        { title: `Common Mistakes in ${currentTask?.language || "Coding"}`, duration: "8:15", instructor: "Dr. Ramesh K." },
                        { title: "Problem Solving Strategies", duration: "15:00", instructor: "Prof. Lakshmi S." },
                      ].map((v, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => showToast(`Playing: ${v.title}`)}>
                          <div className="w-20 h-14 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0"><PlayCircle size={24} className="text-white/70" /></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{v.title}</p>
                            <p className="text-xs text-gray-500">{v.instructor} · {v.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* References Tab */}
                  {labRightTab === "references" && (
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      <p className="text-sm text-gray-500">Documentation and reference materials</p>
                      {[
                        { title: `${currentTask?.language || "Programming"} Official Documentation`, type: "Docs", icon: Globe },
                        { title: `${currentTask?.category || "Topic"} - Cheat Sheet`, type: "PDF", icon: FileText },
                        { title: "Algorithm Complexity Reference", type: "Guide", icon: BookOpen },
                        { title: "Code Style Guidelines", type: "Guide", icon: FileCode },
                        { title: "Common Design Patterns", type: "Article", icon: Layers },
                      ].map((r, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => showToast(`Opening: ${r.title}`)}>
                          <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center"><r.icon size={18} className="text-indigo-600" /></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{r.title}</p>
                            <p className="text-xs text-gray-500">{r.type}</p>
                          </div>
                          <ExternalLink size={14} className="text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===== ASSIGNMENTS ===== */}
          {activeTab === "assignments" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between"><p className="text-sm text-gray-500">{lmsAssignments.length} assignments</p></div>
              {lmsAssignments.map(a => (
                <div key={a.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{a.title}</p>
                        <LBadge color={a.status === "Graded" ? "green" : a.status === "Submitted" ? "blue" : a.status === "Pending" ? "yellow" : "gray"}>{a.status}</LBadge>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{a.module} · Due: {a.dueDate}</p>
                    </div>
                    <div className="text-right">
                      {a.score !== null && <p className="text-lg font-bold" style={{ color: a.score >= 90 ? "#10B981" : a.score >= 70 ? "#3B82F6" : "#F59E0B" }}>{a.score}/100</p>}
                      {a.grade && <LBadge color={a.grade.startsWith("A") ? "green" : "blue"}>{a.grade}</LBadge>}
                    </div>
                  </div>
                  {a.feedback && <div className="bg-green-50 border border-green-100 rounded-lg p-3 mt-2"><p className="text-xs text-green-800"><span className="font-medium">Mentor Feedback:</span> {a.feedback}</p></div>}
                  <div className="flex gap-2 mt-3">
                    {a.status === "Pending" && <button onClick={() => { setActiveTab("codelab"); loadCodingTasks(); openCodingLab(); showToast("Coding Lab with AI Tutor opened for assignment"); }} className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 flex items-center gap-1"><Rocket size={12} /> Open in Coding Lab</button>}
                    {a.status === "Pending" && <button onClick={() => showToast("Upload submission")} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 flex items-center gap-1"><Upload size={12} /> Upload File</button>}
                    {(a.status === "Submitted" || a.status === "Graded") && <button onClick={() => showToast("Viewing submission")} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 flex items-center gap-1"><Eye size={12} /> View Submission</button>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== ASSESSMENTS ===== */}
          {activeTab === "assessments" && !quizActive && (
            <div className="space-y-3">
              {lmsAssessments.map(a => (
                <div key={a.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2"><p className="text-sm font-medium text-gray-900">{a.title}</p><LBadge color={a.status === "Completed" ? "green" : a.status === "Upcoming" ? "yellow" : "gray"}>{a.status}</LBadge></div>
                      <p className="text-xs text-gray-500 mt-1">{a.module} · {a.type} · {a.questions} questions · {a.duration}</p>
                    </div>
                    <div className="text-right">
                      {a.score !== null && (
                        <div><p className="text-lg font-bold" style={{ color: a.score >= 90 ? "#10B981" : a.score >= 70 ? "#3B82F6" : "#F59E0B" }}>{a.score}%</p><p className="text-xs text-gray-400">Pass: {a.passingScore}%</p></div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {a.status === "Upcoming" && <button onClick={() => { setQuizActive(true); setCurrentQuestion(0); setSelectedAnswers({}); setQuizSubmitted(false); }} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-indigo-700 flex items-center gap-1"><Play size={12} /> Start Assessment</button>}
                    {a.status === "Completed" && <button onClick={() => showToast("Reviewing answers")} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 flex items-center gap-1"><Eye size={12} /> Review Answers</button>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Quiz */}
          {activeTab === "assessments" && quizActive && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button onClick={() => setQuizActive(false)} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><ChevronLeft size={14} /> Back</button>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Question {currentQuestion + 1}/{sampleQuizQuestions.length}</span>
                  <LProgress value={currentQuestion + 1} max={sampleQuizQuestions.length} />
                  <span className="flex items-center gap-1 text-sm text-orange-600"><Timer size={14} /> 28:45</span>
                </div>
              </div>
              {!quizSubmitted ? (
                <div className="border border-gray-200 rounded-lg p-6">
                  <p className="text-base font-medium text-gray-900 mb-4">{sampleQuizQuestions[currentQuestion].question}</p>
                  <div className="space-y-2">
                    {sampleQuizQuestions[currentQuestion].options.map((opt, i) => (
                      <button key={i} onClick={() => setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: i })} className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${selectedAnswers[currentQuestion] === i ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border mr-3 text-xs font-medium">{String.fromCharCode(65 + i)}</span>{opt}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6">
                    <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50">Previous</button>
                    {currentQuestion < sampleQuizQuestions.length - 1 ? (
                      <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Next</button>
                    ) : (
                      <button onClick={() => setQuizSubmitted(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Submit Assessment</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
                  <h3 className="text-lg font-bold text-gray-900">Assessment Submitted!</h3>
                  <p className="text-sm text-gray-500 mt-1">Your score: {Math.round(Object.keys(selectedAnswers).filter(k => selectedAnswers[k] === sampleQuizQuestions[k].correct).length / sampleQuizQuestions.length * 100)}%</p>
                  <p className="text-xs text-gray-400 mt-2">{Object.keys(selectedAnswers).filter(k => selectedAnswers[k] === sampleQuizQuestions[k].correct).length}/{sampleQuizQuestions.length} correct answers</p>
                  <div className="mt-4 space-y-2 text-left">
                    {sampleQuizQuestions.map((q, i) => (
                      <div key={i} className={`p-3 rounded-lg text-sm ${selectedAnswers[i] === q.correct ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                        <p className="font-medium">{selectedAnswers[i] === q.correct ? "✓" : "✗"} Q{i + 1}: {q.question}</p>
                        {selectedAnswers[i] !== q.correct && <p className="text-xs mt-1 text-gray-600">Correct: {q.options[q.correct]} — {q.explanation}</p>}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setQuizActive(false)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">Back to Assessments</button>
                </div>
              )}
            </div>
          )}

          {/* ===== PROJECTS ===== */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              {lmsProjects.map(p => (
                <div key={p.id} className="border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2"><p className="text-base font-semibold text-gray-900">{p.title}</p><LBadge color={p.status === "In Progress" ? "blue" : "gray"}>{p.status}</LBadge></div>
                      <p className="text-sm text-gray-500 mt-1">{p.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-3">{p.techStack.map(t => <LBadge key={t} color="indigo">{t}</LBadge>)}</div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Users size={12} /> Mentor: {p.mentor}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> Deadline: {p.deadline}</span>
                    {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline"><GitBranch size={12} /> GitHub Repo</a>}
                  </div>
                  <div className="flex items-center gap-2 mb-3"><div className="flex-1"><LProgress value={p.progress} color={p.progress >= 80 ? "green" : "indigo"} /></div><span className="text-xs font-medium text-gray-600">{p.progress}%</span></div>
                  <h5 className="text-xs font-semibold text-gray-700 mb-2">Milestones</h5>
                  <div className="space-y-1.5">
                    {p.milestones.map((m, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${m.status === "completed" ? "bg-green-500 text-white" : m.status === "in_progress" ? "bg-indigo-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                          {m.status === "completed" ? <Check size={10} /> : m.status === "in_progress" ? <CircleDot size={8} /> : <Lock size={8} />}
                        </div>
                        <span className={`text-sm ${m.status === "completed" ? "text-gray-500 line-through" : "text-gray-700"}`}>{m.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {!p.githubUrl && <button onClick={() => showToast("Connect GitHub repository")} className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800 flex items-center gap-1"><GitBranch size={12} /> Connect GitHub</button>}
                    <button onClick={() => { setActiveTab("codelab"); loadCodingTasks(); openCodingLab(); showToast("Coding Lab opened for project"); }} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 flex items-center gap-1"><Rocket size={12} /> Open in Coding Lab</button>
                    {p.githubUrl && <button onClick={() => showToast("Opening pull request")} className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 flex items-center gap-1"><GitPullRequest size={12} /> Create PR</button>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== DISCUSSIONS ===== */}
          {activeTab === "discussions" && (
            <div className="space-y-3">
              <div className="flex gap-2"><input value={newDiscussion} onChange={(e) => setNewDiscussion(e.target.value)} placeholder="Start a new discussion..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm" /><button onClick={() => { if (newDiscussion.trim()) { showToast("Discussion posted!"); setNewDiscussion(""); } }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-1"><MessageSquarePlus size={14} /> Post</button></div>
              {lmsDiscussions.map(d => (
                <div key={d.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer" onClick={() => showToast(`Opening discussion: ${d.title}`)}>
                  <p className="text-sm font-medium text-gray-900">{d.title}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{d.author}</span>
                    <span>{d.date}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={10} />{d.replies} replies</span>
                    <span className="flex items-center gap-1"><Star size={10} />{d.likes}</span>
                  </div>
                  <div className="flex gap-1 mt-2">{d.tags.map(t => <LBadge key={t} color="blue">{t}</LBadge>)}</div>
                </div>
              ))}
            </div>
          )}

          {/* ===== RESOURCES ===== */}
          {activeTab === "resources" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Downloadable materials, cheat sheets, and reference guides.</p>
              {[
                { category: "Cheat Sheets", items: [
                  { name: "Python Cheat Sheet", size: "2.4 MB", type: "PDF", icon: FileText },
                  { name: "NumPy & Pandas Quick Reference", size: "1.8 MB", type: "PDF", icon: FileText },
                  { name: "ML Algorithms Comparison", size: "3.1 MB", type: "PDF", icon: FileText },
                  { name: "TensorFlow/Keras API Guide", size: "4.2 MB", type: "PDF", icon: FileText },
                ]},
                { category: "Datasets", items: [
                  { name: "Titanic Dataset (Training)", size: "58 KB", type: "CSV", icon: Database },
                  { name: "Boston Housing Dataset", size: "35 KB", type: "CSV", icon: Database },
                  { name: "MNIST Handwritten Digits", size: "11 MB", type: "ZIP", icon: Folder },
                  { name: "IMDB Movie Reviews (NLP)", size: "25 MB", type: "ZIP", icon: Folder },
                ]},
                { category: "Notebooks & Code", items: [
                  { name: "Module 1-3 Jupyter Notebooks", size: "8.5 MB", type: "ZIP", icon: FileCode },
                  { name: "ML Project Starter Template", size: "1.2 MB", type: "ZIP", icon: FileCode },
                  { name: "Docker + MLOps Boilerplate", size: "3.4 MB", type: "ZIP", icon: Terminal },
                ]},
                { category: "Recommended Reading", items: [
                  { name: "Deep Learning by Ian Goodfellow (Chapter Links)", size: "-", type: "Link", icon: ExternalLink },
                  { name: "Scikit-learn Official Documentation", size: "-", type: "Link", icon: ExternalLink },
                  { name: "Stanford CS229 Lecture Notes", size: "-", type: "Link", icon: ExternalLink },
                ]},
              ].map((cat, i) => (
                <div key={i}>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">{cat.category}</h4>
                  <div className="space-y-1">
                    {cat.items.map((item, j) => (
                      <div key={j} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2"><item.icon size={14} className="text-indigo-500" /><span className="text-sm text-gray-700">{item.name}</span><span className="text-xs text-gray-400">{item.size}</span></div>
                        <button onClick={() => showToast(`Downloading ${item.name}`)} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">{item.type === "Link" ? <><ExternalLink size={10} /> Open</> : <><Download size={10} /> Download</>}</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== LEADERBOARD ===== */}
          {activeTab === "leaderboard" && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Top performers in {selectedCourse.name}</p>
              {leaderboard.map(s => (
                <div key={s.rank} className={`flex items-center justify-between p-4 rounded-lg ${s.rank <= 3 ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50 border border-gray-200"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${s.rank === 1 ? "bg-yellow-400 text-white" : s.rank === 2 ? "bg-gray-300 text-white" : s.rank === 3 ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-600"}`}>
                      {s.rank <= 3 ? <Trophy size={18} /> : `#${s.rank}`}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{s.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                        <span>{s.assignments} assignments</span>
                        <span>{s.assessments} assessments</span>
                        <span className="flex items-center gap-1"><Flame size={10} className="text-orange-500" />{s.streak} day streak</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">{s.score.toLocaleString()} XP</p>
                    <LBadge color={s.badge === "Gold" ? "yellow" : s.badge === "Silver" ? "gray" : "orange"}>{s.badge}</LBadge>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== CERTIFICATES ===== */}
          {activeTab === "certificates" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Earn certificates by completing modules and assessments.</p>
              {[
                { name: "Python Foundations for AI", status: "Earned", date: "2026-03-12", id: "CERT-PY-2026-001", credlyUrl: "#" },
                { name: "Mathematics for Machine Learning", status: "Earned", date: "2026-03-25", id: "CERT-MATH-2026-002", credlyUrl: "#" },
                { name: "Machine Learning Fundamentals", status: "In Progress", date: null, id: null, progress: 60 },
                { name: "Deep Learning & Neural Networks", status: "Locked", date: null, id: null },
                { name: "MLOps & Deployment", status: "Locked", date: null, id: null },
                { name: "AI & Machine Learning - Full Course Certificate", status: "Locked", date: null, id: null },
              ].map((c, i) => (
                <div key={i} className={`border rounded-lg p-4 ${c.status === "Earned" ? "border-green-200 bg-green-50/50" : c.status === "In Progress" ? "border-indigo-200" : "border-gray-200 opacity-60"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.status === "Earned" ? "bg-green-100" : c.status === "In Progress" ? "bg-indigo-100" : "bg-gray-100"}`}>
                        {c.status === "Earned" ? <Award size={20} className="text-green-600" /> : c.status === "In Progress" ? <CircleDot size={20} className="text-indigo-600" /> : <Lock size={20} className="text-gray-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{c.name}</p>
                        {c.id && <p className="text-xs text-gray-500">Certificate ID: {c.id} · Issued: {c.date}</p>}
                        {c.progress && <div className="flex items-center gap-2 mt-1"><div className="w-24"><LProgress value={c.progress} /></div><span className="text-xs text-gray-500">{c.progress}%</span></div>}
                      </div>
                    </div>
                    {c.status === "Earned" && (
                      <div className="flex gap-2">
                        <button onClick={() => showToast("Downloading certificate")} className="text-xs text-indigo-600 hover:underline flex items-center gap-1"><Download size={12} /> Download</button>
                        <button onClick={() => showToast("Sharing to LinkedIn")} className="text-xs text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={12} /> Share</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== LESSON MODAL ===== */}
      <LModal isOpen={showModal && modalType === "lesson"} onClose={() => setShowModal(false)} title={selectedLesson ? `Day ${selectedLesson.day}: ${selectedLesson.title}` : ""} wide>
        {selectedLesson && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LBadge color={selectedLesson.type === "video" ? "blue" : selectedLesson.type === "assignment" ? "purple" : "orange"}>{selectedLesson.type}</LBadge>
              <span className="text-sm text-gray-500 flex items-center gap-1"><Clock size={14} /> {selectedLesson.duration}</span>
              <LBadge color={selectedLesson.status === "completed" ? "green" : "yellow"}>{selectedLesson.status}</LBadge>
            </div>
            {/* Video Player Placeholder */}
            {selectedLesson.type === "video" && (
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="text-center">
                  <PlayCircle size={64} className="mx-auto text-white/80 mb-2" />
                  <p className="text-white/60 text-sm">Video: {selectedLesson.title}</p>
                  <p className="text-white/40 text-xs mt-1">{selectedLesson.duration}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800/80 px-4 py-2 flex items-center gap-3">
                  <button className="text-white"><Play size={16} /></button>
                  <div className="flex-1 bg-gray-600 rounded-full h-1"><div className="bg-indigo-500 h-1 rounded-full" style={{ width: selectedLesson.status === "completed" ? "100%" : "35%" }}></div></div>
                  <span className="text-white text-xs">{selectedLesson.duration}</span>
                </div>
              </div>
            )}
            {/* Notes */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"><FileText size={14} /> Lesson Notes</h4>
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-line leading-relaxed">{selectedLesson.notes}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => showToast("Marked as complete!")} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 flex items-center justify-center gap-1"><Check size={14} /> Mark Complete</button>
              <button onClick={() => { setShowModal(false); setActiveTab("codelab"); showToast("Practice in Code Lab"); }} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-center gap-1"><Terminal size={14} /> Practice in Code Lab</button>
              <button onClick={() => showToast("Notes bookmarked!")} className="px-4 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50"><Bookmark size={14} /></button>
            </div>
          </div>
        )}
      </LModal>
    </div>
  );
}
