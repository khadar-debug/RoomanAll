import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Plus, Edit, Trash2, Eye, X, Check, Clock, Calendar, Search,
  ChevronDown, ChevronRight, Target, DollarSign, Users, TrendingUp,
  CheckCircle, AlertCircle, ArrowRight, MoreVertical, Star,
  Megaphone, BarChart2, Globe, Layers, FileText, Zap, Send,
  ArrowUp, ArrowDown, Flag, Filter, GripVertical, Play, Pause,
  LayoutGrid, List, Save, MessageSquare, ExternalLink
} from "lucide-react";

// ===== Utility Components =====
const MPBadge = ({ children, color = "blue" }) => {
  const c = { blue: "bg-blue-100 text-blue-800", green: "bg-green-100 text-green-800", yellow: "bg-yellow-100 text-yellow-800", red: "bg-red-100 text-red-800", purple: "bg-purple-100 text-purple-800", gray: "bg-gray-100 text-gray-700", indigo: "bg-indigo-100 text-indigo-800", orange: "bg-orange-100 text-orange-800", pink: "bg-pink-100 text-pink-800" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c[color] || c.blue}`}>{children}</span>;
};

const MPModal = ({ isOpen, onClose, title, children, wide }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className={`bg-white rounded-xl shadow-xl ${wide ? "max-w-4xl" : "max-w-2xl"} w-full max-h-[90vh] overflow-y-auto m-4`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4", "#F97316"];

const statusColors = { "Ideating": "yellow", "Yet to Start": "gray", "In Progress": "blue", "Scheduled": "indigo", "Completed": "green", "On Hold": "orange", "Cancelled": "red" };
const typeColors = { "Lead generation": "indigo", "Lead nurturing": "purple", "Brand awareness": "blue", "Event promotion": "pink", "Product launch": "orange", "Student enrollment": "green", "Alumni engagement": "yellow" };
const priorityColors = { high: "red", medium: "yellow", low: "blue" };
const channelColors = { "Google Ads": "#4285F4", "Meta Ads": "#1877F2", "Email": "#10B981", "Social Media": "#EC4899", "Webinar": "#8B5CF6", "SMS": "#F59E0B", "Content": "#06B6D4", "SEO": "#F97316", "WhatsApp": "#25D366", "Events": "#EF4444", "Others": "#6B7280" };

// ===== MAIN COMPONENT =====
export default function MarketingPlannerModule({ showToast }) {
  // Planners (top-level)
  const [planners, setPlanners] = useState([
    { id: 1, name: "Website → Qualified Lead Conversion (Month 1)", type: "Lead generation", status: "Completed", createdBy: "Project Team", createdAt: "2025-12-30", startDate: "2026-01-05", endDate: "2026-01-31", totalBudget: 250000, totalExpense: 185000, description: "Drive qualified leads from website traffic using multi-channel strategy." },
    { id: 2, name: "JNTUA Planner", type: "Lead nurturing", status: "Completed", createdBy: "ROOMAN", createdAt: "2025-01-15", startDate: "2025-01-20", endDate: "2025-03-30", totalBudget: 150000, totalExpense: 142000, description: "Nurture JNTUA college students through targeted campaigns." },
    { id: 3, name: "Rajajinagar", type: "Lead generation", status: "Completed", createdBy: "ROOMAN", createdAt: "2024-01-12", startDate: "2024-01-15", endDate: "2024-03-15", totalBudget: 100000, totalExpense: 95000, description: "Local area marketing for Rajajinagar center." },
    { id: 4, name: "Q2 2026 Student Enrollment Drive", type: "Student enrollment", status: "In Progress", createdBy: "Marketing Team", createdAt: "2026-03-15", startDate: "2026-04-01", endDate: "2026-06-30", totalBudget: 500000, totalExpense: 45000, description: "Aggressive enrollment drive across all centers for AI, Data Science, Cloud, and Cyber Security batches." },
    { id: 5, name: "Alumni Network Campaign", type: "Alumni engagement", status: "Ideating", createdBy: "ROOMAN", createdAt: "2026-03-28", startDate: "2026-05-01", endDate: "2026-07-31", totalBudget: 80000, totalExpense: 0, description: "Re-engage alumni for referrals, testimonials, and upskilling." },
  ]);

  // Activities (per planner)
  const [activities, setActivities] = useState([
    { id: 1, plannerId: 1, name: "Meta + Google Ads Campaign", description: "Run paid ads on Meta and Google for lead generation", status: "Ideating", channel: "Google Ads", budget: 250000, expense: 0, startDate: "2026-01-01", endDate: "2026-01-31", assignee: "Digital Team", priority: "high", leadsTarget: 500, leadsAcquired: 0 },
    { id: 2, plannerId: 1, name: "Website Landing Page Optimization", description: "Optimize landing pages for higher conversion", status: "Ideating", channel: "SEO", budget: 0, expense: 0, startDate: "2026-01-01", endDate: "2026-01-15", assignee: "Web Team", priority: "high", leadsTarget: 0, leadsAcquired: 0 },
    { id: 3, plannerId: 1, name: "Weekly Funnel Review", description: "Weekly analysis of conversion funnel", status: "Ideating", channel: "Others", budget: 0, expense: 0, startDate: "2026-01-05", endDate: "2026-01-31", assignee: "Analytics Team", priority: "medium", leadsTarget: 0, leadsAcquired: 0 },
    { id: 4, plannerId: 1, name: "Email Drip Campaign", description: "Automated email sequence for new leads", status: "Ideating", channel: "Email", budget: 0, expense: 0, startDate: "2026-01-05", endDate: "2026-01-31", assignee: "Email Team", priority: "medium", leadsTarget: 200, leadsAcquired: 0 },
    { id: 5, plannerId: 4, name: "Google Ads - Course Campaigns", description: "Targeted ads for AI, Data Science, Cloud courses", status: "In Progress", channel: "Google Ads", budget: 200000, expense: 25000, startDate: "2026-04-01", endDate: "2026-06-30", assignee: "Digital Team", priority: "high", leadsTarget: 1000, leadsAcquired: 125 },
    { id: 6, plannerId: 4, name: "Instagram & Facebook Ads", description: "Social media ads targeting 20-30 age group", status: "In Progress", channel: "Meta Ads", budget: 150000, expense: 15000, startDate: "2026-04-01", endDate: "2026-06-30", assignee: "Social Team", priority: "high", leadsTarget: 800, leadsAcquired: 90 },
    { id: 7, plannerId: 4, name: "College Webinar Series", description: "Free webinars at top engineering colleges", status: "Yet to Start", channel: "Webinar", budget: 50000, expense: 0, startDate: "2026-04-15", endDate: "2026-05-31", assignee: "Events Team", priority: "medium", leadsTarget: 300, leadsAcquired: 0 },
    { id: 8, plannerId: 4, name: "WhatsApp Nurture Flow", description: "WhatsApp drip for interested leads", status: "Scheduled", channel: "WhatsApp", budget: 20000, expense: 5000, startDate: "2026-04-05", endDate: "2026-06-30", assignee: "Comm Team", priority: "medium", leadsTarget: 500, leadsAcquired: 30 },
    { id: 9, plannerId: 4, name: "Email Newsletter Campaign", description: "Bi-weekly newsletter with course highlights and success stories", status: "Yet to Start", channel: "Email", budget: 10000, expense: 0, startDate: "2026-04-10", endDate: "2026-06-30", assignee: "Content Team", priority: "low", leadsTarget: 200, leadsAcquired: 0 },
    { id: 10, plannerId: 4, name: "SEO Content Push", description: "Blog posts and landing pages for organic traffic", status: "In Progress", channel: "Content", budget: 30000, expense: 5000, startDate: "2026-04-01", endDate: "2026-06-30", assignee: "Content Team", priority: "medium", leadsTarget: 400, leadsAcquired: 45 },
  ]);

  // Goals (per planner)
  const [goals, setGoals] = useState([
    { id: 1, plannerId: 1, title: "Website → Qualified Lead Conversion (Month 1)", metric: "Qualified Leads", targetValue: 500, currentValue: 320, createdAt: "2025-12-30" },
    { id: 2, plannerId: 4, title: "Enroll 200 students in Q2", metric: "Enrollments", targetValue: 200, currentValue: 28, createdAt: "2026-03-15" },
    { id: 3, plannerId: 4, title: "Generate 3000 leads in Q2", metric: "Leads Generated", targetValue: 3000, currentValue: 290, createdAt: "2026-03-15" },
    { id: 4, plannerId: 4, title: "Keep CPA under ₹1500", metric: "Cost Per Acquisition (₹)", targetValue: 1500, currentValue: 1550, createdAt: "2026-03-15" },
  ]);

  // State
  const [view, setView] = useState("list"); // list | detail
  const [activePlanner, setActivePlanner] = useState(null);
  const [activeTab, setActiveTab] = useState("planner");
  const [plannerModal, setPlannerModal] = useState(false);
  const [editingPlanner, setEditingPlanner] = useState(null);
  const [pf, setPf] = useState({ name: "", type: "Lead generation", startDate: "", endDate: "", totalBudget: 0, description: "" });
  const [activityModal, setActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [actf, setActf] = useState({ name: "", description: "", channel: "Google Ads", budget: 0, startDate: "", endDate: "", assignee: "", priority: "medium", leadsTarget: 0 });
  const [goalModal, setGoalModal] = useState(false);
  const [gf, setGf] = useState({ title: "", metric: "", targetValue: 0 });
  // Contacts (per planner)
  const [contacts, setContacts] = useState([
    { id: 1, plannerId: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 9876543210", source: "Google Ads", status: "Qualified", addedAt: "2026-01-08", city: "Bangalore", course: "AI & ML" },
    { id: 2, plannerId: 1, name: "Sneha Reddy", email: "sneha.r@gmail.com", phone: "+91 7654321098", source: "Website", status: "Enrolled", addedAt: "2026-01-10", city: "Bangalore", course: "AI & ML" },
    { id: 3, plannerId: 1, name: "Arjun Nair", email: "arjun.n@gmail.com", phone: "+91 6543210987", source: "Meta Ads", status: "Contacted", addedAt: "2026-01-12", city: "Kochi", course: "Cyber Security" },
    { id: 4, plannerId: 4, name: "Priya Menon", email: "priya.m@gmail.com", phone: "+91 9988776655", source: "Google Ads", status: "New", addedAt: "2026-04-02", city: "Chennai", course: "Data Science" },
    { id: 5, plannerId: 4, name: "Karthik V.", email: "karthik.v@gmail.com", phone: "+91 8877665544", source: "Webinar", status: "Qualified", addedAt: "2026-04-05", city: "Bangalore", course: "Cloud Computing" },
    { id: 6, plannerId: 4, name: "Anitha K.", email: "anitha.k@yahoo.com", phone: "+91 9123456789", source: "Instagram", status: "Contacted", addedAt: "2026-04-03", city: "Chennai", course: "Data Science" },
    { id: 7, plannerId: 4, name: "Mohammed Faisal", email: "faisal.m@outlook.com", phone: "+91 8765432109", source: "WhatsApp", status: "Qualified", addedAt: "2026-04-06", city: "Hyderabad", course: "Cloud Computing" },
    { id: 8, plannerId: 4, name: "Deepika S.", email: "deepika.s@gmail.com", phone: "+91 7766554433", source: "Email", status: "New", addedAt: "2026-04-08", city: "Bangalore", course: "AI & ML" },
    { id: 9, plannerId: 4, name: "Rohit Jain", email: "rohit.j@gmail.com", phone: "+91 9900887766", source: "SEO", status: "Enrolled", addedAt: "2026-04-04", city: "Mumbai", course: "Cyber Security" },
    { id: 10, plannerId: 4, name: "Lakshmi R.", email: "lakshmi.r@gmail.com", phone: "+91 8899776655", source: "Google Ads", status: "New", addedAt: "2026-04-09", city: "Hyderabad", course: "AI & ML" },
  ]);
  const [contactModal, setContactModal] = useState(false);
  const [ctf, setCtf] = useState({ name: "", email: "", phone: "", source: "Google Ads", status: "New", city: "", course: "" });
  const [contactFilter, setContactFilter] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [kanbanDrag, setKanbanDrag] = useState(null);

  const nextId = (arr) => arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
  const plannerTabs = [
    { id: "planner", label: "Planner", icon: LayoutGrid },
    { id: "kanban", label: "Kanban Board", icon: Layers },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "goals", label: "Planner Goal", icon: Target },
    { id: "reports", label: "Reports", icon: BarChart2 },
    { id: "contacts", label: "Contacts", icon: Users },
  ];
  const kanbanStatuses = ["Ideating", "Yet to Start", "In Progress", "Scheduled", "Completed"];
  const channels = ["Google Ads", "Meta Ads", "Email", "Social Media", "Webinar", "SMS", "Content", "SEO", "WhatsApp", "Events", "Others"];
  const plannerTypes = ["Lead generation", "Lead nurturing", "Brand awareness", "Event promotion", "Product launch", "Student enrollment", "Alumni engagement"];

  // ========== PLANNER LIST VIEW ==========
  const openPlannerModal = (p = null) => {
    if (p) {
      setEditingPlanner(p);
      setPf({ name: p.name, type: p.type, startDate: p.startDate, endDate: p.endDate, totalBudget: p.totalBudget, description: p.description });
    } else {
      setEditingPlanner(null);
      setPf({ name: "", type: "Lead generation", startDate: "", endDate: "", totalBudget: 0, description: "" });
    }
    setPlannerModal(true);
  };

  const savePlanner = () => {
    if (!pf.name) return showToast("Planner name is required", "error");
    if (editingPlanner) {
      setPlanners(prev => prev.map(p => p.id === editingPlanner.id ? { ...p, ...pf, totalBudget: Number(pf.totalBudget) } : p));
      showToast("Planner updated");
    } else {
      setPlanners(prev => [...prev, { id: nextId(prev), ...pf, totalBudget: Number(pf.totalBudget), totalExpense: 0, status: "Ideating", createdBy: "Admin", createdAt: new Date().toISOString().split("T")[0] }]);
      showToast("Planner created");
    }
    setPlannerModal(false);
  };

  const deletePlanner = (id) => {
    setPlanners(prev => prev.filter(p => p.id !== id));
    setActivities(prev => prev.filter(a => a.plannerId !== id));
    setGoals(prev => prev.filter(g => g.plannerId !== id));
    showToast("Planner deleted");
  };

  const openPlanner = (p) => { setActivePlanner(p); setActiveTab("planner"); setView("detail"); };

  const renderPlannerList = () => {
    const filtered = planners.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.type.toLowerCase().includes(searchQ.toLowerCase()));
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Marketing Planner</h2>
            <p className="text-sm text-gray-500 mt-1">Plan, track, and optimize your marketing campaigns</p>
          </div>
          <button onClick={() => openPlannerModal()} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 font-medium"><Plus size={18} /> Create</button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="I am searching for plan" className="pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm w-full" /></div>
          <span className="text-sm text-gray-600 font-medium">{filtered.length} plans created</span>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wider">
              <tr><th className="px-5 py-3">Planner Name</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Budget</th><th className="px-5 py-3">Activities</th><th className="px-5 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => {
                const pActivities = activities.filter(a => a.plannerId === p.id);
                return (
                  <tr key={p.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openPlanner(p)}>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-400">Created On - {p.createdAt} - by {p.createdBy}</div>
                    </td>
                    <td className="px-5 py-4"><MPBadge color={statusColors[p.status] || "gray"}>{p.status}</MPBadge></td>
                    <td className="px-5 py-4"><MPBadge color={typeColors[p.type] || "gray"}>{p.type}</MPBadge></td>
                    <td className="px-5 py-4 text-gray-700">₹{Number(p.totalBudget).toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-600">{pActivities.length}</td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openPlannerModal(p)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded"><Edit size={15} /></button>
                        <button onClick={() => deletePlanner(p.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No planners found</div>}
        </div>
      </div>
    );
  };

  // ========== DETAIL VIEW TABS ==========
  const pActs = activePlanner ? activities.filter(a => a.plannerId === activePlanner.id) : [];
  const pGoals = activePlanner ? goals.filter(g => g.plannerId === activePlanner.id) : [];
  const pContacts = activePlanner ? contacts.filter(c => c.plannerId === activePlanner.id) : [];
  const totalBudget = pActs.reduce((s, a) => s + a.budget, 0) || activePlanner?.totalBudget || 0;
  const totalExpense = pActs.reduce((s, a) => s + a.expense, 0);
  const totalLeadsTarget = pActs.reduce((s, a) => s + a.leadsTarget, 0);
  const totalLeadsAcquired = pActs.reduce((s, a) => s + a.leadsAcquired, 0);
  const cpa = totalLeadsAcquired > 0 ? Math.round(totalExpense / totalLeadsAcquired) : 0;

  // Activity CRUD
  const openActivityModal = (act = null) => {
    if (act) {
      setEditingActivity(act);
      setActf({ name: act.name, description: act.description, channel: act.channel, budget: act.budget, startDate: act.startDate, endDate: act.endDate, assignee: act.assignee, priority: act.priority, leadsTarget: act.leadsTarget });
    } else {
      setEditingActivity(null);
      setActf({ name: "", description: "", channel: "Google Ads", budget: 0, startDate: activePlanner?.startDate || "", endDate: activePlanner?.endDate || "", assignee: "", priority: "medium", leadsTarget: 0 });
    }
    setActivityModal(true);
  };

  const saveActivity = () => {
    if (!actf.name) return showToast("Activity name is required", "error");
    if (editingActivity) {
      setActivities(prev => prev.map(a => a.id === editingActivity.id ? { ...a, ...actf, budget: Number(actf.budget), leadsTarget: Number(actf.leadsTarget) } : a));
      showToast("Activity updated");
    } else {
      setActivities(prev => [...prev, { id: nextId(prev), plannerId: activePlanner.id, ...actf, budget: Number(actf.budget), leadsTarget: Number(actf.leadsTarget), expense: 0, leadsAcquired: 0, status: "Ideating" }]);
      showToast("Activity added");
    }
    setActivityModal(false);
  };

  const deleteActivity = (id) => { setActivities(prev => prev.filter(a => a.id !== id)); showToast("Activity deleted"); };

  const updateActivityStatus = (id, status) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  // ===== PLANNER TAB (Zoho-style Vertical Timeline) =====
  const [timelineWeekOffset, setTimelineWeekOffset] = useState(0);
  const renderPlannerTab = () => {
    const sortedActs = [...pActs].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    if (!activePlanner) return null;

    const planStart = new Date(activePlanner.startDate);
    const planEnd = new Date(activePlanner.endDate);
    const today = new Date();

    // Generate all dates in the planner range
    const allDates = [];
    const d = new Date(planStart);
    while (d <= planEnd) { allDates.push(new Date(d)); d.setDate(d.getDate() + 1); }

    // Visible days in the date navigator (9 days at a time, scrollable)
    const daysToShow = 9;
    const startIdx = Math.max(0, Math.min(timelineWeekOffset * 7, allDates.length - daysToShow));
    const visibleDates = allDates.slice(startIdx, startIdx + daysToShow);

    // Current visible month for the header
    const midVisDate = visibleDates[Math.floor(visibleDates.length / 2)] || planStart;
    const visibleMonthLabel = midVisDate.toLocaleString("en", { month: "long" }).toUpperCase() + " " + midVisDate.getFullYear();

    // Compute week number for a date (relative to planner start)
    const getWeekNum = (date) => {
      const diff = Math.floor((date - planStart) / (1000 * 60 * 60 * 24));
      return Math.floor(diff / 7) + 1;
    };

    // Check if date is the end date
    const isEndDate = (date) => date.toDateString() === planEnd.toDateString();
    const isStartDate = (date) => date.toDateString() === planStart.toDateString();
    const isToday = (date) => date.toDateString() === today.toDateString();

    // Group activities by date (start date) for vertical timeline
    const actsByDate = {};
    sortedActs.forEach(act => {
      const key = act.startDate;
      if (!actsByDate[key]) actsByDate[key] = [];
      actsByDate[key].push(act);
    });
    const dateGroups = Object.entries(actsByDate).sort((a, b) => new Date(a[0]) - new Date(b[0]));

    // Unique months that appear in the timeline
    const timelineMonths = [];
    let lastMonth = "";
    dateGroups.forEach(([dateStr]) => {
      const dt = new Date(dateStr);
      const mLabel = dt.toLocaleString("en", { month: "long" }).toUpperCase() + " " + dt.getFullYear();
      if (mLabel !== lastMonth) { timelineMonths.push({ label: mLabel, date: dateStr }); lastMonth = mLabel; }
    });

    const statusDotColors = { "Ideating": "#F59E0B", "Yet to Start": "#9CA3AF", "In Progress": "#EF4444", "Scheduled": "#6366F1", "Completed": "#10B981", "On Hold": "#F97316", "Cancelled": "#EF4444" };

    const canGoBack = startIdx > 0;
    const canGoForward = startIdx + daysToShow < allDates.length;

    let actCounter = 0; // for alternating left/right

    return (
      <div className="space-y-4">
        {/* Top bar: activity count + month selector + add button */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">{pActs.length} activities in this planner</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-indigo-200 rounded-lg cursor-pointer">
              <span className="text-sm font-bold text-indigo-600 tracking-wide">{visibleMonthLabel}</span>
              <ChevronDown size={14} className="text-indigo-400" />
            </div>
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
              <button className="p-1.5 bg-indigo-50 text-indigo-600"><Calendar size={16} /></button>
              <button className="p-1.5 bg-white text-gray-400 hover:bg-gray-50"><LayoutGrid size={16} /></button>
            </div>
          </div>
          <button onClick={() => openActivityModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Add Activity</button>
        </div>

        {sortedActs.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-200">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="font-medium text-gray-500">No activities yet</p>
            <p className="text-sm mt-1">Click "Add Activity" to start building your timeline.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* ===== Horizontal Date Navigator ===== */}
            <div className="px-2 py-3 border-b border-gray-200">
              <div className="flex items-center">
                {/* Start label */}
                <div className="flex flex-col items-center px-2 min-w-[60px]">
                  <span className="text-[10px] text-gray-400 font-medium">Start</span>
                  <span className="text-xs font-bold text-indigo-600">{planStart.toLocaleDateString("en", { month: "short", day: "numeric" })}</span>
                  <span className="text-[10px] text-indigo-600 font-bold">{planStart.getFullYear()}</span>
                </div>

                {/* Left arrow */}
                <button onClick={() => setTimelineWeekOffset(Math.max(0, timelineWeekOffset - 1))}
                  className={`p-1.5 rounded-full ${canGoBack ? "text-gray-500 hover:bg-gray-100" : "text-gray-200 cursor-default"}`} disabled={!canGoBack}>
                  <ChevronDown size={18} className="rotate-90" />
                </button>

                {/* Day cells */}
                <div className="flex flex-1 gap-0">
                  {visibleDates.map((date, i) => {
                    const dayName = date.toLocaleString("en", { weekday: "short" });
                    const dayNum = date.getDate();
                    const monthShort = date.toLocaleString("en", { month: "short" });
                    const wk = getWeekNum(date);
                    const isMonday = date.getDay() === 1;
                    const highlighted = isToday(date) || isEndDate(date);

                    return (
                      <div key={i} className={`flex-1 flex flex-col items-center py-2 px-1 rounded-lg transition-all ${highlighted ? "bg-indigo-600 text-white" : "hover:bg-gray-50"}`}>
                        {isMonday && (
                          <span className={`text-[9px] font-bold tracking-wider mb-0.5 ${highlighted ? "text-indigo-200" : "text-gray-400"}`}>WEEK - {wk}</span>
                        )}
                        <span className={`text-sm font-bold ${highlighted ? "text-white" : "text-gray-800"}`}>{monthShort} {dayNum}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Right arrow */}
                <button onClick={() => setTimelineWeekOffset(timelineWeekOffset + 1)}
                  className={`p-1.5 rounded-full ${canGoForward ? "text-gray-500 hover:bg-gray-100" : "text-gray-200 cursor-default"}`} disabled={!canGoForward}>
                  <ChevronDown size={18} className="-rotate-90" />
                </button>

                {/* End label */}
                <div className="flex flex-col items-center px-2 min-w-[60px]">
                  <span className="text-[10px] text-gray-400 font-medium">End</span>
                  <span className="text-xs font-bold text-indigo-600">{planEnd.toLocaleDateString("en", { month: "short", day: "numeric" })}</span>
                  <span className="text-[10px] text-indigo-600 font-bold">{planEnd.getFullYear()}</span>
                </div>
              </div>
            </div>

            {/* ===== Vertical Timeline Body ===== */}
            <div className="relative py-6 min-h-[300px]">
              {/* Center vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

              {dateGroups.map(([dateStr, acts], gIdx) => {
                const dt = new Date(dateStr);
                const dayLabel = dt.toLocaleString("en", { weekday: "short" }) + " " + dt.getDate();
                // Check if we need a month label above this group
                const monthLabel = timelineMonths.find(m => m.date === dateStr);

                return (
                  <div key={gIdx}>
                    {/* Month label pill */}
                    {monthLabel && (
                      <div className="flex justify-center mb-4 mt-2">
                        <div className="px-6 py-2 bg-gray-100 rounded-full border border-gray-200 shadow-sm">
                          <span className="text-sm font-bold text-gray-700 tracking-wide">{monthLabel.label}</span>
                        </div>
                      </div>
                    )}

                    {/* Date label on center line */}
                    <div className="flex justify-center mb-2">
                      <div className="relative z-10 px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <span className="text-xs font-semibold text-gray-600">{dayLabel}</span>
                      </div>
                    </div>

                    {/* Activities for this date */}
                    {acts.map((act, aIdx) => {
                      const isLeft = actCounter % 2 === 0;
                      actCounter++;
                      const isOverdue = new Date(act.endDate) < today && act.status !== "Completed";
                      const dotColor = statusDotColors[act.status] || "#9CA3AF";

                      return (
                        <div key={act.id} className="relative flex items-start mb-6" style={{ minHeight: "120px" }}>
                          {/* Left card area */}
                          <div className={`w-[calc(50%-24px)] ${isLeft ? "pr-4" : ""}`}>
                            {isLeft && (
                              <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 ml-auto max-w-[420px]">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h5 className="font-semibold text-indigo-600 text-sm">{act.name}</h5>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <button className="p-1 text-gray-400 hover:text-gray-600"><MoreVertical size={14} /></button>
                                    <button onClick={() => openActivityModal(act)} className="p-1 text-gray-400 hover:text-blue-600"><FileText size={14} /></button>
                                    <button onClick={() => deleteActivity(act.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                                  </div>
                                </div>
                                {act.leadsTarget > 0 && <p className="text-xs text-gray-500 mb-1">{act.leadsAcquired}/{act.leadsTarget} leads</p>}
                                {isOverdue && <span className="inline-block text-[10px] font-bold text-orange-600 tracking-wider mb-2">OVERDUE</span>}
                                {act.budget > 0 && <p className="text-xs text-gray-500 mb-2">Budget: <span className="font-semibold text-gray-700">₹{act.budget.toLocaleString()}</span></p>}
                                <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200">
                                  <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-300"><Plus size={12} /></button>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
                                    <select value={act.status} onChange={e => updateActivityStatus(act.id, e.target.value)}
                                      className="text-xs font-medium border-0 bg-transparent text-gray-700 cursor-pointer pr-5 appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0 center" }}>
                                      {kanbanStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Center dot + connector */}
                          <div className="relative flex flex-col items-center" style={{ width: "48px" }}>
                            <div className="w-4 h-4 rounded-full border-3 border-white shadow-md z-10 flex items-center justify-center" style={{ backgroundColor: "#F59E0B" }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            </div>
                            {/* Horizontal connector line */}
                            <div className={`absolute top-2 ${isLeft ? "right-full" : "left-full"} w-4 h-0.5`} style={{ backgroundColor: "#F59E0B" }} />
                          </div>

                          {/* Right card area */}
                          <div className={`w-[calc(50%-24px)] ${!isLeft ? "pl-4" : ""}`}>
                            {!isLeft && (
                              <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-4 max-w-[420px]">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <h5 className="font-semibold text-indigo-600 text-sm">{act.name}</h5>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <button className="p-1 text-gray-400 hover:text-gray-600"><MoreVertical size={14} /></button>
                                    <button onClick={() => openActivityModal(act)} className="p-1 text-gray-400 hover:text-blue-600"><FileText size={14} /></button>
                                    <button onClick={() => deleteActivity(act.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                                  </div>
                                </div>
                                {act.leadsTarget > 0 && <p className="text-xs text-gray-500 mb-1">{act.leadsAcquired}/{act.leadsTarget} leads</p>}
                                {isOverdue && <span className="inline-block text-[10px] font-bold text-orange-600 tracking-wider mb-2">OVERDUE</span>}
                                {act.budget > 0 && <p className="text-xs text-gray-500 mb-2">Budget: <span className="font-semibold text-gray-700">₹{act.budget.toLocaleString()}</span></p>}
                                <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200">
                                  <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-300"><Plus size={12} /></button>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
                                    <select value={act.status} onChange={e => updateActivityStatus(act.id, e.target.value)}
                                      className="text-xs font-medium border-0 bg-transparent text-gray-700 cursor-pointer pr-5 appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 0 center" }}>
                                      {kanbanStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ===== KANBAN BOARD =====
  const kanbanStatusMeta = {
    "Ideating": { color: "#F59E0B", bg: "bg-amber-50", borderColor: "border-amber-200", headerBg: "bg-amber-100", emptyMsg: "The ideas are still brewing...", emptySubMsg: "Drag activities here or create new ones" },
    "Yet to Start": { color: "#9CA3AF", bg: "bg-gray-50", borderColor: "border-gray-200", headerBg: "bg-gray-100", emptyMsg: "Not quite ready to begin yet...", emptySubMsg: "Activities planned but not started will appear here" },
    "In Progress": { color: "#3B82F6", bg: "bg-blue-50", borderColor: "border-blue-200", headerBg: "bg-blue-100", emptyMsg: "Nothing in motion right now", emptySubMsg: "Active work items will show up here" },
    "Scheduled": { color: "#6366F1", bg: "bg-indigo-50", borderColor: "border-indigo-200", headerBg: "bg-indigo-100", emptyMsg: "Calendar is clear for now", emptySubMsg: "Scheduled activities will appear here" },
    "Completed": { color: "#10B981", bg: "bg-green-50", borderColor: "border-green-200", headerBg: "bg-green-100", emptyMsg: "No wins yet!", emptySubMsg: "Completed activities will land here" },
  };

  const renderKanban = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 font-medium">Kanban Board</span>
          <span className="text-xs text-gray-400">{pActs.length} total activities</span>
        </div>
        <button onClick={() => openActivityModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Add Activity</button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {kanbanStatuses.map(status => {
          const meta = kanbanStatusMeta[status] || kanbanStatusMeta["Yet to Start"];
          const colActs = pActs.filter(a => a.status === status);
          return (
            <div key={status} className={`min-w-[280px] max-w-[300px] flex-1 rounded-xl border ${meta.borderColor} ${meta.bg}`}
              onDragOver={e => { e.preventDefault(); e.currentTarget.style.boxShadow = `0 0 0 2px ${meta.color}`; }}
              onDragLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
              onDrop={e => { e.currentTarget.style.boxShadow = "none"; if (kanbanDrag) { updateActivityStatus(kanbanDrag, status); setKanbanDrag(null); } }}>
              {/* Column Header */}
              <div className={`flex items-center justify-between px-3.5 py-2.5 rounded-t-xl ${meta.headerBg}`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: meta.color }} />
                  <h4 className="font-semibold text-sm text-gray-800">{status}</h4>
                  <span className="min-w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{ backgroundColor: meta.color }}>{colActs.length}</span>
                </div>
                <button onClick={() => openActivityModal()} className="p-1 text-gray-400 hover:text-gray-600 rounded"><Plus size={14} /></button>
              </div>

              {/* Column Body */}
              <div className="p-2.5 space-y-2.5 min-h-[120px]">
                {colActs.map(act => {
                  const isOverdue = new Date(act.endDate) < new Date() && act.status !== "Completed";
                  return (
                    <div key={act.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
                      draggable onDragStart={() => setKanbanDrag(act.id)}>
                      {/* Card Top Color Bar */}
                      <div className="h-1 rounded-t-lg" style={{ backgroundColor: meta.color, opacity: 0.6 }} />
                      <div className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-sm text-gray-900 flex-1 leading-tight">{act.name}</h5>
                          {isOverdue && (
                            <span className="flex-shrink-0 ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-orange-500 text-white text-[9px] font-bold rounded-full shadow-sm">
                              <AlertCircle size={9} /> OVERDUE
                            </span>
                          )}
                        </div>

                        {/* Description preview */}
                        {act.description && <p className="text-[11px] text-gray-400 mb-2 line-clamp-2">{act.description}</p>}

                        {/* Date & Channel */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] text-gray-400 flex items-center gap-1"><Calendar size={9} /> {act.startDate}</span>
                          <span className="text-[10px] font-semibold" style={{ color: channelColors[act.channel] || "#6B7280" }}>{act.channel}</span>
                        </div>

                        {/* Budget & Leads */}
                        <div className="flex items-center gap-3 mb-2">
                          {act.budget > 0 && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded text-[10px] text-gray-600">
                              <DollarSign size={9} className="text-green-500" />
                              <span className="font-semibold">₹{act.budget.toLocaleString()}</span>
                            </div>
                          )}
                          {act.leadsTarget > 0 && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 rounded text-[10px] text-gray-600">
                              <Target size={9} className="text-indigo-500" />
                              <span>{act.leadsAcquired}/{act.leadsTarget}</span>
                            </div>
                          )}
                        </div>

                        {/* Assignee */}
                        {act.assignee && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-600">
                              {act.assignee.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-[10px] text-gray-500">{act.assignee}</span>
                          </div>
                        )}

                        {/* Card Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <div className="flex items-center gap-0.5">
                            <MPBadge color={priorityColors[act.priority]}>{act.priority}</MPBadge>
                          </div>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={e => { e.stopPropagation(); openActivityModal(act); }} className="p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50"><Edit size={12} /></button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"><MessageSquare size={12} /></button>
                            <button onClick={e => { e.stopPropagation(); deleteActivity(act.id); }} className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"><Trash2 size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Empty State */}
                {colActs.length === 0 && (
                  <div className="text-center py-8 px-3">
                    <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${meta.color}15` }}>
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: meta.color, opacity: 0.4 }} />
                    </div>
                    <p className="text-xs font-medium text-gray-500 mb-1">{meta.emptyMsg}</p>
                    <p className="text-[10px] text-gray-400 mb-3">{meta.emptySubMsg}</p>
                    <button onClick={() => openActivityModal()} className="inline-flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: meta.color }}>
                      <Plus size={12} /> Add Activity
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ===== BUDGET TAB =====
  const renderBudget = () => {
    const channelBudgets = {};
    const channelExpenses = {};
    pActs.forEach(a => {
      channelBudgets[a.channel] = (channelBudgets[a.channel] || 0) + a.budget;
      channelExpenses[a.channel] = (channelExpenses[a.channel] || 0) + a.expense;
    });
    const budgetPieData = Object.entries(channelBudgets).filter(([, v]) => v > 0).map(([k, v]) => ({ name: k, value: v }));
    const expensePieData = Object.entries(channelExpenses).filter(([, v]) => v > 0).map(([k, v]) => ({ name: k, value: v }));
    const availableBudget = totalBudget - totalExpense;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border-l-4 border-l-indigo-500 border border-gray-200 p-5">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Budget</div>
            <div className="text-2xl font-bold text-gray-900">₹{totalBudget.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-l-pink-500 border border-gray-200 p-5">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Expense</div>
            <div className="text-2xl font-bold text-gray-900">₹{totalExpense.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-l-green-500 border border-gray-200 p-5">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Acquired Leads</div>
            <div className="text-2xl font-bold text-gray-900">{totalLeadsAcquired}</div>
          </div>
          <div className="bg-white rounded-xl border-l-4 border-l-orange-500 border border-gray-200 p-5">
            <div className="text-xs text-gray-500 uppercase font-semibold mb-1">CPA</div>
            <div className="text-2xl font-bold text-gray-900">₹{cpa.toLocaleString()}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Budget Split</h3>
            {budgetPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart><Pie data={budgetPieData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label={({ name, value }) => `${name}: ₹${(value / 1000).toFixed(0)}K`}>
                  {budgetPieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie><Tooltip formatter={v => `₹${v.toLocaleString()}`} /><Legend /></PieChart>
              </ResponsiveContainer>
            ) : <div className="text-center py-16 text-gray-400">No budget allocated yet</div>}
            <div className="text-center mt-2 text-sm text-gray-500">Available Balance: <span className="font-bold text-indigo-600">₹{availableBudget.toLocaleString()}</span></div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Expense Split</h3>
            {expensePieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart><Pie data={expensePieData} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label={({ name, value }) => `${name}: ₹${(value / 1000).toFixed(0)}K`}>
                  {expensePieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie><Tooltip formatter={v => `₹${v.toLocaleString()}`} /><Legend /></PieChart>
              </ResponsiveContainer>
            ) : <div className="text-center py-16 text-gray-400">No expenses recorded yet</div>}
            <div className="text-center mt-2 text-sm text-gray-500">Channel Expenses</div>
          </div>
        </div>
        {/* Activity-wise breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Activity-wise Budget Breakdown</h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 text-xs uppercase">
              <tr><th className="px-4 py-2">Activity</th><th className="px-4 py-2">Channel</th><th className="px-4 py-2 text-right">Budget</th><th className="px-4 py-2 text-right">Expense</th><th className="px-4 py-2 text-right">Remaining</th><th className="px-4 py-2 text-right">Utilization</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pActs.filter(a => a.budget > 0).map(a => {
                const util = a.budget > 0 ? Math.round((a.expense / a.budget) * 100) : 0;
                return (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium text-gray-900">{a.name}</td>
                    <td className="px-4 py-2.5"><MPBadge color="blue">{a.channel}</MPBadge></td>
                    <td className="px-4 py-2.5 text-right text-gray-700">₹{a.budget.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right text-gray-700">₹{a.expense.toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right text-gray-700">₹{(a.budget - a.expense).toLocaleString()}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2"><div className="w-16 bg-gray-200 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${util > 80 ? "bg-red-500" : util > 50 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${Math.min(100, util)}%` }}></div></div><span className="text-xs text-gray-500">{util}%</span></div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {pActs.filter(a => a.budget > 0).length === 0 && <div className="text-center py-8 text-gray-400 text-sm">No budgets allocated to activities</div>}
        </div>
      </div>
    );
  };

  // ===== GOALS TAB =====
  const openGoalModal = () => { setGf({ title: "", metric: "", targetValue: 0 }); setGoalModal(true); };
  const saveGoal = () => {
    if (!gf.title || !gf.metric) return showToast("Title and metric are required", "error");
    setGoals(prev => [...prev, { id: nextId(prev), plannerId: activePlanner.id, ...gf, targetValue: Number(gf.targetValue), currentValue: 0, createdAt: new Date().toISOString().split("T")[0] }]);
    setGoalModal(false);
    showToast("Goal added");
  };

  const renderGoals = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">{pGoals.length} planner goals added</span>
        <button onClick={openGoalModal} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Add planner goal</button>
      </div>
      <div className="space-y-3">
        {pGoals.map(g => {
          const pct = g.targetValue > 0 ? Math.round((g.currentValue / g.targetValue) * 100) : 0;
          const isOnTrack = pct >= 50 || g.currentValue <= g.targetValue;
          return (
            <div key={g.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Target size={18} className="text-indigo-500" />
                    <h4 className="font-semibold text-gray-900">{g.title}</h4>
                    <MPBadge color={pct >= 100 ? "green" : pct >= 50 ? "yellow" : "red"}>{pct}%</MPBadge>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">{g.metric}: {g.currentValue} / {g.targetValue}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${pct >= 100 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-400"}`} style={{ width: `${Math.min(100, pct)}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Created On - {g.createdAt}</div>
                </div>
                <div className="flex items-center gap-1 ml-3">
                  <button onClick={() => { setGoals(prev => prev.filter(x => x.id !== g.id)); showToast("Goal deleted"); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button>
                </div>
              </div>
            </div>
          );
        })}
        {pGoals.length === 0 && <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">No goals set. Add planner goals to track your progress.</div>}
      </div>
    </div>
  );

  // ===== REPORTS TAB =====
  const renderReports = () => {
    if (pActs.length === 0) return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
        <BarChart2 size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="font-semibold text-gray-500">No reports generated yet</h3>
        <p className="text-sm text-gray-400 mt-1">Add activities and track progress to generate reports.</p>
      </div>
    );

    const statusData = kanbanStatuses.map(s => ({ name: s, count: pActs.filter(a => a.status === s).length })).filter(d => d.count > 0);
    const channelPerf = {};
    pActs.forEach(a => {
      if (!channelPerf[a.channel]) channelPerf[a.channel] = { channel: a.channel, budget: 0, expense: 0, leads: 0 };
      channelPerf[a.channel].budget += a.budget;
      channelPerf[a.channel].expense += a.expense;
      channelPerf[a.channel].leads += a.leadsAcquired;
    });
    const channelData = Object.values(channelPerf);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center"><div className="text-2xl font-bold text-indigo-600">{pActs.length}</div><div className="text-xs text-gray-500">Total Activities</div></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center"><div className="text-2xl font-bold text-green-600">{pActs.filter(a => a.status === "Completed").length}</div><div className="text-xs text-gray-500">Completed</div></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center"><div className="text-2xl font-bold text-blue-600">{pActs.filter(a => a.status === "In Progress").length}</div><div className="text-xs text-gray-500">In Progress</div></div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center"><div className="text-2xl font-bold text-red-600">{pActs.filter(a => new Date(a.endDate) < new Date() && a.status !== "Completed").length}</div><div className="text-xs text-gray-500">Overdue</div></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Activity Status Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart><Pie data={statusData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, count }) => `${name}: ${count}`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie><Tooltip /><Legend /></PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Channel Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={channelData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="channel" tick={{ fontSize: 10 }} /><YAxis /><Tooltip formatter={v => `₹${v.toLocaleString()}`} /><Legend /><Bar dataKey="budget" fill="#4F46E5" name="Budget" radius={[4, 4, 0, 0]} /><Bar dataKey="expense" fill="#EC4899" name="Expense" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Leads by Channel</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={channelData.filter(d => d.leads > 0)}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="channel" tick={{ fontSize: 10 }} /><YAxis /><Tooltip /><Bar dataKey="leads" fill="#10B981" name="Leads Acquired" radius={[4, 4, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // ===== CONTACTS TAB =====
  const contactStatuses = ["New", "Contacted", "Qualified", "Enrolled", "Lost"];
  const contactStatusColors = { New: "blue", Contacted: "yellow", Qualified: "indigo", Enrolled: "green", Lost: "red" };

  const openContactModal = () => {
    setCtf({ name: "", email: "", phone: "", source: "Google Ads", status: "New", city: "", course: "" });
    setContactModal(true);
  };

  const saveContact = () => {
    if (!ctf.name || !ctf.email) return showToast("Name and email are required", "error");
    setContacts(prev => [...prev, { id: nextId(prev), plannerId: activePlanner.id, ...ctf, addedAt: new Date().toISOString().split("T")[0] }]);
    setContactModal(false);
    showToast("Contact added");
  };

  const renderContacts = () => {
    const filtered = pContacts.filter(c =>
      (contactFilter === "all" || c.status === contactFilter) &&
      (c.name.toLowerCase().includes(searchQ.toLowerCase()) || c.email.toLowerCase().includes(searchQ.toLowerCase()) || c.course.toLowerCase().includes(searchQ.toLowerCase()))
    );
    const sourceBreakdown = {};
    pContacts.forEach(c => { sourceBreakdown[c.source] = (sourceBreakdown[c.source] || 0) + 1; });
    const statusBreakdown = {};
    pContacts.forEach(c => { statusBreakdown[c.status] = (statusBreakdown[c.status] || 0) + 1; });

    return (
      <div className="space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {contactStatuses.map(s => (
            <div key={s} className="bg-white rounded-xl border border-gray-200 p-4 text-center cursor-pointer hover:shadow-sm" onClick={() => setContactFilter(contactFilter === s ? "all" : s)}>
              <div className={`text-2xl font-bold ${contactFilter === s ? "text-indigo-600" : "text-gray-900"}`}>{pContacts.filter(c => c.status === s).length}</div>
              <div className="text-xs text-gray-500">{s}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search contacts..." className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-64" /></div>
            <select value={contactFilter} onChange={e => setContactFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="all">All Status</option>
              {contactStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{filtered.length} contacts</span>
            <button onClick={openContactModal} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"><Plus size={16} /> Add Contact</button>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 uppercase text-xs tracking-wider">
              <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Course Interest</th><th className="px-4 py-3">City</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Added</th><th className="px-4 py-3">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.email}</td>
                  <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                  <td className="px-4 py-3"><MPBadge color="blue">{c.source}</MPBadge></td>
                  <td className="px-4 py-3 text-gray-600">{c.course}</td>
                  <td className="px-4 py-3 text-gray-600">{c.city}</td>
                  <td className="px-4 py-3">
                    <select value={c.status} onChange={e => setContacts(prev => prev.map(x => x.id === c.id ? { ...x, status: e.target.value } : x))} className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white">
                      {contactStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{c.addedAt}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setContacts(prev => prev.filter(x => x.id !== c.id)); showToast("Contact removed"); }} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No contacts found for this planner</div>}
        </div>

        {/* Source breakdown */}
        {pContacts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Contacts by Source</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart><Pie data={Object.entries(sourceBreakdown).map(([k, v]) => ({ name: k, value: v }))} dataKey="value" cx="50%" cy="50%" outerRadius={75} label={({ name, value }) => `${name}: ${value}`}>
                  {Object.keys(sourceBreakdown).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie><Tooltip /><Legend /></PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Contacts by Status</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={Object.entries(statusBreakdown).map(([k, v]) => ({ name: k, count: v }))}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis /><Tooltip /><Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} /></BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ========== DETAIL VIEW ==========
  const renderDetailView = () => {
    if (!activePlanner) return null;
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => { setView("list"); setActivePlanner(null); }} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><ChevronDown size={20} className="rotate-90" /></button>
          <div>
            <div className="text-xs text-indigo-600 font-medium">Marketing Planner</div>
            <h2 className="text-xl font-bold text-gray-900">{activePlanner.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1.5 overflow-x-auto">
          {plannerTabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap font-medium transition-all ${activeTab === t.id ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
        {activeTab === "planner" && renderPlannerTab()}
        {activeTab === "kanban" && renderKanban()}
        {activeTab === "budget" && renderBudget()}
        {activeTab === "goals" && renderGoals()}
        {activeTab === "reports" && renderReports()}
        {activeTab === "contacts" && renderContacts()}
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  return (
    <div className="space-y-6">
      {view === "list" && renderPlannerList()}
      {view === "detail" && renderDetailView()}

      {/* Planner Create/Edit Modal */}
      <MPModal isOpen={plannerModal} onClose={() => setPlannerModal(false)} title={editingPlanner ? "Edit Planner" : "Create Marketing Planner"} wide>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Planner Name <span className="text-red-500">*</span></label><input value={pf.name} onChange={e => setPf({ ...pf, name: e.target.value })} placeholder="e.g. Q2 Student Enrollment Drive" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Type</label><select value={pf.type} onChange={e => setPf({ ...pf, type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm">{plannerTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Budget (₹)</label><input type="number" value={pf.totalBudget} onChange={e => setPf({ ...pf, totalBudget: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input type="date" value={pf.startDate} onChange={e => setPf({ ...pf, startDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">End Date</label><input type="date" value={pf.endDate} onChange={e => setPf({ ...pf, endDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={pf.description} onChange={e => setPf({ ...pf, description: e.target.value })} rows={3} placeholder="Describe the marketing plan..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setPlannerModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={savePlanner} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 font-medium flex items-center gap-2"><Save size={16} /> {editingPlanner ? "Update" : "Create"} Planner</button>
          </div>
        </div>
      </MPModal>

      {/* Activity Modal */}
      <MPModal isOpen={activityModal} onClose={() => setActivityModal(false)} title={editingActivity ? "Edit Activity" : "Add Activity"} wide>
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Activity Name <span className="text-red-500">*</span></label><input value={actf.name} onChange={e => setActf({ ...actf, name: e.target.value })} placeholder="e.g. Google Ads Campaign" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label><textarea value={actf.description} onChange={e => setActf({ ...actf, description: e.target.value })} rows={2} placeholder="Describe the activity..." className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Channel</label><select value={actf.channel} onChange={e => setActf({ ...actf, channel: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm">{channels.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Priority</label><select value={actf.priority} onChange={e => setActf({ ...actf, priority: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label><input type="number" value={actf.budget} onChange={e => setActf({ ...actf, budget: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Leads Target</label><input type="number" value={actf.leadsTarget} onChange={e => setActf({ ...actf, leadsTarget: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input type="date" value={actf.startDate} onChange={e => setActf({ ...actf, startDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">End Date</label><input type="date" value={actf.endDate} onChange={e => setActf({ ...actf, endDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label><input value={actf.assignee} onChange={e => setActf({ ...actf, assignee: e.target.value })} placeholder="Team or person name" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setActivityModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={saveActivity} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 font-medium flex items-center gap-2"><Save size={16} /> {editingActivity ? "Update" : "Add"} Activity</button>
          </div>
        </div>
      </MPModal>

      {/* Goal Modal */}
      <MPModal isOpen={goalModal} onClose={() => setGoalModal(false)} title="Add Planner Goal">
        <div className="space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Goal Title <span className="text-red-500">*</span></label><input value={gf.title} onChange={e => setGf({ ...gf, title: e.target.value })} placeholder="e.g. Enroll 200 students in Q2" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Metric <span className="text-red-500">*</span></label><input value={gf.metric} onChange={e => setGf({ ...gf, metric: e.target.value })} placeholder="e.g. Leads Generated, Enrollments" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label><input type="number" value={gf.targetValue} onChange={e => setGf({ ...gf, targetValue: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setGoalModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={saveGoal} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 font-medium flex items-center gap-2"><Target size={16} /> Add Goal</button>
          </div>
        </div>
      </MPModal>

      {/* Contact Modal */}
      <MPModal isOpen={contactModal} onClose={() => setContactModal(false)} title="Add Contact" wide>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label><input value={ctf.name} onChange={e => setCtf({ ...ctf, name: e.target.value })} placeholder="Full name" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label><input type="email" value={ctf.email} onChange={e => setCtf({ ...ctf, email: e.target.value })} placeholder="email@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input value={ctf.phone} onChange={e => setCtf({ ...ctf, phone: e.target.value })} placeholder="+91 9876543210" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Source</label><select value={ctf.source} onChange={e => setCtf({ ...ctf, source: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm">{channels.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Course Interest</label><input value={ctf.course} onChange={e => setCtf({ ...ctf, course: e.target.value })} placeholder="e.g. AI & ML, Data Science" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input value={ctf.city} onChange={e => setCtf({ ...ctf, city: e.target.value })} placeholder="e.g. Bangalore" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={ctf.status} onChange={e => setCtf({ ...ctf, status: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm"><option value="New">New</option><option value="Contacted">Contacted</option><option value="Qualified">Qualified</option><option value="Enrolled">Enrolled</option><option value="Lost">Lost</option></select></div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setContactModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button onClick={saveContact} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 font-medium flex items-center gap-2"><Users size={16} /> Add Contact</button>
          </div>
        </div>
      </MPModal>
    </div>
  );
}
