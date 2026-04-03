import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  Send,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Video,
  Link,
  AlertCircle,
  CheckCircle,
  Clock3,
  Trash2,
  Edit,
  MoreVertical,
  Star,
  Users,
  TrendingUp,
  BarChart3,
  ChevronDown,
  ChevronRight,
  X,
  Camera,
  Building2,
  Tv,
  Phone,
  MapPin,
  Mail,
  Globe,
  MessageSquare,
  RefreshCw,
  Bell,
  Archive,
  Zap,
  Home,
  FileText,
  UserPlus,
  CheckSquare,
  Square,
  Flag,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  Megaphone,
  Inbox,
  Hash,
  AtSign,
  Repeat,
  ArrowUp,
  ArrowDown,
  Rss,
  ExternalLink,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_BASE = "http://localhost:5000/api/social";

function Badge({ color = "gray", children }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
    gray: "bg-gray-100 text-gray-600",
    indigo: "bg-indigo-100 text-indigo-700",
    orange: "bg-orange-100 text-orange-700",
  };
  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
        colors[color] || colors.gray
      }`}
    >
      {children}
    </span>
  );
}

const PLATFORM_META = {
  Instagram: { icon: Camera, color: "#E4405F", bg: "#FDF2F8" },
  Facebook: { icon: Users, color: "#1877F2", bg: "#EFF6FF" },
  LinkedIn: { icon: Building2, color: "#0A66C2", bg: "#EFF6FF" },
  X: { icon: MessageCircle, color: "#000000", bg: "#F9FAFB" },
  "X (Twitter)": { icon: MessageCircle, color: "#000000", bg: "#F9FAFB" },
  Twitter: { icon: MessageCircle, color: "#000000", bg: "#F9FAFB" },
  YouTube: { icon: Tv, color: "#FF0000", bg: "#FEF2F2" },
  WhatsApp: { icon: Phone, color: "#25D366", bg: "#F0FDF4" },
  "Google Business": { icon: Globe, color: "#4285F4", bg: "#EFF6FF" },
};

const getPlatformIcon = (platform) => {
  const meta = PLATFORM_META[platform] || { icon: Globe, color: "#666", bg: "#F3F4F6" };
  return meta.icon;
};

const getPlatformColor = (platform) => {
  const meta = PLATFORM_META[platform] || { color: "#666", bg: "#F3F4F6" };
  return meta.color;
};

const getPlatformBg = (platform) => {
  const meta = PLATFORM_META[platform] || { color: "#666", bg: "#F3F4F6" };
  return meta.bg;
};

export default function SocialMediaModule({ showToast }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [inboxStats, setInboxStats] = useState({});
  const [monitorColumns, setMonitorColumns] = useState([]);
  const [monitorItems, setMonitorItems] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connectionsStats, setConnectionsStats] = useState({});
  const [collaborations, setCollaborations] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [brandHealth, setBrandHealth] = useState([]);
  const [reports, setReports] = useState({});
  const [leadForms, setLeadForms] = useState([]);
  const [postFilter, setPostFilter] = useState("Published");
  const [platformFilter, setPlatformFilter] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [connectionCategory, setConnectionCategory] = useState("all");
  const [searchConnections, setSearchConnections] = useState("");
  const [reportType, setReportType] = useState("audience");

  const apiFetch = async (endpoint, options = {}) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      return data;
    } catch (err) {
      showToast(err.message, "error");
      return null;
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    const fetchTabData = async () => {
      setLoading(true);
      try {
        if (activeTab === "Home") {
          const [health, analytics, recentPosts] = await Promise.all([
            apiFetch("/analytics/brand-health"),
            apiFetch("/analytics"),
            apiFetch("/posts?status=Published&limit=5"),
          ]);
          setBrandHealth(health?.data || []);
          setAnalytics(analytics?.data || {});
          setPosts(recentPosts?.data || []);
        } else if (activeTab === "Posts") {
          const postData = await apiFetch(`/posts?status=${postFilter}`);
          setPosts(postData?.data || []);
        } else if (activeTab === "Messages") {
          const msgData = await apiFetch("/messages");
          setMessages(msgData?.data || []);
        } else if (activeTab === "Inbox") {
          const [inboxData, statsData] = await Promise.all([
            apiFetch("/inbox"),
            apiFetch("/inbox/stats"),
          ]);
          setInbox(inboxData?.data || []);
          setInboxStats(statsData?.data || {});
        } else if (activeTab === "Monitor") {
          const [colData, itemsData] = await Promise.all([
            apiFetch("/monitor/columns"),
            apiFetch("/monitor/items"),
          ]);
          setMonitorColumns(colData?.data || []);
          setMonitorItems(itemsData?.data || []);
        } else if (activeTab === "Connections") {
          const [connData, statsData] = await Promise.all([
            apiFetch("/connections"),
            apiFetch("/connections/stats"),
          ]);
          setConnections(connData?.data || []);
          setConnectionsStats(statsData?.data || {});
        } else if (activeTab === "Collaborate") {
          const collabData = await apiFetch("/collaborate");
          setCollaborations(collabData?.data || []);
        } else if (activeTab === "Reports") {
          const [audience, engagement, topPosts, hashtags] = await Promise.all([
            apiFetch("/reports/audience"),
            apiFetch("/reports/engagement"),
            apiFetch("/reports/top-posts"),
            apiFetch("/reports/hashtags"),
          ]);
          setReports({
            audience: audience?.data || [],
            engagement: engagement?.data || [],
            topPosts: topPosts?.data || [],
            hashtags: hashtags?.data || [],
          });
        } else if (activeTab === "Lead Forms") {
          const formsData = await apiFetch("/lead-forms");
          setLeadForms(formsData?.data || []);
        }
      } catch (err) {
        console.error("Tab data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();
  }, [activeTab, postFilter]);

  // HOME TAB
  const HomeTab = () => (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm font-medium">Total Followers</div>
          <div className="text-3xl font-bold mt-2">
            {analytics.totalFollowers?.toLocaleString() || 0}
          </div>
          <div className="text-green-600 text-xs mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% this month
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm font-medium">Posts Published</div>
          <div className="text-3xl font-bold mt-2">{analytics.totalPosts || 0}</div>
          <div className="text-blue-600 text-xs mt-2">
            {analytics.publishedThisMonth || 0} this month
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm font-medium">Engagement Rate</div>
          <div className="text-3xl font-bold mt-2">
            {analytics.engagementRate?.toFixed(2) || 0}%
          </div>
          <div className="text-orange-600 text-xs mt-2">
            {analytics.engagementTrend || "Stable"}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-500 text-sm font-medium">Pending Approvals</div>
          <div className="text-3xl font-bold mt-2">{analytics.pendingApprovals || 0}</div>
          <div className="text-red-600 text-xs mt-2">Awaiting review</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-bold text-lg">Brand Health by Channel</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold">Platform</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Followers</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">New Followers</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Posts</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Reach</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {brandHealth.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {React.createElement(getPlatformIcon(item.platform), {
                        className: "w-4 h-4",
                        style: { color: getPlatformColor(item.platform) },
                      })}
                      <span className="font-medium">{item.platform}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.followers?.toLocaleString() || 0}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="text-green-600">+{item.newFollowers || 0}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({item.newFollowersPercent?.toFixed(1) || 0}%)
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.posts || 0}</td>
                  <td className="px-4 py-3 text-sm">
                    {item.reach?.toLocaleString() || 0}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.engagement?.toFixed(2) || 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">Recent Posts</h3>
        <div className="grid grid-cols-1 gap-4">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {post.platform &&
                    React.createElement(getPlatformIcon(post.platform), {
                      className: "w-5 h-5",
                      style: { color: getPlatformColor(post.platform) },
                    })}
                  <div>
                    <div className="font-semibold text-sm">{post.platform}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Badge color="green">Published</Badge>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                {post.content?.substring(0, 120)}...
              </p>
              <div className="flex items-center gap-6 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" /> {post.likes || 0}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" /> {post.comments || 0}
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" /> {post.shares || 0}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {post.views || 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // POSTS TAB
  const PostsTab = () => {
    const [showCompose, setShowCompose] = useState(false);
    const [composeTxt, setComposeTxt] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [scheduleDate, setScheduleDate] = useState("");
    const [tags, setTags] = useState("");

    const handlePublishPost = async () => {
      if (!composeTxt.trim()) {
        showToast("Please enter post content", "error");
        return;
      }

      const postData = {
        content: composeTxt,
        platforms: selectedPlatforms.length > 0 ? selectedPlatforms : Object.keys(PLATFORM_META),
        type: "text",
        scheduleDate: scheduleDate || null,
        tags: tags.split(",").map((t) => t.trim()).filter(t => t),
      };

      const result = await apiFetch("/posts", {
        method: "POST",
        body: postData,
      });

      if (result) {
        showToast("Post created successfully", "success");
        setShowCompose(false);
        setComposeTxt("");
        setSelectedPlatforms([]);
        setScheduleDate("");
        setTags("");
        // Refresh posts
        const updated = await apiFetch(`/posts?status=${postFilter}`);
        setPosts(updated?.data || []);
      }
    };

    const handleDeletePost = async (postId) => {
      if (!window.confirm("Delete this post?")) return;

      const result = await apiFetch(`/posts/${postId}`, { method: "DELETE" });

      if (result) {
        showToast("Post deleted", "success");
        const updated = await apiFetch(`/posts?status=${postFilter}`);
        setPosts(updated?.data || []);
      }
    };

    const handlePublishNow = async (postId) => {
      const result = await apiFetch(`/posts/${postId}/publish`, { method: "PATCH" });

      if (result) {
        showToast("Post published", "success");
        const updated = await apiFetch(`/posts?status=${postFilter}`);
        setPosts(updated?.data || []);
      }
    };

    return (
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-56 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b">
            <button
              onClick={() => setShowCompose(true)}
              className="w-full bg-blue-600 text-white rounded-lg py-2 px-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Compose
            </button>
          </div>

          <div className="p-4 space-y-2">
            {["Published", "Scheduled", "Approvals", "Unpublished", "Drafts"].map((cat) => (
              <button
                key={cat}
                onClick={() => setPostFilter(cat)}
                className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition ${
                  postFilter === cat
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="text-xs font-semibold text-gray-500 mb-3">PLATFORMS</div>
            <div className="space-y-2">
              {Object.keys(PLATFORM_META).map((platform) => (
                <label key={platform} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={platformFilter.includes(platform)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPlatformFilter([...platformFilter, platform]);
                      } else {
                        setPlatformFilter(
                          platformFilter.filter((p) => p !== platform)
                        );
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <div className="flex items-center gap-2">
                    {React.createElement(getPlatformIcon(platform), {
                      className: "w-4 h-4",
                      style: { color: getPlatformColor(platform) },
                    })}
                    <span className="text-sm text-gray-700">{platform}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {showCompose && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-96 overflow-y-auto">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="font-bold text-lg">Compose Post</h3>
                  <button onClick={() => setShowCompose(false)}>
                    <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Post Content
                    </label>
                    <textarea
                      value={composeTxt}
                      onChange={(e) => setComposeTxt(e.target.value)}
                      maxLength={280}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What's on your mind?"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {composeTxt.length}/280
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Platforms
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(PLATFORM_META).map((platform) => (
                        <button
                          key={platform}
                          onClick={() => {
                            if (selectedPlatforms.includes(platform)) {
                              setSelectedPlatforms(
                                selectedPlatforms.filter((p) => p !== platform)
                              );
                            } else {
                              setSelectedPlatforms([...selectedPlatforms, platform]);
                            }
                          }}
                          className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1 transition ${
                            selectedPlatforms.includes(platform)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {React.createElement(getPlatformIcon(platform), {
                            className: "w-3 h-3",
                          })}
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Schedule Date
                      </label>
                      <input
                        type="datetime-local"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tags</label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="#tag1, #tag2"
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={handlePublishPost}
                      className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => setShowCompose(false)}
                      className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-2 font-semibold hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-bold text-lg">{postFilter} Posts</h3>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No posts found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Content</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Interactions
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Published By
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="max-w-xs">
                            {post.content?.substring(0, 50)}...
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-3 text-xs">
                            <span>
                              <Heart className="w-3 h-3 inline mr-1" />
                              {post.likes || 0}
                            </span>
                            <span>
                              <MessageCircle className="w-3 h-3 inline mr-1" />
                              {post.comments || 0}
                            </span>
                            <span>
                              <Share2 className="w-3 h-3 inline mr-1" />
                              {post.shares || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{post.publishedBy || "-"}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            {post.status === "Scheduled" && (
                              <button
                                onClick={() => handlePublishNow(post.id)}
                                className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                              >
                                Publish Now
                              </button>
                            )}
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // MESSAGES TAB
  const MessagesTab = () => {
    const [replyText, setReplyText] = useState("");
    const selectedMsg = selectedConversation
      ? messages.find((m) => m.id === selectedConversation)
      : null;

    const handleReply = async () => {
      if (!replyText.trim() || !selectedMsg) return;

      const result = await apiFetch(`/messages/${selectedMsg.id}/reply`, {
        method: "POST",
        body: { message: replyText },
      });

      if (result) {
        showToast("Reply sent", "success");
        setReplyText("");
        // Refresh
        const updated = await apiFetch("/messages");
        setMessages(updated?.data || []);
      }
    };

    const handleMarkRead = async (msgId) => {
      await apiFetch(`/messages/${msgId}/read`, { method: "PATCH" });
      const updated = await apiFetch("/messages");
      setMessages(updated?.data || []);
    };

    return (
      <div className="flex h-full bg-white">
        {/* Conversations List */}
        <div className="w-72 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex gap-2 mb-4">
              {Object.keys(PLATFORM_META).map((platform) => (
                <button
                  key={platform}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    platformFilter.includes(platform)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => {
                    if (platformFilter.includes(platform)) {
                      setPlatformFilter(
                        platformFilter.filter((p) => p !== platform)
                      );
                    } else {
                      setPlatformFilter([...platformFilter, platform]);
                    }
                  }}
                >
                  {platform}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="divide-y">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedConversation(msg.id);
                  if (!msg.read) handleMarkRead(msg.id);
                }}
                className={`w-full text-left p-4 hover:bg-gray-50 transition ${
                  selectedConversation === msg.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="font-semibold text-sm">{msg.senderName}</div>
                  {msg.unread && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                </div>
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  {React.createElement(getPlatformIcon(msg.platform), {
                    className: "w-3 h-3",
                  })}
                  {msg.platform}
                </div>
                <p className="text-xs text-gray-600 truncate">{msg.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className="flex-1 flex flex-col">
          {selectedMsg ? (
            <>
              <div className="p-4 border-b bg-gray-50">
                <div className="font-semibold">{selectedMsg.senderName}</div>
                <div className="text-xs text-gray-500">{selectedMsg.platform}</div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedMsg.messages?.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.senderType === "us" ? "justify-end" : ""}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        m.senderType === "us"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{m.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(m.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleReply()}
                    placeholder="Type your reply..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleReply}
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to view messages
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="w-64 border-l border-gray-200 p-4 overflow-y-auto bg-gray-50">
          {selectedMsg && (
            <div>
              <h3 className="font-bold mb-4">Contact Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500 text-xs">Name</div>
                  <div className="font-medium">{selectedMsg.senderName}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Platform</div>
                  <Badge color="blue">{selectedMsg.platform}</Badge>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Last Message</div>
                  <div className="text-xs">
                    {new Date(selectedMsg.lastMessageTime).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // INBOX TAB
  const InboxTab = () => {
    const [typeFilter, setTypeFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [assigneeFilter, setAssigneeFilter] = useState("");

    const handleUpdateInbox = async (inboxId, field, value) => {
      const result = await apiFetch(`/inbox/${inboxId}/${field}`, {
        method: "PATCH",
        body: { [field]: value },
      });

      if (result) {
        showToast("Updated successfully", "success");
        const updated = await apiFetch("/inbox");
        setInbox(updated?.data || []);
      }
    };

    return (
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 text-sm">Total Messages</div>
            <div className="text-3xl font-bold mt-2">{inboxStats.total || 0}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 text-sm">Unread</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">
              {inboxStats.unread || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 text-sm">High Priority</div>
            <div className="text-3xl font-bold text-red-600 mt-2">
              {inboxStats.highPriority || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-gray-500 text-sm">Assigned to Me</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              {inboxStats.assignedToMe || 0}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex flex-wrap gap-3 items-center">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Types</option>
              <option value="message">Message</option>
              <option value="mention">Mention</option>
              <option value="comment">Comment</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
            </select>

            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Assign to...</option>
              <option value="me">Me</option>
              <option value="team">Team</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold">From</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Message</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Platform</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Assigned</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {inbox.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{item.from}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {item.message?.substring(0, 50)}...
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge color="blue">{item.platform}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <select
                        value={item.priority || ""}
                        onChange={(e) =>
                          handleUpdateInbox(item.id, "priority", e.target.value)
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <select
                        value={item.status || ""}
                        onChange={(e) =>
                          handleUpdateInbox(item.id, "status", e.target.value)
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="new">New</option>
                        <option value="open">Open</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <select
                        value={item.assignee || ""}
                        onChange={(e) =>
                          handleUpdateInbox(item.id, "assignee", e.target.value)
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="">Unassigned</option>
                        <option value="me">Me</option>
                        <option value="team">Team</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // MONITOR TAB
  const MonitorTab = () => {
    const [newColumnName, setNewColumnName] = useState("");
    const [showAddColumn, setShowAddColumn] = useState(false);

    const handleAddColumn = async () => {
      if (!newColumnName.trim()) return;

      const result = await apiFetch("/monitor/columns", {
        method: "POST",
        body: { name: newColumnName },
      });

      if (result) {
        showToast("Column added", "success");
        setNewColumnName("");
        setShowAddColumn(false);
        const updated = await apiFetch("/monitor/columns");
        setMonitorColumns(updated?.data || []);
      }
    };

    const handleReplyToReview = async (itemId) => {
      const reply = prompt("Enter your reply:");
      if (!reply) return;

      const result = await apiFetch(`/monitor/items/${itemId}/reply`, {
        method: "POST",
        body: { reply },
      });

      if (result) {
        showToast("Reply sent", "success");
      }
    };

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Social Mentions Monitor</h2>
          <button
            onClick={() => setShowAddColumn(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Column
          </button>
        </div>

        {showAddColumn && (
          <div className="mb-6 bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
            <div className="flex gap-2">
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Column name..."
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <button
                onClick={handleAddColumn}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddColumn(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {monitorColumns.map((column) => {
            const columnItems = monitorItems.filter(
              (item) => item.columnId === column.id
            );
            return (
              <div
                key={column.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-bold">{column.name}</h3>
                </div>

                <div className="divide-y">
                  {columnItems.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No items in this column
                    </div>
                  ) : (
                    columnItems.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-sm">
                              {item.senderName}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              {React.createElement(
                                getPlatformIcon(item.platform),
                                {
                                  className: "w-3 h-3",
                                }
                              )}
                              {item.platform}
                            </div>
                          </div>
                          {item.rating && (
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < item.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{item.content}</p>
                        <button
                          onClick={() => handleReplyToReview(item.id)}
                          className="text-blue-600 text-xs font-medium hover:text-blue-700"
                        >
                          Reply
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // CONNECTIONS TAB
  const ConnectionsTab = () => {
    const filteredConnections = connections.filter((conn) => {
      const categoryMatch =
        connectionCategory === "all" || conn.category === connectionCategory;
      const searchMatch =
        searchConnections === "" ||
        conn.name?.toLowerCase().includes(searchConnections.toLowerCase());
      return categoryMatch && searchMatch;
    });

    const handleLinkToCRM = async (connId) => {
      const result = await apiFetch(`/connections/${connId}/link-crm`, {
        method: "POST",
      });

      if (result) {
        showToast("Linked to CRM", "success");
        const updated = await apiFetch("/connections");
        setConnections(updated?.data || []);
      }
    };

    const handleMute = async (connId) => {
      const result = await apiFetch(`/connections/${connId}/mute`, {
        method: "POST",
      });

      if (result) {
        showToast("Connection muted", "success");
      }
    };

    const handleBlock = async (connId) => {
      const result = await apiFetch(`/connections/${connId}/block`, {
        method: "POST",
      });

      if (result) {
        showToast("Connection blocked", "success");
      }
    };

    return (
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-bold mb-4">Categories</h3>
          <div className="space-y-2">
            {["all", "followers", "leads", "customers", "partners"].map((cat) => (
              <button
                key={cat}
                onClick={() => setConnectionCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition ${
                  connectionCategory === cat
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                <span className="float-right text-xs text-gray-500">
                  {connectionsStats[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchConnections}
                onChange={(e) => setSearchConnections(e.target.value)}
                placeholder="Search connections..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConnections.map((conn) => (
              <div key={conn.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getPlatformBg(conn.platform) }}
                    >
                      {React.createElement(getPlatformIcon(conn.platform), {
                        className: "w-5 h-5",
                        style: { color: getPlatformColor(conn.platform) },
                      })}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{conn.name}</div>
                      <Badge color="blue" className="text-xs">
                        {conn.platform}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-3 text-xs">
                  <div className="text-gray-600">
                    <span className="font-medium">Followers:</span> {conn.followers || 0}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Engagement:</span> {conn.engagement || 0}%
                  </div>
                  {conn.crmLinked && (
                    <div className="text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Linked to CRM
                    </div>
                  )}
                </div>

                <div className="flex gap-2 text-xs">
                  {!conn.crmLinked && (
                    <button
                      onClick={() => handleLinkToCRM(conn.id)}
                      className="flex-1 bg-blue-100 text-blue-700 rounded px-2 py-1 hover:bg-blue-200 font-medium"
                    >
                      Link CRM
                    </button>
                  )}
                  <button
                    onClick={() => handleMute(conn.id)}
                    className="flex-1 bg-gray-100 text-gray-700 rounded px-2 py-1 hover:bg-gray-200"
                  >
                    Mute
                  </button>
                  <button
                    onClick={() => handleBlock(conn.id)}
                    className="flex-1 bg-red-100 text-red-700 rounded px-2 py-1 hover:bg-red-200"
                  >
                    Block
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // COLLABORATE TAB
  const CollaborateTab = () => {
    const [whatsInput, setWhatsInput] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const handlePostIdea = async () => {
      if (!whatsInput.trim()) return;

      const result = await apiFetch("/collaborate", {
        method: "POST",
        body: { idea: whatsInput },
      });

      if (result) {
        showToast("Idea posted", "success");
        setWhatsInput("");
        const updated = await apiFetch("/collaborate");
        setCollaborations(updated?.data || []);
      }
    };

    const handleApprove = async (collabId) => {
      const result = await apiFetch(`/collaborate/${collabId}/approve`, {
        method: "POST",
      });

      if (result) {
        showToast("Approved", "success");
        const updated = await apiFetch("/collaborate");
        setCollaborations(updated?.data || []);
      }
    };

    const handleReject = async (collabId) => {
      const result = await apiFetch(`/collaborate/${collabId}/reject`, {
        method: "POST",
      });

      if (result) {
        showToast("Rejected", "success");
        const updated = await apiFetch("/collaborate");
        setCollaborations(updated?.data || []);
      }
    };

    const handleAddComment = async (collabId) => {
      const comment = prompt("Add a comment:");
      if (!comment) return;

      const result = await apiFetch(`/collaborate/${collabId}/comment`, {
        method: "POST",
        body: { comment },
      });

      if (result) {
        showToast("Comment added", "success");
        const updated = await apiFetch("/collaborate");
        setCollaborations(updated?.data || []);
      }
    };

    const filteredCollabs = collaborations.filter((collab) => {
      const typeMatch = typeFilter === "all" || collab.type === typeFilter;
      const statusMatch =
        statusFilter === "all" || collab.status === statusFilter;
      return typeMatch && statusMatch;
    });

    return (
      <div className="p-6 space-y-6">
        {/* Idea Input */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-2">
              What's cooking?
            </label>
            <textarea
              value={whatsInput}
              onChange={(e) => setWhatsInput(e.target.value)}
              rows={3}
              placeholder="Share your post idea..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePostIdea}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" /> Post Idea
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Types</option>
            <option value="idea">Idea</option>
            <option value="content">Content</option>
            <option value="campaign">Campaign</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {filteredCollabs.map((collab) => (
            <div key={collab.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold">{collab.title}</div>
                  <div className="text-xs text-gray-500">
                    {collab.author} • {new Date(collab.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Badge
                  color={
                    collab.status === "approved"
                      ? "green"
                      : collab.status === "rejected"
                      ? "red"
                      : "yellow"
                  }
                >
                  {collab.status}
                </Badge>
              </div>

              <p className="text-sm text-gray-700 mb-4">{collab.description}</p>

              <div className="flex gap-2 flex-wrap mb-4">
                {collab.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(collab.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(collab.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Reject
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleAddComment(collab.id)}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-medium hover:bg-blue-200 flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" /> Comment
                </button>
              </div>

              {collab.comments?.length > 0 && (
                <div className="mt-4 pt-4 border-t space-y-2">
                  {collab.comments.map((comment, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-medium">{comment.author}</span>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // REPORTS TAB
  const ReportsTab = () => {
    const chartColors = ["#3B82F6", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6"];

    return (
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-bold mb-4">Reports</h3>
          <div className="space-y-2">
            {[
              { id: "audience", label: "Audience Growth" },
              { id: "engagement", label: "Engagement" },
              { id: "topPosts", label: "Top Posts" },
              { id: "hashtags", label: "Hashtag Performance" },
            ].map((report) => (
              <button
                key={report.id}
                onClick={() => setReportType(report.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm font-medium transition ${
                  reportType === report.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {report.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 overflow-y-auto p-6">
          {reportType === "audience" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Audience Growth</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reports.audience || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="#3B82F6"
                      name="Followers"
                    />
                    <Line
                      type="monotone"
                      dataKey="newFollowers"
                      stroke="#10B981"
                      name="New Followers"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {reportType === "engagement" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Engagement by Type</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reports.engagement || []}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      fill="#3B82F6"
                    >
                      {(reports.engagement || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {reportType === "topPosts" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Top Posts</h2>
              <div className="grid grid-cols-1 gap-4">
                {reports.topPosts?.map((post, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-sm">{post.content?.substring(0, 50)}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                      </div>
                      <Badge color="blue">{post.platform}</Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-xs">
                      <div>
                        <div className="text-gray-500">Likes</div>
                        <div className="font-bold">{post.likes}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Comments</div>
                        <div className="font-bold">{post.comments}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Shares</div>
                        <div className="font-bold">{post.shares}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Reach</div>
                        <div className="font-bold">{post.reach}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {reportType === "hashtags" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Top Hashtags</h2>
              <div className="grid grid-cols-1 gap-4">
                {reports.hashtags?.map((tag, idx) => (
                  <div key={idx} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm flex items-center gap-2">
                        <Hash className="w-4 h-4 text-blue-600" />
                        {tag.hashtag}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {tag.mentions} mentions
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{tag.reach}</div>
                      <div className="text-xs text-gray-500">reach</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // LEAD FORMS TAB
  const LeadFormsTab = () => {
    const [platformTab, setPlatformTab] = useState("Facebook");

    const filteredForms = leadForms.filter((form) => form.platform === platformTab);

    const handleToggleStatus = async (formId) => {
      const result = await apiFetch(`/lead-forms/${formId}`, {
        method: "PATCH",
        body: { status: "active" },
      });

      if (result) {
        showToast("Form updated", "success");
        const updated = await apiFetch("/lead-forms");
        setLeadForms(updated?.data || []);
      }
    };

    return (
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Lead Forms</h2>

        <div className="flex gap-4 border-b">
          {["Facebook", "LinkedIn"].map((platform) => (
            <button
              key={platform}
              onClick={() => setPlatformTab(platform)}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                platformTab === platform
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Form Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Leads Collected
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Last Sync</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">CRM Sync</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map((form) => (
                  <tr key={form.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{form.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        color={
                          form.status === "active"
                            ? "green"
                            : "gray"
                        }
                      >
                        {form.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{form.leadsCollected || 0}</td>
                    <td className="px-4 py-3 text-sm">
                      {form.lastSync
                        ? new Date(form.lastSync).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={form.crmSync || false}
                          onChange={(e) => {
                            // Could handle form sync update
                          }}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                        {form.crmSync ? "Enabled" : "Disabled"}
                      </label>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleToggleStatus(form.id)}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    "Home",
    "Posts",
    "Messages",
    "Inbox",
    "Monitor",
    "Connections",
    "Collaborate",
    "Reports",
    "Lead Forms",
  ];

  const renderTab = () => {
    if (loading && activeTab !== "Home" && activeTab !== "Posts") {
      return <div className="p-8 text-center text-gray-500">Loading...</div>;
    }

    switch (activeTab) {
      case "Home":
        return <HomeTab />;
      case "Posts":
        return <PostsTab />;
      case "Messages":
        return <MessagesTab />;
      case "Inbox":
        return <InboxTab />;
      case "Monitor":
        return <MonitorTab />;
      case "Connections":
        return <ConnectionsTab />;
      case "Collaborate":
        return <CollaborateTab />;
      case "Reports":
        return <ReportsTab />;
      case "Lead Forms":
        return <LeadFormsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">{renderTab()}</div>
    </div>
  );
}
