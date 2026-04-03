// In-memory data store (replace with MongoDB/PostgreSQL in production)
// This file holds all CRM data and exports getter/setter functions

const store = {
  leads: [
    { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 9876543210", source: "Website", course: "Full Stack Development", status: "New", score: 85, assignedTo: "Priya M.", date: "2026-03-28", city: "Bangalore" },
    { id: 2, name: "Anitha K.", email: "anitha.k@yahoo.com", phone: "+91 9123456789", source: "Social Media", course: "Data Science", status: "Contacted", score: 72, assignedTo: "Vikram S.", date: "2026-03-27", city: "Chennai" },
    { id: 3, name: "Mohammed Faisal", email: "faisal.m@outlook.com", phone: "+91 8765432109", source: "Referral", course: "Cloud Computing", status: "Qualified", score: 91, assignedTo: "Priya M.", date: "2026-03-26", city: "Hyderabad" },
    { id: 4, name: "Sneha Reddy", email: "sneha.r@gmail.com", phone: "+91 7654321098", source: "Walk-in", course: "AI & ML", status: "Enrolled", score: 95, assignedTo: "Deepak R.", date: "2026-03-25", city: "Bangalore" },
    { id: 5, name: "Arjun Nair", email: "arjun.n@gmail.com", phone: "+91 6543210987", source: "Website", course: "Cyber Security", status: "New", score: 68, assignedTo: "Vikram S.", date: "2026-03-29", city: "Kochi" },
  ],

  students: [
    { id: 1, name: "Sneha Reddy", email: "sneha.r@gmail.com", phone: "+91 7654321098", course: "AI & ML", batch: "AI-B12", startDate: "2026-02-15", endDate: "2026-08-15", status: "Active", progress: 45, fees: 85000, paid: 60000, mentor: "Dr. Ramesh K." },
    { id: 2, name: "Divya Lakshmi", email: "divya.l@gmail.com", phone: "+91 7766554433", course: "Cloud Computing", batch: "CC-B8", startDate: "2026-01-10", endDate: "2026-07-10", status: "Active", progress: 62, fees: 75000, paid: 75000, mentor: "Suresh P." },
    { id: 3, name: "Arun Kumar", email: "arun.k@gmail.com", phone: "+91 9900112233", course: "Full Stack Development", batch: "FSD-B15", startDate: "2025-10-01", endDate: "2026-04-01", status: "Active", progress: 85, fees: 90000, paid: 90000, mentor: "Lakshmi N." },
    { id: 4, name: "Meera Joshi", email: "meera.j@gmail.com", phone: "+91 8811223344", course: "Data Science", batch: "DS-B10", startDate: "2025-09-15", endDate: "2026-03-15", status: "Completed", progress: 100, fees: 80000, paid: 80000, mentor: "Dr. Ramesh K." },
    { id: 5, name: "Rohan Gupta", email: "rohan.g@gmail.com", phone: "+91 7722334455", course: "Cyber Security", batch: "CS-B6", startDate: "2026-03-01", endDate: "2026-09-01", status: "Active", progress: 15, fees: 70000, paid: 35000, mentor: "Vikash T." },
  ],

  courses: [
    { id: 1, name: "Full Stack Development", duration: "6 months", fee: 90000, students: 145, batches: 15, rating: 4.7, status: "Active", category: "Development", modules: 24 },
    { id: 2, name: "Data Science", duration: "6 months", fee: 80000, students: 120, batches: 10, rating: 4.8, status: "Active", category: "Analytics", modules: 20 },
    { id: 3, name: "AI & Machine Learning", duration: "6 months", fee: 85000, students: 98, batches: 12, rating: 4.6, status: "Active", category: "AI", modules: 22 },
    { id: 4, name: "Cloud Computing", duration: "6 months", fee: 75000, students: 87, batches: 8, rating: 4.5, status: "Active", category: "Cloud", modules: 18 },
    { id: 5, name: "Cyber Security", duration: "6 months", fee: 70000, students: 65, batches: 6, rating: 4.4, status: "Active", category: "Security", modules: 16 },
    { id: 6, name: "DevOps Engineering", duration: "4 months", fee: 65000, students: 54, batches: 5, rating: 4.3, status: "Active", category: "DevOps", modules: 14 },
  ],

  deals: [
    { id: 1, name: "TCS Corporate Training - 50 seats", contact: "Rajiv Menon", email: "rajiv@tcs.com", value: 4500000, stage: "Proposal", probability: 60, course: "Cloud Computing", closeDate: "2026-04-15", owner: "Vikram S." },
    { id: 2, name: "Infosys Upskilling Program", contact: "Meera Iyer", email: "meera@infosys.com", value: 3200000, stage: "Negotiation", probability: 75, course: "AI & ML", closeDate: "2026-04-10", owner: "Priya M." },
    { id: 3, name: "Wipro Fresher Training", contact: "Sunil Rao", email: "sunil@wipro.com", value: 2800000, stage: "Qualification", probability: 40, course: "Full Stack Development", closeDate: "2026-05-01", owner: "Deepak R." },
    { id: 4, name: "HCL Cyber Security Batch", contact: "Kavitha N.", email: "kavitha@hcl.com", value: 1800000, stage: "Closed Won", probability: 100, course: "Cyber Security", closeDate: "2026-03-20", owner: "Vikram S." },
  ],

  campaigns: [
    { id: 1, name: "March Enrollment Drive", type: "Email + Social", status: "Active", startDate: "2026-03-01", endDate: "2026-03-31", budget: 150000, spent: 98000, leads: 245, conversions: 38, roi: 320 },
    { id: 2, name: "AI Course Launch", type: "Google Ads", status: "Active", startDate: "2026-03-10", endDate: "2026-04-10", budget: 200000, spent: 75000, leads: 180, conversions: 22, roi: 250 },
    { id: 3, name: "Corporate Outreach Q1", type: "Email", status: "Completed", startDate: "2026-01-15", endDate: "2026-02-28", budget: 80000, spent: 80000, leads: 45, conversions: 8, roi: 540 },
  ],

  tickets: [
    { id: "TKT-001", subject: "Unable to access LMS portal", student: "Sneha Reddy", priority: "High", status: "Open", category: "Technical", created: "2026-03-29", assignedTo: "Tech Support", description: "Student reports 404 error when accessing course materials." },
    { id: "TKT-002", subject: "Request for batch transfer", student: "Arun Kumar", priority: "Medium", status: "In Progress", category: "Academic", created: "2026-03-28", assignedTo: "Academic Team", description: "Student wants to transfer from weekday to weekend batch." },
    { id: "TKT-003", subject: "Fee payment receipt not received", student: "Rohan Gupta", priority: "Low", status: "Open", category: "Finance", created: "2026-03-28", assignedTo: "Finance Team", description: "Payment of ₹35,000 made but receipt not emailed." },
  ],

  socialPosts: [
    { id: 1, content: "🚀 Admissions open for AI & ML program!", platforms: ["Instagram", "Twitter", "Facebook", "LinkedIn"], status: "Published", type: "image", mediaUrl: "https://cdn.rooman.net/posts/ai-ml-2026.jpg", publishedDate: "2026-03-28T09:00:00Z", scheduledDate: "2026-03-28", scheduledTime: "09:00", likes: 342, comments: 28, shares: 56, reach: 8400, author: "Priya M.", tags: ["#AdmissionsOpen", "#AIandML", "#RoomanTechnologies"], approvalStatus: "approved" },
    { id: 2, content: "Congratulations to Cloud Computing graduates! 🎓", platforms: ["Instagram", "Facebook", "LinkedIn"], status: "Published", type: "video", mediaUrl: "https://cdn.rooman.net/posts/cc-graduation-2026.mp4", publishedDate: "2026-03-27T10:30:00Z", scheduledDate: "2026-03-27", scheduledTime: "10:30", likes: 567, comments: 45, shares: 89, reach: 15200, author: "Vikram S.", tags: ["#Graduation", "#CloudComputing", "#Success"], approvalStatus: "approved" },
    { id: 3, content: "📢 Free Webinar: Intro to Cyber Security", platforms: ["Twitter", "Instagram"], status: "Scheduled", type: "link", mediaUrl: "https://webinar.rooman.net/cybersecurity-2026", publishedDate: null, scheduledDate: "2026-04-01", scheduledTime: "18:00", likes: 0, comments: 0, shares: 0, reach: 0, author: "Priya M.", tags: ["#Webinar", "#CyberSecurity", "#FreeEvent"], approvalStatus: "approved" },
    { id: 4, content: "Student success story: From zero to placed at TCS in 6 months!", platforms: ["LinkedIn", "Facebook"], status: "Published", type: "image", mediaUrl: "https://cdn.rooman.net/posts/success-story-tcs.jpg", publishedDate: "2026-03-26T14:00:00Z", scheduledDate: "2026-03-26", scheduledTime: "14:00", likes: 298, comments: 52, shares: 125, reach: 6800, author: "Priya M.", tags: ["#PlacementSuccess", "#TCS", "#CareerGrowth"], approvalStatus: "approved" },
    { id: 5, content: "Full Stack Development batch 15 now accepting registrations! Limited seats available.", platforms: ["Instagram", "Twitter"], status: "Scheduled", type: "text", mediaUrl: null, publishedDate: null, scheduledDate: "2026-04-02", scheduledTime: "11:00", likes: 0, comments: 0, shares: 0, reach: 0, author: "Vikram S.", tags: ["#FullStack", "#LimitedSeats", "#Register"], approvalStatus: "pending" },
    { id: 6, content: "Data Science course: 6-month journey to become an expert analyst", platforms: ["Facebook", "LinkedIn"], status: "Draft", type: "image", mediaUrl: "https://cdn.rooman.net/posts/data-science-overview.jpg", publishedDate: null, scheduledDate: null, scheduledTime: null, likes: 0, comments: 0, shares: 0, reach: 0, author: "Priya M.", tags: ["#DataScience", "#Analytics", "#CareerPath"], approvalStatus: "pending" },
    { id: 7, content: "Excited to announce our partnership with Google Cloud for student training programs!", platforms: ["Twitter", "LinkedIn"], status: "Published", type: "link", mediaUrl: "https://announcement.rooman.net/google-partnership", publishedDate: "2026-03-25T08:00:00Z", scheduledDate: "2026-03-25", scheduledTime: "08:00", likes: 215, comments: 38, shares: 67, reach: 4200, author: "Manish", tags: ["#Partnership", "#GoogleCloud", "#Training"], approvalStatus: "approved" },
    { id: 8, content: "Live coding session tomorrow! Join us for DevOps best practices.", platforms: ["Instagram", "YouTube"], status: "Scheduled", type: "video", mediaUrl: "https://youtube.com/rooman/devops-session", publishedDate: null, scheduledDate: "2026-04-03", scheduledTime: "20:00", likes: 0, comments: 0, shares: 0, reach: 0, author: "Vikram S.", tags: ["#LiveCoding", "#DevOps", "#BestPractices"], approvalStatus: "rejected" },
    { id: 9, content: "Rooman alumni network: 500+ professionals placed in top companies!", platforms: ["Facebook"], status: "Published", type: "image", mediaUrl: "https://cdn.rooman.net/posts/alumni-500.jpg", publishedDate: "2026-03-24T12:00:00Z", scheduledDate: "2026-03-24", scheduledTime: "12:00", likes: 445, comments: 67, shares: 98, reach: 9500, author: "Priya M.", tags: ["#Alumni", "#Placed", "#Success"], approvalStatus: "approved" },
    { id: 10, content: "AI & ML certification exam scheduled for April 15. Register your slot now!", platforms: ["Twitter", "LinkedIn"], status: "Scheduled", type: "text", mediaUrl: null, publishedDate: null, scheduledDate: "2026-04-05", scheduledTime: "09:00", likes: 0, comments: 0, shares: 0, reach: 0, author: "Deepak R.", tags: ["#Certification", "#AI", "#ExamRegistration"], approvalStatus: "approved" },
  ],

  socialMessages: [
    { id: 1, platform: "Instagram", from: "rohit_coder", avatar: "RC", message: "What's the fee for Full Stack?", time: "2026-03-30 10:15 AM", read: false, replied: false, conversationType: "direct", lastMessage: "What's the fee for Full Stack?", messages: [
      { sender: "rohit_coder", text: "What's the fee for Full Stack?", time: "2026-03-30 10:15 AM", isOutgoing: false },
    ] },
    { id: 2, platform: "Twitter", from: "@tech_aspirant", avatar: "TA", message: "Great placement stats! How to enroll?", time: "2026-03-30 09:30 AM", read: false, replied: false, conversationType: "direct", lastMessage: "Great placement stats! How to enroll?", messages: [
      { sender: "@tech_aspirant", text: "Great placement stats! How to enroll?", time: "2026-03-30 09:30 AM", isOutgoing: false },
    ] },
    { id: 3, platform: "Facebook", from: "Anita Desai", avatar: "AD", message: "EMI option for Data Science?", time: "2026-03-29 05:45 PM", read: true, replied: true, conversationType: "direct", lastMessage: "Yes, we offer EMI in 12 or 24 month plans.", messages: [
      { sender: "Anita Desai", text: "EMI option for Data Science?", time: "2026-03-29 05:45 PM", isOutgoing: false },
      { sender: "Rooman Support", text: "Yes, we offer EMI in 12 or 24 month plans.", time: "2026-03-29 06:15 PM", isOutgoing: true },
    ] },
    { id: 4, platform: "Instagram", from: "priya_deshpande", avatar: "PD", message: "Can I get a course demo before enrolling?", time: "2026-03-29 02:00 PM", read: true, replied: true, conversationType: "direct", lastMessage: "Sure! Let me schedule a demo call for you.", messages: [
      { sender: "priya_deshpande", text: "Can I get a course demo before enrolling?", time: "2026-03-29 02:00 PM", isOutgoing: false },
      { sender: "Rooman Support", text: "Sure! Let me schedule a demo call for you.", time: "2026-03-29 02:30 PM", isOutgoing: true },
      { sender: "priya_deshpande", text: "Thanks! That would be great.", time: "2026-03-29 02:35 PM", isOutgoing: false },
    ] },
    { id: 5, platform: "LinkedIn", from: "Aditya Kumar", avatar: "AK", message: "Interested in corporate training for our team", time: "2026-03-28 11:20 AM", read: true, replied: true, conversationType: "direct", lastMessage: "Perfect! Let me connect you with our corporate sales team.", messages: [
      { sender: "Aditya Kumar", text: "Interested in corporate training for our team", time: "2026-03-28 11:20 AM", isOutgoing: false },
      { sender: "Rooman Sales", text: "Perfect! Let me connect you with our corporate sales team.", time: "2026-03-28 11:45 AM", isOutgoing: true },
    ] },
    { id: 6, platform: "Facebook", from: "Campus Recruitment Unit", avatar: "CRU", message: "Group inquiry about campus hiring program", time: "2026-03-28 09:00 AM", read: true, replied: true, conversationType: "group", lastMessage: "We'll send you the campus recruitment details shortly.", messages: [
      { sender: "Campus Recruitment Unit", text: "Hi, interested in campus hiring program", time: "2026-03-28 09:00 AM", isOutgoing: false },
      { sender: "Rooman HR", text: "We'll send you the campus recruitment details shortly.", time: "2026-03-28 09:30 AM", isOutgoing: true },
    ] },
    { id: 7, platform: "Twitter", from: "@student_life", avatar: "SL", message: "Placement rate for Cloud Computing?", time: "2026-03-27 04:15 PM", read: true, replied: true, conversationType: "direct", lastMessage: "Cloud Computing has a 94% placement rate with avg salary of 5.2 LPA", messages: [
      { sender: "@student_life", text: "Placement rate for Cloud Computing?", time: "2026-03-27 04:15 PM", isOutgoing: false },
      { sender: "@RoomanTech", text: "Cloud Computing has a 94% placement rate with avg salary of 5.2 LPA", time: "2026-03-27 04:30 PM", isOutgoing: true },
    ] },
    { id: 8, platform: "Instagram", from: "dev_enthusiast", avatar: "DE", message: "Do you offer mentorship after course completion?", time: "2026-03-27 01:45 PM", read: false, replied: false, conversationType: "direct", lastMessage: "Do you offer mentorship after course completion?", messages: [
      { sender: "dev_enthusiast", text: "Do you offer mentorship after course completion?", time: "2026-03-27 01:45 PM", isOutgoing: false },
    ] },
    { id: 9, platform: "LinkedIn", from: "HR Manager - TechCorp", avatar: "HM", message: "Bulk registration for 25 employees for DevOps course", time: "2026-03-26 10:00 AM", read: true, replied: true, conversationType: "direct", lastMessage: "We can offer a 15% corporate discount for bulk enrollment. Let me share the quote.", messages: [
      { sender: "HR Manager - TechCorp", text: "Bulk registration for 25 employees for DevOps course", time: "2026-03-26 10:00 AM", isOutgoing: false },
      { sender: "Rooman Corporate Sales", text: "We can offer a 15% corporate discount for bulk enrollment. Let me share the quote.", time: "2026-03-26 10:30 AM", isOutgoing: true },
    ] },
    { id: 10, platform: "Facebook", from: "Rajesh Patel", avatar: "RP", message: "Job placement assistance available?", time: "2026-03-26 03:20 PM", read: true, replied: true, conversationType: "direct", lastMessage: "Yes, we provide 6 months of placement assistance and interview preparation.", messages: [
      { sender: "Rajesh Patel", text: "Job placement assistance available?", time: "2026-03-26 03:20 PM", isOutgoing: false },
      { sender: "Rooman Support", text: "Yes, we provide 6 months of placement assistance and interview preparation.", time: "2026-03-26 03:45 PM", isOutgoing: true },
    ] },
  ],

  socialChannels: [
    { id: 1, platform: "Instagram", handle: "@rooman_technologies", accessToken: "ig_tok_***", connected: true, connectedDate: "2026-01-15", followers: 8540, following: 312, posts: 156, syncStatus: "synced", lastSync: "2026-03-31T10:30:00Z" },
    { id: 2, platform: "Facebook", handle: "RoomanTechnologies", pageId: "pg_102938", accessToken: "fb_tok_***", connected: true, connectedDate: "2026-01-10", followers: 12400, following: 0, posts: 234, syncStatus: "synced", lastSync: "2026-03-31T10:30:00Z" },
    { id: 3, platform: "LinkedIn", handle: "rooman-technologies", companyId: "comp_8832", accessToken: "li_tok_***", connected: true, connectedDate: "2026-02-01", followers: 5620, following: 0, posts: 89, syncStatus: "synced", lastSync: "2026-03-31T10:25:00Z" },
    { id: 4, platform: "X", handle: "@RoomanTech", accessToken: "x_tok_***", connected: true, connectedDate: "2026-01-20", followers: 3280, following: 456, posts: 312, syncStatus: "synced", lastSync: "2026-03-31T10:28:00Z" },
    { id: 5, platform: "YouTube", handle: "RoomanEducation", channelId: "UC_rooman123", accessToken: "yt_tok_***", connected: true, connectedDate: "2026-02-15", followers: 2150, following: 0, posts: 45, syncStatus: "synced", lastSync: "2026-03-31T09:00:00Z" },
    { id: 6, platform: "WhatsApp", handle: "+91 80 4123 4567", accessToken: "wa_tok_***", connected: false, connectedDate: null, followers: 0, following: 0, posts: 0, syncStatus: "disconnected", lastSync: null },
  ],

  socialInteractions: [
    { id: 1, type: "MESSAGE", platform: "Instagram", fromName: "Rohit Kumar", fromAvatar: "RK", fromEmail: "rohit.k@gmail.com", message: "What's the fee for Full Stack Development course?", date: "2026-03-30T10:15:00Z", priority: "Medium", assignee: "Priya M.", status: "REPLIED", read: true, recentActivity: "2026-03-30T11:00:00Z" },
    { id: 2, type: "MENTION", platform: "Twitter", fromName: "Tech Aspirant", fromAvatar: "TA", fromEmail: "tech.aspirant@email.com", message: "@RoomanTech Great placement stats! How to enroll?", date: "2026-03-30T09:30:00Z", priority: "Medium", assignee: "Vikram S.", status: "REPLIED", read: true, recentActivity: "2026-03-30T10:00:00Z" },
    { id: 3, type: "COMMENT", platform: "Facebook", fromName: "Anita Desai", fromAvatar: "AD", fromEmail: "anita.d@yahoo.com", message: "EMI option for Data Science course?", date: "2026-03-29T17:45:00Z", priority: "Low", assignee: "Priya M.", status: "REPLIED", read: true, recentActivity: "2026-03-29T18:15:00Z" },
    { id: 4, type: "REVIEW", platform: "Google Business", fromName: "Sneha M.", fromAvatar: "SM", fromEmail: "sneha.m@gmail.com", message: "Excellent course quality and placement support! Highly recommended.", date: "2026-03-28T14:20:00Z", priority: "High", assignee: "Unassigned", status: "OPEN", read: true, recentActivity: "2026-03-28T14:20:00Z" },
    { id: 5, type: "MESSAGE", platform: "LinkedIn", fromName: "Aditya Kumar", fromAvatar: "AK", fromEmail: "aditya.k@company.com", message: "Interested in corporate training for our team of 25 people", date: "2026-03-28T11:20:00Z", priority: "Urgent", assignee: "Vikram S.", status: "OPEN", read: true, recentActivity: "2026-03-28T11:20:00Z" },
    { id: 6, type: "LIKE", platform: "Instagram", fromName: "Dev Enthusiast", fromAvatar: "DE", fromEmail: null, message: "Liked your post about AI & ML admissions", date: "2026-03-27T15:10:00Z", priority: "Low", assignee: "Unassigned", status: "CLOSED", read: true, recentActivity: "2026-03-27T15:10:00Z" },
    { id: 7, type: "COMMENT", platform: "YouTube", fromName: "Learning Path", fromAvatar: "LP", fromEmail: "learningpath@email.com", message: "Great tutorial! Will this help in getting placed?", date: "2026-03-27T08:45:00Z", priority: "Medium", assignee: "Deepak R.", status: "REPLIED", read: true, recentActivity: "2026-03-27T09:30:00Z" },
    { id: 8, type: "MESSAGE", platform: "Facebook", fromName: "Rajesh Patel", fromAvatar: "RP", fromEmail: "rajesh.p@outlook.com", message: "Job placement assistance available?", date: "2026-03-26T15:20:00Z", priority: "Medium", assignee: "Priya M.", status: "REPLIED", read: true, recentActivity: "2026-03-26T15:45:00Z" },
    { id: 9, type: "MENTION", platform: "X", fromName: "TechNews Daily", fromAvatar: "TND", fromEmail: "news@technewsdaily.com", message: "@RoomanTech mentioned in article about top EdTech platforms", date: "2026-03-25T12:00:00Z", priority: "Low", assignee: "Unassigned", status: "CLOSED", read: true, recentActivity: "2026-03-25T12:00:00Z" },
    { id: 10, type: "REVIEW", platform: "Google Business", fromName: "Harsh Singh", fromAvatar: "HS", fromEmail: "harsh.s@gmail.com", message: "Good courses but placement stats need improvement", date: "2026-03-24T18:30:00Z", priority: "High", assignee: "Priya M.", status: "REPLIED", read: true, recentActivity: "2026-03-24T19:00:00Z" },
    { id: 11, type: "COMMENT", platform: "Instagram", fromName: "Priya Sharma", fromAvatar: "PS", fromEmail: "priya.s@gmail.com", message: "What's the batch start date for Cloud Computing?", date: "2026-03-24T10:15:00Z", priority: "Medium", assignee: "Vikram S.", status: "REPLIED", read: true, recentActivity: "2026-03-24T10:45:00Z" },
    { id: 12, type: "MESSAGE", platform: "LinkedIn", fromName: "Campus Recruitment Unit", fromAvatar: "CRU", fromEmail: "campus@company.com", message: "Interested in campus hiring program", date: "2026-03-23T09:00:00Z", priority: "Urgent", assignee: "Deepak R.", status: "OPEN", read: true, recentActivity: "2026-03-23T09:00:00Z" },
  ],

  socialConnections: [
    { id: 1, name: "Rohit Kumar", platform: "Instagram", handle: "@rohit_coder", email: "rohit.k@gmail.com", phone: "+91 9876543210", avatarInitials: "RK", engagementScore: 78, totalInteractions: 12, lastInteraction: "2026-03-30T10:15:00Z", category: "lead", crmLinked: false, crmLeadId: null, location: "Bangalore", bio: "Aspiring Full Stack Developer" },
    { id: 2, name: "Anita Desai", platform: "Facebook", handle: "anita.desai.2595", email: "anita.d@yahoo.com", phone: "+91 8765432109", avatarInitials: "AD", engagementScore: 65, totalInteractions: 8, lastInteraction: "2026-03-29T17:45:00Z", category: "lead", crmLinked: false, crmLeadId: null, location: "Chennai", bio: "Data Science Enthusiast" },
    { id: 3, name: "Aditya Kumar", platform: "LinkedIn", handle: "aditya-kumar-tech", email: "aditya.k@company.com", phone: "+91 9123456789", avatarInitials: "AK", engagementScore: 92, totalInteractions: 5, lastInteraction: "2026-03-28T11:20:00Z", category: "contact", crmLinked: true, crmLeadId: 1, location: "Hyderabad", bio: "HR Manager at TechCorp | Talent Development" },
    { id: 4, name: "Priya Sharma", platform: "Instagram", handle: "@priya_designer", email: "priya.s@gmail.com", phone: "+91 7654321098", avatarInitials: "PS", engagementScore: 72, totalInteractions: 9, lastInteraction: "2026-03-24T10:15:00Z", category: "follower", crmLinked: false, crmLeadId: null, location: "Pune", bio: "UI/UX Designer | Upskilling" },
    { id: 5, name: "Rajesh Patel", platform: "Facebook", handle: "rajesh.patel.123", email: "rajesh.p@outlook.com", phone: "+91 6543210987", avatarInitials: "RP", engagementScore: 58, totalInteractions: 4, lastInteraction: "2026-03-26T15:20:00Z", category: "lead", crmLinked: false, crmLeadId: null, location: "Ahmedabad", bio: "Career changer | IT transition" },
    { id: 6, name: "Sneha M.", platform: "Google Business", handle: "sneha.m.reviews", email: "sneha.m@gmail.com", phone: null, avatarInitials: "SM", engagementScore: 85, totalInteractions: 3, lastInteraction: "2026-03-28T14:20:00Z", category: "contact", crmLinked: true, crmLeadId: 2, location: "Bangalore", bio: "Recent Graduate | Full Stack Developer" },
    { id: 7, name: "Harsh Singh", platform: "Google Business", handle: "harsh.singh.reviews", email: "harsh.s@gmail.com", phone: null, avatarInitials: "HS", engagementScore: 42, totalInteractions: 2, lastInteraction: "2026-03-24T18:30:00Z", category: "contact", crmLinked: false, crmLeadId: null, location: "Delhi", bio: "Tech Professional | Course Evaluator" },
    { id: 8, name: "Dev Enthusiast", platform: "Twitter", handle: "@dev_enthusiast_in", email: "dev.enthusiast@email.com", phone: null, avatarInitials: "DE", engagementScore: 68, totalInteractions: 11, lastInteraction: "2026-03-27T15:10:00Z", category: "follower", crmLinked: false, crmLeadId: null, location: "Mumbai", bio: "Software Developer | AI/ML Learner" },
    { id: 9, name: "Tech Aspirant", platform: "Twitter", handle: "@tech_aspirant_2026", email: "tech.aspirant@email.com", phone: null, avatarInitials: "TA", engagementScore: 73, totalInteractions: 7, lastInteraction: "2026-03-30T09:30:00Z", category: "lead", crmLinked: false, crmLeadId: null, location: "Bangalore", bio: "Career transition | Tech skills" },
    { id: 10, name: "Learning Path", platform: "YouTube", handle: "learning_path_channel", email: "learningpath@email.com", phone: null, avatarInitials: "LP", engagementScore: 79, totalInteractions: 6, lastInteraction: "2026-03-27T08:45:00Z", category: "follower", crmLinked: false, crmLeadId: null, location: "Kolkata", bio: "Educational Content Creator" },
    { id: 11, name: "TechNews Daily", platform: "X", handle: "@technewsdaily", email: "news@technewsdaily.com", phone: null, avatarInitials: "TND", engagementScore: 88, totalInteractions: 2, lastInteraction: "2026-03-25T12:00:00Z", category: "following", crmLinked: false, crmLeadId: null, location: null, bio: "Latest Tech News and Updates" },
    { id: 12, name: "Campus Recruitment Unit", platform: "LinkedIn", handle: "campus-hiring-company", email: "campus@company.com", phone: "+91 9988776655", avatarInitials: "CRU", engagementScore: 95, totalInteractions: 3, lastInteraction: "2026-03-23T09:00:00Z", category: "contact", crmLinked: true, crmLeadId: 3, location: "Gurgaon", bio: "Corporate HR | Campus Hiring" },
    { id: 13, name: "Vikram Gupta", platform: "Instagram", handle: "@vikram_clouds", email: "vikram.g@gmail.com", phone: "+91 8899776655", avatarInitials: "VG", engagementScore: 81, totalInteractions: 15, lastInteraction: "2026-03-31T08:30:00Z", category: "contact", crmLinked: true, crmLeadId: 4, location: "Bangalore", bio: "Cloud Architect | Student" },
    { id: 14, name: "Deepak Singh", platform: "Facebook", handle: "deepak.singh.tech", email: "deepak.s@gmail.com", phone: "+91 7766554433", avatarInitials: "DS", engagementScore: 55, totalInteractions: 3, lastInteraction: "2026-03-22T14:00:00Z", category: "follower", crmLinked: false, crmLeadId: null, location: "Hyderabad", bio: "DevOps Enthusiast" },
    { id: 15, name: "Meera Joshi", platform: "LinkedIn", handle: "meera-joshi-analytics", email: "meera.j@gmail.com", phone: "+91 9876543219", avatarInitials: "MJ", engagementScore: 74, totalInteractions: 8, lastInteraction: "2026-03-20T11:30:00Z", category: "lead", crmLinked: false, crmLeadId: null, location: "Pune", bio: "Data Analyst | Upskilling" },
  ],

  socialMonitorColumns: [
    { id: 1, name: "Reviews", type: "reviews", platforms: ["Google Business"], enabled: true },
    { id: 2, name: "Questions", type: "questions", platforms: ["Google Business", "YouTube"], enabled: true },
    { id: 3, name: "Likes", type: "likes", platforms: ["YouTube", "Instagram"], enabled: true },
    { id: 4, name: "Leads & Contacts", type: "leads", platforms: ["all"], enabled: true },
    { id: 5, name: "Brand Mentions", type: "mentions", platforms: ["X", "Instagram"], enabled: false },
  ],

  socialMonitorItems: [
    { id: 1, columnId: 1, type: "review", platform: "Google Business", authorName: "Sneha M.", authorAvatar: "SM", content: "Excellent course quality and placement support! Highly recommended.", rating: 5, date: "2026-03-28T14:20:00Z", replied: false, videoTitle: null, viewCount: null },
    { id: 2, columnId: 1, type: "review", platform: "Google Business", authorName: "Harsh Singh", authorAvatar: "HS", content: "Good courses but placement stats need improvement", rating: 3, date: "2026-03-24T18:30:00Z", replied: true, videoTitle: null, viewCount: null },
    { id: 3, columnId: 2, type: "question", platform: "YouTube", authorName: "Learning Path", authorAvatar: "LP", content: "Great tutorial! Will this help in getting placed?", rating: null, date: "2026-03-27T08:45:00Z", replied: true, videoTitle: "Full Stack Development - Session 15", viewCount: 2840 },
    { id: 4, columnId: 2, type: "question", platform: "Google Business", authorName: "Rajesh Patel", authorAvatar: "RP", content: "Job placement assistance available?", rating: null, date: "2026-03-26T15:20:00Z", replied: true, videoTitle: null, viewCount: null },
    { id: 5, columnId: 3, type: "like", platform: "Instagram", authorName: "Dev Enthusiast", authorAvatar: "DE", content: "Liked your post about AI & ML admissions", rating: null, date: "2026-03-27T15:10:00Z", replied: false, videoTitle: null, viewCount: null },
    { id: 6, columnId: 3, type: "like", platform: "YouTube", authorName: "Tech Learner", authorAvatar: "TL", content: "Liked video on DevOps Best Practices", rating: null, date: "2026-03-26T12:00:00Z", replied: false, videoTitle: "DevOps Best Practices - 2026", viewCount: 1520 },
    { id: 7, columnId: 4, type: "lead", platform: "Instagram", authorName: "Tech Aspirant", authorAvatar: "TA", content: "Interested in Full Stack Development - DM sent", rating: null, date: "2026-03-30T09:30:00Z", replied: false, videoTitle: null, viewCount: null },
    { id: 8, columnId: 4, type: "lead", platform: "LinkedIn", authorName: "Aditya Kumar", authorAvatar: "AK", content: "Corporate training inquiry for 25 employees", rating: null, date: "2026-03-28T11:20:00Z", replied: true, videoTitle: null, viewCount: null },
  ],

  socialCollaborateItems: [
    { id: 1, type: "approval", author: "Priya M.", authorAvatar: "PM", content: "Ready to publish: 'Admissions Open for AI & ML Program'", postPreview: "🚀 Admissions open for AI & ML program! Limited seats available. Enroll now!", status: "pending", date: "2026-03-31T08:00:00Z", comments: [
      { author: "Vikram S.", text: "Looks good, let's post this ASAP", date: "2026-03-31T08:15:00Z" },
    ], platforms: ["Instagram", "Facebook", "LinkedIn"] },
    { id: 2, type: "discussion", author: "Vikram S.", authorAvatar: "VS", content: "Should we increase posting frequency to 3x daily?", postPreview: null, status: "discussed", date: "2026-03-30T14:30:00Z", comments: [
      { author: "Priya M.", text: "Yes, engagement has been higher with 3x posts", date: "2026-03-30T15:00:00Z" },
      { author: "Manish", text: "Agreed. Let's test for 2 weeks and measure impact", date: "2026-03-30T15:15:00Z" },
    ], platforms: ["all"] },
    { id: 3, type: "post_update", author: "Deepak R.", authorAvatar: "DR", content: "DevOps session live coding video is ready for review", postPreview: "Live coding session tomorrow! Join us for DevOps best practices.", status: "rejected", date: "2026-03-30T10:00:00Z", comments: [
      { author: "Priya M.", text: "Need to add more context about prerequisites", date: "2026-03-30T10:30:00Z" },
    ], platforms: ["YouTube", "Instagram"] },
    { id: 4, type: "draft_shared", author: "Priya M.", authorAvatar: "PM", content: "Data Science course overview post - needs images", postPreview: "Data Science course: 6-month journey to become an expert analyst", status: "pending", date: "2026-03-29T16:45:00Z", comments: [
      { author: "Vikram S.", text: "I'll add product images by EOD", date: "2026-03-29T17:00:00Z" },
      { author: "Deepak R.", text: "Can we add student testimonial video too?", date: "2026-03-29T17:20:00Z" },
    ], platforms: ["Facebook", "LinkedIn"] },
    { id: 5, type: "approval", author: "Vikram S.", authorAvatar: "VS", content: "AI & ML Certification exam announcement ready", postPreview: "AI & ML certification exam scheduled for April 15. Register your slot now!", status: "approved", date: "2026-03-28T11:30:00Z", comments: [
      { author: "Manish", text: "Approved. Please publish immediately.", date: "2026-03-28T11:45:00Z" },
    ], platforms: ["Twitter", "LinkedIn"] },
    { id: 6, type: "discussion", author: "Deepak R.", authorAvatar: "DR", content: "Content calendar for April - suggestions welcome", postPreview: null, status: "discussed", date: "2026-03-27T13:00:00Z", comments: [
      { author: "Priya M.", text: "Let's focus on placement stories", date: "2026-03-27T13:30:00Z" },
      { author: "Vikram S.", text: "And course launch announcements", date: "2026-03-27T13:45:00Z" },
    ], platforms: ["all"] },
    { id: 7, type: "post_update", author: "Priya M.", authorAvatar: "PM", content: "Student success story post - TCS placement", postPreview: "Student success story: From zero to placed at TCS in 6 months!", status: "approved", date: "2026-03-26T09:15:00Z", comments: [
      { author: "Vikram S.", text: "Great metrics. This should boost engagement.", date: "2026-03-26T09:45:00Z" },
    ], platforms: ["LinkedIn", "Facebook"] },
    { id: 8, type: "draft_shared", author: "Vikram S.", authorAvatar: "VS", content: "Google Cloud partnership announcement - early draft", postPreview: "Excited to announce our partnership with Google Cloud for student training programs!", status: "discussed", date: "2026-03-25T14:20:00Z", comments: [
      { author: "Manish", text: "Perfect timing! Let's push this out.", date: "2026-03-25T14:45:00Z" },
      { author: "Priya M.", text: "Should we schedule a webinar?", date: "2026-03-25T15:00:00Z" },
    ], platforms: ["Twitter", "LinkedIn"] },
  ],

  socialLeadForms: [
    { id: 1, platform: "Facebook", formName: "AI & ML Course Interest Form", adAccount: "Rooman Technologies", status: "Active", leadsCollected: 142, lastSync: "2026-03-31T08:00:00Z", crmSyncEnabled: true, assignmentRule: "Round Robin", createdDate: "2026-02-01" },
    { id: 2, platform: "Facebook", formName: "Free Webinar Registration", adAccount: "Rooman Technologies", status: "Active", leadsCollected: 89, lastSync: "2026-03-31T08:00:00Z", crmSyncEnabled: true, assignmentRule: "Course Based", createdDate: "2026-02-15" },
    { id: 3, platform: "Facebook", formName: "Campus Hiring Program", adAccount: "Rooman Technologies", status: "Paused", leadsCollected: 56, lastSync: "2026-03-28T12:00:00Z", crmSyncEnabled: false, assignmentRule: null, createdDate: "2026-03-01" },
    { id: 4, platform: "LinkedIn", formName: "Corporate Training Inquiry", adAccount: "Rooman Technologies", status: "Active", leadsCollected: 34, lastSync: "2026-03-31T07:30:00Z", crmSyncEnabled: true, assignmentRule: "Manual", createdDate: "2026-02-20" },
    { id: 5, platform: "LinkedIn", formName: "Executive Upskilling Program", adAccount: "Rooman Technologies", status: "Draft", leadsCollected: 0, lastSync: null, crmSyncEnabled: false, assignmentRule: null, createdDate: "2026-03-25" },
  ],

  socialReportData: {
    audience: {
      totalFollowers: 32000,
      newFollowers: 485,
      newFollowersChange: 12.5,
      followersLost: 32,
      followersLostChange: -8.2,
      byPlatform: { Instagram: 8540, Facebook: 12400, LinkedIn: 5620, X: 3280, YouTube: 2150 },
      growthTrend: [
        { date: "2026-03-01", followers: 30200 },
        { date: "2026-03-05", followers: 30450 },
        { date: "2026-03-10", followers: 30800 },
        { date: "2026-03-15", followers: 31100 },
        { date: "2026-03-20", followers: 31400 },
        { date: "2026-03-25", followers: 31700 },
        { date: "2026-03-31", followers: 32000 },
      ],
    },
    engagement: {
      totalPosts: 48,
      totalEngagement: 4256,
      totalEngagementChange: 18.3,
      totalReach: 125400,
      totalReachChange: 22.1,
      totalImpressions: 284000,
      avgEngagementRate: 3.4,
      byType: { image: 1820, video: 1540, link: 520, text: 376 },
      byPlatform: { Instagram: 1650, Facebook: 1240, LinkedIn: 680, X: 420, YouTube: 266 },
      trend: [
        { date: "2026-03-01", engagement: 520 },
        { date: "2026-03-05", engagement: 610 },
        { date: "2026-03-10", engagement: 580 },
        { date: "2026-03-15", engagement: 720 },
        { date: "2026-03-20", engagement: 650 },
        { date: "2026-03-25", engagement: 540 },
        { date: "2026-03-31", engagement: 636 },
      ],
    },
    topPosts: [
      { id: 1, content: "Congratulations to Cloud Computing graduates!", platform: "Instagram", reach: 15200, engagement: 567, date: "2026-03-27" },
      { id: 2, content: "Admissions open for AI & ML program!", platform: "Facebook", reach: 8400, engagement: 342, date: "2026-03-28" },
      { id: 3, content: "Student success story: From zero to placed at TCS", platform: "LinkedIn", reach: 6800, engagement: 298, date: "2026-03-22" },
    ],
  },

  payments: [
    { id: "pay_001", studentId: 1, studentName: "Sneha Reddy", amount: 30000, method: "UPI", status: "captured", date: "2026-03-15", receipt: "RCT-M1K8A" },
    { id: "pay_002", studentId: 2, studentName: "Divya Lakshmi", amount: 75000, method: "NetBanking", status: "captured", date: "2026-01-12", receipt: "RCT-K8H6C" },
    { id: "pay_003", studentId: 5, studentName: "Rohan Gupta", amount: 35000, method: "UPI", status: "captured", date: "2026-03-01", receipt: "RCT-N2L4D" },
  ],

  users: [
    { id: 1, name: "Manish", email: "ceo@rooman.net", role: "Admin", status: "Active", lastLogin: "2026-03-31" },
    { id: 2, name: "Priya M.", email: "priya@rooman.net", role: "Sales Manager", status: "Active", lastLogin: "2026-03-31" },
    { id: 3, name: "Vikram S.", email: "vikram@rooman.net", role: "Counsellor", status: "Active", lastLogin: "2026-03-30" },
    { id: 4, name: "Deepak R.", email: "deepak@rooman.net", role: "Counsellor", status: "Active", lastLogin: "2026-03-30" },
    { id: 5, name: "Dr. Ramesh K.", email: "ramesh@rooman.net", role: "Mentor", status: "Active", lastLogin: "2026-03-29" },
  ],

  automationRules: [
    { id: 1, name: "Auto-assign new leads", trigger: "When lead is created", action: "Assign to counsellor based on course", status: "Active", type: "workflow" },
    { id: 2, name: "Fee reminder automation", trigger: "7 days before fee due date", action: "Send email + SMS reminder", status: "Active", type: "workflow" },
    { id: 3, name: "Lead scoring update", trigger: "When lead interacts with email/site", action: "Update lead score", status: "Active", type: "scoring" },
    { id: 4, name: "Welcome email on enrollment", trigger: "When student status = Enrolled", action: "Send welcome email template", status: "Active", type: "workflow" },
    { id: 5, name: "Ticket escalation", trigger: "Ticket open > 48 hours", action: "Escalate to manager", status: "Active", type: "escalation" },
  ],

  settings: {
    company: { name: "Rooman Technologies Pvt. Ltd.", email: "info@rooman.net", phone: "+91 80 4123 4567", website: "https://www.rooman.net", address: "Koramangala, Bangalore - 560034", gst: "29AABCR1234M1ZP", pan: "AABCR1234M" },
    channels: {
      email: { enabled: true, provider: "Google Workspace", fromEmail: "info@rooman.net", smtpServer: "smtp.gmail.com", smtpPort: 587 },
      telephony: { enabled: true, provider: "Ozonetel", numbers: ["+91 80 6789 0123", "+91 80 4123 4567"] },
      whatsapp: { enabled: true, provider: "Official API", number: "+91 80 4123 4567" },
      sms: { enabled: true, provider: "MSG91", senderId: "ROOMAN", dailyLimit: 5000 },
      chat: { enabled: true, widgetColor: "#4F46E5", position: "Bottom Right", title: "Rooman Technologies" },
      social: { instagram: true, twitter: true, facebook: true, linkedin: true, youtube: false },
    },
    integrations: {
      razorpay: { enabled: true, merchantId: process.env.RAZORPAY_MERCHANT_ID || "FNluP1eoRtmlBm" },
      lms: { enabled: true, platform: "Moodle", url: "https://lms.rooman.net" },
      google: { enabled: false },
    },
    social: {
      defaultTimezone: "Asia/Kolkata",
      autoPublish: false,
      approvalRequired: true,
      approvalWorkflow: ["Priya M.", "Manish"],
      defaultHashtags: ["#RoomanTechnologies", "#EdTech", "#SkillIndia", "#CareerGrowth"],
      brandColors: { primary: "#4F46E5", secondary: "#10B981" },
      postingSchedule: { weekdays: ["09:00", "13:00", "18:00"], weekends: ["10:00", "17:00"] },
      notifications: { newMessage: true, newMention: true, newFollower: true, newReview: true, postPublished: true },
      crmIntegration: { autoCreateLead: true, leadSource: "Social Media", assignmentRule: "Round Robin" },
      connectedAccounts: 5,
      maxScheduledPosts: 100,
      contentLibraryEnabled: true,
      rssFeeds: [
        { id: 1, name: "Rooman Blog", url: "https://blog.rooman.net/feed", enabled: true },
        { id: 2, name: "EdTech News", url: "https://edtechnews.in/rss", enabled: false },
      ],
    },
  },

  codingTasks: [
    {
      id: 1,
      title: "Java Countdown Function",
      language: "java",
      difficulty: "Easy",
      points: 20,
      category: "All languages coding",
      date: "30 Aug",
      objective: "Write a Java function called countdown() that takes an integer as an argument and prints a countdown from that number to zero using a while loop. If the number is less than or equal to zero, it should print \"Countdown finished!\".",
      constraints: "The input integer n will be in the range -10 ≤ n ≤ 100. The function should handle edge cases such as n = 0 or negative numbers.",
      starterCode: "// Write your code here\npublic class Main {\n    public static void countdown(int n) {\n        // Your code here\n    }\n\n    public static void main(String[] args) {\n        countdown(5);\n    }\n}",
      testCases: [
        { input: "5", expected: "5\n4\n3\n2\n1\n0\nCountdown finished!", description: "Normal countdown from 5" },
        { input: "0", expected: "Countdown finished!", description: "Edge case: zero" },
        { input: "-3", expected: "Countdown finished!", description: "Edge case: negative number" },
        { input: "1", expected: "1\n0\nCountdown finished!", description: "Countdown from 1" }
      ],
      hints: [
        "Think about what loop structure you need. A while loop continues as long as a condition is true.",
        "Your while loop condition should check if n > 0. Inside the loop, print n and then decrement it.",
        "After the loop ends, always print 'Countdown finished!' regardless of the initial value."
      ],
      solution: "public static void countdown(int n) {\n    while (n > 0) {\n        System.out.println(n);\n        n--;\n    }\n    System.out.println(\"Countdown finished!\");\n}",
      status: "active",
      totalTasks: 5,
      currentTask: 1
    },
    {
      id: 2,
      title: "Python List Comprehension",
      language: "python",
      difficulty: "Easy",
      points: 20,
      category: "Python Basics",
      date: "02 Apr",
      objective: "Write a Python function called filter_even() that takes a list of integers and returns a new list containing only the even numbers, each squared. Use list comprehension.",
      constraints: "The input list will contain integers in the range -1000 to 1000. The list length will be between 0 and 100.",
      starterCode: "def filter_even(numbers):\n    # Write your code here\n    pass\n\n# Test\nprint(filter_even([1, 2, 3, 4, 5, 6]))",
      testCases: [
        { input: "[1, 2, 3, 4, 5, 6]", expected: "[4, 16, 36]", description: "Mixed numbers" },
        { input: "[]", expected: "[]", description: "Empty list" },
        { input: "[1, 3, 5]", expected: "[]", description: "All odd numbers" },
        { input: "[-2, -4, 6]", expected: "[4, 16, 36]", description: "Negative even numbers" }
      ],
      hints: [
        "List comprehension syntax: [expression for item in list if condition]",
        "Use the modulo operator (%) to check if a number is even: n % 2 == 0",
        "The expression should square the number: n**2 or n*n"
      ],
      solution: "def filter_even(numbers):\n    return [n**2 for n in numbers if n % 2 == 0]",
      status: "active",
      totalTasks: 5,
      currentTask: 2
    },
    {
      id: 3,
      title: "JavaScript Array Methods",
      language: "javascript",
      difficulty: "Medium",
      points: 30,
      category: "JavaScript Fundamentals",
      date: "02 Apr",
      objective: "Write a function called groupByCategory() that takes an array of product objects {name, category, price} and returns an object where keys are categories and values are arrays of product names sorted by price (ascending).",
      constraints: "Each product has name (string), category (string), and price (number). Array length 0-50. Prices are positive numbers.",
      starterCode: "function groupByCategory(products) {\n  // Write your code here\n}\n\n// Test\nconst products = [\n  {name: 'Laptop', category: 'Electronics', price: 999},\n  {name: 'Phone', category: 'Electronics', price: 699},\n  {name: 'Shirt', category: 'Clothing', price: 29},\n];\nconsole.log(JSON.stringify(groupByCategory(products), null, 2));",
      testCases: [
        { input: "3 products, 2 categories", expected: "{Electronics: ['Phone', 'Laptop'], Clothing: ['Shirt']}", description: "Basic grouping" },
        { input: "empty array", expected: "{}", description: "Empty input" },
        { input: "all same category", expected: "{Tech: ['Mouse', 'Keyboard', 'Monitor']}", description: "Single category" }
      ],
      hints: [
        "Use reduce() to build the grouped object. The accumulator starts as an empty object {}.",
        "For each product, check if the category key exists. If not, create an empty array for it.",
        "After grouping, sort each category's products by price, then map to get just the names."
      ],
      solution: "function groupByCategory(products) {\n  const grouped = products.reduce((acc, p) => {\n    if (!acc[p.category]) acc[p.category] = [];\n    acc[p.category].push(p);\n    return acc;\n  }, {});\n  Object.keys(grouped).forEach(k => {\n    grouped[k] = grouped[k].sort((a,b) => a.price - b.price).map(p => p.name);\n  });\n  return grouped;\n}",
      status: "active",
      totalTasks: 3,
      currentTask: 1
    },
    {
      id: 4,
      title: "SQL Query Challenge",
      language: "sql",
      difficulty: "Medium",
      points: 30,
      category: "Database Queries",
      date: "03 Apr",
      objective: "Write a SQL query to find the top 3 courses by total enrollment revenue. Join the students and courses tables, calculate total revenue per course (fee × number of enrolled students), and order by revenue descending.",
      constraints: "Use standard SQL syntax. Tables: students(id, name, course_id, status), courses(id, name, fee). Only count students with status = 'Active' or 'Completed'.",
      starterCode: "-- Write your SQL query here\nSELECT \n  -- your columns here\nFROM courses c\n-- your joins and conditions here\nLIMIT 3;",
      testCases: [
        { input: "5 courses, 20 students", expected: "3 rows with course name and revenue", description: "Basic revenue ranking" },
        { input: "Course with no students", expected: "Should not appear in results", description: "Empty course handling" }
      ],
      hints: [
        "You need a JOIN between courses and students tables on course_id.",
        "Use GROUP BY on the course, then calculate SUM or COUNT * fee.",
        "Add a WHERE clause to filter only Active or Completed students, then ORDER BY revenue DESC LIMIT 3."
      ],
      solution: "SELECT c.name, c.fee * COUNT(s.id) AS revenue\nFROM courses c\nJOIN students s ON s.course_id = c.id\nWHERE s.status IN ('Active', 'Completed')\nGROUP BY c.id, c.name, c.fee\nORDER BY revenue DESC\nLIMIT 3;",
      status: "active",
      totalTasks: 3,
      currentTask: 1
    },
    {
      id: 5,
      title: "Python ML Pipeline",
      language: "python",
      difficulty: "Hard",
      points: 50,
      category: "Machine Learning",
      date: "05 Apr",
      objective: "Build a complete machine learning pipeline function called train_classifier() that takes a pandas DataFrame with features and a 'target' column. The function should: 1) Split data 80/20, 2) Standardize features, 3) Train a Random Forest, 4) Return accuracy score and classification report.",
      constraints: "Use scikit-learn. The DataFrame will have numeric features only. Target is binary (0 or 1). Handle edge cases like small datasets.",
      starterCode: "import pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score, classification_report\n\ndef train_classifier(df):\n    # Write your code here\n    pass\n\n# Test with sample data\nnp.random.seed(42)\ndf = pd.DataFrame({\n    'feature1': np.random.randn(200),\n    'feature2': np.random.randn(200),\n    'target': np.random.randint(0, 2, 200)\n})\nresult = train_classifier(df)\nprint(result)",
      testCases: [
        { input: "200 rows, 2 features, binary target", expected: "accuracy > 0.4, classification_report present", description: "Basic classification" },
        { input: "50 rows, 5 features", expected: "Pipeline completes without error", description: "Small dataset" }
      ],
      hints: [
        "Separate features (X) from target (y) first: X = df.drop('target', axis=1), y = df['target']",
        "Use train_test_split with test_size=0.2 and random_state=42 for reproducibility.",
        "Create a StandardScaler, fit_transform on X_train, transform on X_test. Then train RandomForestClassifier."
      ],
      solution: "def train_classifier(df):\n    X = df.drop('target', axis=1)\n    y = df['target']\n    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n    scaler = StandardScaler()\n    X_train = scaler.fit_transform(X_train)\n    X_test = scaler.transform(X_test)\n    clf = RandomForestClassifier(n_estimators=100, random_state=42)\n    clf.fit(X_train, y_train)\n    y_pred = clf.predict(X_test)\n    return {'accuracy': accuracy_score(y_test, y_pred), 'report': classification_report(y_test, y_pred)}",
      status: "locked",
      totalTasks: 2,
      currentTask: 1
    }
  ],

  aiTutorHistory: {},
};

// Helper: generate next ID for a collection
const nextId = (collection) => {
  const items = store[collection];
  if (!items || items.length === 0) return 1;
  return Math.max(...items.map(i => typeof i.id === "number" ? i.id : 0)) + 1;
};

export { store, nextId };
