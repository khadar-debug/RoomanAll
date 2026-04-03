import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Users, BookOpen, GraduationCap, TrendingUp, DollarSign, Mail, Phone,
  Calendar, Search, Bell, Settings, ChevronDown, ChevronRight, Plus,
  Filter, MoreVertical, Edit, Trash2, Eye, X, Check, Star, Clock,
  Target, Award, Briefcase, MessageSquare, BarChart2, PieChart as PieIcon,
  Home, UserPlus, Layers, FileText, Send, Zap, Globe, ArrowUp, ArrowDown,
  CheckCircle, AlertCircle, XCircle, RefreshCw, Download, Upload,
  Share2, Hash, AtSign,
  Image, Video, Heart, Repeat, ThumbsUp, ThumbsDown, TrendingDown,
  Megaphone, Rss, Link, ExternalLink, LayoutGrid, CalendarDays,
  MessageCircle, Inbox, BarChart3, PenTool, Camera, Tv, Newspaper, Building2,
  Headphones, Monitor, FormInput, Smartphone, BellRing, PhoneCall, MessagesSquare, Plug, Code, ShieldCheck, LogIn, UserCircle
} from "lucide-react";
import LMSModule from "./LMS.jsx";
import LMSAdminModule from "./LMSAdmin.jsx";
import MarketingPlannerModule from "./MarketingPlanner.jsx";
import SocialMediaModule from "./SocialMedia.jsx";

// ===== SAMPLE DATA =====
const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4", "#F97316"];

const initialLeads = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 9876543210", source: "Website", course: "Full Stack Development", status: "New", score: 85, assignedTo: "Priya M.", date: "2026-03-28", city: "Bangalore" },
  { id: 2, name: "Anitha K.", email: "anitha.k@yahoo.com", phone: "+91 9123456789", source: "Social Media", course: "Data Science", status: "Contacted", score: 72, assignedTo: "Vikram S.", date: "2026-03-27", city: "Chennai" },
  { id: 3, name: "Mohammed Faisal", email: "faisal.m@outlook.com", phone: "+91 8765432109", source: "Referral", course: "Cloud Computing", status: "Qualified", score: 91, assignedTo: "Priya M.", date: "2026-03-26", city: "Hyderabad" },
  { id: 4, name: "Sneha Reddy", email: "sneha.r@gmail.com", phone: "+91 7654321098", source: "Walk-in", course: "AI & ML", status: "Enrolled", score: 95, assignedTo: "Deepak R.", date: "2026-03-25", city: "Bangalore" },
  { id: 5, name: "Arjun Nair", email: "arjun.n@gmail.com", phone: "+91 6543210987", source: "Website", course: "Cyber Security", status: "New", score: 68, assignedTo: "Vikram S.", date: "2026-03-29", city: "Kochi" },
  { id: 6, name: "Pooja Patel", email: "pooja.p@gmail.com", phone: "+91 9988776655", source: "Education Fair", course: "Full Stack Development", status: "Contacted", score: 78, assignedTo: "Priya M.", date: "2026-03-24", city: "Mumbai" },
  { id: 7, name: "Karthik V.", email: "karthik.v@gmail.com", phone: "+91 8877665544", source: "Google Ads", course: "Data Science", status: "Negotiation", score: 88, assignedTo: "Deepak R.", date: "2026-03-23", city: "Bangalore" },
  { id: 8, name: "Divya Lakshmi", email: "divya.l@gmail.com", phone: "+91 7766554433", source: "Referral", course: "Cloud Computing", status: "Enrolled", score: 93, assignedTo: "Vikram S.", date: "2026-03-22", city: "Hyderabad" },
];

const initialStudents = [
  { id: 1, name: "Sneha Reddy", email: "sneha.r@gmail.com", phone: "+91 7654321098", course: "AI & ML", batch: "AI-B12", startDate: "2026-02-15", endDate: "2026-08-15", status: "Active", progress: 45, fees: 85000, paid: 60000, mentor: "Dr. Ramesh K." },
  { id: 2, name: "Divya Lakshmi", email: "divya.l@gmail.com", phone: "+91 7766554433", course: "Cloud Computing", batch: "CC-B8", startDate: "2026-01-10", endDate: "2026-07-10", status: "Active", progress: 62, fees: 75000, paid: 75000, mentor: "Suresh P." },
  { id: 3, name: "Arun Kumar", email: "arun.k@gmail.com", phone: "+91 9900112233", course: "Full Stack Development", batch: "FSD-B15", startDate: "2025-10-01", endDate: "2026-04-01", status: "Active", progress: 85, fees: 90000, paid: 90000, mentor: "Lakshmi N." },
  { id: 4, name: "Meera Joshi", email: "meera.j@gmail.com", phone: "+91 8811223344", course: "Data Science", batch: "DS-B10", startDate: "2025-09-15", endDate: "2026-03-15", status: "Completed", progress: 100, fees: 80000, paid: 80000, mentor: "Dr. Ramesh K." },
  { id: 5, name: "Rohan Gupta", email: "rohan.g@gmail.com", phone: "+91 7722334455", course: "Cyber Security", batch: "CS-B6", startDate: "2026-03-01", endDate: "2026-09-01", status: "Active", progress: 15, fees: 70000, paid: 35000, mentor: "Vikash T." },
  { id: 6, name: "Priyanka S.", email: "priyanka.s@gmail.com", phone: "+91 6633445566", course: "AI & ML", batch: "AI-B12", startDate: "2026-02-15", endDate: "2026-08-15", status: "Active", progress: 42, fees: 85000, paid: 85000, mentor: "Dr. Ramesh K." },
];

const initialCourses = [
  { id: 1, name: "Full Stack Development", duration: "6 months", fee: 90000, students: 145, batches: 15, rating: 4.7, status: "Active", category: "Development", modules: 24 },
  { id: 2, name: "Data Science", duration: "6 months", fee: 80000, students: 120, batches: 10, rating: 4.8, status: "Active", category: "Analytics", modules: 20 },
  { id: 3, name: "AI & Machine Learning", duration: "6 months", fee: 85000, students: 98, batches: 12, rating: 4.6, status: "Active", category: "AI", modules: 22 },
  { id: 4, name: "Cloud Computing", duration: "6 months", fee: 75000, students: 87, batches: 8, rating: 4.5, status: "Active", category: "Cloud", modules: 18 },
  { id: 5, name: "Cyber Security", duration: "6 months", fee: 70000, students: 65, batches: 6, rating: 4.4, status: "Active", category: "Security", modules: 16 },
  { id: 6, name: "DevOps Engineering", duration: "4 months", fee: 65000, students: 54, batches: 5, rating: 4.3, status: "Active", category: "DevOps", modules: 14 },
];

const initialDeals = [
  { id: 1, name: "TCS Corporate Training - 50 seats", contact: "Rajiv Menon", email: "rajiv@tcs.com", value: 4500000, stage: "Proposal", probability: 60, course: "Cloud Computing", closeDate: "2026-04-15", owner: "Vikram S." },
  { id: 2, name: "Infosys Upskilling Program", contact: "Meera Iyer", email: "meera@infosys.com", value: 3200000, stage: "Negotiation", probability: 75, course: "AI & ML", closeDate: "2026-04-10", owner: "Priya M." },
  { id: 3, name: "Wipro Fresher Training", contact: "Sunil Rao", email: "sunil@wipro.com", value: 2800000, stage: "Qualification", probability: 40, course: "Full Stack Development", closeDate: "2026-05-01", owner: "Deepak R." },
  { id: 4, name: "HCL Cyber Security Batch", contact: "Kavitha N.", email: "kavitha@hcl.com", value: 1800000, stage: "Closed Won", probability: 100, course: "Cyber Security", closeDate: "2026-03-20", owner: "Vikram S." },
  { id: 5, name: "Accenture Data Analytics", contact: "Pradeep K.", email: "pradeep@accenture.com", value: 5500000, stage: "Proposal", probability: 55, course: "Data Science", closeDate: "2026-04-25", owner: "Priya M." },
  { id: 6, name: "Cognizant DevOps Training", contact: "Anil Sharma", email: "anil@cognizant.com", value: 2100000, stage: "Closed Lost", probability: 0, course: "DevOps Engineering", closeDate: "2026-03-15", owner: "Deepak R." },
];

const initialCampaigns = [
  { id: 1, name: "March Enrollment Drive", type: "Email + Social", status: "Active", startDate: "2026-03-01", endDate: "2026-03-31", budget: 150000, spent: 98000, leads: 245, conversions: 38, roi: 320 },
  { id: 2, name: "AI Course Launch", type: "Google Ads", status: "Active", startDate: "2026-03-10", endDate: "2026-04-10", budget: 200000, spent: 75000, leads: 180, conversions: 22, roi: 250 },
  { id: 3, name: "Corporate Outreach Q1", type: "Email", status: "Completed", startDate: "2026-01-15", endDate: "2026-02-28", budget: 80000, spent: 80000, leads: 45, conversions: 8, roi: 540 },
  { id: 4, name: "College Partnership Drive", type: "Events", status: "Active", startDate: "2026-03-15", endDate: "2026-04-30", budget: 120000, spent: 45000, leads: 320, conversions: 0, roi: 0 },
  { id: 5, name: "Referral Program", type: "Referral", status: "Active", startDate: "2026-01-01", endDate: "2026-06-30", budget: 100000, spent: 62000, leads: 156, conversions: 48, roi: 415 },
];

const initialTickets = [
  { id: "TKT-001", subject: "Unable to access LMS portal", student: "Sneha Reddy", priority: "High", status: "Open", category: "Technical", created: "2026-03-29", assignedTo: "Tech Support", description: "Student reports 404 error when accessing course materials on the LMS platform." },
  { id: "TKT-002", subject: "Request for batch transfer", student: "Arun Kumar", priority: "Medium", status: "In Progress", category: "Academic", created: "2026-03-28", assignedTo: "Academic Team", description: "Student wants to transfer from FSD-B15 weekday batch to a weekend batch." },
  { id: "TKT-003", subject: "Fee payment receipt not received", student: "Rohan Gupta", priority: "Low", status: "Open", category: "Finance", created: "2026-03-28", assignedTo: "Finance Team", description: "Payment of ₹35,000 was made on March 1 but receipt has not been emailed." },
  { id: "TKT-004", subject: "Certificate not generated", student: "Meera Joshi", priority: "High", status: "Resolved", category: "Academic", created: "2026-03-25", assignedTo: "Academic Team", description: "Course completed on March 15 but certificate has not been generated." },
  { id: "TKT-005", subject: "Placement assistance query", student: "Priyanka S.", priority: "Medium", status: "Open", category: "Placement", created: "2026-03-29", assignedTo: "Placement Cell", description: "Requesting information about upcoming placement drives and partner companies." },
];

const revenueData = [
  { month: "Oct", revenue: 2800000, enrollments: 45 },
  { month: "Nov", revenue: 3200000, enrollments: 52 },
  { month: "Dec", revenue: 2600000, enrollments: 38 },
  { month: "Jan", revenue: 3800000, enrollments: 61 },
  { month: "Feb", revenue: 4200000, enrollments: 68 },
  { month: "Mar", revenue: 4800000, enrollments: 75 },
];

const courseDistribution = [
  { name: "Full Stack Dev", value: 145 }, { name: "Data Science", value: 120 },
  { name: "AI & ML", value: 98 }, { name: "Cloud", value: 87 },
  { name: "Cyber Security", value: 65 }, { name: "DevOps", value: 54 },
];

const leadSourceData = [
  { name: "Website", value: 35 }, { name: "Google Ads", value: 25 },
  { name: "Social Media", value: 18 }, { name: "Referrals", value: 12 },
  { name: "Walk-in", value: 6 }, { name: "Events", value: 4 },
];

const pipelineStages = ["New", "Contacted", "Qualified", "Negotiation", "Enrolled"];
const dealStages = ["Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];
const courseNames = ["Full Stack Development", "Data Science", "AI & Machine Learning", "Cloud Computing", "Cyber Security", "DevOps Engineering"];
const batchList = ["FSD-B16", "DS-B11", "AI-B13", "CC-B9", "CS-B7", "DO-B6"];
const mentorList = ["Dr. Ramesh K.", "Suresh P.", "Lakshmi N.", "Vikash T.", "Anil M."];
const counsellors = ["Priya M.", "Vikram S.", "Deepak R."];

// ===== SOCIAL MEDIA SAMPLE DATA =====
// Social media data removed - connect real accounts via Social Media module

// ===== UTILITY COMPONENTS =====
const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800", green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800", red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800", gray: "bg-gray-100 text-gray-700",
    indigo: "bg-indigo-100 text-indigo-800", pink: "bg-pink-100 text-pink-800",
    orange: "bg-orange-100 text-orange-800",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.blue}`}>{children}</span>;
};

const StatusBadge = ({ status }) => {
  const map = {
    "New": "blue", "Contacted": "yellow", "Qualified": "purple", "Negotiation": "orange",
    "Enrolled": "green", "Active": "green", "Completed": "indigo", "Closed Won": "green",
    "Closed Lost": "red", "Open": "yellow", "In Progress": "blue", "Resolved": "green",
    "High": "red", "Medium": "yellow", "Low": "green", "Proposal": "purple", "Qualification": "blue",
    "Paused": "gray", "Inactive": "gray",
  };
  return <Badge color={map[status] || "gray"}>{status}</Badge>;
};

const ProgressBar = ({ value, max = 100, color = "indigo" }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div className="h-2 rounded-full transition-all" style={{ width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color === "indigo" ? "#4F46E5" : color === "green" ? "#10B981" : color === "blue" ? "#3B82F6" : color === "red" ? "#EF4444" : "#4F46E5" }}></div>
  </div>
);

const Modal = ({ isOpen, onClose, title, children, wide }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className={`bg-white rounded-xl shadow-2xl ${wide ? "w-full max-w-3xl" : "w-full max-w-lg"} max-h-[90vh] overflow-auto mx-4`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl z-10">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, change, changeType, color = "indigo", subtitle }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="p-2.5 rounded-lg" style={{ backgroundColor: color === "indigo" ? "#EEF2FF" : color === "green" ? "#ECFDF5" : color === "yellow" ? "#FFFBEB" : color === "blue" ? "#EFF6FF" : color === "purple" ? "#F5F3FF" : color === "pink" ? "#FDF2F8" : "#EEF2FF" }}>
        <Icon size={22} style={{ color: color === "indigo" ? "#4F46E5" : color === "green" ? "#10B981" : color === "yellow" ? "#F59E0B" : color === "blue" ? "#3B82F6" : color === "purple" ? "#8B5CF6" : color === "pink" ? "#EC4899" : "#4F46E5" }} />
      </div>
      {change && (
        <span className={`flex items-center text-xs font-medium ${changeType === "up" ? "text-green-600" : "text-red-600"}`}>
          {changeType === "up" ? <ArrowUp size={14} /> : <ArrowDown size={14} />} {change}
        </span>
      )}
    </div>
    <div className="mt-3">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

const InputField = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <FormField label={label}>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none" />
  </FormField>
);

const SelectField = ({ label, value, onChange, options }) => (
  <FormField label={label}>
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none bg-white">
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </FormField>
);

const TextAreaField = ({ label, value, onChange, rows = 3 }) => (
  <FormField label={label}>
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-indigo-300 focus:border-indigo-300 outline-none resize-none" />
  </FormField>
);

const SubmitButton = ({ onClick, label }) => (
  <button onClick={onClick} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">{label}</button>
);

const SuccessToast = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 z-[60] bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
    <CheckCircle size={18} /> <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2"><X size={16} /></button>
  </div>
);

// ===== MAIN APPLICATION =====
export default function RoomanCRM() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [leads, setLeads] = useState(initialLeads);
  const [students, setStudents] = useState(initialStudents);
  const [courses, setCourses] = useState(initialCourses);
  const [deals, setDeals] = useState(initialDeals);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [tickets, setTickets] = useState(initialTickets);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const modules = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "leads", label: "Leads", icon: UserPlus },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "deals", label: "Deals & Pipeline", icon: Briefcase },
    { id: "campaigns", label: "Campaigns", icon: Send },
    { id: "marketing-planner", label: "Marketing Planner", icon: Target },
    { id: "social", label: "Social Media", icon: Share2 },
    { id: "tickets", label: "Support Tickets", icon: MessageSquare },
    { id: "analytics", label: "Analytics & Reports", icon: BarChart2 },
    { id: "automation", label: "Automation", icon: Zap },
    { id: "lms", label: "LMS", icon: Monitor },
    { id: "lms-admin", label: "LMS Admin", icon: Settings },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const notifications = [
    { id: 1, text: "New lead: Rahul Sharma registered via website", time: "2 min ago", read: false },
    { id: 2, text: "Deal 'TCS Corporate Training' moved to Proposal", time: "1 hr ago", read: false },
    { id: 3, text: "Ticket TKT-001 escalated to High priority", time: "3 hrs ago", read: true },
    { id: 4, text: "Campaign 'March Enrollment Drive' hit 200 leads", time: "5 hrs ago", read: true },
    { id: 5, text: "Student Meera Joshi completed Data Science course", time: "1 day ago", read: true },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {toast && <SuccessToast message={toast} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? "w-16" : "w-60"} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "px-5"} h-16 border-b border-gray-200`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><GraduationCap size={18} className="text-white" /></div>
              <div><h1 className="text-base font-bold text-gray-900">Rooman CRM</h1><p className="text-[10px] text-gray-400 -mt-0.5">Education Platform</p></div>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded hover:bg-gray-100 ${sidebarCollapsed ? "" : "ml-auto"}`}>
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} className="rotate-90" />}
          </button>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {modules.map(mod => (
            <button key={mod.id} onClick={() => setActiveModule(mod.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${activeModule === mod.id ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} ${sidebarCollapsed ? "justify-center px-2" : ""}`}>
              <mod.icon size={19} />
              {!sidebarCollapsed && <span>{mod.label}</span>}
            </button>
          ))}
        </nav>
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-indigo-50 rounded-lg p-3">
              <p className="text-xs font-medium text-indigo-800">Quick Stats</p>
              <p className="text-lg font-bold text-indigo-900 mt-1">{students.length}</p>
              <p className="text-[11px] text-indigo-600">Active students</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 relative">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-md flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search leads, students, courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 relative" onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}>
              <Bell size={19} /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100" onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">M</div>
              <span className="text-sm text-gray-700">Manish</span>
            </button>
          </div>
          {showNotifications && (
            <div className="absolute right-16 top-14 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-sm">Notifications</h3>
                <span className="text-xs text-indigo-600 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!n.read ? "bg-indigo-50/30" : ""}`}>
                    <p className="text-sm text-gray-700">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showProfile && (
            <div className="absolute right-4 top-14 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-medium text-sm">Manish</p><p className="text-xs text-gray-500">ceo@rooman.net</p>
              </div>
              <div className="py-1">
                {["My Profile", "Account Settings", "Team Management", "Billing"].map(item => (
                  <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{item}</button>
                ))}
              </div>
              <div className="border-t border-gray-100 py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6" onClick={() => { setShowNotifications(false); setShowProfile(false); }}>
          {activeModule === "dashboard" && <DashboardModule setActiveModule={setActiveModule} leads={leads} students={students} />}
          {activeModule === "leads" && <LeadsModule leads={leads} setLeads={setLeads} showToast={showToast} courses={courses} />}
          {activeModule === "students" && <StudentsModule students={students} setStudents={setStudents} showToast={showToast} courses={courses} />}
          {activeModule === "courses" && <CoursesModule courses={courses} setCourses={setCourses} showToast={showToast} />}
          {activeModule === "deals" && <DealsModule deals={deals} setDeals={setDeals} showToast={showToast} courses={courses} />}
          {activeModule === "campaigns" && <CampaignsModule campaigns={campaigns} setCampaigns={setCampaigns} showToast={showToast} />}
          {activeModule === "marketing-planner" && <MarketingPlannerModule showToast={showToast} />}
          {activeModule === "social" && <SocialMediaModule showToast={showToast} />}
          {activeModule === "tickets" && <TicketsModule tickets={tickets} setTickets={setTickets} showToast={showToast} students={students} />}
          {activeModule === "analytics" && <AnalyticsModule />}
          {activeModule === "automation" && <AutomationModule showToast={showToast} />}
          {activeModule === "lms" && <LMSModule showToast={showToast} />}
          {activeModule === "lms-admin" && <LMSAdminModule showToast={showToast} />}
          {activeModule === "settings" && <SettingsModule showToast={showToast} />}
        </main>
      </div>
    </div>
  );
}

// ===== DASHBOARD MODULE =====
function DashboardModule({ setActiveModule, leads, students }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold text-gray-900">Welcome back, Manish</h2><p className="text-sm text-gray-500 mt-1">Here's what's happening at Rooman today</p></div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"><option>Last 30 days</option><option>Last 7 days</option><option>This quarter</option></select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={UserPlus} title="New Leads" value={String(leads.length)} change="18%" changeType="up" color="blue" subtitle="This month" />
        <StatCard icon={GraduationCap} title="Active Students" value={String(students.length)} change="12%" changeType="up" color="green" subtitle={`Across ${new Set(students.map(s=>s.batch)).size} batches`} />
        <StatCard icon={DollarSign} title="Revenue" value="₹48.2L" change="24%" changeType="up" color="indigo" subtitle="This month" />
        <StatCard icon={Target} title="Conversion Rate" value="31.5%" change="3.2%" changeType="up" color="purple" subtitle="Lead to enrollment" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue & Enrollments</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs><linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/><stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip formatter={(v, name) => name === "revenue" ? `₹${(v/100000).toFixed(1)}L` : v} />
              <Area type="monotone" dataKey="revenue" stroke="#4F46E5" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              <Line type="monotone" dataKey="enrollments" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Course Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
              {courseDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {courseDistribution.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }}></span><span className="text-gray-600 truncate">{c.name}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Lead Pipeline</h3>
            <button className="text-xs text-indigo-600 hover:underline" onClick={() => setActiveModule("leads")}>View all</button>
          </div>
          <div className="flex gap-2">
            {pipelineStages.map((stage, i) => {
              const count = leads.filter(l => l.status === stage).length;
              return (<div key={stage} className="flex-1 text-center"><div className="rounded-lg py-4 px-1" style={{ backgroundColor: `${COLORS[i]}15` }}><p className="text-xl font-bold" style={{ color: COLORS[i] }}>{count}</p><p className="text-[10px] text-gray-500 mt-1">{stage}</p></div></div>);
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {[
              { icon: UserPlus, text: "Rahul Sharma added as new lead", time: "2 min ago", color: "#3B82F6" },
              { icon: CheckCircle, text: "Sneha Reddy completed Module 11", time: "1 hr ago", color: "#10B981" },
              { icon: DollarSign, text: "TCS deal moved to Proposal stage", time: "3 hrs ago", color: "#8B5CF6" },
              { icon: Mail, text: "Campaign email sent to 1,200 leads", time: "5 hrs ago", color: "#F59E0B" },
              { icon: Award, text: "Meera Joshi earned Data Science certificate", time: "1 day ago", color: "#EC4899" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg mt-0.5" style={{ backgroundColor: `${a.color}15` }}><a.icon size={14} style={{ color: a.color }} /></div>
                <div className="flex-1 min-w-0"><p className="text-sm text-gray-700">{a.text}</p><p className="text-xs text-gray-400">{a.time}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== LEADS MODULE =====
function LeadsModule({ leads, setLeads, showToast, courses }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const emptyLead = { name: "", email: "", phone: "", source: "Website", course: courses[0]?.name || "", status: "New", city: "" };
  const [newLead, setNewLead] = useState(emptyLead);
  const filtered = leads.filter(l => filterStatus === "All" || l.status === filterStatus);

  const addLead = () => {
    if (!newLead.name || !newLead.email) return;
    setLeads(prev => [...prev, { ...newLead, id: Date.now(), score: Math.floor(Math.random()*30)+60, assignedTo: counsellors[Math.floor(Math.random()*counsellors.length)], date: new Date().toISOString().split("T")[0] }]);
    setNewLead(emptyLead); setModalOpen(null); showToast(`Lead "${newLead.name}" added successfully!`);
  };

  const deleteLead = (id) => { setLeads(prev => prev.filter(l => l.id !== id)); setModalOpen(null); setSelectedItem(null); showToast("Lead deleted successfully"); };

  const convertToStudent = (lead) => {
    setLeads(prev => prev.map(l => l.id === lead.id ? {...l, status: "Enrolled"} : l));
    setModalOpen(null); setSelectedItem(null); showToast(`"${lead.name}" converted to Enrolled!`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Lead Management</h2><p className="text-sm text-gray-500">Track and convert prospective students</p></div>
        <button onClick={() => setModalOpen("addLead")} className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"><Plus size={16} /> Add Lead</button>
      </div>
      {/* Pipeline View */}
      <div className="grid grid-cols-5 gap-3">
        {pipelineStages.map((stage, i) => {
          const stageLeads = leads.filter(l => l.status === stage);
          return (
            <div key={stage} className="bg-white rounded-xl border border-gray-200">
              <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></span><span className="text-sm font-medium text-gray-900">{stage}</span></div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{stageLeads.length}</span>
              </div>
              <div className="p-2 space-y-2 max-h-96 overflow-y-auto">
                {stageLeads.map(lead => (
                  <div key={lead.id} className="p-3 rounded-lg border border-gray-100 hover:border-indigo-200 hover:shadow-sm cursor-pointer transition-all" onClick={() => { setSelectedItem(lead); setModalOpen("viewLead"); }}>
                    <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lead.course}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{lead.city}</span>
                      <div className="flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400" /><span className="text-xs font-medium text-gray-600">{lead.score}</span></div>
                    </div>
                    <div className="mt-2"><ProgressBar value={lead.score} color="indigo" /></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2"><Filter size={15} className="text-gray-400" />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-sm border-0 bg-transparent text-gray-700 outline-none">
              <option value="All">All Leads</option>{pipelineStages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <span className="text-xs text-gray-400">{filtered.length} leads</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{["Name","Course","Source","Score","Status","Assigned","City","Date"].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedItem(lead); setModalOpen("viewLead"); }}>
                  <td className="px-4 py-3"><p className="text-sm font-medium text-gray-900">{lead.name}</p><p className="text-xs text-gray-400">{lead.email}</p></td>
                  <td className="px-4 py-3 text-sm text-gray-700">{lead.course}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{lead.source}</td>
                  <td className="px-4 py-3"><div className="flex items-center gap-1.5"><span className="text-sm font-medium">{lead.score}</span><div className="w-16"><ProgressBar value={lead.score} /></div></div></td>
                  <td className="px-4 py-3"><StatusBadge status={lead.status} /></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{lead.assignedTo}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{lead.city}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* View Lead Modal */}
      <Modal isOpen={modalOpen === "viewLead"} onClose={() => { setModalOpen(null); setSelectedItem(null); }} title="Lead Details" wide>
        {selectedItem && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700">{selectedItem.name[0]}</div>
              <div className="flex-1"><h3 className="text-lg font-semibold text-gray-900">{selectedItem.name}</h3><p className="text-sm text-gray-500">{selectedItem.email} · {selectedItem.phone}</p>
                <div className="flex gap-2 mt-2"><StatusBadge status={selectedItem.status} /><Badge color="indigo">Score: {selectedItem.score}</Badge></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              {[["Course Interest", selectedItem.course],["Source", selectedItem.source],["City", selectedItem.city],["Assigned To", selectedItem.assignedTo],["Created", selectedItem.date],["Lead Score", `${selectedItem.score}/100`]].map(([label, val]) => (
                <div key={label}><p className="text-xs text-gray-500">{label}</p><p className="text-sm font-medium text-gray-900 mt-0.5">{val}</p></div>
              ))}
            </div>
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => convertToStudent(selectedItem)} className="flex-1 bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700">Convert to Enrolled</button>
              <button onClick={() => { setModalOpen(null); showToast("Follow-up scheduled!"); }} className="flex-1 border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50">Schedule Follow-up</button>
              <button onClick={() => deleteLead(selectedItem.id)} className="flex-1 border border-red-200 text-red-600 text-sm py-2 rounded-lg hover:bg-red-50">Delete Lead</button>
            </div>
          </div>
        )}
      </Modal>
      {/* Add Lead Modal */}
      <Modal isOpen={modalOpen === "addLead"} onClose={() => setModalOpen(null)} title="Add New Lead">
        <div className="space-y-4">
          <InputField label="Full Name" value={newLead.name} onChange={v => setNewLead({...newLead, name: v})} placeholder="Enter full name" />
          <InputField label="Email Address" value={newLead.email} onChange={v => setNewLead({...newLead, email: v})} type="email" placeholder="email@example.com" />
          <InputField label="Phone Number" value={newLead.phone} onChange={v => setNewLead({...newLead, phone: v})} type="tel" placeholder="+91 XXXXXXXXXX" />
          <InputField label="City" value={newLead.city} onChange={v => setNewLead({...newLead, city: v})} placeholder="City name" />
          <SelectField label="Course Interest" value={newLead.course} onChange={v => setNewLead({...newLead, course: v})} options={courses.map(c => c.name)} />
          <SelectField label="Lead Source" value={newLead.source} onChange={v => setNewLead({...newLead, source: v})} options={["Website","Social Media","Google Ads","Referral","Walk-in","Education Fair","Partner"]} />
          <SubmitButton onClick={addLead} label="Add Lead" />
        </div>
      </Modal>
    </div>
  );
}

// ===== STUDENTS MODULE =====
function StudentsModule({ students, setStudents, showToast, courses }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([
    { id: "pay_sample1", studentId: 1, studentName: "Sneha Reddy", amount: 30000, method: "UPI", status: "captured", date: "2026-03-15", receipt: "RCT-M1K8A" },
    { id: "pay_sample2", studentId: 1, studentName: "Sneha Reddy", amount: 30000, method: "Card", status: "captured", date: "2026-02-20", receipt: "RCT-L9J7B" },
    { id: "pay_sample3", studentId: 2, studentName: "Divya Lakshmi", amount: 75000, method: "NetBanking", status: "captured", date: "2026-01-12", receipt: "RCT-K8H6C" },
    { id: "pay_sample4", studentId: 5, studentName: "Rohan Gupta", amount: 35000, method: "UPI", status: "captured", date: "2026-03-01", receipt: "RCT-N2L4D" },
  ]);
  const emptyStudent = { name: "", email: "", phone: "", course: courses[0]?.name || "", batch: batchList[0], startDate: "", endDate: "", fees: "", paid: "", mentor: mentorList[0] };
  const [newStudent, setNewStudent] = useState(emptyStudent);

  const API_BASE = "http://localhost:5000/api";

  const addStudent = () => {
    if (!newStudent.name || !newStudent.email) return;
    setStudents(prev => [...prev, { ...newStudent, id: Date.now(), status: "Active", progress: 0, fees: Number(newStudent.fees) || 0, paid: Number(newStudent.paid) || 0 }]);
    setNewStudent(emptyStudent); setModalOpen(null); showToast(`Student "${newStudent.name}" enrolled successfully!`);
  };

  const deleteStudent = (id) => { setStudents(prev => prev.filter(s => s.id !== id)); setModalOpen(null); setSelectedStudent(null); showToast("Student removed"); };

  const collectFee = async (student) => {
    const amount = Number(paymentAmount);
    if (!amount || amount <= 0) { showToast("Please enter a valid amount"); return; }
    if (amount > (student.fees - student.paid)) { showToast("Amount exceeds pending fee balance"); return; }
    setPaymentProcessing(true);
    try {
      // Step 1: Create order on backend
      const orderRes = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, studentName: student.name, studentEmail: student.email, studentPhone: student.phone, studentId: student.id, courseName: student.course }),
      });
      const orderData = await orderRes.json();
      if (!orderData.success) throw new Error(orderData.error);

      // Step 2: Get Razorpay key from backend
      const keyRes = await fetch(`${API_BASE}/payment/key`);
      const keyData = await keyRes.json();

      // Step 3: Open Razorpay checkout
      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Rooman Technologies",
        description: `Fee Payment - ${student.course}`,
        order_id: orderData.order.id,
        prefill: { name: student.name, email: student.email, contact: student.phone },
        notes: { studentId: String(student.id), courseName: student.course },
        theme: { color: "#4F46E5" },
        handler: async function(response) {
          // Step 4: Verify payment on backend
          try {
            const verifyRes = await fetch(`${API_BASE}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              // Update student's paid amount
              setStudents(prev => prev.map(s => s.id === student.id ? { ...s, paid: s.paid + amount } : s));
              setSelectedStudent(prev => prev ? { ...prev, paid: prev.paid + amount } : prev);
              setPaymentHistory(prev => [{ id: verifyData.payment.id, studentId: student.id, studentName: student.name, amount, method: verifyData.payment.method, status: "captured", date: new Date().toISOString().split("T")[0], receipt: `RCT-${Date.now().toString(36).toUpperCase().slice(-5)}` }, ...prev]);
              setPaymentAmount("");
              setModalOpen("viewStudent");
              showToast(`₹${amount.toLocaleString()} payment received from ${student.name}!`);
            } else {
              showToast("Payment verification failed. Contact support.");
            }
          } catch (err) {
            showToast("Payment verification error. Please check with your bank.");
          }
        },
        modal: { ondismiss: () => { setPaymentProcessing(false); showToast("Payment cancelled"); } },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => { showToast(`Payment failed: ${resp.error.description}`); setPaymentProcessing(false); });
      rzp.open();
    } catch (error) {
      showToast(`Payment error: ${error.message}. Make sure the backend server is running.`);
    }
    setPaymentProcessing(false);
  };

  // Offline / manual payment recording
  const recordManualPayment = (student) => {
    const amount = Number(paymentAmount);
    if (!amount || amount <= 0) { showToast("Please enter a valid amount"); return; }
    if (amount > (student.fees - student.paid)) { showToast("Amount exceeds pending fee balance"); return; }
    setStudents(prev => prev.map(s => s.id === student.id ? { ...s, paid: s.paid + amount } : s));
    setSelectedStudent(prev => prev ? { ...prev, paid: prev.paid + amount } : prev);
    setPaymentHistory(prev => [{ id: `manual_${Date.now()}`, studentId: student.id, studentName: student.name, amount, method: "Cash/Cheque", status: "captured", date: new Date().toISOString().split("T")[0], receipt: `RCT-${Date.now().toString(36).toUpperCase().slice(-5)}` }, ...prev]);
    setPaymentAmount("");
    setModalOpen("viewStudent");
    showToast(`₹${amount.toLocaleString()} manual payment recorded for ${student.name}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Student Management</h2><p className="text-sm text-gray-500">Track enrolled students, progress, and certifications</p></div>
        <button onClick={() => setModalOpen("addStudent")} className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"><Plus size={16} /> Enroll Student</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} title="Total Students" value={String(students.length)} change="12%" changeType="up" color="indigo" />
        <StatCard icon={BookOpen} title="Active Batches" value={String(new Set(students.map(s=>s.batch)).size)} color="green" />
        <StatCard icon={Award} title="Completed" value={String(students.filter(s=>s.status==="Completed").length)} color="purple" />
        <StatCard icon={Target} title="Avg Progress" value={`${Math.round(students.reduce((a,s)=>a+s.progress,0)/students.length)}%`} color="blue" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50"><tr>{["Student","Course","Batch","Progress","Fees","Status","Mentor"].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedStudent(s); setModalOpen("viewStudent"); }}>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700">{s.name[0]}</div><div><p className="text-sm font-medium text-gray-900">{s.name}</p><p className="text-xs text-gray-400">{s.email}</p></div></div></td>
                <td className="px-4 py-3 text-sm text-gray-700">{s.course}</td>
                <td className="px-4 py-3"><Badge color="indigo">{s.batch}</Badge></td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-20"><ProgressBar value={s.progress} color={s.progress >= 80 ? "green" : "indigo"} /></div><span className="text-xs font-medium text-gray-600">{s.progress}%</span></div></td>
                <td className="px-4 py-3"><p className="text-sm text-gray-700">₹{(s.paid/1000).toFixed(0)}K / ₹{(s.fees/1000).toFixed(0)}K</p>{s.paid < s.fees && <p className="text-xs text-red-500">₹{((s.fees - s.paid)/1000).toFixed(0)}K due</p>}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3 text-sm text-gray-600">{s.mentor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Student Modal */}
      <Modal isOpen={modalOpen === "viewStudent"} onClose={() => { setModalOpen(null); setSelectedStudent(null); }} title="Student Profile" wide>
        {selectedStudent && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700">{selectedStudent.name[0]}</div>
              <div><h3 className="text-lg font-semibold text-gray-900">{selectedStudent.name}</h3><p className="text-sm text-gray-500">{selectedStudent.email} · {selectedStudent.phone}</p>
                <div className="flex gap-2 mt-2"><StatusBadge status={selectedStudent.status} /><Badge color="indigo">{selectedStudent.batch}</Badge></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-indigo-600">{selectedStudent.progress}%</p><p className="text-xs text-gray-500 mt-1">Course Progress</p><div className="mt-2"><ProgressBar value={selectedStudent.progress} /></div></div>
              <div className="bg-gray-50 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-green-600">₹{(selectedStudent.paid/1000).toFixed(0)}K</p><p className="text-xs text-gray-500 mt-1">Paid of ₹{(selectedStudent.fees/1000).toFixed(0)}K</p><div className="mt-2"><ProgressBar value={selectedStudent.paid} max={selectedStudent.fees} color="green" /></div></div>
              <div className="bg-gray-50 rounded-lg p-4 text-center"><p className="text-lg font-bold text-purple-600">{selectedStudent.mentor}</p><p className="text-xs text-gray-500 mt-1">Assigned Mentor</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              {[["Course", selectedStudent.course],["Batch", selectedStudent.batch],["Start Date", selectedStudent.startDate],["End Date", selectedStudent.endDate]].map(([k,v]) => (
                <div key={k}><p className="text-xs text-gray-500">{k}</p><p className="text-sm font-medium text-gray-900">{v}</p></div>
              ))}
            </div>
            {/* Fee Collection Section */}
            {selectedStudent.paid < selectedStudent.fees && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2"><DollarSign size={16} className="text-amber-600" /><span className="text-sm font-semibold text-amber-800">Pending Fee: ₹{(selectedStudent.fees - selectedStudent.paid).toLocaleString()}</span></div>
                <div className="flex gap-2">
                  <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} placeholder="Enter amount" className="flex-1 border border-amber-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500" />
                  <button onClick={() => { setModalOpen("collectFee"); }} disabled={paymentProcessing} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"><DollarSign size={14} /> Collect Fee</button>
                </div>
              </div>
            )}
            {selectedStudent.paid >= selectedStudent.fees && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /><span className="text-sm font-medium text-green-800">All fees paid in full!</span></div>
            )}
            {/* Payment History for this student */}
            {paymentHistory.filter(p => p.studentId === selectedStudent.id).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Payment History</h4>
                <div className="space-y-1">
                  {paymentHistory.filter(p => p.studentId === selectedStudent.id).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                      <div className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /><span className="font-medium text-gray-800">₹{p.amount.toLocaleString()}</span><Badge color="blue">{p.method}</Badge></div>
                      <div className="flex items-center gap-2"><span className="text-gray-400">{p.date}</span><span className="text-gray-400">{p.receipt}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => { setStudents(prev => prev.map(s => s.id === selectedStudent.id ? {...s, progress: Math.min(s.progress + 10, 100)} : s)); setSelectedStudent(p => ({...p, progress: Math.min(p.progress + 10, 100)})); showToast("Progress updated +10%"); }} className="flex-1 bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700">Update Progress +10%</button>
              <button onClick={() => { setStudents(prev => prev.map(s => s.id === selectedStudent.id ? {...s, status: "Completed", progress: 100} : s)); setModalOpen(null); showToast(`${selectedStudent.name} marked as Completed!`); }} className="flex-1 border border-green-300 text-green-700 text-sm py-2 rounded-lg hover:bg-green-50">Mark Completed</button>
              <button onClick={() => deleteStudent(selectedStudent.id)} className="flex-1 border border-red-200 text-red-600 text-sm py-2 rounded-lg hover:bg-red-50">Remove</button>
            </div>
          </div>
        )}
      </Modal>
      {/* Enroll Student Modal */}
      <Modal isOpen={modalOpen === "addStudent"} onClose={() => setModalOpen(null)} title="Enroll New Student">
        <div className="space-y-4">
          <InputField label="Full Name" value={newStudent.name} onChange={v => setNewStudent({...newStudent, name: v})} placeholder="Student name" />
          <InputField label="Email" value={newStudent.email} onChange={v => setNewStudent({...newStudent, email: v})} type="email" placeholder="email@example.com" />
          <InputField label="Phone" value={newStudent.phone} onChange={v => setNewStudent({...newStudent, phone: v})} type="tel" placeholder="+91 XXXXXXXXXX" />
          <SelectField label="Course" value={newStudent.course} onChange={v => setNewStudent({...newStudent, course: v})} options={courses.map(c => c.name)} />
          <SelectField label="Batch" value={newStudent.batch} onChange={v => setNewStudent({...newStudent, batch: v})} options={batchList} />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Start Date" value={newStudent.startDate} onChange={v => setNewStudent({...newStudent, startDate: v})} type="date" />
            <InputField label="End Date" value={newStudent.endDate} onChange={v => setNewStudent({...newStudent, endDate: v})} type="date" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Total Fees (₹)" value={newStudent.fees} onChange={v => setNewStudent({...newStudent, fees: v})} type="number" placeholder="85000" />
            <InputField label="Amount Paid (₹)" value={newStudent.paid} onChange={v => setNewStudent({...newStudent, paid: v})} type="number" placeholder="50000" />
          </div>
          <SelectField label="Mentor" value={newStudent.mentor} onChange={v => setNewStudent({...newStudent, mentor: v})} options={mentorList} />
          <SubmitButton onClick={addStudent} label="Enroll Student" />
        </div>
      </Modal>
      {/* Collect Fee Modal */}
      <Modal isOpen={modalOpen === "collectFee"} onClose={() => { setModalOpen("viewStudent"); }} title={`Collect Fee - ${selectedStudent?.name || ""}`}>
        {selectedStudent && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div><p className="text-lg font-bold text-gray-900">₹{selectedStudent.fees.toLocaleString()}</p><p className="text-xs text-gray-500">Total Fee</p></div>
                <div><p className="text-lg font-bold text-green-600">₹{selectedStudent.paid.toLocaleString()}</p><p className="text-xs text-gray-500">Paid</p></div>
                <div><p className="text-lg font-bold text-red-600">₹{(selectedStudent.fees - selectedStudent.paid).toLocaleString()}</p><p className="text-xs text-gray-500">Pending</p></div>
              </div>
            </div>
            <InputField label="Payment Amount (₹)" value={paymentAmount} onChange={setPaymentAmount} type="number" placeholder={`Max ₹${(selectedStudent.fees - selectedStudent.paid).toLocaleString()}`} />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Payment Method</h4>
              <button onClick={() => collectFee(selectedStudent)} disabled={paymentProcessing || !paymentAmount} className="w-full bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                <DollarSign size={16} />{paymentProcessing ? "Processing..." : "Pay Online via Razorpay"}
                <span className="text-xs opacity-75">(UPI, Card, NetBanking)</span>
              </button>
              <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div><div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">or</span></div></div>
              <button onClick={() => recordManualPayment(selectedStudent)} disabled={!paymentAmount} className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center gap-2">
                <FileText size={16} />Record Manual Payment <span className="text-xs opacity-75">(Cash / Cheque / Bank Transfer)</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center">Online payments are processed securely via Razorpay. Your API keys are never exposed to the browser.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ===== COURSES MODULE =====
function CoursesModule({ courses, setCourses, showToast }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const emptyCourse = { name: "", duration: "6 months", fee: "", category: "Development", modules: "", status: "Active" };
  const [newCourse, setNewCourse] = useState(emptyCourse);

  const addCourse = () => {
    if (!newCourse.name) return;
    setCourses(prev => [...prev, { ...newCourse, id: Date.now(), fee: Number(newCourse.fee) || 0, modules: Number(newCourse.modules) || 0, students: 0, batches: 0, rating: 0 }]);
    setNewCourse(emptyCourse); setModalOpen(null); showToast(`Course "${newCourse.name}" added!`);
  };

  const deleteCourse = (id) => { setCourses(prev => prev.filter(c => c.id !== id)); setModalOpen(null); setSelectedCourse(null); showToast("Course deleted"); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Courses & Programs</h2><p className="text-sm text-gray-500">Manage course catalog, batches, and curriculum</p></div>
        <button onClick={() => setModalOpen("addCourse")} className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"><Plus size={16} /> Add Course</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setSelectedCourse(course); setModalOpen("viewCourse"); }}>
            <div className="flex items-center justify-between mb-3"><Badge color="indigo">{course.category}</Badge><StatusBadge status={course.status} /></div>
            <h3 className="text-base font-semibold text-gray-900">{course.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{course.duration} · {course.modules} modules</p>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100">
              <div className="text-center"><p className="text-lg font-bold text-gray-900">{course.students}</p><p className="text-[10px] text-gray-500">Students</p></div>
              <div className="text-center"><p className="text-lg font-bold text-gray-900">{course.batches}</p><p className="text-[10px] text-gray-500">Batches</p></div>
              <div className="text-center"><p className="text-lg font-bold text-gray-900 flex items-center justify-center gap-0.5">{course.rating > 0 && <Star size={13} className="text-yellow-400 fill-yellow-400" />}{course.rating || "N/A"}</p><p className="text-[10px] text-gray-500">Rating</p></div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-lg font-bold text-indigo-600">₹{(course.fee/1000).toFixed(0)}K</span>
              <span className="text-xs text-indigo-600">View Details →</span>
            </div>
          </div>
        ))}
      </div>
      {/* View Course Modal */}
      <Modal isOpen={modalOpen === "viewCourse"} onClose={() => { setModalOpen(null); setSelectedCourse(null); }} title="Course Details" wide>
        {selectedCourse && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><h3 className="text-xl font-bold text-gray-900">{selectedCourse.name}</h3><p className="text-sm text-gray-500">{selectedCourse.category} · {selectedCourse.duration}</p></div>
              <StatusBadge status={selectedCourse.status} />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[["Students", selectedCourse.students],["Batches", selectedCourse.batches],["Modules", selectedCourse.modules],["Fee", `₹${(selectedCourse.fee/1000).toFixed(0)}K`]].map(([k,v]) => (
                <div key={k} className="bg-gray-50 rounded-lg p-4 text-center"><p className="text-2xl font-bold text-indigo-600">{v}</p><p className="text-xs text-gray-500 mt-1">{k}</p></div>
              ))}
            </div>
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => { setCourses(prev => prev.map(c => c.id === selectedCourse.id ? {...c, status: c.status === "Active" ? "Inactive" : "Active"} : c)); setModalOpen(null); showToast(`Course ${selectedCourse.status === "Active" ? "deactivated" : "activated"}`); }} className="flex-1 border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50">{selectedCourse.status === "Active" ? "Deactivate" : "Activate"}</button>
              <button onClick={() => deleteCourse(selectedCourse.id)} className="flex-1 border border-red-200 text-red-600 text-sm py-2 rounded-lg hover:bg-red-50">Delete Course</button>
            </div>
          </div>
        )}
      </Modal>
      {/* Add Course Modal */}
      <Modal isOpen={modalOpen === "addCourse"} onClose={() => setModalOpen(null)} title="Add New Course">
        <div className="space-y-4">
          <InputField label="Course Name" value={newCourse.name} onChange={v => setNewCourse({...newCourse, name: v})} placeholder="e.g. Full Stack Development" />
          <SelectField label="Category" value={newCourse.category} onChange={v => setNewCourse({...newCourse, category: v})} options={["Development","Analytics","AI","Cloud","Security","DevOps","Design","Marketing"]} />
          <SelectField label="Duration" value={newCourse.duration} onChange={v => setNewCourse({...newCourse, duration: v})} options={["2 months","3 months","4 months","6 months","9 months","12 months"]} />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Fee (₹)" value={newCourse.fee} onChange={v => setNewCourse({...newCourse, fee: v})} type="number" placeholder="85000" />
            <InputField label="Number of Modules" value={newCourse.modules} onChange={v => setNewCourse({...newCourse, modules: v})} type="number" placeholder="20" />
          </div>
          <SubmitButton onClick={addCourse} label="Add Course" />
        </div>
      </Modal>
    </div>
  );
}

// ===== DEALS MODULE =====
function DealsModule({ deals, setDeals, showToast, courses }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const emptyDeal = { name: "", contact: "", email: "", value: "", stage: "Qualification", probability: "40", course: courses[0]?.name || "", closeDate: "", owner: counsellors[0] };
  const [newDeal, setNewDeal] = useState(emptyDeal);
  const totalValue = deals.reduce((s, d) => s + d.value, 0);
  const wonValue = deals.filter(d => d.stage === "Closed Won").reduce((s, d) => s + d.value, 0);

  const addDeal = () => {
    if (!newDeal.name) return;
    setDeals(prev => [...prev, { ...newDeal, id: Date.now(), value: Number(newDeal.value) || 0, probability: Number(newDeal.probability) || 0 }]);
    setNewDeal(emptyDeal); setModalOpen(null); showToast(`Deal "${newDeal.name}" created!`);
  };

  const updateDealStage = (deal, newStage) => {
    const prob = newStage === "Closed Won" ? 100 : newStage === "Closed Lost" ? 0 : newStage === "Negotiation" ? 75 : newStage === "Proposal" ? 60 : 40;
    setDeals(prev => prev.map(d => d.id === deal.id ? {...d, stage: newStage, probability: prob} : d));
    setModalOpen(null); setSelectedDeal(null); showToast(`Deal moved to "${newStage}"`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Deals & Pipeline</h2><p className="text-sm text-gray-500">Corporate training deals and B2B partnerships</p></div>
        <button onClick={() => setModalOpen("addDeal")} className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"><Plus size={16} /> New Deal</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Briefcase} title="Total Pipeline" value={`₹${(totalValue/100000).toFixed(1)}L`} color="indigo" />
        <StatCard icon={CheckCircle} title="Won this quarter" value={`₹${(wonValue/100000).toFixed(1)}L`} color="green" />
        <StatCard icon={Target} title="Win Rate" value="42%" change="5%" changeType="up" color="purple" />
        <StatCard icon={Clock} title="Avg. Deal Cycle" value="28 days" color="blue" />
      </div>
      <div className="grid grid-cols-5 gap-3">
        {dealStages.map((stage, i) => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const stageTotal = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div key={stage} className="bg-white rounded-xl border border-gray-200">
              <div className="px-3 py-2.5 border-b border-gray-100"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></span><span className="text-sm font-medium text-gray-900">{stage}</span><span className="text-xs text-gray-400 ml-auto">{stageDeals.length}</span></div><p className="text-xs text-gray-400 mt-0.5">₹{(stageTotal/100000).toFixed(1)}L</p></div>
              <div className="p-2 space-y-2">
                {stageDeals.map(deal => (
                  <div key={deal.id} className="p-3 rounded-lg border border-gray-100 hover:border-indigo-200 cursor-pointer transition-all" onClick={() => { setSelectedDeal(deal); setModalOpen("viewDeal"); }}>
                    <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{deal.contact}</p>
                    <div className="flex items-center justify-between mt-2"><span className="text-sm font-semibold text-indigo-600">₹{(deal.value/100000).toFixed(1)}L</span><span className="text-xs text-gray-400">{deal.probability}%</span></div>
                    <p className="text-xs text-gray-400 mt-1">Close: {deal.closeDate}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* View Deal Modal */}
      <Modal isOpen={modalOpen === "viewDeal"} onClose={() => { setModalOpen(null); setSelectedDeal(null); }} title="Deal Details" wide>
        {selectedDeal && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{selectedDeal.name}</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              {[["Contact", selectedDeal.contact],["Email", selectedDeal.email],["Course", selectedDeal.course],["Value", `₹${(selectedDeal.value/100000).toFixed(1)}L`],["Stage", selectedDeal.stage],["Probability", `${selectedDeal.probability}%`],["Close Date", selectedDeal.closeDate],["Owner", selectedDeal.owner]].map(([k,v]) => (
                <div key={k}><p className="text-xs text-gray-500">{k}</p><p className="text-sm font-medium text-gray-900">{v}</p></div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Move to Stage:</p>
              <div className="flex gap-2 flex-wrap">
                {dealStages.filter(s => s !== selectedDeal.stage).map(s => (
                  <button key={s} onClick={() => updateDealStage(selectedDeal, s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${s === "Closed Won" ? "border-green-300 text-green-700 hover:bg-green-50" : s === "Closed Lost" ? "border-red-300 text-red-600 hover:bg-red-50" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
      {/* Add Deal Modal */}
      <Modal isOpen={modalOpen === "addDeal"} onClose={() => setModalOpen(null)} title="Create New Deal">
        <div className="space-y-4">
          <InputField label="Deal Name" value={newDeal.name} onChange={v => setNewDeal({...newDeal, name: v})} placeholder="e.g. TCS Training - 50 seats" />
          <InputField label="Contact Person" value={newDeal.contact} onChange={v => setNewDeal({...newDeal, contact: v})} placeholder="Contact name" />
          <InputField label="Email" value={newDeal.email} onChange={v => setNewDeal({...newDeal, email: v})} type="email" placeholder="contact@company.com" />
          <InputField label="Deal Value (₹)" value={newDeal.value} onChange={v => setNewDeal({...newDeal, value: v})} type="number" placeholder="5000000" />
          <SelectField label="Course" value={newDeal.course} onChange={v => setNewDeal({...newDeal, course: v})} options={courses.map(c => c.name)} />
          <SelectField label="Stage" value={newDeal.stage} onChange={v => setNewDeal({...newDeal, stage: v})} options={dealStages} />
          <InputField label="Expected Close Date" value={newDeal.closeDate} onChange={v => setNewDeal({...newDeal, closeDate: v})} type="date" />
          <SelectField label="Owner" value={newDeal.owner} onChange={v => setNewDeal({...newDeal, owner: v})} options={counsellors} />
          <SubmitButton onClick={addDeal} label="Create Deal" />
        </div>
      </Modal>
    </div>
  );
}

// ===== CAMPAIGNS MODULE =====
function CampaignsModule({ campaigns, setCampaigns, showToast }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const emptyCampaign = { name: "", type: "Email", startDate: "", endDate: "", budget: "", status: "Active" };
  const [newCampaign, setNewCampaign] = useState(emptyCampaign);

  const addCampaign = () => {
    if (!newCampaign.name) return;
    setCampaigns(prev => [...prev, { ...newCampaign, id: Date.now(), budget: Number(newCampaign.budget) || 0, spent: 0, leads: 0, conversions: 0, roi: 0 }]);
    setNewCampaign(emptyCampaign); setModalOpen(null); showToast(`Campaign "${newCampaign.name}" created!`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Marketing Campaigns</h2><p className="text-sm text-gray-500">Manage enrollment drives, ads, and outreach programs</p></div>
        <button onClick={() => setModalOpen("addCampaign")} className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"><Plus size={16} /> New Campaign</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Send} title="Active Campaigns" value={String(campaigns.filter(c=>c.status==="Active").length)} color="indigo" />
        <StatCard icon={UserPlus} title="Total Leads" value={String(campaigns.reduce((a,c)=>a+c.leads,0))} change="32%" changeType="up" color="blue" />
        <StatCard icon={Target} title="Total Conversions" value={String(campaigns.reduce((a,c)=>a+c.conversions,0))} color="green" />
        <StatCard icon={DollarSign} title="Total Spend" value={`₹${(campaigns.reduce((a,c)=>a+c.spent,0)/1000).toFixed(0)}K`} color="yellow" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50"><tr>{["Campaign","Type","Status","Budget","Spent","Leads","Conversions","ROI"].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedCampaign(c); setModalOpen("viewCampaign"); }}>
                <td className="px-4 py-3"><p className="text-sm font-medium text-gray-900">{c.name}</p><p className="text-xs text-gray-400">{c.startDate} – {c.endDate}</p></td>
                <td className="px-4 py-3"><Badge color="indigo">{c.type}</Badge></td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3 text-sm text-gray-700">₹{(c.budget/1000).toFixed(0)}K</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><span className="text-sm text-gray-700">₹{(c.spent/1000).toFixed(0)}K</span><div className="w-16"><ProgressBar value={c.spent} max={c.budget || 1} color="blue" /></div></div></td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.leads}</td>
                <td className="px-4 py-3 text-sm font-medium text-green-600">{c.conversions}</td>
                <td className="px-4 py-3">{c.roi > 0 ? <span className="text-sm font-medium text-green-600">{c.roi}%</span> : <span className="text-sm text-gray-400">–</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Campaign Modal */}
      <Modal isOpen={modalOpen === "viewCampaign"} onClose={() => { setModalOpen(null); setSelectedCampaign(null); }} title="Campaign Details" wide>
        {selectedCampaign && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">{selectedCampaign.name}</h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              {[["Type", selectedCampaign.type],["Status", selectedCampaign.status],["Start", selectedCampaign.startDate],["End", selectedCampaign.endDate],["Budget", `₹${(selectedCampaign.budget/1000).toFixed(0)}K`],["Spent", `₹${(selectedCampaign.spent/1000).toFixed(0)}K`],["Leads", selectedCampaign.leads],["Conversions", selectedCampaign.conversions]].map(([k,v]) => (
                <div key={k}><p className="text-xs text-gray-500">{k}</p><p className="text-sm font-medium text-gray-900">{v}</p></div>
              ))}
            </div>
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => { setCampaigns(prev => prev.map(c => c.id === selectedCampaign.id ? {...c, status: c.status === "Active" ? "Paused" : "Active"} : c)); setModalOpen(null); showToast(`Campaign ${selectedCampaign.status === "Active" ? "paused" : "activated"}`); }} className="flex-1 border border-gray-200 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50">{selectedCampaign.status === "Active" ? "Pause" : "Activate"}</button>
              <button onClick={() => { setCampaigns(prev => prev.filter(c => c.id !== selectedCampaign.id)); setModalOpen(null); showToast("Campaign deleted"); }} className="flex-1 border border-red-200 text-red-600 text-sm py-2 rounded-lg hover:bg-red-50">Delete</button>
            </div>
          </div>
        )}
      </Modal>
      {/* Add Campaign Modal */}
      <Modal isOpen={modalOpen === "addCampaign"} onClose={() => setModalOpen(null)} title="Create New Campaign">
        <div className="space-y-4">
          <InputField label="Campaign Name" value={newCampaign.name} onChange={v => setNewCampaign({...newCampaign, name: v})} placeholder="e.g. Summer Enrollment Drive" />
          <SelectField label="Type" value={newCampaign.type} onChange={v => setNewCampaign({...newCampaign, type: v})} options={["Email","Google Ads","Social Media","Events","Referral","Email + Social","Content Marketing"]} />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Start Date" value={newCampaign.startDate} onChange={v => setNewCampaign({...newCampaign, startDate: v})} type="date" />
            <InputField label="End Date" value={newCampaign.endDate} onChange={v => setNewCampaign({...newCampaign, endDate: v})} type="date" />
          </div>
          <InputField label="Budget (₹)" value={newCampaign.budget} onChange={v => setNewCampaign({...newCampaign, budget: v})} type="number" placeholder="150000" />
          <SubmitButton onClick={addCampaign} label="Create Campaign" />
        </div>
      </Modal>
      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Campaign Performance</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={campaigns.filter(c => c.leads > 0)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="name" fontSize={11} /><YAxis fontSize={12} /><Tooltip /><Legend />
            <Bar dataKey="leads" fill="#4F46E5" name="Leads" radius={[4,4,0,0]} /><Bar dataKey="conversions" fill="#10B981" name="Conversions" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ===== TICKETS MODULE =====
function TicketsModule({ tickets, setTickets, showToast, students }) {
  const [modalOpen, setModalOpen] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const emptyTicket = { subject: "", student: students[0]?.name || "", priority: "Medium", category: "Technical", description: "", assignedTo: "Tech Support" };
  const [newTicket, setNewTicket] = useState(emptyTicket);

  const addTicket = () => {
    if (!newTicket.subject) return;
    const nextId = `TKT-${String(tickets.length + 1).padStart(3, "0")}`;
    setTickets(prev => [...prev, { ...newTicket, id: nextId, status: "Open", created: new Date().toISOString().split("T")[0] }]);
    setNewTicket(emptyTicket); setModalOpen(null); showToast(`Ticket ${nextId} created!`);
  };

  const updateTicketStatus = (ticket, newStatus) => {
    setTickets(prev => prev.map(t => t.id === ticket.id ? {...t, status: newStatus} : t));
    setModalOpen(null); setSelectedTicket(null); showToast(`${ticket.id} marked as ${newStatus}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Support Tickets</h2><p className="text-sm text-gray-500">Student queries, technical support, and service requests</p></div>
        <button onClick={() => setModalOpen("addTicket")} className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"><Plus size={16} /> New Ticket</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={MessageSquare} title="Open Tickets" value={String(tickets.filter(t=>t.status==="Open").length)} color="yellow" />
        <StatCard icon={Clock} title="In Progress" value={String(tickets.filter(t=>t.status==="In Progress").length)} color="blue" />
        <StatCard icon={CheckCircle} title="Resolved" value={String(tickets.filter(t=>t.status==="Resolved").length)} color="green" />
        <StatCard icon={AlertCircle} title="High Priority" value={String(tickets.filter(t=>t.priority==="High").length)} color="purple" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50"><tr>{["ID","Subject","Student","Priority","Category","Status","Assigned To","Created"].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map(t => (
              <tr key={t.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedTicket(t); setModalOpen("viewTicket"); }}>
                <td className="px-4 py-3 text-sm font-medium text-indigo-600">{t.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{t.subject}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{t.student}</td>
                <td className="px-4 py-3"><StatusBadge status={t.priority} /></td>
                <td className="px-4 py-3"><Badge color="gray">{t.category}</Badge></td>
                <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                <td className="px-4 py-3 text-sm text-gray-600">{t.assignedTo}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{t.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Ticket Modal */}
      <Modal isOpen={modalOpen === "viewTicket"} onClose={() => { setModalOpen(null); setSelectedTicket(null); }} title="Ticket Details" wide>
        {selectedTicket && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{selectedTicket.id}: {selectedTicket.subject}</h3>
              <StatusBadge status={selectedTicket.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              {[["Student", selectedTicket.student],["Priority", selectedTicket.priority],["Category", selectedTicket.category],["Assigned To", selectedTicket.assignedTo],["Created", selectedTicket.created],["Status", selectedTicket.status]].map(([k,v]) => (
                <div key={k}><p className="text-xs text-gray-500">{k}</p><p className="text-sm font-medium text-gray-900">{v}</p></div>
              ))}
            </div>
            {selectedTicket.description && <div className="bg-gray-50 rounded-lg p-4"><p className="text-xs text-gray-500 mb-1">Description</p><p className="text-sm text-gray-700">{selectedTicket.description}</p></div>}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Update Status:</p>
              <div className="flex gap-2">
                {["Open","In Progress","Resolved"].filter(s => s !== selectedTicket.status).map(s => (
                  <button key={s} onClick={() => updateTicketStatus(selectedTicket, s)} className={`px-4 py-1.5 rounded-lg text-xs font-medium border ${s === "Resolved" ? "border-green-300 text-green-700 hover:bg-green-50" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
      {/* Add Ticket Modal */}
      <Modal isOpen={modalOpen === "addTicket"} onClose={() => setModalOpen(null)} title="Create New Ticket">
        <div className="space-y-4">
          <InputField label="Subject" value={newTicket.subject} onChange={v => setNewTicket({...newTicket, subject: v})} placeholder="Brief description of the issue" />
          <SelectField label="Student" value={newTicket.student} onChange={v => setNewTicket({...newTicket, student: v})} options={students.map(s => s.name)} />
          <SelectField label="Priority" value={newTicket.priority} onChange={v => setNewTicket({...newTicket, priority: v})} options={["Low","Medium","High"]} />
          <SelectField label="Category" value={newTicket.category} onChange={v => setNewTicket({...newTicket, category: v})} options={["Technical","Academic","Finance","Placement","General"]} />
          <SelectField label="Assign To" value={newTicket.assignedTo} onChange={v => setNewTicket({...newTicket, assignedTo: v})} options={["Tech Support","Academic Team","Finance Team","Placement Cell","Admin"]} />
          <TextAreaField label="Description" value={newTicket.description} onChange={v => setNewTicket({...newTicket, description: v})} />
          <SubmitButton onClick={addTicket} label="Create Ticket" />
        </div>
      </Modal>
    </div>
  );
}

// ===== ANALYTICS MODULE =====
function AnalyticsModule() {
  const conversionFunnel = [
    { stage: "Website Visits", count: 12500, pct: 100 },{ stage: "Form Inquiries", count: 3200, pct: 25.6 },
    { stage: "Qualified Leads", count: 1500, pct: 12 },{ stage: "Counselling Done", count: 890, pct: 7.1 },
    { stage: "Enrolled", count: 569, pct: 4.6 },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Analytics & Reports</h2><p className="text-sm text-gray-500">Business intelligence and performance insights</p></div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"><option>This Quarter</option><option>Last Quarter</option><option>This Year</option></select>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Enrollment Conversion Funnel</h3>
        <div className="space-y-3">
          {conversionFunnel.map((stage, i) => (
            <div key={stage.stage} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-36 flex-shrink-0">{stage.stage}</span>
              <div className="flex-1"><div className="w-full bg-gray-100 rounded-full h-8 relative overflow-hidden"><div className="h-8 rounded-full flex items-center" style={{ width: `${stage.pct}%`, backgroundColor: COLORS[i] }}><span className="text-xs font-medium text-white ml-3">{stage.count.toLocaleString()}</span></div></div></div>
              <span className="text-sm font-medium text-gray-700 w-14 text-right">{stage.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" fontSize={12} /><YAxis fontSize={12} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} /><Tooltip formatter={v => `₹${(v/100000).toFixed(1)}L`} /><Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} dot={{ r: 5, fill: "#4F46E5" }} /></LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart><Pie data={leadSourceData} cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`} fontSize={11} dataKey="value">{leadSourceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Key Metrics Summary</h3>
        <div className="space-y-4">
          {[
            { label: "Customer Acquisition Cost", value: "₹4,200", trend: "↓ 8%", good: true },
            { label: "Student Lifetime Value", value: "₹1,25,000", trend: "↑ 15%", good: true },
            { label: "Avg. Lead Response Time", value: "2.3 hrs", trend: "↓ 12%", good: true },
            { label: "Course Completion Rate", value: "87%", trend: "↑ 3%", good: true },
            { label: "NPS Score", value: "72", trend: "↑ 5pts", good: true },
          ].map(m => (
            <div key={m.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600">{m.label}</span>
              <div className="flex items-center gap-3"><span className="text-sm font-semibold text-gray-900">{m.value}</span><span className={`text-xs font-medium ${m.good ? "text-green-600" : "text-red-500"}`}>{m.trend}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== AUTOMATION MODULE =====
function AutomationModule({ showToast }) {
  const [workflows, setWorkflows] = useState([
    { id: 1, name: "New Lead Welcome Email", trigger: "Lead Created", action: "Send welcome email + assign counsellor", status: "Active", runs: 1245 },
    { id: 2, name: "Lead Score Update", trigger: "Website Visit / Email Open", action: "Update lead score automatically", status: "Active", runs: 8920 },
    { id: 3, name: "Follow-up Reminder", trigger: "No contact for 3 days", action: "Notify assigned counsellor", status: "Active", runs: 567 },
    { id: 4, name: "Enrollment Confirmation", trigger: "Deal Closed Won", action: "Create student record + send welcome kit", status: "Active", runs: 342 },
    { id: 5, name: "Fee Reminder", trigger: "Payment due in 5 days", action: "Send SMS + Email reminder", status: "Active", runs: 890 },
    { id: 6, name: "Course Completion Certificate", trigger: "Progress = 100%", action: "Generate certificate + notify student", status: "Active", runs: 156 },
    { id: 7, name: "Inactive Lead Nurture", trigger: "No response for 14 days", action: "Add to nurture email sequence", status: "Paused", runs: 2340 },
    { id: 8, name: "Batch Start Notification", trigger: "7 days before batch start", action: "Notify enrolled students + mentor", status: "Active", runs: 78 },
  ]);
  const [modalOpen, setModalOpen] = useState(null);
  const emptyWorkflow = { name: "", trigger: "", action: "" };
  const [newWorkflow, setNewWorkflow] = useState(emptyWorkflow);

  const addWorkflow = () => {
    if (!newWorkflow.name) return;
    setWorkflows(prev => [...prev, { ...newWorkflow, id: Date.now(), status: "Active", runs: 0 }]);
    setNewWorkflow(emptyWorkflow); setModalOpen(null); showToast(`Workflow "${newWorkflow.name}" created!`);
  };

  const toggleWorkflow = (id) => {
    setWorkflows(prev => prev.map(w => w.id === id ? {...w, status: w.status === "Active" ? "Paused" : "Active"} : w));
    showToast("Workflow updated");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-gray-900">Process Automation</h2><p className="text-sm text-gray-500">Workflows, triggers, and automated actions</p></div>
        <button onClick={() => setModalOpen("addWorkflow")} className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"><Plus size={16} /> Create Workflow</button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Zap} title="Active Workflows" value={String(workflows.filter(w=>w.status==="Active").length)} color="indigo" />
        <StatCard icon={RefreshCw} title="Total Executions" value={workflows.reduce((a,w)=>a+w.runs,0).toLocaleString()} color="green" />
        <StatCard icon={Clock} title="Time Saved" value="~320 hrs" subtitle="This quarter" color="purple" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50"><tr>{["Workflow","Trigger","Action","Status","Runs",""].map(h=><th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100">
            {workflows.map(w => (
              <tr key={w.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><Zap size={15} className={w.status === "Active" ? "text-indigo-500" : "text-gray-400"} /><span className="text-sm font-medium text-gray-900">{w.name}</span></div></td>
                <td className="px-4 py-3 text-sm text-gray-600">{w.trigger}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{w.action}</td>
                <td className="px-4 py-3"><Badge color={w.status === "Active" ? "green" : "gray"}>{w.status}</Badge></td>
                <td className="px-4 py-3 text-sm text-gray-700">{w.runs.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleWorkflow(w.id)} className={`text-xs px-3 py-1 rounded-lg border ${w.status === "Active" ? "border-yellow-300 text-yellow-700 hover:bg-yellow-50" : "border-green-300 text-green-700 hover:bg-green-50"}`}>{w.status === "Active" ? "Pause" : "Activate"}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Blueprint */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Lead-to-Enrollment Blueprint</h3>
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {[
            { step: "Lead Capture", desc: "Web form / Walk-in", icon: UserPlus, color: "#3B82F6" },
            { step: "Auto-Assign", desc: "Route to counsellor", icon: Users, color: "#8B5CF6" },
            { step: "Welcome Email", desc: "Automated welcome", icon: Mail, color: "#10B981" },
            { step: "Follow-up", desc: "3-day cadence", icon: Phone, color: "#F59E0B" },
            { step: "Counselling", desc: "Schedule demo", icon: Calendar, color: "#EC4899" },
            { step: "Enrollment", desc: "Fee + onboard", icon: GraduationCap, color: "#4F46E5" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-col items-center w-28"><div className="p-3 rounded-lg mb-2" style={{ backgroundColor: `${s.color}15` }}><s.icon size={20} style={{ color: s.color }} /></div><p className="text-xs font-medium text-gray-900 text-center">{s.step}</p><p className="text-[10px] text-gray-500 text-center">{s.desc}</p></div>
              {i < 5 && <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>
      {/* Add Workflow Modal */}
      <Modal isOpen={modalOpen === "addWorkflow"} onClose={() => setModalOpen(null)} title="Create New Workflow">
        <div className="space-y-4">
          <InputField label="Workflow Name" value={newWorkflow.name} onChange={v => setNewWorkflow({...newWorkflow, name: v})} placeholder="e.g. Auto-assign new leads" />
          <SelectField label="Trigger" value={newWorkflow.trigger} onChange={v => setNewWorkflow({...newWorkflow, trigger: v})} options={["Lead Created","Deal Stage Changed","Payment Received","Course Completed","Ticket Created","No contact for 3 days","No response for 14 days","7 days before batch start"]} />
          <InputField label="Action" value={newWorkflow.action} onChange={v => setNewWorkflow({...newWorkflow, action: v})} placeholder="e.g. Send email + assign to counsellor" />
          <SubmitButton onClick={addWorkflow} label="Create Workflow" />
        </div>
      </Modal>
    </div>
  );
}

// ===== SOCIAL SETTINGS CHANNEL LIST (API-connected) =====
function SocialSettingsChannelList({ showToast }) {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useState(() => {
    fetch("http://localhost:5000/api/social/channels")
      .then(r => r.json())
      .then(data => { if (data.success) setChannels(data.channels); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  if (loading) return <p className="text-xs text-gray-400 py-2">Loading channels...</p>;

  const platformIcons = { Instagram: Camera, Facebook: Users, LinkedIn: Building2, X: MessageCircle, YouTube: Tv, WhatsApp: Phone };
  const platformColors = { Instagram: "#E4405F", Facebook: "#1877F2", LinkedIn: "#0A66C2", X: "#000", YouTube: "#FF0000", WhatsApp: "#25D366" };

  return (
    <div className="space-y-2">
      {channels.map(ch => {
        const Icon = platformIcons[ch.platform] || Globe;
        return (
          <div key={ch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: (platformColors[ch.platform] || "#6B7280") + "15" }}>
                <Icon size={16} style={{ color: platformColors[ch.platform] || "#6B7280" }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{ch.platform}</p>
                <p className="text-xs text-gray-500">{ch.handle} · {(ch.followers || 0).toLocaleString()} followers</p>
                {ch.lastSync && <p className="text-[10px] text-gray-400">Last synced: {new Date(ch.lastSync).toLocaleString()}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge color={ch.connected ? "green" : "gray"}>{ch.connected ? "Connected" : "Disconnected"}</Badge>
              {ch.connected ? (
                <button onClick={() => {
                  fetch(`http://localhost:5000/api/social/channels/${ch.id}/sync`, { method: "POST" })
                    .then(r => r.json())
                    .then(d => { if (d.success) { setChannels(prev => prev.map(c => c.id === ch.id ? d.channel : c)); showToast(`${ch.platform} synced!`); } });
                }} className="text-xs text-indigo-600 hover:underline">Sync</button>
              ) : (
                <button onClick={() => showToast(`Go to Social Media module to connect ${ch.platform}`)} className="text-xs text-indigo-600 hover:underline">Connect</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ===== SETTINGS MODULE =====
function SettingsModule({ showToast }) {
  const [activeSection, setActiveSection] = useState(null);
  const [toggles, setToggles] = useState({ onlinePayments: true, emiOptions: true, autoReceipt: true, paymentReminder: true });
  // Organization
  const [companyProfile, setCompanyProfile] = useState({ name: "Rooman Technologies Pvt. Ltd.", email: "info@rooman.net", phone: "+91 80 4123 4567", website: "https://www.rooman.net", address: "No. 17, 2nd Floor, 80 Feet Road, Koramangala, Bangalore - 560034", gst: "29AABCR1234M1ZP", pan: "AABCR1234M", industry: "Education & Training", founded: "2012" });
  const [branches, setBranches] = useState([
    { id: 1, name: "Bangalore HQ", city: "Bangalore", address: "Koramangala, 80 Feet Road", head: "Manish", phone: "+91 80 4123 4567", status: "Active" },
    { id: 2, name: "Chennai Center", city: "Chennai", address: "T. Nagar, Usman Road", head: "Priya M.", phone: "+91 44 2812 3456", status: "Active" },
    { id: 3, name: "Hyderabad Center", city: "Hyderabad", address: "Ameerpet, SR Nagar", head: "Vikram S.", phone: "+91 40 2345 6789", status: "Active" },
  ]);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [newBranch, setNewBranch] = useState({ name: "", city: "", address: "", head: "", phone: "", status: "Active" });
  // Users & Roles
  const [users, setUsers] = useState([
    { id: 1, name: "Manish", email: "ceo@rooman.net", role: "Admin", status: "Active", lastLogin: "2026-03-31" },
    { id: 2, name: "Priya M.", email: "priya@rooman.net", role: "Sales Manager", status: "Active", lastLogin: "2026-03-31" },
    { id: 3, name: "Vikram S.", email: "vikram@rooman.net", role: "Counsellor", status: "Active", lastLogin: "2026-03-30" },
    { id: 4, name: "Deepak R.", email: "deepak@rooman.net", role: "Counsellor", status: "Active", lastLogin: "2026-03-30" },
    { id: 5, name: "Dr. Ramesh K.", email: "ramesh@rooman.net", role: "Mentor", status: "Active", lastLogin: "2026-03-29" },
  ]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Counsellor", status: "Active" });
  const [roles] = useState([
    { id: 1, name: "Admin", permissions: "Full Access", users: 1 },
    { id: 2, name: "Sales Manager", permissions: "Leads, Deals, Students, Campaigns, Reports", users: 1 },
    { id: 3, name: "Counsellor", permissions: "Leads, Students, Deals", users: 2 },
    { id: 4, name: "Mentor", permissions: "Students, Courses, Tickets", users: 1 },
    { id: 5, name: "Support", permissions: "Tickets, Students", users: 0 },
  ]);
  const [teams] = useState([
    { id: 1, name: "Sales Team", lead: "Priya M.", members: 3, description: "Handles lead conversion and deal closure" },
    { id: 2, name: "Academic Team", lead: "Dr. Ramesh K.", members: 5, description: "Course delivery and mentoring" },
    { id: 3, name: "Support Team", lead: "Vikram S.", members: 2, description: "Student support and ticket resolution" },
  ]);
  // Communication
  const [emailTemplates, setEmailTemplates] = useState([
    { id: 1, name: "Welcome Email", subject: "Welcome to Rooman Technologies!", category: "Onboarding", status: "Active", lastUsed: "2026-03-30" },
    { id: 2, name: "Course Enrollment Confirmation", subject: "Your enrollment is confirmed!", category: "Enrollment", status: "Active", lastUsed: "2026-03-29" },
    { id: 3, name: "Fee Reminder", subject: "Payment reminder for your course", category: "Finance", status: "Active", lastUsed: "2026-03-28" },
    { id: 4, name: "Lead Follow-up", subject: "Thank you for your interest in Rooman", category: "Sales", status: "Active", lastUsed: "2026-03-31" },
    { id: 5, name: "Certificate Ready", subject: "Your certificate is ready for download!", category: "Academic", status: "Active", lastUsed: "2026-03-25" },
  ]);
  // Automation
  const [workflowRules, setWorkflowRules] = useState([
    { id: 1, name: "Auto-assign new leads", trigger: "When lead is created", action: "Assign to counsellor based on course", status: "Active" },
    { id: 2, name: "Fee reminder automation", trigger: "7 days before fee due date", action: "Send email + SMS reminder", status: "Active" },
    { id: 3, name: "Lead scoring update", trigger: "When lead interacts with email/site", action: "Update lead score", status: "Active" },
    { id: 4, name: "Welcome email on enrollment", trigger: "When student status = Enrolled", action: "Send welcome email template", status: "Active" },
    { id: 5, name: "Ticket escalation", trigger: "Ticket open > 48 hours", action: "Escalate to manager + send alert", status: "Active" },
  ]);

  const toggle = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const settingSections = [
    { title: "Organization", icon: Globe, items: ["Company Profile", "Branches & Centers", "Fiscal Year", "Currency"] },
    { title: "Users & Roles", icon: Users, items: ["User Management", "Roles & Permissions", "Teams", "Territories"] },
    { title: "Modules", icon: Layers, items: ["Lead Settings", "Student Settings", "Course Configuration", "Deal Stages"] },
    { title: "Communication", icon: Mail, items: ["Email Templates", "SMS Templates", "WhatsApp Integration", "Telephony"] },
    { title: "Automation", icon: Zap, items: ["Workflow Rules", "Assignment Rules", "Scoring Rules", "Escalation Rules"] },
    { title: "Integrations", icon: Globe, items: ["Payment Gateway", "LMS Integration", "Google Workspace", "Social Media"] },
    { title: "Channels", icon: Headphones, items: ["Email Channel", "Telephony Channel", "Business Messaging", "Notification SMS", "Webforms", "Social Channel", "Chat", "Portals"] },
  ];

  const ToggleSwitch = ({ label, desc, toggleKey }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div><p className="text-sm font-medium text-gray-900">{label}</p><p className="text-xs text-gray-500">{desc}</p></div>
      <button onClick={() => { toggle(toggleKey); showToast(`${label} ${toggles[toggleKey] ? "disabled" : "enabled"}`); }} className={`relative w-11 h-6 rounded-full transition-colors ${toggles[toggleKey] ? "bg-indigo-600" : "bg-gray-300"}`}><span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${toggles[toggleKey] ? "right-0.5" : "left-0.5"}`}></span></button>
    </div>
  );

  const renderSettingsContent = () => {
    switch (activeSection) {
      // ===== ORGANIZATION =====
      case "Company Profile":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Company Name" value={companyProfile.name} onChange={(v) => setCompanyProfile({ ...companyProfile, name: v })} />
              <InputField label="Email" value={companyProfile.email} onChange={(v) => setCompanyProfile({ ...companyProfile, email: v })} />
              <InputField label="Phone" value={companyProfile.phone} onChange={(v) => setCompanyProfile({ ...companyProfile, phone: v })} />
              <InputField label="Website" value={companyProfile.website} onChange={(v) => setCompanyProfile({ ...companyProfile, website: v })} />
              <InputField label="GST Number" value={companyProfile.gst} onChange={(v) => setCompanyProfile({ ...companyProfile, gst: v })} />
              <InputField label="PAN Number" value={companyProfile.pan} onChange={(v) => setCompanyProfile({ ...companyProfile, pan: v })} />
              <InputField label="Industry" value={companyProfile.industry} onChange={(v) => setCompanyProfile({ ...companyProfile, industry: v })} />
              <InputField label="Founded Year" value={companyProfile.founded} onChange={(v) => setCompanyProfile({ ...companyProfile, founded: v })} />
            </div>
            <TextAreaField label="Address" value={companyProfile.address} onChange={(v) => setCompanyProfile({ ...companyProfile, address: v })} />
            <SubmitButton label="Save Company Profile" onClick={() => { setActiveSection(null); showToast("Company profile updated!"); }} />
          </div>
        );

      case "Branches & Centers":
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center"><p className="text-sm text-gray-500">{branches.length} branches configured</p><button onClick={() => setShowBranchModal(true)} className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1"><Plus size={14} /> Add Branch</button></div>
            {branches.map(b => (
              <div key={b.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{b.name}</p>
                  <p className="text-xs text-gray-500">{b.city} · {b.head} · {b.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="green">{b.status}</Badge>
                  <button onClick={() => showToast(`Editing ${b.name}`)} className="text-gray-400 hover:text-indigo-600"><Edit size={14} /></button>
                  <button onClick={() => { setBranches(branches.filter(x => x.id !== b.id)); showToast(`${b.name} removed`); }} className="text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        );

      case "Fiscal Year":
        return (
          <div className="space-y-3">
            <SelectField label="Fiscal Year Start" value="April" onChange={() => {}} options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]} />
            <SelectField label="Fiscal Year Format" value="Apr 2026 - Mar 2027" onChange={() => {}} options={["Apr 2026 - Mar 2027", "2026-2027", "FY2026-27"]} />
            <ToggleSwitch label="Auto-close financial year" desc="Automatically close books at year end" toggleKey="autoCloseFY" />
            <ToggleSwitch label="Generate annual reports" desc="Auto-generate revenue & enrollment reports" toggleKey="annualReports" />
            <SubmitButton label="Save Fiscal Year Settings" onClick={() => { setActiveSection(null); showToast("Fiscal year settings saved!"); }} />
          </div>
        );

      case "Currency":
        return (
          <div className="space-y-3">
            <SelectField label="Base Currency" value="INR - Indian Rupee (₹)" onChange={() => {}} options={["INR - Indian Rupee (₹)", "USD - US Dollar ($)", "EUR - Euro (€)", "GBP - British Pound (£)"]} />
            <SelectField label="Currency Format" value="₹1,23,456.00" onChange={() => {}} options={["₹1,23,456.00", "₹ 1,23,456.00", "INR 1,23,456.00"]} />
            <SelectField label="Decimal Places" value="2" onChange={() => {}} options={["0", "1", "2", "3"]} />
            <ToggleSwitch label="Multi-currency support" desc="Accept payments in multiple currencies" toggleKey="multiCurrency" />
            <SubmitButton label="Save Currency Settings" onClick={() => { setActiveSection(null); showToast("Currency settings saved!"); }} />
          </div>
        );

      // ===== USERS & ROLES =====
      case "User Management":
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center"><p className="text-sm text-gray-500">{users.length} users</p><button onClick={() => setShowUserModal(true)} className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1"><Plus size={14} /> Add User</button></div>
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-medium">{u.name.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email} · {u.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color={u.status === "Active" ? "green" : "gray"}>{u.status}</Badge>
                  <span className="text-xs text-gray-400">Last: {u.lastLogin}</span>
                  <button onClick={() => showToast(`Editing ${u.name}`)} className="text-gray-400 hover:text-indigo-600"><Edit size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        );

      case "Roles & Permissions":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">{roles.length} roles configured</p>
            {roles.map(r => (
              <div key={r.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2"><p className="text-sm font-medium text-gray-900">{r.name}</p><Badge color="blue">{r.users} user{r.users !== 1 ? "s" : ""}</Badge></div>
                  <button onClick={() => showToast(`Editing ${r.name} permissions`)} className="text-xs text-indigo-600 hover:underline">Edit Permissions</button>
                </div>
                <p className="text-xs text-gray-500">Access: {r.permissions}</p>
              </div>
            ))}
            <button onClick={() => showToast("New role creation form opened")} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-1"><Plus size={14} /> Create New Role</button>
          </div>
        );

      case "Teams":
        return (
          <div className="space-y-3">
            {teams.map(t => (
              <div key={t.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <div className="flex items-center gap-2"><Badge color="indigo">{t.members} members</Badge><button onClick={() => showToast(`Managing ${t.name}`)} className="text-xs text-indigo-600 hover:underline">Manage</button></div>
                </div>
                <p className="text-xs text-gray-500">Lead: {t.lead} · {t.description}</p>
              </div>
            ))}
            <button onClick={() => showToast("Create team form opened")} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-1"><Plus size={14} /> Create New Team</button>
          </div>
        );

      case "Territories":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Assign geographic territories to sales teams for lead routing.</p>
            {[
              { name: "South Karnataka", cities: "Bangalore, Mysore, Mangalore", assigned: "Priya M.", leads: 156 },
              { name: "Tamil Nadu", cities: "Chennai, Coimbatore, Madurai", assigned: "Vikram S.", leads: 98 },
              { name: "Andhra Pradesh & Telangana", cities: "Hyderabad, Vizag, Vijayawada", assigned: "Deepak R.", leads: 72 },
              { name: "North India", cities: "Delhi, Noida, Gurgaon", assigned: "Unassigned", leads: 34 },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.cities}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500">{t.assigned}</span>
                  <Badge color="blue">{t.leads} leads</Badge>
                  <button onClick={() => showToast(`Editing ${t.name}`)} className="text-indigo-600 hover:underline">Edit</button>
                </div>
              </div>
            ))}
            <SubmitButton label="Save Territories" onClick={() => { setActiveSection(null); showToast("Territories saved!"); }} />
          </div>
        );

      // ===== MODULES =====
      case "Lead Settings":
        return (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">Lead Sources</h4>
            <div className="flex flex-wrap gap-2">
              {["Website", "Google Ads", "Social Media", "Referral", "Walk-in", "Education Fair", "Partner", "Cold Call"].map(s => (
                <span key={s} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs">{s} <button onClick={() => showToast(`${s} removed`)} className="text-gray-400 hover:text-red-500"><X size={10} /></button></span>
              ))}
              <button onClick={() => showToast("Add new lead source")} className="text-xs text-indigo-600 px-3 py-1.5 border border-dashed border-indigo-300 rounded-full hover:bg-indigo-50">+ Add</button>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 mt-2">Lead Stages</h4>
            <div className="space-y-1">
              {pipelineStages.map((s, i) => (
                <div key={s} className="flex items-center gap-2 p-2 bg-gray-50 rounded"><span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center">{i + 1}</span><span className="text-sm text-gray-700">{s}</span></div>
              ))}
            </div>
            <ToggleSwitch label="Auto lead scoring" desc="Automatically calculate lead scores based on interactions" toggleKey="autoLeadScore" />
            <ToggleSwitch label="Duplicate detection" desc="Alert when a duplicate lead is detected" toggleKey="duplicateDetect" />
            <SubmitButton label="Save Lead Settings" onClick={() => { setActiveSection(null); showToast("Lead settings saved!"); }} />
          </div>
        );

      case "Student Settings":
        return (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">Student Statuses</h4>
            <div className="flex flex-wrap gap-2">
              {["Active", "Completed", "On Hold", "Dropped Out", "Alumni"].map(s => (
                <Badge key={s} color={s === "Active" ? "green" : s === "Completed" ? "indigo" : s === "Dropped Out" ? "red" : "gray"}>{s}</Badge>
              ))}
            </div>
            <ToggleSwitch label="Automatic progress tracking" desc="Update student progress based on LMS activity" toggleKey="autoProgress" />
            <ToggleSwitch label="Attendance tracking" desc="Track student attendance for batches" toggleKey="attendance" />
            <ToggleSwitch label="Certificate auto-generation" desc="Generate certificate when course is completed" toggleKey="autoCert" />
            <ToggleSwitch label="Placement tracking" desc="Track placement status after course completion" toggleKey="placementTrack" />
            <SelectField label="Default Fee Reminder" value="7 days before due date" onChange={() => {}} options={["3 days before due date", "7 days before due date", "14 days before due date", "30 days before due date"]} />
            <SubmitButton label="Save Student Settings" onClick={() => { setActiveSection(null); showToast("Student settings saved!"); }} />
          </div>
        );

      case "Course Configuration":
        return (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700">Course Categories</h4>
            <div className="flex flex-wrap gap-2">
              {["Development", "Analytics", "AI", "Cloud", "Security", "DevOps", "Design", "Management"].map(c => (
                <span key={c} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs">{c} <button className="text-indigo-400 hover:text-red-500"><X size={10} /></button></span>
              ))}
              <button onClick={() => showToast("Add category")} className="text-xs text-indigo-600 px-3 py-1.5 border border-dashed border-indigo-300 rounded-full hover:bg-indigo-50">+ Add</button>
            </div>
            <SelectField label="Default Course Duration" value="6 months" onChange={() => {}} options={["3 months", "4 months", "6 months", "9 months", "12 months"]} />
            <SelectField label="Batch Size Limit" value="30 students" onChange={() => {}} options={["15 students", "20 students", "25 students", "30 students", "40 students", "50 students"]} />
            <ToggleSwitch label="Allow batch transfers" desc="Students can request transfer between batches" toggleKey="batchTransfer" />
            <ToggleSwitch label="Course ratings" desc="Allow students to rate courses and mentors" toggleKey="courseRatings" />
            <SubmitButton label="Save Course Configuration" onClick={() => { setActiveSection(null); showToast("Course configuration saved!"); }} />
          </div>
        );

      case "Deal Stages":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Customize your deal pipeline stages and win probabilities.</p>
            {[
              { stage: "Qualification", probability: 20, color: "blue" },
              { stage: "Proposal", probability: 40, color: "yellow" },
              { stage: "Negotiation", probability: 60, color: "orange" },
              { stage: "Closed Won", probability: 100, color: "green" },
              { stage: "Closed Lost", probability: 0, color: "red" },
            ].map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center">{i + 1}</span><span className="text-sm font-medium text-gray-900">{d.stage}</span></div>
                <div className="flex items-center gap-3"><Badge color={d.color}>{d.probability}% probability</Badge><button onClick={() => showToast(`Editing ${d.stage}`)} className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              </div>
            ))}
            <ToggleSwitch label="Require reason for lost deals" desc="Mandate a reason when marking a deal as lost" toggleKey="lostReason" />
            <SubmitButton label="Save Deal Stages" onClick={() => { setActiveSection(null); showToast("Deal stages saved!"); }} />
          </div>
        );

      // ===== COMMUNICATION =====
      case "Email Templates":
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center"><p className="text-sm text-gray-500">{emailTemplates.length} templates</p><button onClick={() => showToast("Template editor opened")} className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1"><Plus size={14} /> New Template</button></div>
            {emailTemplates.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">Subject: {t.subject}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="purple">{t.category}</Badge>
                  <span className="text-xs text-gray-400">Used: {t.lastUsed}</span>
                  <button onClick={() => showToast(`Editing ${t.name}`)} className="text-gray-400 hover:text-indigo-600"><Edit size={14} /></button>
                  <button onClick={() => { setEmailTemplates(emailTemplates.filter(x => x.id !== t.id)); showToast("Template deleted"); }} className="text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        );

      case "SMS Templates":
        return (
          <div className="space-y-3">
            <ToggleSwitch label="Enable SMS notifications" desc="Send SMS alerts to leads and students" toggleKey="smsEnabled" />
            <SelectField label="SMS Provider" value="Twilio" onChange={() => {}} options={["Twilio", "MSG91", "Textlocal", "Kaleyra"]} />
            <InputField label="Sender ID" value="ROOMAN" onChange={() => {}} />
            <h4 className="text-sm font-semibold text-gray-700">SMS Templates</h4>
            {["Welcome SMS", "Fee Reminder", "Class Reminder", "OTP Verification", "Placement Update"].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{t}</span>
                <div className="flex gap-2"><Badge color="green">Active</Badge><button onClick={() => showToast(`Editing ${t}`)} className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              </div>
            ))}
            <SubmitButton label="Save SMS Settings" onClick={() => { setActiveSection(null); showToast("SMS settings saved!"); }} />
          </div>
        );

      case "WhatsApp Integration":
        return (
          <div className="space-y-3">
            <ToggleSwitch label="Enable WhatsApp Business" desc="Connect WhatsApp Business API for messaging" toggleKey="whatsappEnabled" />
            <InputField label="WhatsApp Business Number" value="+91 80 4123 4567" onChange={() => {}} />
            <SelectField label="API Provider" value="WhatsApp Business API (Official)" onChange={() => {}} options={["WhatsApp Business API (Official)", "Twilio WhatsApp", "WATI", "Interakt"]} />
            <h4 className="text-sm font-semibold text-gray-700">Auto-reply Messages</h4>
            <ToggleSwitch label="Welcome message" desc="Auto-reply when new contact messages" toggleKey="waWelcome" />
            <ToggleSwitch label="After-hours reply" desc="Auto-reply outside business hours" toggleKey="waAfterHours" />
            <ToggleSwitch label="Lead capture" desc="Automatically create lead from WhatsApp inquiries" toggleKey="waLeadCapture" />
            <SubmitButton label="Save WhatsApp Settings" onClick={() => { setActiveSection(null); showToast("WhatsApp integration saved!"); }} />
          </div>
        );

      case "Telephony":
        return (
          <div className="space-y-3">
            <ToggleSwitch label="Enable telephony integration" desc="Connect your phone system to the CRM" toggleKey="telephonyEnabled" />
            <SelectField label="Telephony Provider" value="Ozonetel" onChange={() => {}} options={["Ozonetel", "Exotel", "Knowlarity", "MyOperator", "Twilio"]} />
            <InputField label="Virtual Number" value="+91 80 6789 0123" onChange={() => {}} />
            <ToggleSwitch label="Call recording" desc="Automatically record all calls" toggleKey="callRecording" />
            <ToggleSwitch label="Call logging" desc="Log all calls in lead/student timeline" toggleKey="callLogging" />
            <ToggleSwitch label="Click-to-call" desc="Enable one-click calling from CRM" toggleKey="clickToCall" />
            <SelectField label="Business Hours" value="9:00 AM - 6:00 PM IST" onChange={() => {}} options={["9:00 AM - 6:00 PM IST", "9:00 AM - 8:00 PM IST", "8:00 AM - 9:00 PM IST", "24/7"]} />
            <SubmitButton label="Save Telephony Settings" onClick={() => { setActiveSection(null); showToast("Telephony settings saved!"); }} />
          </div>
        );

      // ===== AUTOMATION =====
      case "Workflow Rules":
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center"><p className="text-sm text-gray-500">{workflowRules.length} active workflows</p><button onClick={() => showToast("Workflow builder opened")} className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1"><Plus size={14} /> New Workflow</button></div>
            {workflowRules.map(w => (
              <div key={w.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{w.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge color={w.status === "Active" ? "green" : "gray"}>{w.status}</Badge>
                    <button onClick={() => { setWorkflowRules(workflowRules.map(x => x.id === w.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x)); showToast(`${w.name} ${w.status === "Active" ? "deactivated" : "activated"}`); }} className="text-xs text-indigo-600 hover:underline">{w.status === "Active" ? "Deactivate" : "Activate"}</button>
                  </div>
                </div>
                <p className="text-xs text-gray-500"><span className="font-medium">Trigger:</span> {w.trigger}</p>
                <p className="text-xs text-gray-500"><span className="font-medium">Action:</span> {w.action}</p>
              </div>
            ))}
          </div>
        );

      case "Assignment Rules":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Define how leads and tickets are automatically assigned.</p>
            <SelectField label="Lead Assignment Method" value="Round Robin" onChange={() => {}} options={["Round Robin", "Load Balanced", "Territory Based", "Course Based", "Manual"]} />
            {[
              { rule: "Full Stack leads → Priya M.", condition: "Course = Full Stack Development", active: true },
              { rule: "Data Science leads → Vikram S.", condition: "Course = Data Science", active: true },
              { rule: "AI/ML leads → Deepak R.", condition: "Course = AI & Machine Learning", active: true },
              { rule: "Walk-in leads → Nearest center counsellor", condition: "Source = Walk-in", active: true },
              { rule: "Corporate inquiries → Sales Manager", condition: "Deal value > ₹5,00,000", active: false },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div><p className="text-sm text-gray-900">{r.rule}</p><p className="text-xs text-gray-500">{r.condition}</p></div>
                <Badge color={r.active ? "green" : "gray"}>{r.active ? "Active" : "Inactive"}</Badge>
              </div>
            ))}
            <SubmitButton label="Save Assignment Rules" onClick={() => { setActiveSection(null); showToast("Assignment rules saved!"); }} />
          </div>
        );

      case "Scoring Rules":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Configure how lead scores are calculated automatically.</p>
            <h4 className="text-sm font-semibold text-gray-700">Score Criteria</h4>
            {[
              { criteria: "Website visit", points: "+5", icon: Globe },
              { criteria: "Email opened", points: "+3", icon: Mail },
              { criteria: "Brochure downloaded", points: "+10", icon: Download },
              { criteria: "Form submitted", points: "+15", icon: FileText },
              { criteria: "Demo attended", points: "+25", icon: Eye },
              { criteria: "Referred by student", points: "+20", icon: Users },
              { criteria: "No activity (7 days)", points: "-10", icon: Clock },
              { criteria: "Unsubscribed", points: "-30", icon: XCircle },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2"><s.icon size={14} className="text-indigo-500" /><span className="text-sm text-gray-700">{s.criteria}</span></div>
                <span className={`text-sm font-medium ${s.points.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{s.points} pts</span>
              </div>
            ))}
            <SelectField label="Hot Lead Threshold" value="80 points" onChange={() => {}} options={["60 points", "70 points", "80 points", "90 points"]} />
            <SubmitButton label="Save Scoring Rules" onClick={() => { setActiveSection(null); showToast("Scoring rules saved!"); }} />
          </div>
        );

      case "Escalation Rules":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Set up automatic escalation for overdue tasks and tickets.</p>
            {[
              { rule: "Ticket not responded in 4 hours", action: "Notify assigned agent + team lead", priority: "High" },
              { rule: "Ticket open > 24 hours", action: "Escalate to department manager", priority: "High" },
              { rule: "Ticket open > 48 hours", action: "Escalate to Admin + send email alert", priority: "Critical" },
              { rule: "Lead not contacted in 2 hours", action: "Reassign to available counsellor", priority: "Medium" },
              { rule: "Fee overdue > 15 days", action: "Notify finance team + student", priority: "Medium" },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{r.rule}</p>
                  <Badge color={r.priority === "Critical" ? "red" : r.priority === "High" ? "orange" : "yellow"}>{r.priority}</Badge>
                </div>
                <p className="text-xs text-gray-500">Action: {r.action}</p>
              </div>
            ))}
            <ToggleSwitch label="Enable email escalation alerts" desc="Send email when escalation is triggered" toggleKey="escalationEmail" />
            <ToggleSwitch label="Enable SMS escalation alerts" desc="Send SMS for critical escalations" toggleKey="escalationSms" />
            <SubmitButton label="Save Escalation Rules" onClick={() => { setActiveSection(null); showToast("Escalation rules saved!"); }} />
          </div>
        );

      // ===== INTEGRATIONS =====
      case "Payment Gateway":
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"><CheckCircle size={16} className="text-green-600" /><span className="text-sm font-medium text-green-800">Razorpay is connected and active</span></div>
            <ToggleSwitch label="Enable online fee collection" desc="Accept student fee payments online through Razorpay" toggleKey="onlinePayments" />
            <SelectField label="Payment Gateway" value="Razorpay" onChange={() => {}} options={["Razorpay", "PayU", "Cashfree", "Stripe", "PayTM"]} />
            <InputField label="Business / Merchant ID" value="FNluP1eoRtmlBm" onChange={() => {}} />
            <InputField label="API Key ID" value="rzp_live_SDXZ••••••••ub" onChange={() => {}} />
            <InputField label="API Key Secret" value="••••••••••••••••••••••••" onChange={() => {}} />
            <p className="text-xs text-amber-600 flex items-center gap-1"><AlertCircle size={12} /> API secrets should be stored securely on your backend server, never in frontend code.</p>
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Payment Options</h4>
            <ToggleSwitch label="EMI options" desc="Offer EMI payment plans to students" toggleKey="emiOptions" />
            <ToggleSwitch label="Auto-receipt generation" desc="Generate and email receipt on successful payment" toggleKey="autoReceipt" />
            <ToggleSwitch label="Payment reminders" desc="Send automated fee payment reminders via email & SMS" toggleKey="paymentReminder" />
            <ToggleSwitch label="Partial payments" desc="Allow students to make partial fee payments" toggleKey="partialPayments" />
            <SelectField label="Payment Methods" value="All (Cards, UPI, NetBanking, Wallets)" onChange={() => {}} options={["All (Cards, UPI, NetBanking, Wallets)", "UPI + Cards only", "UPI only", "Cards + NetBanking"]} />
            <SubmitButton label="Save Payment Settings" onClick={() => { setActiveSection(null); showToast("Payment gateway settings saved!"); }} />
          </div>
        );

      case "LMS Integration":
        return (
          <div className="space-y-3">
            <ToggleSwitch label="Enable LMS sync" desc="Sync student progress from your LMS" toggleKey="lmsSync" />
            <SelectField label="LMS Platform" value="Moodle" onChange={() => {}} options={["Moodle", "Canvas", "Google Classroom", "Custom LMS", "TalentLMS"]} />
            <InputField label="LMS URL" value="https://lms.rooman.net" onChange={() => {}} />
            <InputField label="API Token" value="••••••••••••••••" onChange={() => {}} />
            <ToggleSwitch label="Auto-enroll students" desc="Automatically create LMS account on enrollment" toggleKey="autoEnroll" />
            <ToggleSwitch label="Grade sync" desc="Sync grades and assessments from LMS" toggleKey="gradeSync" />
            <ToggleSwitch label="Attendance sync" desc="Pull attendance data from LMS" toggleKey="attendanceSync" />
            <SubmitButton label="Save LMS Settings" onClick={() => { setActiveSection(null); showToast("LMS integration saved!"); }} />
          </div>
        );

      case "Google Workspace":
        return (
          <div className="space-y-3">
            <ToggleSwitch label="Google Workspace integration" desc="Connect your Google Workspace account" toggleKey="googleWorkspace" />
            <InputField label="Google Workspace Domain" value="rooman.net" onChange={() => {}} />
            <h4 className="text-sm font-semibold text-gray-700">Sync Options</h4>
            <ToggleSwitch label="Gmail sync" desc="Sync emails from Gmail to CRM timeline" toggleKey="gmailSync" />
            <ToggleSwitch label="Google Calendar sync" desc="Sync meetings and events" toggleKey="calendarSync" />
            <ToggleSwitch label="Google Drive sync" desc="Attach Drive files to records" toggleKey="driveSync" />
            <ToggleSwitch label="Google Contacts sync" desc="Two-way contact synchronization" toggleKey="contactsSync" />
            <SubmitButton label="Save Google Workspace Settings" onClick={() => { setActiveSection(null); showToast("Google Workspace integration saved!"); }} />
          </div>
        );

      case "Social Media":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Manage social media integration, approval workflows, posting schedules, and CRM lead capture settings.</p>
            <h4 className="text-sm font-semibold text-gray-700">Connected Channels (from API)</h4>
            <SocialSettingsChannelList showToast={showToast} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Posting & Approval</h4>
            <ToggleSwitch label="Auto-publish approved posts" desc="Publish posts immediately after approval without manual step" toggleKey="socialAutoPublish" />
            <ToggleSwitch label="Require approval before publishing" desc="All posts need manager approval before going live" toggleKey="socialApprovalRequired" />
            <InputField label="Approval Workflow (comma-separated names)" value="Priya M., Manish" onChange={() => {}} />
            <InputField label="Default Hashtags (comma-separated)" value="#RoomanTechnologies, #EdTech, #SkillIndia, #CareerGrowth" onChange={() => {}} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Posting Schedule</h4>
            <InputField label="Weekday Post Times" value="09:00, 13:00, 18:00" onChange={() => {}} />
            <InputField label="Weekend Post Times" value="10:00, 17:00" onChange={() => {}} />
            <SelectField label="Timezone" value="Asia/Kolkata" onChange={() => {}} options={["Asia/Kolkata", "UTC", "America/New_York", "Europe/London"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">CRM Integration</h4>
            <ToggleSwitch label="Auto-create leads from social DMs" desc="Convert first-time social inquiries into CRM leads" toggleKey="socialAutoCreateLead" />
            <SelectField label="Default Lead Source" value="Social Media" onChange={() => {}} options={["Social Media", "Instagram DM", "Facebook Messenger", "LinkedIn InMail", "Twitter DM"]} />
            <SelectField label="Lead Assignment Rule" value="Round Robin" onChange={() => {}} options={["Round Robin", "Course Based", "Manual", "Geographic"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Notifications</h4>
            <ToggleSwitch label="New message alerts" desc="Get notified when new social messages arrive" toggleKey="socialNotifyMessage" />
            <ToggleSwitch label="New mention alerts" desc="Get notified when your brand is mentioned" toggleKey="socialNotifyMention" />
            <ToggleSwitch label="New follower alerts" desc="Get notified about new followers" toggleKey="socialNotifyFollower" />
            <ToggleSwitch label="New review alerts" desc="Get notified about new reviews on Google Business" toggleKey="socialNotifyReview" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Content Library</h4>
            <ToggleSwitch label="Enable Content Library" desc="Store reusable images, videos, and templates" toggleKey="socialContentLibrary" />
            <SelectField label="Max Scheduled Posts" value="100" onChange={() => {}} options={["50", "100", "200", "500", "Unlimited"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">RSS Feeds</h4>
            <div className="space-y-2">
              {[
                { name: "Rooman Blog", url: "https://blog.rooman.net/feed", enabled: true },
                { name: "EdTech News", url: "https://edtechnews.in/rss", enabled: false },
              ].map((feed, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div><p className="text-sm font-medium text-gray-900">{feed.name}</p><p className="text-xs text-gray-400">{feed.url}</p></div>
                  <Badge color={feed.enabled ? "green" : "gray"}>{feed.enabled ? "Active" : "Disabled"}</Badge>
                </div>
              ))}
              <button onClick={() => showToast("Add RSS feed dialog")} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-1"><Plus size={14} /> Add RSS Feed</button>
            </div>
            <SubmitButton label="Save Social Media Settings" onClick={() => {
              fetch("http://localhost:5000/api/social/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ autoPublish: toggles.socialAutoPublish || false, approvalRequired: toggles.socialApprovalRequired !== false }) })
                .then(() => { setActiveSection(null); showToast("Social media settings saved!"); })
                .catch(() => showToast("Failed to save", "error"));
            }} />
          </div>
        );

      // ===== CHANNELS =====
      case "Email Channel":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Configure email delivery, IMAP/SMTP settings, and email-to-lead capture.</p>
            <ToggleSwitch label="Enable email channel" desc="Send and receive emails directly from the CRM" toggleKey="emailChannelEnabled" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Outgoing Email (SMTP)</h4>
            <SelectField label="Email Provider" value="Google Workspace (Gmail)" onChange={() => {}} options={["Google Workspace (Gmail)", "Microsoft 365 (Outlook)", "Custom SMTP", "Amazon SES", "SendGrid"]} />
            <InputField label="From Email" value="info@rooman.net" onChange={() => {}} />
            <InputField label="From Name" value="Rooman Technologies" onChange={() => {}} />
            <InputField label="SMTP Server" value="smtp.gmail.com" onChange={() => {}} />
            <div className="grid grid-cols-2 gap-3">
              <InputField label="SMTP Port" value="587" onChange={() => {}} />
              <SelectField label="Encryption" value="TLS" onChange={() => {}} options={["TLS", "SSL", "None"]} />
            </div>
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Incoming Email (IMAP)</h4>
            <ToggleSwitch label="Enable IMAP sync" desc="Sync incoming emails to CRM records" toggleKey="imapSync" />
            <InputField label="IMAP Server" value="imap.gmail.com" onChange={() => {}} />
            <InputField label="IMAP Port" value="993" onChange={() => {}} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Email-to-Lead</h4>
            <ToggleSwitch label="Auto-create leads from emails" desc="Create new lead when email received from unknown address" toggleKey="emailToLead" />
            <InputField label="Lead Capture Email" value="leads@rooman.net" onChange={() => {}} />
            <SelectField label="Default Lead Source" value="Email" onChange={() => {}} options={["Email", "Website", "Referral", "Direct"]} />
            <SelectField label="Assign To" value="Round Robin - Sales Team" onChange={() => {}} options={["Round Robin - Sales Team", "Priya M.", "Vikram S.", "Deepak R.", "Unassigned"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Email Tracking</h4>
            <ToggleSwitch label="Track email opens" desc="Get notified when recipients open your emails" toggleKey="trackOpens" />
            <ToggleSwitch label="Track link clicks" desc="Track when recipients click links in your emails" toggleKey="trackClicks" />
            <ToggleSwitch label="Email scheduling" desc="Allow scheduling emails for later delivery" toggleKey="emailScheduling" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Email Signature</h4>
            <TextAreaField label="Default Signature" value={"Best regards,\nRooman Technologies Pvt. Ltd.\nKoramangala, Bangalore\n+91 80 4123 4567 | www.rooman.net"} onChange={() => {}} />
            <SubmitButton label="Save Email Channel Settings" onClick={() => { setActiveSection(null); showToast("Email channel settings saved!"); }} />
          </div>
        );

      case "Telephony Channel":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Set up cloud telephony for inbound/outbound calls, IVR, and call recording.</p>
            <ToggleSwitch label="Enable telephony channel" desc="Make and receive calls from the CRM" toggleKey="telephonyChannelEnabled" />
            <SelectField label="Telephony Provider" value="Ozonetel" onChange={() => {}} options={["Ozonetel", "Exotel", "Knowlarity", "MyOperator", "Twilio", "Tata Communications"]} />
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"><CheckCircle size={14} className="text-green-600" /><span className="text-sm text-green-800">Ozonetel connected</span></div>
            <InputField label="API Key" value="••••••••••••••••••" onChange={() => {}} />
            <InputField label="Agent ID" value="rooman_agent_01" onChange={() => {}} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Phone Numbers</h4>
            {[
              { number: "+91 80 6789 0123", type: "Toll-Free", assigned: "Sales Team", status: "Active" },
              { number: "+91 80 4123 4567", type: "Local", assigned: "Support Team", status: "Active" },
              { number: "+91 44 2812 3456", type: "Local", assigned: "Chennai Center", status: "Active" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div><p className="text-sm font-medium text-gray-900">{p.number}</p><p className="text-xs text-gray-500">{p.type} · {p.assigned}</p></div>
                <Badge color="green">{p.status}</Badge>
              </div>
            ))}
            <button onClick={() => showToast("Add new phone number")} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-2 text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-1"><Plus size={14} /> Add Phone Number</button>
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Call Settings</h4>
            <ToggleSwitch label="Call recording" desc="Record all inbound and outbound calls" toggleKey="chCallRecording" />
            <ToggleSwitch label="Click-to-call" desc="Enable one-click calling from lead/student records" toggleKey="chClickToCall" />
            <ToggleSwitch label="Call pop-up" desc="Show caller info pop-up on incoming calls" toggleKey="callPopup" />
            <ToggleSwitch label="Auto log calls" desc="Automatically log call details in CRM timeline" toggleKey="autoLogCalls" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">IVR Menu</h4>
            <ToggleSwitch label="Enable IVR" desc="Interactive Voice Response for incoming calls" toggleKey="ivrEnabled" />
            <TextAreaField label="IVR Welcome Message" value="Welcome to Rooman Technologies. Press 1 for Admissions, Press 2 for Student Support, Press 3 for Accounts, Press 0 to speak to an agent." onChange={() => {}} />
            <SelectField label="Business Hours" value="Mon-Sat, 9:00 AM - 7:00 PM IST" onChange={() => {}} options={["Mon-Fri, 9:00 AM - 6:00 PM IST", "Mon-Sat, 9:00 AM - 7:00 PM IST", "Mon-Sat, 8:00 AM - 9:00 PM IST", "24/7"]} />
            <TextAreaField label="After-hours Message" value="Thank you for calling Rooman Technologies. Our office hours are Monday to Saturday, 9 AM to 7 PM. Please leave a message or call back during business hours." onChange={() => {}} />
            <SubmitButton label="Save Telephony Channel Settings" onClick={() => { setActiveSection(null); showToast("Telephony channel settings saved!"); }} />
          </div>
        );

      case "Business Messaging":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Connect WhatsApp Business, Telegram, and other messaging platforms for student communication.</p>
            <h4 className="text-sm font-semibold text-gray-700">Connected Platforms</h4>
            {[
              { name: "WhatsApp Business", number: "+91 80 4123 4567", status: "Connected", provider: "Official API", color: "green" },
              { name: "Telegram Bot", number: "@RoomanEduBot", status: "Connected", provider: "Bot API", color: "blue" },
              { name: "Facebook Messenger", number: "Rooman Technologies", status: "Not Connected", provider: "-", color: "gray" },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div><p className="text-sm font-medium text-gray-900">{m.name}</p><p className="text-xs text-gray-500">{m.number} · {m.provider}</p></div>
                <div className="flex items-center gap-2">
                  <Badge color={m.color}>{m.status}</Badge>
                  <button onClick={() => showToast(`${m.name} settings opened`)} className="text-xs text-indigo-600 hover:underline">{m.status === "Connected" ? "Configure" : "Connect"}</button>
                </div>
              </div>
            ))}
            <h4 className="text-sm font-semibold text-gray-700 pt-1">WhatsApp Business Settings</h4>
            <SelectField label="WhatsApp API Provider" value="Official WhatsApp Business API" onChange={() => {}} options={["Official WhatsApp Business API", "Twilio WhatsApp", "WATI", "Interakt", "Gupshup"]} />
            <InputField label="Business Phone Number" value="+91 80 4123 4567" onChange={() => {}} />
            <InputField label="API Key" value="••••••••••••••••••" onChange={() => {}} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Message Templates</h4>
            {["Welcome Message", "Course Inquiry Reply", "Admission Confirmation", "Fee Payment Reminder", "Class Schedule", "Placement Update"].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{t}</span>
                <div className="flex items-center gap-2"><Badge color="green">Approved</Badge><button onClick={() => showToast(`Editing ${t}`)} className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              </div>
            ))}
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Automation</h4>
            <ToggleSwitch label="Auto-reply on new message" desc="Send instant reply when a new contact messages" toggleKey="bmAutoReply" />
            <ToggleSwitch label="Auto-create leads" desc="Create a new lead from first-time WhatsApp inquiries" toggleKey="bmAutoLead" />
            <ToggleSwitch label="Chatbot enabled" desc="Use AI chatbot to answer common questions" toggleKey="bmChatbot" />
            <ToggleSwitch label="After-hours auto-reply" desc="Send automated reply outside business hours" toggleKey="bmAfterHours" />
            <SubmitButton label="Save Business Messaging Settings" onClick={() => { setActiveSection(null); showToast("Business messaging settings saved!"); }} />
          </div>
        );

      case "Notification SMS":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Configure transactional and notification SMS for leads, students, and internal alerts.</p>
            <ToggleSwitch label="Enable SMS notifications" desc="Send SMS alerts for CRM events" toggleKey="smsChannelEnabled" />
            <SelectField label="SMS Gateway Provider" value="MSG91" onChange={() => {}} options={["MSG91", "Twilio", "Textlocal", "Kaleyra", "Gupshup", "Amazon SNS"]} />
            <InputField label="API Key" value="••••••••••••••••••" onChange={() => {}} />
            <InputField label="Sender ID (6 chars)" value="ROOMAN" onChange={() => {}} />
            <SelectField label="SMS Type" value="Transactional (DND bypass)" onChange={() => {}} options={["Transactional (DND bypass)", "Promotional", "Both"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Notification Rules</h4>
            {[
              { event: "New lead assigned", recipient: "Counsellor", sms: true },
              { event: "Fee payment received", recipient: "Student + Admin", sms: true },
              { event: "Fee payment overdue", recipient: "Student", sms: true },
              { event: "Class reminder (1 day before)", recipient: "Student", sms: true },
              { event: "Batch start reminder", recipient: "Student + Mentor", sms: true },
              { event: "Certificate ready", recipient: "Student", sms: false },
              { event: "Placement drive scheduled", recipient: "Eligible Students", sms: false },
              { event: "Ticket escalated", recipient: "Manager", sms: true },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <div><p className="text-sm text-gray-700">{r.event}</p><p className="text-xs text-gray-400">To: {r.recipient}</p></div>
                <button onClick={() => showToast(`${r.event} SMS ${r.sms ? "disabled" : "enabled"}`)} className={`relative w-10 h-5 rounded-full transition-colors ${r.sms ? "bg-indigo-600" : "bg-gray-300"}`}><span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow ${r.sms ? "right-0.5" : "left-0.5"}`}></span></button>
              </div>
            ))}
            <h4 className="text-sm font-semibold text-gray-700 pt-1">SMS Templates</h4>
            {["OTP Verification", "Welcome SMS", "Fee Reminder", "Class Reminder", "Payment Confirmation", "Batch Assignment"].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{t}</span>
                <div className="flex gap-2"><Badge color="green">Active</Badge><button onClick={() => showToast(`Editing ${t}`)} className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              </div>
            ))}
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Limits & Compliance</h4>
            <InputField label="Daily SMS Limit" value="5000" onChange={() => {}} />
            <ToggleSwitch label="DLT compliance" desc="Register templates with TRAI DLT portal" toggleKey="dltCompliance" />
            <ToggleSwitch label="Opt-out management" desc="Automatically handle STOP/unsubscribe requests" toggleKey="smsOptOut" />
            <SubmitButton label="Save Notification SMS Settings" onClick={() => { setActiveSection(null); showToast("Notification SMS settings saved!"); }} />
          </div>
        );

      case "Webforms":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Create and manage web forms to capture leads from your website and landing pages.</p>
            <div className="flex justify-between items-center"><p className="text-sm font-medium text-gray-700">Your Web Forms</p><button onClick={() => showToast("Form builder opened")} className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1"><Plus size={14} /> Create Web Form</button></div>
            {[
              { name: "Course Inquiry Form", url: "rooman.net/inquiry", leads: 234, conversion: "18%", status: "Active", fields: 6 },
              { name: "Free Demo Registration", url: "rooman.net/demo", leads: 156, conversion: "32%", status: "Active", fields: 4 },
              { name: "Corporate Training Inquiry", url: "rooman.net/corporate", leads: 45, conversion: "22%", status: "Active", fields: 8 },
              { name: "Newsletter Signup", url: "rooman.net/newsletter", leads: 890, conversion: "45%", status: "Active", fields: 2 },
              { name: "Placement Registration", url: "rooman.net/placement", leads: 67, conversion: "60%", status: "Inactive", fields: 5 },
            ].map((f, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div><p className="text-sm font-medium text-gray-900">{f.name}</p><p className="text-xs text-gray-400">{f.url} · {f.fields} fields</p></div>
                  <div className="flex items-center gap-2">
                    <Badge color={f.status === "Active" ? "green" : "gray"}>{f.status}</Badge>
                    <button onClick={() => showToast(`Editing ${f.name}`)} className="text-xs text-indigo-600 hover:underline">Edit</button>
                    <button onClick={() => showToast("Embed code copied!")} className="text-xs text-gray-500 hover:underline flex items-center gap-1"><Code size={10} /> Embed</button>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{f.leads} leads captured</span>
                  <span>{f.conversion} conversion rate</span>
                </div>
              </div>
            ))}
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Form Settings</h4>
            <SelectField label="Default Lead Source" value="Webform" onChange={() => {}} options={["Webform", "Website", "Landing Page"]} />
            <SelectField label="Auto-assign to" value="Round Robin - Sales Team" onChange={() => {}} options={["Round Robin - Sales Team", "Priya M.", "Vikram S.", "Deepak R.", "Unassigned"]} />
            <ToggleSwitch label="Auto-response email" desc="Send confirmation email after form submission" toggleKey="formAutoResponse" />
            <ToggleSwitch label="CAPTCHA protection" desc="Add CAPTCHA to prevent spam submissions" toggleKey="formCaptcha" />
            <ToggleSwitch label="Double opt-in" desc="Require email verification after submission" toggleKey="formDoubleOptIn" />
            <ToggleSwitch label="Duplicate detection" desc="Check for existing leads before creating new ones" toggleKey="formDuplicateCheck" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Embed Options</h4>
            <SelectField label="Form Style" value="Inline Embed" onChange={() => {}} options={["Inline Embed", "Pop-up Modal", "Slide-in Panel", "Full Page"]} />
            <InputField label="Thank You Page URL" value="https://www.rooman.net/thank-you" onChange={() => {}} />
            <SubmitButton label="Save Webform Settings" onClick={() => { setActiveSection(null); showToast("Webform settings saved!"); }} />
          </div>
        );

      case "Social Channel":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Configure social channel behavior, lead capture rules, brand monitoring, and engagement settings.</p>
            <h4 className="text-sm font-semibold text-gray-700">Connected Accounts (Live from API)</h4>
            <SocialSettingsChannelList showToast={showToast} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Social Lead Capture</h4>
            <ToggleSwitch label="Auto-create leads from social DMs" desc="Convert first-time social inquiries into CRM leads" toggleKey="scAutoLead" />
            <ToggleSwitch label="Comment monitoring" desc="Track and respond to comments mentioning your brand" toggleKey="scCommentMonitor" />
            <ToggleSwitch label="Ad lead sync" desc="Auto-import leads from Facebook/Instagram/LinkedIn Lead Ads" toggleKey="scAdLeadSync" />
            <SelectField label="Default Lead Source" value="Social Media" onChange={() => {}} options={["Social Media", "Instagram DM", "Facebook Messenger", "LinkedIn InMail", "Twitter DM"]} />
            <SelectField label="Lead Assignment Rule" value="Round Robin" onChange={() => {}} options={["Round Robin", "Course Based", "Manual", "Geographic"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Brand Monitoring</h4>
            <ToggleSwitch label="Keyword tracking" desc="Monitor social platforms for brand keywords" toggleKey="scKeywordTrack" />
            <InputField label="Tracked Keywords (comma separated)" value="Rooman, rooman technologies, rooman education, rooman training, #RoomanTechnologies" onChange={() => {}} />
            <ToggleSwitch label="Sentiment alerts" desc="Get notified about negative mentions" toggleKey="scSentimentAlert" />
            <ToggleSwitch label="Competitor tracking" desc="Track competitor mentions and content" toggleKey="scCompetitorTrack" />
            <InputField label="Competitor Handles (comma separated)" value="@simplilearn, @upgrad, @intellipaat" onChange={() => {}} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Engagement Rules</h4>
            <ToggleSwitch label="Auto-respond to DMs" desc="Send automated first response to new messages" toggleKey="scAutoRespond" />
            <InputField label="Auto-response Message" value="Thanks for reaching out to Rooman Technologies! A team member will respond shortly." onChange={() => {}} />
            <SelectField label="Business Hours for Responses" value="Mon-Sat, 9:00 AM - 7:00 PM IST" onChange={() => {}} options={["Mon-Fri, 9:00 AM - 6:00 PM IST", "Mon-Sat, 9:00 AM - 7:00 PM IST", "24/7"]} />
            <SubmitButton label="Save Social Channel Settings" onClick={() => {
              fetch("http://localhost:5000/api/social/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ crmIntegration: { autoCreateLead: toggles.scAutoLead !== false, leadSource: "Social Media", assignmentRule: "Round Robin" } }) })
                .then(() => { setActiveSection(null); showToast("Social channel settings saved!"); })
                .catch(() => showToast("Failed to save", "error"));
            }} />
          </div>
        );

      case "Chat":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Add live chat to your website for real-time visitor engagement and lead capture.</p>
            <ToggleSwitch label="Enable live chat" desc="Show chat widget on your website" toggleKey="chatEnabled" />
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <p className="text-sm font-medium text-indigo-800">Chat Widget Preview</p>
              <div className="mt-2 bg-white rounded-lg border border-gray-200 p-3 max-w-[280px]">
                <div className="bg-indigo-600 text-white rounded-t-lg px-3 py-2 text-sm font-medium">Rooman Technologies</div>
                <div className="p-3 text-xs text-gray-600 space-y-2">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">Hi! Welcome to Rooman. How can we help you today?</div>
                  <div className="bg-indigo-100 rounded-lg px-3 py-2 ml-8">I want to know about AI courses</div>
                </div>
                <div className="border-t border-gray-200 px-3 py-2 text-xs text-gray-400">Type your message...</div>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Chat Appearance</h4>
            <InputField label="Chat Title" value="Rooman Technologies" onChange={() => {}} />
            <InputField label="Welcome Message" value="Hi! Welcome to Rooman. How can we help you today?" onChange={() => {}} />
            <SelectField label="Widget Color" value="Indigo (#4F46E5)" onChange={() => {}} options={["Indigo (#4F46E5)", "Blue (#2563EB)", "Green (#059669)", "Red (#DC2626)", "Purple (#7C3AED)"]} />
            <SelectField label="Widget Position" value="Bottom Right" onChange={() => {}} options={["Bottom Right", "Bottom Left"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Chat Routing</h4>
            <SelectField label="Route chats to" value="Round Robin - Available Agents" onChange={() => {}} options={["Round Robin - Available Agents", "Sales Team", "Support Team", "Priya M.", "Vikram S."]} />
            <SelectField label="Offline behavior" value="Show leave-a-message form" onChange={() => {}} options={["Show leave-a-message form", "Hide widget", "Show chatbot only"]} />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Chatbot & Automation</h4>
            <ToggleSwitch label="AI Chatbot" desc="Use AI to answer common queries automatically" toggleKey="chatAiBot" />
            <ToggleSwitch label="Pre-chat form" desc="Collect visitor name and email before chat begins" toggleKey="preChatForm" />
            <ToggleSwitch label="Auto-create leads from chat" desc="Create a lead when a new visitor starts a chat" toggleKey="chatAutoLead" />
            <ToggleSwitch label="Chat transcripts" desc="Email chat transcript to visitor after conversation" toggleKey="chatTranscripts" />
            <ToggleSwitch label="File sharing" desc="Allow visitors to share files/screenshots in chat" toggleKey="chatFileSharing" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Triggers</h4>
            {[
              { trigger: "Visitor on pricing page > 30 seconds", action: "Show proactive chat: Need help choosing a course?" },
              { trigger: "Visitor viewed 3+ course pages", action: "Show pop-up: Want a free counselling session?" },
              { trigger: "Returning visitor", action: "Show welcome back message" },
            ].map((t, i) => (
              <div key={i} className="p-2.5 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{t.trigger}</p>
                <p className="text-xs text-gray-500">→ {t.action}</p>
              </div>
            ))}
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Embed Code</h4>
            <div className="bg-gray-900 text-green-400 rounded-lg p-3 text-xs font-mono overflow-x-auto">
              {"<script src=\"https://crm.rooman.net/chat/widget.js\" data-id=\"rooman-crm\"></script>"}
            </div>
            <button onClick={() => showToast("Embed code copied to clipboard!")} className="text-sm text-indigo-600 hover:underline flex items-center gap-1"><Code size={14} /> Copy Embed Code</button>
            <SubmitButton label="Save Chat Settings" onClick={() => { setActiveSection(null); showToast("Chat settings saved!"); }} />
          </div>
        );

      case "Portals":
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Create self-service portals for students, corporate clients, and mentors to access their information.</p>
            <h4 className="text-sm font-semibold text-gray-700">Active Portals</h4>
            {[
              { name: "Student Portal", url: "students.rooman.net", users: 569, features: "Course progress, Certificates, Fee payments, Support tickets", status: "Active", icon: GraduationCap },
              { name: "Corporate Client Portal", url: "corporate.rooman.net", users: 24, features: "Batch tracking, Invoices, Reports, Training calendar", status: "Active", icon: Briefcase },
              { name: "Mentor Portal", url: "mentors.rooman.net", users: 15, features: "Student list, Attendance, Grade entry, Schedule", status: "Active", icon: Award },
              { name: "Alumni Portal", url: "alumni.rooman.net", users: 0, features: "Job board, Networking, Events, Referrals", status: "Draft", icon: Users },
            ].map((p, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2"><p.icon size={16} className="text-indigo-600" /><p className="text-sm font-medium text-gray-900">{p.name}</p></div>
                  <div className="flex items-center gap-2">
                    <Badge color={p.status === "Active" ? "green" : "gray"}>{p.status}</Badge>
                    <button onClick={() => showToast(`Configuring ${p.name}`)} className="text-xs text-indigo-600 hover:underline">Configure</button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">{p.url} · {p.users} users</p>
                <p className="text-xs text-gray-400">Features: {p.features}</p>
              </div>
            ))}
            <button onClick={() => showToast("Create new portal")} className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-1"><Plus size={14} /> Create New Portal</button>
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Student Portal Settings</h4>
            <ToggleSwitch label="Self-service enrollment" desc="Allow students to browse and enroll in courses" toggleKey="portalSelfEnroll" />
            <ToggleSwitch label="Online fee payment" desc="Students can pay fees through the portal" toggleKey="portalFeePayment" />
            <ToggleSwitch label="Certificate download" desc="Students can download certificates" toggleKey="portalCertDownload" />
            <ToggleSwitch label="Support ticket creation" desc="Students can create support tickets" toggleKey="portalTickets" />
            <ToggleSwitch label="Progress dashboard" desc="Show course progress and grades" toggleKey="portalProgress" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Portal Branding</h4>
            <InputField label="Portal Title" value="Rooman Student Hub" onChange={() => {}} />
            <SelectField label="Theme Color" value="Indigo" onChange={() => {}} options={["Indigo", "Blue", "Green", "Purple", "Custom"]} />
            <InputField label="Custom Domain" value="students.rooman.net" onChange={() => {}} />
            <ToggleSwitch label="Custom login page" desc="Use your own branded login page" toggleKey="portalCustomLogin" />
            <h4 className="text-sm font-semibold text-gray-700 pt-1">Authentication</h4>
            <SelectField label="Login Method" value="Email + OTP" onChange={() => {}} options={["Email + Password", "Email + OTP", "Google SSO", "Email + Password + Google SSO"]} />
            <ToggleSwitch label="Two-factor authentication" desc="Require 2FA for portal access" toggleKey="portal2FA" />
            <SubmitButton label="Save Portal Settings" onClick={() => { setActiveSection(null); showToast("Portal settings saved!"); }} />
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Configure your {activeSection?.toLowerCase()} preferences below.</p>
            <ToggleSwitch label={`Enable ${activeSection}`} desc="Turn this feature on or off" toggleKey={`enable_${activeSection}`} />
            <ToggleSwitch label="Notifications" desc={`Receive alerts for ${activeSection?.toLowerCase()}`} toggleKey={`notify_${activeSection}`} />
            <SubmitButton label="Save Settings" onClick={() => { setActiveSection(null); showToast(`${activeSection} settings saved!`); }} />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div><h2 className="text-xl font-bold text-gray-900">Settings</h2><p className="text-sm text-gray-500">Configure your CRM, integrations, and preferences</p></div>
      <div className="grid grid-cols-3 gap-4">
        {settingSections.map(section => (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3"><section.icon size={18} className="text-indigo-600" /><h3 className="font-semibold text-gray-900">{section.title}</h3></div>
            <div className="space-y-1">
              {section.items.map(item => (
                <button key={item} onClick={() => setActiveSection(item)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors">
                  {item} <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Settings Detail Modal */}
      <Modal isOpen={!!activeSection} onClose={() => setActiveSection(null)} title={`${activeSection} Settings`}>
        {renderSettingsContent()}
      </Modal>

      {/* Add Branch Modal */}
      <Modal isOpen={showBranchModal} onClose={() => setShowBranchModal(false)} title="Add New Branch">
        <div className="space-y-3">
          <InputField label="Branch Name" value={newBranch.name} onChange={(v) => setNewBranch({ ...newBranch, name: v })} />
          <InputField label="City" value={newBranch.city} onChange={(v) => setNewBranch({ ...newBranch, city: v })} />
          <InputField label="Address" value={newBranch.address} onChange={(v) => setNewBranch({ ...newBranch, address: v })} />
          <InputField label="Branch Head" value={newBranch.head} onChange={(v) => setNewBranch({ ...newBranch, head: v })} />
          <InputField label="Phone" value={newBranch.phone} onChange={(v) => setNewBranch({ ...newBranch, phone: v })} />
          <SubmitButton label="Add Branch" onClick={() => {
            if (!newBranch.name) return;
            setBranches([...branches, { ...newBranch, id: Date.now() }]);
            setShowBranchModal(false);
            setNewBranch({ name: "", city: "", address: "", head: "", phone: "", status: "Active" });
            showToast("Branch added successfully!");
          }} />
        </div>
      </Modal>

      {/* Add User Modal */}
      <Modal isOpen={showUserModal} onClose={() => setShowUserModal(false)} title="Add New User">
        <div className="space-y-3">
          <InputField label="Full Name" value={newUser.name} onChange={(v) => setNewUser({ ...newUser, name: v })} />
          <InputField label="Email" value={newUser.email} onChange={(v) => setNewUser({ ...newUser, email: v })} />
          <SelectField label="Role" value={newUser.role} onChange={(v) => setNewUser({ ...newUser, role: v })} options={["Admin", "Sales Manager", "Counsellor", "Mentor", "Support"]} />
          <SubmitButton label="Add User" onClick={() => {
            if (!newUser.name || !newUser.email) return;
            setUsers([...users, { ...newUser, id: Date.now(), lastLogin: "Never" }]);
            setShowUserModal(false);
            setNewUser({ name: "", email: "", role: "Counsellor", status: "Active" });
            showToast("User added successfully!");
          }} />
        </div>
      </Modal>
    </div>
  );
}

// ===== SOCIAL MEDIA MODULE =====
// SocialMediaModule is now imported from ./SocialMedia.jsx