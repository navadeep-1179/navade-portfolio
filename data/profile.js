// ==========================================================================
// Centralized Profile & Knowledge Base for Navadeep Reddy
// Single source of truth for the Portfolio, Bento Grid & AI Chatbot
// ==========================================================================

const PROFILE_DATA = {
  personal: {
    name: "Navadeep Reddy",
    fullName: "Navadeep Reddy S",
    title: "Computer Science Engineer & AI-Integrated Web Developer",
    tagline: "Architecting intelligent systems with data structures, algorithmic efficiency & modern web engineering.",
    bio: "Computer Science and Engineering student at VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET), Hyderabad. Focused on project-based learning, problem-solving, and building high-performance AI-integrated applications with clean design.",
    location: "Hyderabad, Telangana, India 500090",
    timezone: "IST (UTC+5:30)",
    email: "navadeepreddy.s1179@gmail.com",
    phone: "+91 8074416787",
    resumePdfUrl: "assets/resume.pdf",
    status: "Open for Internships & Engineering Roles"
  },

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science and Engineering",
      institution: "VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)",
      location: "Bachupally, Hyderabad, Telangana",
      period: "2025 - 2029 (Expected June 2029)",
      status: "Pursuing",
      highlights: [
        "Core coursework: Data Structures, Algorithms, OOP, Database Systems, Computer Organization",
        "Active member of Technical Domain & Coding Clubs",
        "Focus on translating theoretical computer science into production software"
      ]
    }
  ],

  // Quantitative DSA Competency Matrix for Interactive Radar & Bars
  dsaStats: [
    { topic: "Arrays & Hashing", level: 92, count: "80+ Solved", color: "#38bdf8" },
    { topic: "Two Pointers & Sliding Window", level: 88, count: "50+ Solved", color: "#818cf8" },
    { topic: "Trees & Binary Search Trees", level: 85, count: "60+ Solved", color: "#a855f7" },
    { topic: "Graph Algorithms (BFS/DFS)", level: 80, count: "40+ Solved", color: "#22c55e" },
    { topic: "Dynamic Programming (DP)", level: 75, count: "35+ Solved", color: "#f59e0b" },
    { topic: "Strings & Bit Manipulation", level: 86, count: "45+ Solved", color: "#ec4899" }
  ],

  skills: {
    programmingLanguages: [
      { name: "Python", level: 90, icon: "🐍", category: "languages", badge: "Core" },
      { name: "Java", level: 85, icon: "☕", category: "languages", badge: "Core" },
      { name: "C", level: 82, icon: "⚙️", category: "languages", badge: "Foundational" },
      { name: "JavaScript (ES6+)", level: 88, icon: "⚡", category: "languages", badge: "Modern" }
    ],
    webDevelopment: [
      { name: "AI-Integrated Web Apps", level: 92, icon: "🤖", category: "web", badge: "Specialty" },
      { name: "HTML5 & Modern CSS3", level: 95, icon: "🎨", category: "web", badge: "Semantic" },
      { name: "Responsive UI/UX & Bento Grids", level: 90, icon: "📱", category: "web", badge: "Design" },
      { name: "RESTful APIs & JSON", level: 86, icon: "🔌", category: "web", badge: "Backend" },
      { name: "Node.js Basics", level: 78, icon: "📦", category: "web", badge: "Runtime" }
    ],
    fundamentals: [
      { name: "Data Structures & Algorithms", level: 88, icon: "🧩", category: "core", badge: "DSA" },
      { name: "Object-Oriented Programming (OOP)", level: 88, icon: "🏛️", category: "core", badge: "Paradigms" },
      { name: "Algorithmic Complexity (Big-O)", level: 90, icon: "⏱️", category: "core", badge: "Analysis" },
      { name: "Database Fundamentals (SQL)", level: 80, icon: "🗄️", category: "core", badge: "Data" }
    ],
    toolsAndPlatforms: [
      { name: "Git & GitHub", level: 90, icon: "🐙", category: "tools", badge: "VCS" },
      { name: "VS Code & Terminal CLI", level: 95, icon: "💻", category: "tools", badge: "IDE" },
      { name: "Linux Basics", level: 80, icon: "🐧", category: "tools", badge: "OS" },
      { name: "NLP Pattern Engineering", level: 88, icon: "🧠", category: "tools", badge: "AI" }
    ],
    spokenLanguages: [
      { language: "English", proficiency: "Upper Intermediate (B2)" },
      { language: "Telugu", proficiency: "Native" },
      { language: "Hindi", proficiency: "Intermediate (B1)" }
    ]
  },

  projects: [
    {
      id: "ai-portfolio",
      title: "Interactive AI Portfolio & Knowledge Engine",
      subtitle: "Round 2 Technical Domain Flagship Submission",
      category: "ai-web",
      description: "A customized developer workstation portfolio featuring an integrated NLP conversational AI, live terminal emulator, interactive command palette, and DSA competency visualizer with zero external dependencies.",
      techStack: ["JavaScript (ES6+)", "Custom CSS Grid", "NLP Pattern Engine", "Web Audio API", "LocalStorage"],
      highlights: [
        "100% portable zero-dependency architecture that runs instantly on any PC offline",
        "Embedded terminal emulator supporting interactive Unix-style commands",
        "Command Palette (Ctrl + K) for rapid keyboard navigation",
        "Instant resume modal preview + direct PDF download asset"
      ],
      github: "https://github.com/navadeep-1179/portfolio-ai-chatbot",
      demo: "#",
      featured: true
    },
    {
      id: "ai-study-assistant",
      title: "AI Study Assistant & Automated Quiz Engine",
      subtitle: "Intelligent Learning Tool",
      category: "ai-web",
      description: "An educational platform that ingests technical computer science materials, generates hierarchical summary cards, and builds interactive practice quizzes with instant scoring.",
      techStack: ["Python", "Flask", "JavaScript", "NLP Summarization", "CSS3"],
      highlights: [
        "Automated summary extraction from long technical documents",
        "Timed self-assessment quiz generator with analytics",
        "Category mastery breakdown across core CS disciplines"
      ],
      github: "https://github.com/navadeep-1179",
      demo: "#",
      featured: true
    },
    {
      id: "dsa-visualizer",
      title: "Algorithmic Visualizer & Problem Solver",
      subtitle: "Interactive DSA Simulator",
      category: "core",
      description: "A real-time algorithm visualizer demonstrating sorting techniques (Merge, Quick), binary tree traversals, and shortest-path graph algorithms (Dijkstra, BFS).",
      techStack: ["JavaScript", "HTML5 Canvas", "Algorithms & DSA", "Data Structures"],
      highlights: [
        "Visual step-by-step array animations with speed throttle",
        "Interactive graph pathfinding grid with obstacle placement",
        "Complexity analysis breakdowns for each demonstrated algorithm"
      ],
      github: "https://github.com/navadeep-1179",
      demo: "#",
      featured: true
    },
    {
      id: "dev-metrics-hub",
      title: "DevMetrics - Multi-Platform Coding Dashboard",
      subtitle: "Developer Analytics Aggregator",
      category: "fullstack",
      description: "A centralized dashboard that unifies competitive programming milestones across LeetCode, GitHub, and HackerRank into a single telemetry screen.",
      techStack: ["JavaScript", "REST APIs", "Modern CSS", "Chart.js"],
      highlights: [
        "Live problem solving stats & streak counter integration",
        "Repository commit cadence visualizer",
        "Direct one-click deep links to verified profiles"
      ],
      github: "https://github.com/navadeep-1179",
      demo: "#",
      featured: false
    }
  ],

  codingProfiles: [
    {
      platform: "LeetCode",
      handle: "navadeep-1179",
      url: "https://leetcode.com/u/navadeep-1179",
      description: "Algorithmic problem solving across Arrays, Strings, Trees, and DP in Python & Java.",
      stats: "300+ Problems Practiced",
      icon: "leetcode",
      badge: "DSA & Problem Solving",
      accent: "#f59e0b"
    },
    {
      platform: "GitHub",
      handle: "navadeep-1179",
      url: "https://github.com/navadeep-1179",
      description: "Open-source projects, system utilities, web applications, and round submissions.",
      stats: "Active Repositories",
      icon: "github",
      badge: "Version Control",
      accent: "#6366f1"
    },
    {
      platform: "HackerRank",
      handle: "navadeep_1179",
      url: "https://www.hackerrank.com/profile/navadeep_1179",
      description: "Skill certifications and competitive problem solving in Python and C.",
      stats: "Certified Skills",
      icon: "hackerrank",
      badge: "Fundamentals",
      accent: "#10b981"
    },
    {
      platform: "LinkedIn",
      handle: "Navadeep Reddy",
      url: "https://www.linkedin.com/in/navadeep-reddy",
      description: "Professional networking, academic accomplishments, and engineering projects.",
      stats: "Professional Network",
      icon: "linkedin",
      badge: "Connect",
      accent: "#0ea5e9"
    }
  ],

  achievements: [
    {
      title: "Round 2 Qualifier — Technical Domain",
      organization: "College Technical Club",
      description: "Selected to advance to Round 2 by showcasing technical thinking, problem-solving, and end-to-end software delivery.",
      year: "2026"
    },
    {
      title: "Consistent DSA & Competitive Coding",
      organization: "LeetCode & HackerRank",
      description: "Active practice in time-space optimization, recursive patterns, and algorithmic data structures.",
      year: "2025 - Present"
    },
    {
      title: "AI-Integrated Web Applications",
      organization: "Project Development",
      description: "Engineered web applications merging modern interactive frontend architectures with conversational AI.",
      year: "2025 - Present"
    }
  ],

  // Interactive Terminal Commands for the Bento Terminal Emulator
  terminalCommands: {
    help: "Available commands:\n• 'projects'  - View all featured engineering projects\n• 'skills'    - List technical stack & programming languages\n• 'dsa'       - Show DSA competency metrics\n• 'resume'    - Open resume viewer & download PDF\n• 'profiles'  - List LeetCode, GitHub & LinkedIn links\n• 'college'   - Academic details at VNR VJIET\n• 'contact'   - Email, phone & location\n• 'clear'     - Clear terminal screen\n• 'whoami'    - Display candidate identity",
    whoami: "navadeep@vnr-vjiet:~$ Navadeep Reddy (B.Tech CSE @ VNR VJIET Hyderabad)\nFocus: AI-Integrated Web Engineering & Algorithmic Problem Solving.",
    college: "🏛️ VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)\nDegree: B.Tech Computer Science and Engineering (Expected June 2029)\nLocation: Bachupally, Hyderabad, Telangana",
    skills: "💻 Languages: Python, Java, C, JavaScript (ES6+)\n🌐 Web & AI: AI-Integrated Apps, Modern CSS Bento Grids, REST APIs\n🧩 Core: Data Structures & Algorithms, Object-Oriented Programming (OOP)\n🛠️ Tools: Git, GitHub, VS Code, Linux, NLP Engines",
    projects: "🚀 Featured Projects:\n1. Interactive AI Portfolio & Knowledge Engine\n2. AI Study Assistant & Automated Quiz Engine\n3. Algorithmic Visualizer & Problem Solver\n4. DevMetrics Multi-Platform Hub\n(Type 'open <project>' or click project cards)",
    dsa: "🧩 DSA Mastery Matrix:\n• Arrays & Hashing: 92%\n• Two Pointers: 88%\n• Trees & BST: 85%\n• Graphs: 80%\n• Dynamic Programming: 75%\n• Strings: 86%",
    profiles: "🌐 Coding Profiles:\n• LeetCode: https://leetcode.com/u/navadeep-1179\n• GitHub: https://github.com/navadeep-1179\n• HackerRank: https://hackerrank.com/profile/navadeep_1179\n• LinkedIn: https://linkedin.com/in/navadeep-reddy",
    resume: "📄 Opening interactive resume modal...",
    contact: "📫 Contact Information:\nEmail: navadeepreddy.s1179@gmail.com\nPhone: +91 8074416787\nLocation: Hyderabad, Telangana, India 500090"
  },

  chatbotKnowledge: {
    welcome: "👋 Welcome! I am **NavBot**, Navadeep's Neural Portfolio Copilot. Ask me about his projects, skills, DSA problem solving, college, or resume!",
    quickQuestions: [
      "What projects has User worked on?",
      "What technologies does he know?",
      "What are his coding profiles?",
      "Show me his resume.",
      "Where does he study?",
      "How can I contact him?"
    ]
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PROFILE_DATA;
} else if (typeof window !== "undefined") {
  window.PROFILE_DATA = PROFILE_DATA;
}
