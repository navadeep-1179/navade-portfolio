// ==========================================================================
// Navadeep Reddy - Bento Grid & Interactive Workstation Logic
// Live Terminal Emulator, Command Palette (Ctrl+K), Theme Engine, DSA Matrix
// ==========================================================================

class PortfolioApp {
  constructor() {
    this.data = window.PROFILE_DATA;
    this.chatbot = null;
    this.currentTheme = localStorage.getItem("navadeep_theme") || "obsidian";

    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setupLiveClock();
    this.setupThemeDropdown();
    this.setupTerminal();
    this.setupCommandPalette();
    this.renderDsaMatrix();
    this.renderSkills("all");
    this.renderCodingProfiles();
    this.renderProjects();
    this.setupResumeModal();
    this.setupContactForm();

    // Initialize Chatbot
    if (window.NavadeepChatbot) {
      this.chatbot = new window.NavadeepChatbot(this.data);
      this.chatbot.initUI();
    }
  }

  // ==================== LIVE HYDERABAD CLOCK (IST) ====================
  setupLiveClock() {
    const clockElem = document.getElementById("live-time-display");
    if (!clockElem) return;

    const updateClock = () => {
      try {
        const now = new Date();
        const istTime = now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
        clockElem.innerText = `HYD ${istTime} IST`;
      } catch (e) {
        clockElem.innerText = "HYD UTC+5:30";
      }
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  // ==================== MULTI-THEME ENGINE ====================
  applyTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    document.documentElement.setAttribute("data-theme", themeName);
    this.currentTheme = themeName;
    localStorage.setItem("navadeep_theme", themeName);

    const themeLabels = {
      obsidian: { icon: "🌌", name: "Obsidian" },
      matrix: { icon: "🟢", name: "Matrix" },
      cyan: { icon: "⚡", name: "Cyan" },
      solar: { icon: "🔥", name: "Solar" }
    };

    const labelElem = document.getElementById("theme-label");
    const iconElem = document.getElementById("theme-icon");
    if (labelElem && themeLabels[themeName]) {
      labelElem.innerText = themeLabels[themeName].name;
    }
    if (iconElem && themeLabels[themeName]) {
      iconElem.innerText = themeLabels[themeName].icon;
    }

    // Highlight active in dropdown
    document.querySelectorAll(".theme-opt").forEach((opt) => {
      opt.classList.toggle("active", opt.getAttribute("data-theme") === themeName);
    });
  }

  setupThemeDropdown() {
    const btn = document.getElementById("theme-btn");
    const dropdown = document.getElementById("theme-dropdown");
    if (!btn || !dropdown) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    document.querySelectorAll(".theme-opt").forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const selected = opt.getAttribute("data-theme");
        this.applyTheme(selected);
        dropdown.classList.remove("open");
      });
    });

    document.addEventListener("click", () => dropdown.classList.remove("open"));
  }

  // ==================== INTERACTIVE TERMINAL EMULATOR ====================
  setupTerminal() {
    const form = document.getElementById("terminal-form");
    const input = document.getElementById("terminal-input");
    const screen = document.getElementById("terminal-screen");
    const clearBtn = document.getElementById("term-clear-btn");
    const chips = document.querySelectorAll(".term-chip");

    if (!form || !input || !screen) return;

    const executeCommand = (cmdStr) => {
      const trimmed = cmdStr.trim().toLowerCase();
      if (!trimmed) return;

      // Print user input
      const userLine = document.createElement("div");
      userLine.className = "terminal-line user-cmd";
      userLine.innerText = `navadeep@vnr:~$ ${trimmed}`;
      screen.appendChild(userLine);

      // Handle command logic
      if (trimmed === "clear") {
        screen.innerHTML = "";
      } else if (trimmed === "resume") {
        const outLine = document.createElement("div");
        outLine.className = "terminal-line output-line";
        outLine.innerText = this.data.terminalCommands.resume;
        screen.appendChild(outLine);
        setTimeout(() => this.openResumeModal(), 300);
      } else if (this.data.terminalCommands[trimmed]) {
        const outLine = document.createElement("div");
        outLine.className = "terminal-line output-line";
        outLine.innerText = this.data.terminalCommands[trimmed];
        screen.appendChild(outLine);
      } else {
        const errLine = document.createElement("div");
        errLine.className = "terminal-line output-line";
        errLine.innerHTML = `bash: command not found: <span style="color:#ef4444;">${trimmed}</span>. Type <span style="color:var(--accent-cyan);">'help'</span> for list of commands.`;
        screen.appendChild(errLine);
      }

      screen.scrollTop = screen.scrollHeight;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      executeCommand(input.value);
      input.value = "";
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        screen.innerHTML = "";
      });
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const cmd = chip.getAttribute("data-cmd");
        executeCommand(cmd);
      });
    });
  }

  // ==================== COMMAND PALETTE (CTRL+K) ====================
  setupCommandPalette() {
    const overlay = document.getElementById("palette-overlay");
    const input = document.getElementById("palette-input");
    const triggerBtn = document.getElementById("cmd-palette-btn");
    const closeBtn = document.getElementById("palette-close-btn");
    const items = document.querySelectorAll(".palette-item");

    if (!overlay) return;

    const openPalette = () => {
      overlay.style.display = "flex";
      setTimeout(() => input && input.focus(), 50);
    };

    const closePalette = () => {
      overlay.style.display = "none";
      if (input) input.value = "";
      items.forEach((item) => (item.style.display = "flex"));
    };

    if (triggerBtn) triggerBtn.addEventListener("click", openPalette);
    if (closeBtn) closeBtn.addEventListener("click", closePalette);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePalette();
    });

    // Global keyboard shortcut: Ctrl+K or Cmd+K or Escape
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (overlay.style.display === "none") openPalette();
        else closePalette();
      } else if (e.key === "Escape" && overlay.style.display !== "none") {
        closePalette();
      }
    });

    // Fuzzy Search inside palette
    if (input) {
      input.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase().trim();
        items.forEach((item) => {
          const text = item.innerText.toLowerCase();
          item.style.display = text.includes(val) ? "flex" : "none";
        });
      });
    }

    // Action handlers
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const action = item.getAttribute("data-action");
        closePalette();

        if (action === "resume") this.openResumeModal();
        else if (action === "download-resume") {
          window.location.href = "assets/resume.pdf";
        } else if (action === "projects") {
          document.getElementById("bento-projects")?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "dsa") {
          document.getElementById("bento-skills")?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "terminal") {
          document.getElementById("bento-terminal")?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "copilot") {
          this.chatbot && this.chatbot.toggleChat(true);
        } else if (action === "leetcode") {
          window.open("https://leetcode.com/u/navadeep-1179", "_blank");
        } else if (action === "github") {
          window.open("https://github.com/navadeep-1179", "_blank");
        }
      });
    });
  }

  // ==================== QUANTITATIVE DSA MATRIX ====================
  renderDsaMatrix() {
    const grid = document.getElementById("dsa-bars-grid");
    if (!grid) return;

    grid.innerHTML = this.data.dsaStats
      .map(
        (item) => `
      <div class="dsa-metric-item">
        <div class="dsa-metric-head">
          <span>${item.topic}</span>
          <span class="dsa-metric-count">${item.count}</span>
        </div>
        <div class="dsa-bar-bg">
          <div class="dsa-bar-fill" style="width: ${item.level}%; background: ${item.color || "var(--accent-primary)"};"></div>
        </div>
      </div>`
      )
      .join("");
  }

  // ==================== SKILLS FILTER MATRIX ====================
  renderSkills(category = "all") {
    const wrapper = document.getElementById("skills-chips-wrapper");
    if (!wrapper) return;

    const allSkills = [
      ...this.data.skills.programmingLanguages,
      ...this.data.skills.webDevelopment,
      ...this.data.skills.fundamentals,
      ...this.data.skills.toolsAndPlatforms
    ];

    const filtered = category === "all" ? allSkills : allSkills.filter((s) => s.category === category);

    wrapper.innerHTML = filtered
      .map(
        (skill) => `
      <div class="skill-chip">
        <span class="skill-chip-icon">${skill.icon || "⚡"}</span>
        <span class="skill-chip-name"><strong>${skill.name}</strong></span>
        <span class="skill-chip-badge">${skill.badge || `${skill.level}%`}</span>
      </div>`
      )
      .join("");

    // Setup filter pills
    document.querySelectorAll("#skills-filter-pills .filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        document.querySelectorAll("#skills-filter-pills .filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        this.renderSkills(pill.getAttribute("data-filter"));
      });
    });
  }

  // ==================== CODING PROFILES RENDERING ====================
  renderCodingProfiles() {
    const grid = document.getElementById("profiles-mini-grid");
    if (!grid) return;

    grid.innerHTML = this.data.codingProfiles
      .map(
        (p) => `
      <div class="mini-profile-item">
        <div class="mini-p-top">
          <span class="mini-p-name">${p.platform}</span>
          <span class="bento-tag">${p.badge}</span>
        </div>
        <div class="mini-p-handle">@${p.handle}</div>
        <div class="mini-p-stats">✓ ${p.stats}</div>
        <a href="${p.url}" target="_blank" rel="noopener" class="mini-p-link">Open Profile →</a>
      </div>`
      )
      .join("");
  }

  // ==================== FEATURED PROJECTS RENDERING ====================
  renderProjects() {
    const list = document.getElementById("bento-project-list");
    if (!list) return;

    list.innerHTML = this.data.projects
      .map((p) => {
        const flagText = p.featured ? "⭐ Flagship" : "🚀 Active";
        const bulletsHtml = p.highlights.map((h) => `<li>${h}</li>`).join("");
        const techHtml = p.techStack.map((t) => `<span class="proj-tech-pill">${t}</span>`).join("");

        return `
        <div class="bento-proj-card ${p.featured ? "featured" : ""}">
          <div class="proj-badge-row">
            <span class="proj-cat-badge">${p.category}</span>
            <span class="proj-feat-tag">${flagText}</span>
          </div>
          <h4 class="proj-title">${p.title}</h4>
          <div class="proj-sub">${p.subtitle}</div>
          <p class="proj-desc">${p.description}</p>
          <ul class="proj-bullets">${bulletsHtml}</ul>
          <div class="proj-tech-row">${techHtml}</div>
          <div class="proj-actions-row">
            <a href="${p.github}" target="_blank" rel="noopener" class="bento-btn btn-sm btn-primary">
              <span>📂</span> GitHub Repo
            </a>
            <button type="button" class="bento-btn btn-sm btn-outline" onclick="window.portfolioApp && window.portfolioApp.openChatWithQuestion('Tell me about project: ${p.title}')">
              <span>🤖</span> Ask NavBot
            </button>
          </div>
        </div>`;
      })
      .join("");
  }

  // ==================== RESUME MODAL VIEWER ====================
  setupResumeModal() {
    const modal = document.getElementById("resume-modal");
    const navBtn = document.getElementById("nav-resume-btn");
    const closeBtn = document.getElementById("modal-close-btn");

    if (navBtn) navBtn.addEventListener("click", () => this.openResumeModal());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeResumeModal());

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeResumeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.style.display !== "none") {
        this.closeResumeModal();
      }
    });
  }

  openResumeModal() {
    const modal = document.getElementById("resume-modal");
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  }

  closeResumeModal() {
    const modal = document.getElementById("resume-modal");
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // ==================== CHATBOT HELPER TRIGGER ====================
  openChatWithQuestion(question) {
    if (this.chatbot) {
      this.chatbot.toggleChat(true);
      if (this.chatbot.chatInput) {
        this.chatbot.chatInput.value = question;
        this.chatbot.handleUserSubmit();
      }
    }
  }

  // ==================== CONTACT FORM HANDLER & UTILS ====================
  setupContactForm() {
    const form = document.getElementById("bento-contact-form");
    const status = document.getElementById("bento-form-status");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const subject = form.elements["subject"].value.trim();
      const message = form.elements["message"].value.trim();

      if (!name || !email || !message) {
        if (status) {
          status.style.color = "#ef4444";
          status.innerText = "Please complete all required fields.";
        }
        return;
      }

      if (status) {
        status.style.color = "#4ade80";
        status.innerHTML = `
          ✅ Message received, <strong>${name}</strong>! Navadeep will respond to <strong>${email}</strong>.<br>
          <a href="mailto:navadeepreddy.s1179@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `From: ${name} (${email})\n\n${message}`
        )}" class="bento-btn btn-sm btn-outline" style="margin-top:0.5rem; display:inline-block;">
            Open in Email Client ✉️
          </a>`;
      }
      form.reset();
    });

    const botNavBtn = document.getElementById("nav-bot-btn");
    if (botNavBtn && this.chatbot) {
      botNavBtn.addEventListener("click", () => this.chatbot.toggleChat(true));
    }
  }

  copyToClipboard(text, alertMsg = "Copied to clipboard!") {
    navigator.clipboard.writeText(text).then(() => {
      alert(alertMsg);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.portfolioApp = new PortfolioApp();
});
