// ==========================================================================
// Navadeep Reddy - Portfolio Client Logic & Integrated AI Assistant
// Clean, Lightweight, Vanilla JavaScript (Zero External Dependencies)
// ==========================================================================

// Knowledge Base for the Integrated AI Chatbot
const NAVADEEP_INFO = {
  name: "Navadeep Reddy",
  education: "2nd Year B.Tech in Computer Science and Engineering",
  college: "VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET), Hyderabad",
  cgpa: "9.5 / 10.0",
  graduation: "2029",
  careerGoal: "AI Engineer",
  email: "navadeepreddy.s1179@gmail.com",
  location: "Hyderabad, India",
  skills: {
    languages: ["C", "Java", "Python", "JavaScript (ES6+)"],
    fundamentals: ["Data Structures & Algorithms (DSA)", "Programming Fundamentals", "Object-Oriented Programming (OOP)"],
    webAndAi: ["AI-Integrated Web Development", "AI and Web Integration", "HTML5 & CSS3", "RESTful APIs", "Node.js Basics"],
    tools: ["Git", "GitHub", "VS Code", "Linux Basics"]
  },
  training: "AI Web Integration training course completed through VNR VJIET.",
  projects: [
    {
      name: "KrishiLink (SIH Project)",
      description: "AI-integrated agricultural web platform for farmers providing crop intelligence and market connectivity.",
      tech: "Python, ML Service, JavaScript, REST API, Database",
      url: "https://github.com/navadeep-1179/SIH-Krishilink"
    },
    {
      name: "Job Portal Web Application",
      description: "Full-stack web application with RESTful API routing, data models, and applicant management.",
      tech: "Node.js, Express, REST APIs, JavaScript",
      url: "https://github.com/navadeep-1179/job-portal"
    },
    {
      name: "Personal Portfolio & AI Chatbot",
      description: "Responsive personal portfolio with integrated rule-based NLP conversational assistant.",
      tech: "HTML5, CSS3, JavaScript, Client NLP",
      url: "https://github.com/navadeep-1179"
    }
  ],
  profiles: {
    codeforces: "https://codeforces.com/profile/navdeep_rdy (@navdeep_rdy)",
    hackerrank: "https://www.hackerrank.com/profile/navadeepreddy_s1 (@navadeepreddy_s1)",
    hive: "https://hive.smartinterviews.in/profile/25071a6662 (ID: 25071a6662)",
    github: "https://github.com/navadeep-1179 (@navadeep-1179)",
    linkedin: "https://www.linkedin.com/in/navadeep-reddy-373043383/"
  }
};

// ==================== RESUME MODAL HANDLERS ====================
function openResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Close modal when clicking outside or pressing Escape
window.addEventListener("click", (e) => {
  const modal = document.getElementById("resume-modal");
  if (modal && e.target === modal) {
    closeResumeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeResumeModal();
  }
});

// ==================== COPY TO CLIPBOARD ====================
function copyContact(text, msg) {
  navigator.clipboard.writeText(text).then(() => {
    alert(msg || "Copied to clipboard!");
  }).catch(() => {
    prompt("Copy this:", text);
  });
}

// ==================== CREATIVE THEME PICKER ====================
function setupCreativeThemePicker() {
  const btn = document.getElementById("theme-btn");
  const menu = document.getElementById("theme-menu");
  const icon = document.getElementById("theme-icon");
  const nameLabel = document.getElementById("theme-name");
  const options = document.querySelectorAll(".theme-opt-btn");

  const themeMeta = {
    aurora: { icon: "🌌", name: "Aurora" },
    cyber: { icon: "⚡", name: "Cyber" },
    emerald: { icon: "🍃", name: "Emerald" },
    sunset: { icon: "🌅", name: "Sunset" }
  };

  const applyTheme = (theme) => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("navadeep_creative_theme", theme);
    if (themeMeta[theme]) {
      if (icon) icon.innerText = themeMeta[theme].icon;
      if (nameLabel) nameLabel.innerText = themeMeta[theme].name;
    }
    options.forEach((opt) => {
      opt.classList.toggle("active", opt.getAttribute("data-theme") === theme);
    });
  };

  const saved = localStorage.getItem("navadeep_creative_theme") || "aurora";
  applyTheme(saved);

  if (btn && menu) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("open");
    });

    options.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const t = opt.getAttribute("data-theme");
        applyTheme(t);
        menu.classList.remove("open");
      });
    });

    document.addEventListener("click", () => menu.classList.remove("open"));
  }
}

// ==================== CONTACT FORM HANDLER ====================
document.addEventListener("DOMContentLoaded", () => {
  setupCreativeThemePicker();
  // Mobile Nav Toggle
  const toggle = document.getElementById("mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      const isVisible = navLinks.style.display === "flex";
      navLinks.style.display = isVisible ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "60px";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.background = "#111827";
      navLinks.style.padding = "1rem 2rem";
      navLinks.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
    });
  }

  // Resume Nav Button
  const navResumeBtn = document.getElementById("nav-resume-btn");
  if (navResumeBtn) {
    navResumeBtn.addEventListener("click", openResumeModal);
  }

  // Contact Form
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("form-status-msg");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const bio = form.elements["bio"].value.trim();

      if (!name || !email) return;

      if (statusMsg) {
        statusMsg.style.color = "#34d399";
        statusMsg.innerHTML = `
          ✓ Thank you, <strong>${name}</strong>! Your message has been logged.<br>
          <span style="font-size:0.8rem; color:#9ca3af;">Navadeep will get back to you at <strong>${email}</strong> soon.</span>
          <br>
          <a href="mailto:navadeepreddy.s1179@gmail.com?subject=Contact%20from%20Portfolio&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${bio}`)}" 
             class="btn btn-sm btn-outline" style="margin-top:0.5rem; display:inline-block;">
             Open in Email Client ✉️
          </a>`;
      }
      form.reset();
    });
  }

  // Initialize Chatbot UI
  initChatbot();
});

// ==================== INTEGRATED AI CHATBOT LOGIC ====================
function initChatbot() {
  const fab = document.getElementById("chat-fab-btn");
  const panel = document.getElementById("chat-panel");
  const closeBtn = document.getElementById("chat-close-btn");
  const clearBtn = document.getElementById("chat-clear-btn");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const navChatBtn = document.getElementById("nav-chat-btn");

  if (!fab || !panel) return;

  const toggleChat = (force) => {
    const isOpen = typeof force === "boolean" ? force : !panel.classList.contains("open");
    panel.classList.toggle("open", isOpen);
    if (isOpen && input) {
      setTimeout(() => input.focus(), 200);
    }
  };

  fab.addEventListener("click", () => toggleChat());
  if (closeBtn) closeBtn.addEventListener("click", () => toggleChat(false));
  if (navChatBtn) navChatBtn.addEventListener("click", () => toggleChat(true));

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const stream = document.getElementById("chat-messages");
      if (stream) {
        stream.innerHTML = `
          <div class="chat-bubble-wrap bot">
            <div class="chat-bubble">
              Chat history cleared. Feel free to ask me anything about Navadeep!
            </div>
          </div>`;
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;

      appendUserMessage(query);
      input.value = "";

      // Simulate natural response delay
      setTimeout(() => {
        const reply = getBotReply(query);
        appendBotMessage(reply);
      }, 350);
    });
  }
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById("chat-input");
  const form = document.getElementById("chat-form");
  if (input && form) {
    input.value = promptText;
    form.dispatchEvent(new Event("submit"));
  }
}

function openChatWithPrompt(promptText) {
  const panel = document.getElementById("chat-panel");
  if (panel) {
    panel.classList.add("open");
    sendQuickPrompt(promptText);
  }
}

function appendUserMessage(text) {
  const stream = document.getElementById("chat-messages");
  if (!stream) return;

  const div = document.createElement("div");
  div.className = "chat-bubble-wrap user";
  div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div>`;
  stream.appendChild(div);
  stream.scrollTop = stream.scrollHeight;
}

function appendBotMessage(html) {
  const stream = document.getElementById("chat-messages");
  if (!stream) return;

  const div = document.createElement("div");
  div.className = "chat-bubble-wrap bot";
  div.innerHTML = `<div class="chat-bubble">${html}</div>`;
  stream.appendChild(div);
  stream.scrollTop = stream.scrollHeight;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getBotReply(query) {
  const q = query.toLowerCase();

  // 1. PROJECTS (Answers: "What projects has User worked on?")
  if (q.includes("project") || q.includes("work") || q.includes("built") || q.includes("repo")) {
    let html = `Navadeep has built genuine software projects:<br><br>`;
    NAVADEEP_INFO.projects.forEach((p) => {
      html += `<strong>🚀 ${p.name}</strong><br>${p.description}<br><em style="color:#60a5fa; font-size:0.8rem;">Tech: ${p.tech}</em><br><a href="${p.url}" target="_blank" style="color:#38bdf8; text-decoration:underline; font-size:0.8rem;">View on GitHub →</a><br><br>`;
    });
    return html;
  }

  // 2. TECHNOLOGIES & SKILLS (Answers: "What technologies does he know?")
  if (q.includes("skill") || q.includes("technolog") || q.includes("language") || q.includes("know") || q.includes("stack") || q.includes("python") || q.includes("java")) {
    return `
      Navadeep's technical competencies include:<br>
      • <strong>Languages:</strong> ${NAVADEEP_INFO.skills.languages.join(", ")}<br>
      • <strong>Core Fundamentals:</strong> ${NAVADEEP_INFO.skills.fundamentals.join(", ")}<br>
      • <strong>Web & AI Integration:</strong> ${NAVADEEP_INFO.skills.webAndAi.join(", ")}<br>
      • <strong>Tools:</strong> ${NAVADEEP_INFO.skills.tools.join(", ")}<br>
      • <strong>Specialization:</strong> ${NAVADEEP_INFO.training}`;
  }

  // 3. RESUME (Answers: "Show me his resume")
  if (q.includes("resume") || q.includes("cv") || q.includes("curriculum")) {
    return `
      Navadeep's verified resume is accessible directly:<br><br>
      <button type="button" class="btn btn-sm btn-primary" onclick="openResumeModal()" style="margin-right:6px;">
        👁️ View Resume Online
      </button>
      <a href="assets/resume.pdf" download="Navadeep_Reddy_Resume.pdf" class="btn btn-sm btn-secondary">
        ⬇️ Download PDF
      </a>`;
  }

  // 4. CGPA & EDUCATION
  if (q.includes("cgpa") || q.includes("gpa") || q.includes("grade") || q.includes("college") || q.includes("education") || q.includes("vnr") || q.includes("year") || q.includes("study")) {
    return `
      🎓 <strong>Education Details:</strong><br>
      • <strong>Degree:</strong> ${NAVADEEP_INFO.education}<br>
      • <strong>College:</strong> ${NAVADEEP_INFO.college}<br>
      • <strong>Current Academic CGPA:</strong> <span style="color:#34d399; font-weight:700;">${NAVADEEP_INFO.cgpa}</span><br>
      • <strong>Expected Graduation:</strong> ${NAVADEEP_INFO.graduation}<br>
      • <strong>Career Goal:</strong> ${NAVADEEP_INFO.careerGoal}`;
  }

  // 5. CODING PROFILES (Answers: "What are his coding profiles?")
  if (q.includes("profile") || q.includes("codeforces") || q.includes("hackerrank") || q.includes("hive") || q.includes("github") || q.includes("linkedin") || q.includes("dsa") || q.includes("competitive")) {
    return `
      🏆 <strong>Coding & Professional Profiles:</strong><br>
      • <strong>Codeforces:</strong> <a href="https://codeforces.com/profile/navdeep_rdy" target="_blank" style="color:#38bdf8;">@navdeep_rdy</a><br>
      • <strong>HackerRank:</strong> <a href="https://www.hackerrank.com/profile/navadeepreddy_s1" target="_blank" style="color:#38bdf8;">@navadeepreddy_s1</a><br>
      • <strong>Smart Interviews HIVE:</strong> <a href="https://hive.smartinterviews.in/profile/25071a6662" target="_blank" style="color:#38bdf8;">ID: 25071a6662</a><br>
      • <strong>GitHub:</strong> <a href="https://github.com/navadeep-1179" target="_blank" style="color:#38bdf8;">@navadeep-1179</a><br>
      • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/navadeep-reddy-373043383/" target="_blank" style="color:#38bdf8;">Navadeep Reddy</a>`;
  }

  // 6. TRAINING
  if (q.includes("training") || q.includes("course") || q.includes("certificate") || q.includes("ai web")) {
    return `
      📜 <strong>Training & Certification:</strong><br>
      ${NAVADEEP_INFO.training}<br>
      Focuses on integrating machine learning inference and conversational agents with web applications.`;
  }

  // 7. CONTACT / EMAIL
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("phone")) {
    return `
      📫 You can reach Navadeep at:<br>
      • <strong>Email:</strong> <a href="mailto:${NAVADEEP_INFO.email}" style="color:#38bdf8;">${NAVADEEP_INFO.email}</a><br>
      • <strong>Location:</strong> ${NAVADEEP_INFO.location}<br>
      • <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/navadeep-reddy-373043383/" target="_blank" style="color:#38bdf8;">Connect on LinkedIn</a>`;
  }

  // 8. WHO IS NAVADEEP / ABOUT
  if (q.includes("who") || q.includes("about") || q.includes("goal") || q.includes("ai engineer")) {
    return `
      Navadeep Reddy is a 2nd-year B.Tech Computer Science student at VNR VJIET, Hyderabad with a <strong>9.5 CGPA</strong>. His goal is to become an <strong>AI Engineer</strong>, specializing in data structures, algorithmic programming, and AI-integrated web applications.`;
  }

  // Default Fallback
  return `
    I can provide details about Navadeep's:<br>
    • <strong>Projects:</strong> KrishiLink (SIH), Job Portal, AI Portfolio<br>
    • <strong>Skills:</strong> C, Java, Python, JavaScript, DSA, Web & AI<br>
    • <strong>Education:</strong> 2nd Year B.Tech CSE at VNR VJIET (CGPA: 9.5)<br>
    • <strong>Coding Profiles:</strong> Codeforces, HackerRank, HIVE, GitHub, LinkedIn<br>
    • <strong>Resume:</strong> View or download PDF`;
}
