import { Router } from "express";
import { store, nextId } from "../data/store.js";

const router = Router();

// ============================================================
// CHANNELS (Connection Management)
// ============================================================

router.get("/channels", (req, res) => {
  res.json({ success: true, count: store.socialChannels.length, channels: store.socialChannels });
});

router.post("/channels/:id/connect", (req, res) => {
  const channel = store.socialChannels.find(c => c.id === Number(req.params.id));
  if (!channel) return res.status(404).json({ error: "Channel not found" });

  const { handle, accessToken, pageId } = req.body;
  if (!handle || !accessToken) return res.status(400).json({ error: "Handle and accessToken are required" });

  channel.handle = handle;
  channel.accessToken = accessToken;
  channel.connected = true;
  channel.connectedDate = new Date().toISOString();
  if (pageId) channel.pageId = pageId;

  res.json({ success: true, channel });
});

router.post("/channels/:id/disconnect", (req, res) => {
  const channel = store.socialChannels.find(c => c.id === Number(req.params.id));
  if (!channel) return res.status(404).json({ error: "Channel not found" });

  channel.connected = false;
  channel.accessToken = null;
  channel.syncStatus = "disconnected";

  res.json({ success: true, channel });
});

router.post("/channels/:id/sync", (req, res) => {
  const channel = store.socialChannels.find(c => c.id === Number(req.params.id));
  if (!channel) return res.status(404).json({ error: "Channel not found" });
  if (!channel.connected) return res.status(400).json({ error: "Channel not connected" });

  channel.lastSync = new Date().toISOString();
  channel.syncStatus = "synced";

  res.json({ success: true, channel });
});

// ============================================================
// POSTS (Published, Scheduled, Drafts, Approvals)
// ============================================================

router.get("/posts", (req, res) => {
  let posts = [...store.socialPosts];
  const { status, platform, approvalStatus } = req.query;

  if (status) posts = posts.filter(p => p.status === status);
  if (platform) posts = posts.filter(p => p.platforms.includes(platform));
  if (approvalStatus) posts = posts.filter(p => p.approvalStatus === approvalStatus);

  res.json({ success: true, count: posts.length, posts });
});

router.get("/posts/:id", (req, res) => {
  const post = store.socialPosts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ success: true, post });
});

router.post("/posts", (req, res) => {
  const { content, platforms, scheduledDate, scheduledTime, type, mediaUrl, tags } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });

  const post = {
    id: nextId("socialPosts"),
    content,
    platforms: platforms || [],
    status: scheduledDate ? "Scheduled" : "Draft",
    type: type || "text",
    mediaUrl: mediaUrl || null,
    scheduledDate: scheduledDate || null,
    scheduledTime: scheduledTime || null,
    publishedDate: null,
    tags: tags || [],
    likes: 0,
    comments: 0,
    shares: 0,
    reach: 0,
    author: "Priya M.",
    approvalStatus: "pending"
  };

  store.socialPosts.push(post);
  res.status(201).json({ success: true, post });
});

router.patch("/posts/:id", (req, res) => {
  const post = store.socialPosts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });

  const { content, platforms, scheduledDate, scheduledTime, type, mediaUrl, tags } = req.body;
  if (content !== undefined) post.content = content;
  if (platforms !== undefined) post.platforms = platforms;
  if (scheduledDate !== undefined) post.scheduledDate = scheduledDate;
  if (scheduledTime !== undefined) post.scheduledTime = scheduledTime;
  if (type !== undefined) post.type = type;
  if (mediaUrl !== undefined) post.mediaUrl = mediaUrl;
  if (tags !== undefined) post.tags = tags;

  res.json({ success: true, post });
});

router.delete("/posts/:id", (req, res) => {
  const idx = store.socialPosts.findIndex(p => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Post not found" });
  store.socialPosts.splice(idx, 1);
  res.json({ success: true });
});

router.patch("/posts/:id/publish", (req, res) => {
  const post = store.socialPosts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.status = "Published";
  post.publishedDate = new Date().toISOString();
  post.approvalStatus = "approved";

  res.json({ success: true, post });
});

router.patch("/posts/:id/approve", (req, res) => {
  const post = store.socialPosts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.approvalStatus = "approved";

  res.json({ success: true, post });
});

router.patch("/posts/:id/reject", (req, res) => {
  const post = store.socialPosts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Post not found" });

  post.approvalStatus = "rejected";

  res.json({ success: true, post });
});

router.get("/posts/calendar", (req, res) => {
  const grouped = {};
  store.socialPosts.forEach(post => {
    const date = post.publishedDate ? post.publishedDate.split("T")[0] : (post.scheduledDate || "unscheduled");
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(post);
  });

  res.json({ success: true, calendar: grouped });
});

// ============================================================
// MESSAGES (Conversations)
// ============================================================

router.get("/messages", (req, res) => {
  let messages = [...store.socialMessages];
  const { platform } = req.query;

  if (platform) messages = messages.filter(m => m.platform === platform);

  const unread = messages.filter(m => !m.read).length;
  res.json({ success: true, count: messages.length, unread, messages });
});

router.get("/messages/:id", (req, res) => {
  const msg = store.socialMessages.find(m => m.id === Number(req.params.id));
  if (!msg) return res.status(404).json({ error: "Conversation not found" });
  res.json({ success: true, message: msg });
});

router.post("/messages/:id/reply", (req, res) => {
  const msg = store.socialMessages.find(m => m.id === Number(req.params.id));
  if (!msg) return res.status(404).json({ error: "Conversation not found" });

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Reply text is required" });

  msg.messages = msg.messages || [];
  msg.messages.push({
    sender: "Rooman Support",
    text,
    time: new Date().toISOString(),
    isOutgoing: true
  });

  msg.replied = true;
  msg.read = true;
  msg.lastMessage = text;

  res.json({ success: true, message: msg });
});

router.patch("/messages/:id/read", (req, res) => {
  const msg = store.socialMessages.find(m => m.id === Number(req.params.id));
  if (!msg) return res.status(404).json({ error: "Conversation not found" });

  msg.read = true;
  res.json({ success: true, message: msg });
});

// ============================================================
// INBOX (Interactions)
// ============================================================

router.get("/inbox", (req, res) => {
  let items = [...store.socialInteractions];
  const { type, platform, priority, status, assignee, read } = req.query;

  if (type) items = items.filter(i => i.type === type);
  if (platform) items = items.filter(i => i.platform === platform);
  if (priority) items = items.filter(i => i.priority === priority);
  if (status) items = items.filter(i => i.status === status);
  if (assignee) items = items.filter(i => i.assignee === assignee);
  if (read !== undefined) items = items.filter(i => i.read === (read === "true"));

  const unread = items.filter(i => !i.read).length;
  res.json({ success: true, count: items.length, unread, items });
});

router.get("/inbox/stats", (req, res) => {
  const all = store.socialInteractions;
  const unread = all.filter(i => !i.read).length;
  const byType = {};
  const byStatus = {};

  all.forEach(item => {
    byType[item.type] = (byType[item.type] || 0) + 1;
    byStatus[item.status] = (byStatus[item.status] || 0) + 1;
  });

  res.json({
    success: true,
    total: all.length,
    unread,
    byType,
    byStatus
  });
});

router.patch("/inbox/:id/priority", (req, res) => {
  const item = store.socialInteractions.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Interaction not found" });

  const { priority } = req.body;
  if (!priority) return res.status(400).json({ error: "Priority is required" });

  item.priority = priority;
  res.json({ success: true, item });
});

router.patch("/inbox/:id/assignee", (req, res) => {
  const item = store.socialInteractions.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Interaction not found" });

  const { assignee } = req.body;
  if (!assignee) return res.status(400).json({ error: "Assignee is required" });

  item.assignee = assignee;
  res.json({ success: true, item });
});

router.patch("/inbox/:id/status", (req, res) => {
  const item = store.socialInteractions.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Interaction not found" });

  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "Status is required" });

  item.status = status;
  res.json({ success: true, item });
});

router.patch("/inbox/:id/read", (req, res) => {
  const item = store.socialInteractions.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Interaction not found" });

  item.read = true;
  res.json({ success: true, item });
});

// ============================================================
// MONITOR
// ============================================================

router.get("/monitor/columns", (req, res) => {
  const columns = store.socialMonitorColumns.filter(c => c.enabled);
  res.json({ success: true, count: columns.length, columns });
});

router.post("/monitor/columns", (req, res) => {
  const { name, type, platforms } = req.body;
  if (!name || !type) return res.status(400).json({ error: "Name and type are required" });

  const column = {
    id: nextId("socialMonitorColumns"),
    name,
    type,
    platforms: platforms || ["all"],
    enabled: true
  };

  store.socialMonitorColumns.push(column);
  res.status(201).json({ success: true, column });
});

router.patch("/monitor/columns/:id", (req, res) => {
  const column = store.socialMonitorColumns.find(c => c.id === Number(req.params.id));
  if (!column) return res.status(404).json({ error: "Column not found" });

  const { name, enabled } = req.body;
  if (name !== undefined) column.name = name;
  if (enabled !== undefined) column.enabled = enabled;

  res.json({ success: true, column });
});

router.delete("/monitor/columns/:id", (req, res) => {
  const idx = store.socialMonitorColumns.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Column not found" });
  store.socialMonitorColumns.splice(idx, 1);
  res.json({ success: true });
});

router.get("/monitor/items", (req, res) => {
  let items = [...store.socialMonitorItems];
  const { columnId, type } = req.query;

  if (columnId) items = items.filter(i => i.columnId === Number(columnId));
  if (type) items = items.filter(i => i.type === type);

  res.json({ success: true, count: items.length, items });
});

router.post("/monitor/items/:id/reply", (req, res) => {
  const item = store.socialMonitorItems.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Reply text is required" });

  item.replied = true;
  res.json({ success: true, item });
});

// ============================================================
// CONNECTIONS
// ============================================================

router.get("/connections", (req, res) => {
  let connections = [...store.socialConnections];
  const { platform, category, search, crmLinked } = req.query;

  if (platform) connections = connections.filter(c => c.platform === platform);
  if (category) connections = connections.filter(c => c.category === category);
  if (crmLinked !== undefined) connections = connections.filter(c => c.crmLinked === (crmLinked === "true"));
  if (search) {
    const term = search.toLowerCase();
    connections = connections.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.handle.toLowerCase().includes(term)
    );
  }

  res.json({ success: true, count: connections.length, connections });
});

router.get("/connections/stats", (req, res) => {
  const byCategory = {};
  store.socialConnections.forEach(c => {
    byCategory[c.category] = (byCategory[c.category] || 0) + 1;
  });

  res.json({ success: true, total: store.socialConnections.length, byCategory });
});

router.get("/connections/:id", (req, res) => {
  const connection = store.socialConnections.find(c => c.id === Number(req.params.id));
  if (!connection) return res.status(404).json({ error: "Connection not found" });
  res.json({ success: true, connection });
});

router.patch("/connections/:id", (req, res) => {
  const connection = store.socialConnections.find(c => c.id === Number(req.params.id));
  if (!connection) return res.status(404).json({ error: "Connection not found" });

  const { category, crmLeadId } = req.body;
  if (category !== undefined) connection.category = category;
  if (crmLeadId !== undefined) {
    connection.crmLeadId = crmLeadId;
    connection.crmLinked = !!crmLeadId;
  }

  res.json({ success: true, connection });
});

router.post("/connections/:id/mute", (req, res) => {
  const connection = store.socialConnections.find(c => c.id === Number(req.params.id));
  if (!connection) return res.status(404).json({ error: "Connection not found" });

  connection.category = "muted";
  res.json({ success: true, connection });
});

router.post("/connections/:id/block", (req, res) => {
  const connection = store.socialConnections.find(c => c.id === Number(req.params.id));
  if (!connection) return res.status(404).json({ error: "Connection not found" });

  connection.category = "blocked";
  res.json({ success: true, connection });
});

router.post("/connections/:id/link-crm", (req, res) => {
  const connection = store.socialConnections.find(c => c.id === Number(req.params.id));
  if (!connection) return res.status(404).json({ error: "Connection not found" });

  const { crmLeadId } = req.body;
  if (!crmLeadId) return res.status(400).json({ error: "CRM Lead ID is required" });

  connection.crmLeadId = crmLeadId;
  connection.crmLinked = true;

  res.json({ success: true, connection });
});

// ============================================================
// COLLABORATE
// ============================================================

router.get("/collaborate", (req, res) => {
  let items = [...store.socialCollaborateItems];
  const { type, status } = req.query;

  if (type) items = items.filter(i => i.type === type);
  if (status) items = items.filter(i => i.status === status);

  res.json({ success: true, count: items.length, items });
});

router.post("/collaborate", (req, res) => {
  const { content, type } = req.body;
  if (!content || !type) return res.status(400).json({ error: "Content and type are required" });

  const item = {
    id: nextId("socialCollaborateItems"),
    type,
    author: "Priya M.",
    authorAvatar: "PM",
    content,
    postPreview: null,
    status: "pending",
    date: new Date().toISOString(),
    comments: [],
    platforms: ["all"]
  };

  store.socialCollaborateItems.push(item);
  res.status(201).json({ success: true, item });
});

router.post("/collaborate/:id/approve", (req, res) => {
  const item = store.socialCollaborateItems.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.status = "approved";
  res.json({ success: true, item });
});

router.post("/collaborate/:id/reject", (req, res) => {
  const item = store.socialCollaborateItems.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  item.status = "rejected";
  res.json({ success: true, item });
});

router.post("/collaborate/:id/comment", (req, res) => {
  const item = store.socialCollaborateItems.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Item not found" });

  const { author, text } = req.body;
  if (!author || !text) return res.status(400).json({ error: "Author and text are required" });

  item.comments = item.comments || [];
  item.comments.push({
    author,
    text,
    date: new Date().toISOString()
  });

  res.json({ success: true, item });
});

// ============================================================
// REPORTS
// ============================================================

router.get("/reports/audience", (req, res) => {
  const data = store.socialReportData?.audience || {
    totalFollowers: 32000,
    newFollowers: 0,
    newFollowersChange: 0,
    followersLost: 0,
    followersLostChange: 0,
    byPlatform: {},
    growthTrend: []
  };

  res.json({ success: true, audience: data });
});

router.get("/reports/engagement", (req, res) => {
  const data = store.socialReportData?.engagement || {
    totalPosts: 0,
    totalEngagement: 0,
    totalEngagementChange: 0,
    totalReach: 0,
    totalReachChange: 0,
    totalImpressions: 0,
    avgEngagementRate: 0,
    byType: {},
    byPlatform: {},
    trend: []
  };

  res.json({ success: true, engagement: data });
});

router.get("/reports/top-posts", (req, res) => {
  const topPosts = store.socialReportData?.topPosts || [];
  res.json({ success: true, topPosts });
});

router.get("/reports/summary", (req, res) => {
  const audience = store.socialReportData?.audience || {};
  const engagement = store.socialReportData?.engagement || {};
  const topPosts = store.socialReportData?.topPosts || [];

  res.json({
    success: true,
    summary: {
      audience,
      engagement,
      topPosts,
      metrics: {
        totalFollowers: audience.totalFollowers || 0,
        totalPosts: engagement.totalPosts || 0,
        totalEngagement: engagement.totalEngagement || 0,
        totalReach: engagement.totalReach || 0
      }
    }
  });
});

router.get("/reports/hashtags", (req, res) => {
  const hashtagMap = {};

  store.socialPosts.forEach(post => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(tag => {
        if (!hashtagMap[tag]) {
          hashtagMap[tag] = { tag, count: 0, reach: 0, engagement: 0 };
        }
        hashtagMap[tag].count += 1;
        hashtagMap[tag].reach += post.reach || 0;
        hashtagMap[tag].engagement += (post.likes + post.comments + post.shares) || 0;
      });
    }
  });

  const hashtags = Object.values(hashtagMap).sort((a, b) => b.count - a.count);

  res.json({ success: true, hashtags });
});

// ============================================================
// LEAD FORMS
// ============================================================

router.get("/lead-forms", (req, res) => {
  let forms = [...store.socialLeadForms];
  const { platform, status } = req.query;

  if (platform) forms = forms.filter(f => f.platform === platform);
  if (status) forms = forms.filter(f => f.status === status);

  res.json({ success: true, count: forms.length, forms });
});

router.get("/lead-forms/:id", (req, res) => {
  const form = store.socialLeadForms.find(f => f.id === Number(req.params.id));
  if (!form) return res.status(404).json({ error: "Lead form not found" });
  res.json({ success: true, form });
});

router.post("/lead-forms", (req, res) => {
  const { platform, formName, adAccount } = req.body;
  if (!platform || !formName || !adAccount) {
    return res.status(400).json({ error: "Platform, formName, and adAccount are required" });
  }

  const form = {
    id: nextId("socialLeadForms"),
    platform,
    formName,
    adAccount,
    status: "Draft",
    leadsCollected: 0,
    lastSync: null,
    crmSyncEnabled: false,
    assignmentRule: null,
    createdDate: new Date().toISOString().split("T")[0]
  };

  store.socialLeadForms.push(form);
  res.status(201).json({ success: true, form });
});

router.patch("/lead-forms/:id", (req, res) => {
  const form = store.socialLeadForms.find(f => f.id === Number(req.params.id));
  if (!form) return res.status(404).json({ error: "Lead form not found" });

  const { status, crmSyncEnabled, assignmentRule } = req.body;
  if (status !== undefined) form.status = status;
  if (crmSyncEnabled !== undefined) form.crmSyncEnabled = crmSyncEnabled;
  if (assignmentRule !== undefined) form.assignmentRule = assignmentRule;

  if (form.status === "Active" && !form.lastSync) {
    form.lastSync = new Date().toISOString();
  }

  res.json({ success: true, form });
});

router.delete("/lead-forms/:id", (req, res) => {
  const idx = store.socialLeadForms.findIndex(f => f.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Lead form not found" });
  store.socialLeadForms.splice(idx, 1);
  res.json({ success: true });
});

// ============================================================
// SETTINGS
// ============================================================

router.get("/settings", (req, res) => {
  const settings = store.socialSettings || {
    autoPosting: false,
    approvalRequired: true,
    notifyOnMentions: true,
    rssFeedsEnabled: false,
    rssFeeds: store.socialRssFeeds || []
  };

  res.json({ success: true, settings });
});

router.patch("/settings", (req, res) => {
  const updates = req.body;

  if (!store.socialSettings) {
    store.socialSettings = {
      autoPosting: false,
      approvalRequired: true,
      notifyOnMentions: true,
      rssFeedsEnabled: false
    };
  }

  Object.assign(store.socialSettings, updates);
  res.json({ success: true, settings: store.socialSettings });
});

router.get("/settings/rss-feeds", (req, res) => {
  const feeds = store.socialRssFeeds || [];
  res.json({ success: true, count: feeds.length, feeds });
});

router.post("/settings/rss-feeds", (req, res) => {
  const { url, name } = req.body;
  if (!url || !name) return res.status(400).json({ error: "URL and name are required" });

  if (!store.socialRssFeeds) store.socialRssFeeds = [];

  const feed = {
    id: nextId("socialRssFeeds"),
    url,
    name,
    enabled: true,
    lastFetch: new Date().toISOString(),
    addedDate: new Date().toISOString().split("T")[0]
  };

  store.socialRssFeeds.push(feed);
  res.status(201).json({ success: true, feed });
});

router.delete("/settings/rss-feeds/:id", (req, res) => {
  if (!store.socialRssFeeds) store.socialRssFeeds = [];

  const idx = store.socialRssFeeds.findIndex(f => f.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "RSS feed not found" });

  store.socialRssFeeds.splice(idx, 1);
  res.json({ success: true });
});

// ============================================================
// ANALYTICS
// ============================================================

router.get("/analytics", (req, res) => {
  const published = store.socialPosts.filter(p => p.status === "Published");
  const scheduled = store.socialPosts.filter(p => p.status === "Scheduled");
  const drafts = store.socialPosts.filter(p => p.status === "Draft");

  const totalLikes = published.reduce((s, p) => s + (p.likes || 0), 0);
  const totalComments = published.reduce((s, p) => s + (p.comments || 0), 0);
  const totalShares = published.reduce((s, p) => s + (p.shares || 0), 0);
  const totalReach = published.reduce((s, p) => s + (p.reach || 0), 0);

  const totalFollowers = Object.values(store.socialChannels.reduce((acc, c) => {
    acc[c.platform] = c.followers || 0;
    return acc;
  }, {})).reduce((a, b) => a + b, 0);

  const unreadMessages = store.socialMessages.filter(m => !m.read).length;
  const unreadInbox = store.socialInteractions.filter(i => !i.read).length;

  res.json({
    success: true,
    posts: {
      published: published.length,
      scheduled: scheduled.length,
      drafts: drafts.length
    },
    engagement: {
      likes: totalLikes,
      comments: totalComments,
      shares: totalShares
    },
    reach: totalReach,
    messages: {
      total: store.socialMessages.length,
      unread: unreadMessages
    },
    inbox: {
      total: store.socialInteractions.length,
      unread: unreadInbox
    },
    followers: totalFollowers
  });
});

router.get("/analytics/brand-health", (req, res) => {
  const brandHealth = store.socialChannels.map(channel => {
    const channelPosts = store.socialPosts.filter(p => p.platforms.includes(channel.platform));
    const reach = channelPosts.reduce((s, p) => s + (p.reach || 0), 0);
    const engagement = channelPosts.reduce((s, p) => s + (p.likes + p.comments + p.shares || 0), 0);

    return {
      platform: channel.platform,
      followers: channel.followers || 0,
      newFollowers: 0,
      newFollowersChangePercent: 0,
      postsCount: channelPosts.length,
      reach,
      engagement,
      engagementRate: channelPosts.length > 0 ? ((engagement / channelPosts.length) * 100).toFixed(2) : 0
    };
  });

  res.json({ success: true, brandHealth });
});

export default router;
