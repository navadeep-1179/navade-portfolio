// ==========================================================================
// Intelligent Portfolio AI Chatbot Engine
// Built for Navadeep Reddy's Portfolio
// 100% Offline & Universal Compatibility: Zero external API keys needed
// ==========================================================================

class NavadeepChatbot {
  constructor(profileData) {
    this.data = profileData || window.PROFILE_DATA;
    this.messages = [];
    this.isOpen = false;
    this.soundEnabled = true;
    this.ttsEnabled = false;
    this.audioCtx = null;
    this.synth = window.speechSynthesis || null;

    // DOM Elements
    this.chatWidget = null;
    this.chatMessagesContainer = null;
    this.chatInput = null;
    this.chatToggleBtn = null;
    this.quickPillsContainer = null;
    this.unreadBadge = null;

    this.initAudio();
    this.setupKnowledgeBase();
  }

  // Web Audio API for subtle futuristic sound effects (zero external files required)
  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("AudioContext not supported or disabled");
    }
  }

  playSound(type = "receive") {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;
      if (type === "send") {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.1);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {
      // Audio playback silently suppressed if blocked by autoplay policy
    }
  }

  // Pre-compiled Intent & NLP Matching Rules
  setupKnowledgeBase() {
    this.intents = [
      // 1. PROJECTS INTENT
      {
        id: "projects",
        patterns: [
          /project/i,
          /what.*(work|built|made|created)/i,
          /portfolio/i,
          /github project/i,
          /application/i,
          /repo/i,
          /show.*work/i
        ],
        handler: () => {
          const projs = this.data.projects;
          let listHtml = projs
            .map(
              (p) => `
              <div class="bot-card-item">
                <div class="bot-card-title">🚀 <strong>${p.title}</strong></div>
                <div class="bot-card-desc">${p.description}</div>
                <div class="bot-tags">${p.techStack.map((t) => `<span class="bot-tag">${t}</span>`).join(" ")}</div>
                <div class="bot-card-actions">
                  <a href="${p.github}" target="_blank" rel="noopener" class="bot-link-btn">View Code on GitHub →</a>
                </div>
              </div>`
            )
            .join("");

          return {
            text: `Navadeep has built several high-impact projects focusing on **AI-integrated web development**, **data structures**, and **full-stack applications**:`,
            richHtml: `<div class="bot-card-list">${listHtml}</div>`,
            suggestions: ["Tell me about his AI Portfolio", "What technologies does he know?", "Show me his resume"]
          };
        }
      },

      // 2. SPECIFIC PROJECT: AI PORTFOLIO
      {
        id: "portfolio_detail",
        patterns: [/ai portfolio/i, /chatbot project/i, /how was this (bot|chatbot|portfolio) built/i, /about this website/i],
        handler: () => {
          return {
            text: `You're exploring it right now! 🚀 **Interactive AI Portfolio & Knowledge Chatbot** is Navadeep's Round 2 Technical Domain submission.`,
            richHtml: `
              <div class="bot-card-item">
                <div class="bot-card-title">💡 <strong>Key Technical Highlights:</strong></div>
                <ul class="bot-bullet-list">
                  <li><strong>Zero-Dependency Portability:</strong> Runs seamlessly on any computer, browser, or server without needing external paid API keys.</li>
                  <li><strong>Custom NLP Engine:</strong> Client-side tokenization, fuzzy keyword matching, and intent classification.</li>
                  <li><strong>Interactive Resume Integration:</strong> In-browser modal viewer + direct PDF download.</li>
                  <li><strong>Responsive Glassmorphism:</strong> Dark mode aesthetic with smooth micro-interactions.</li>
                </ul>
              </div>`,
            suggestions: ["Show me his resume", "What are his coding profiles?", "What technologies does he know?"]
          };
        }
      },

      // 3. SKILLS & TECHNOLOGIES INTENT
      {
        id: "skills",
        patterns: [
          /skill/i,
          /technolog(y|ies)/i,
          /what.*know/i,
          /tech stack/i,
          /language/i,
          /python/i,
          /java/i,
          /c /i,
          /javascript/i,
          /framework/i,
          /tools/i
        ],
        handler: () => {
          const s = this.data.skills;
          const langs = s.programmingLanguages.map((l) => `<strong>${l.name}</strong>`).join(", ");
          const web = s.webDevelopment.map((w) => w.name).join(", ");
          const core = s.fundamentals.map((c) => c.name).join(", ");
          const tools = s.toolsAndPlatforms.map((t) => t.name).join(", ");

          return {
            text: `Here is a breakdown of Navadeep's technical competencies:`,
            richHtml: `
              <div class="bot-card-item">
                <div class="bot-skill-row">💻 <strong>Languages:</strong> ${langs}</div>
                <div class="bot-skill-row">🌐 <strong>Web & AI:</strong> ${web}</div>
                <div class="bot-skill-row">🧠 <strong>Core CS:</strong> ${core}</div>
                <div class="bot-skill-row">🛠️ <strong>Tools & DevOps:</strong> ${tools}</div>
              </div>`,
            suggestions: ["What projects has User worked on?", "What are his coding profiles?", "Show me his resume"]
          };
        }
      },

      // 4. CODING PROFILES INTENT (LeetCode, GitHub, HackerRank, etc.)
      {
        id: "coding_profiles",
        patterns: [
          /coding profile/i,
          /leetcode/i,
          /hackerrank/i,
          /github/i,
          /linkedin/i,
          /competitive program/i,
          /dsa/i,
          /problem solv/i
        ],
        handler: () => {
          const profiles = this.data.codingProfiles;
          let listHtml = profiles
            .map(
              (p) => `
              <div class="bot-profile-item">
                <div>
                  <strong>${p.platform}</strong>: <span class="text-muted">@${p.handle}</span>
                  <div style="font-size:0.82rem; color:var(--text-secondary);">${p.description}</div>
                </div>
                <a href="${p.url}" target="_blank" rel="noopener" class="bot-pill-btn">Open Profile ↗</a>
              </div>`
            )
            .join("");

          return {
            text: `Navadeep actively hones his problem solving on competitive coding platforms:`,
            richHtml: `<div class="bot-profile-list">${listHtml}</div>`,
            suggestions: ["What projects has User worked on?", "Show me his resume", "How to contact him?"]
          };
        }
      },

      // 5. RESUME INTENT (Mandatory PDF requirement: "Show me his resume")
      {
        id: "resume",
        patterns: [
          /resume/i,
          /cv/i,
          /show.*resume/i,
          /download.*resume/i,
          /curriculum vitae/i,
          /bio data/i
        ],
        handler: () => {
          return {
            text: `Navadeep's resume is readily available! You can preview it right here in your browser or download the original PDF file:`,
            richHtml: `
              <div class="bot-card-item bot-resume-highlight">
                <div style="font-weight:600; margin-bottom: 6px;">📄 Navadeep Reddy - Resume (PDF)</div>
                <div style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 12px;">
                  B.Tech in Computer Science & Engineering • VNR VJIET Hyderabad • Expected 2029
                </div>
                <div class="bot-action-group">
                  <button type="button" class="bot-action-primary" onclick="window.portfolioApp && window.portfolioApp.openResumeModal()">
                    👁️ View Resume Online
                  </button>
                  <a href="${this.data.personal.resumePdfUrl}" download="Navadeep_Reddy_Resume.pdf" class="bot-action-secondary">
                    ⬇️ Download PDF
                  </a>
                </div>
              </div>`,
            suggestions: ["What projects has User worked on?", "What technologies does he know?", "Where does he study?"]
          };
        }
      },

      // 6. EDUCATION & COLLEGE INTENT
      {
        id: "education",
        patterns: [
          /education/i,
          /college/i,
          /university/i,
          /study/i,
          /studying/i,
          /degree/i,
          /vnr/i,
          /vjiet/i,
          /b\.?tech/i,
          /graduation/i
        ],
        handler: () => {
          const edu = this.data.education[0];
          return {
            text: `Navadeep is pursuing his **${edu.degree}** in **${edu.field}** at **${edu.institution}**, located in ${edu.location}.`,
            richHtml: `
              <div class="bot-card-item">
                <div style="font-weight:600;">🎓 ${edu.institution}</div>
                <div style="color:var(--text-accent); font-size:0.85rem; margin: 4px 0;">${edu.degree} — ${edu.field} (${edu.period})</div>
                <ul class="bot-bullet-list">
                  ${edu.highlights.map((h) => `<li>${h}</li>`).join("")}
                </ul>
              </div>`,
            suggestions: ["What technologies does he know?", "What projects has User worked on?", "Show me his resume"]
          };
        }
      },

      // 7. ACHIEVEMENTS & CERTIFICATIONS INTENT
      {
        id: "achievements",
        patterns: [
          /achievement/i,
          /certificat/i,
          /accomplish/i,
          /round 2/i,
          /award/i,
          /honor/i
        ],
        handler: () => {
          const achs = this.data.achievements;
          let listHtml = achs
            .map(
              (a) => `
              <div class="bot-card-item">
                <div style="font-weight:600;">🏆 ${a.title} (${a.year})</div>
                <div style="font-size:0.83rem; color:var(--text-accent);">${a.organization}</div>
                <div style="font-size:0.83rem; color:var(--text-secondary); margin-top:4px;">${a.description}</div>
              </div>`
            )
            .join("");

          return {
            text: `Here are some key milestones and achievements:`,
            richHtml: `<div class="bot-card-list">${listHtml}</div>`,
            suggestions: ["What projects has User worked on?", "What are his coding profiles?", "Show me his resume"]
          };
        }
      },

      // 8. CONTACT & SOCIALS INTENT
      {
        id: "contact",
        patterns: [
          /contact/i,
          /email/i,
          /phone/i,
          /reach/i,
          /hire/i,
          /call/i,
          /message/i,
          /location/i,
          /where.*live/i,
          /hyderabad/i
        ],
        handler: () => {
          const p = this.data.personal;
          return {
            text: `You can easily reach out to Navadeep through any of the following channels:`,
            richHtml: `
              <div class="bot-card-item">
                <div style="margin-bottom:6px;">📧 <strong>Email:</strong> <a href="mailto:${p.email}" style="color:var(--accent-primary);">${p.email}</a></div>
                <div style="margin-bottom:6px;">📱 <strong>Phone:</strong> <a href="tel:${p.phone.replace(/\s+/g, '')}" style="color:var(--accent-primary);">${p.phone}</a></div>
                <div style="margin-bottom:6px;">📍 <strong>Location:</strong> ${p.location}</div>
                <div>💼 <strong>Status:</strong> <span class="bot-tag" style="background:rgba(16,185,129,0.15); color:#10b981;">${p.status}</span></div>
              </div>`,
            suggestions: ["Show me his resume", "What projects has User worked on?", "What are his coding profiles?"]
          };
        }
      },

      // 9. SPOKEN LANGUAGES
      {
        id: "spoken_languages",
        patterns: [/spoken language/i, /what language.*speak/i, /english/i, /telugu/i, /hindi/i],
        handler: () => {
          const langs = this.data.skills.spokenLanguages;
          return {
            text: `Navadeep is multilingual and proficient in:`,
            richHtml: `
              <div class="bot-card-item">
                ${langs.map((l) => `<div>🗣️ <strong>${l.language}:</strong> ${l.proficiency}</div>`).join("")}
              </div>`,
            suggestions: ["What technologies does he know?", "Where does he study?", "Show me his resume"]
          };
        }
      },

      // 10. GREETINGS
      {
        id: "greeting",
        patterns: [/^(hi|hello|hey|greetings|hola|namaste|good (morning|afternoon|evening))/i],
        handler: () => {
          return {
            text: `Hello there! 👋 I am Navadeep's AI Portfolio Assistant. How can I assist you today?`,
            suggestions: [
              "What projects has User worked on?",
              "What technologies does he know?",
              "What are his coding profiles?",
              "Show me his resume."
            ]
          };
        }
      },

      // 11. WHO IS NAVADEEP / ABOUT
      {
        id: "about",
        patterns: [/who are you/i, /who is (navadeep|user)/i, /tell me about (yourself|him|navadeep)/i, /bio/i, /summary/i],
        handler: () => {
          const p = this.data.personal;
          return {
            text: `**${p.fullName}** is a ${p.title} currently pursuing B.Tech in Computer Science at VNR VJIET, Hyderabad.\n\n${p.bio}`,
            suggestions: ["What projects has User worked on?", "What technologies does he know?", "Show me his resume"]
          };
        }
      },

      // 12. HELP / CAPABILITIES
      {
        id: "help",
        patterns: [/help/i, /what can you do/i, /features/i, /options/i],
        handler: () => {
          return {
            text: `I am specialized to answer queries regarding Navadeep's engineering background. You can ask me:`,
            richHtml: `
              <div class="bot-card-item">
                <ul class="bot-bullet-list">
                  <li>💼 <strong>Projects:</strong> Web applications, AI tools, algorithms</li>
                  <li>⚡ <strong>Technologies:</strong> Python, Java, C, Web Development, DSA</li>
                  <li>📄 <strong>Resume:</strong> View online or download PDF</li>
                  <li>🏆 <strong>Coding Profiles:</strong> GitHub, LeetCode, HackerRank</li>
                  <li>🎓 <strong>Education:</strong> VNR VJIET College & B.Tech details</li>
                  <li>📞 <strong>Contact:</strong> Email, phone & direct links</li>
                </ul>
              </div>`,
            suggestions: [
              "What projects has User worked on?",
              "What technologies does he know?",
              "Show me his resume."
            ]
          };
        }
      }
    ];
  }

  // NLP matching function
  findBestMatch(query) {
    const cleaned = query.trim().toLowerCase();

    // Direct pattern check
    for (const intent of this.intents) {
      for (const pattern of intent.patterns) {
        if (pattern.test(cleaned)) {
          return intent.handler();
        }
      }
    }

    // Token-based keyword scoring fallback
    const tokens = cleaned.split(/\W+/).filter(Boolean);
    let bestIntent = null;
    let highestScore = 0;

    const keywordWeights = {
      projects: ["project", "projects", "work", "built", "repo", "apps", "code", "portfolio"],
      skills: ["skill", "skills", "tech", "technology", "technologies", "languages", "python", "java", "c", "javascript", "stack"],
      coding_profiles: ["profile", "profiles", "leetcode", "github", "hackerrank", "rank", "streak", "problems"],
      resume: ["resume", "cv", "pdf", "biodata", "curriculum", "vitae"],
      education: ["college", "university", "school", "degree", "study", "studying", "vnr", "vjiet", "btech", "cgpa"],
      achievements: ["achievement", "achievements", "certifications", "awards", "qualify", "round", "competition"],
      contact: ["contact", "email", "phone", "hire", "number", "location", "address", "reach"]
    };

    for (const [intentId, keywords] of Object.entries(keywordWeights)) {
      let score = 0;
      for (const token of tokens) {
        if (keywords.includes(token)) score += 2;
        else if (keywords.some((k) => k.startsWith(token) || token.startsWith(k))) score += 1;
      }
      if (score > highestScore) {
        highestScore = score;
        bestIntent = this.intents.find((i) => i.id === intentId);
      }
    }

    if (bestIntent && highestScore >= 2) {
      return bestIntent.handler();
    }

    // Fallback response with helpful guided suggestion chips
    return {
      text: `I'm not quite sure about that specific detail, but I'd be happy to tell you about Navadeep's projects, skills, coding profiles, or show you his resume!`,
      suggestions: [
        "What projects has User worked on?",
        "What technologies does he know?",
        "What are his coding profiles?",
        "Show me his resume."
      ]
    };
  }

  // Speech synthesis (TTS)
  speakText(text) {
    if (!this.ttsEnabled || !this.synth) return;
    try {
      this.synth.cancel();
      // Strip markdown symbols for clean speech
      const plainText = text.replace(/[*_#`\[\]]/g, "").replace(/\(.*?\)/g, "");
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("TTS playback error", e);
    }
  }

  // Initialize UI Bindings
  initUI() {
    this.chatWidget = document.getElementById("chat-widget");
    this.chatMessagesContainer = document.getElementById("chat-messages");
    this.chatInput = document.getElementById("chat-input");
    this.chatToggleBtn = document.getElementById("chat-toggle-btn");
    this.quickPillsContainer = document.getElementById("chat-quick-pills");
    this.unreadBadge = document.getElementById("chat-unread-badge");

    if (!this.chatWidget || !this.chatToggleBtn) return;

    // Toggle button
    this.chatToggleBtn.addEventListener("click", () => this.toggleChat());

    // Close button
    const closeBtn = document.getElementById("chat-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.toggleChat(false));

    // Clear chat button
    const clearBtn = document.getElementById("chat-clear-btn");
    if (clearBtn) clearBtn.addEventListener("click", () => this.clearChat());

    // Sound toggle button
    const soundBtn = document.getElementById("chat-sound-btn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.innerHTML = this.soundEnabled ? "🔊" : "🔇";
        soundBtn.title = this.soundEnabled ? "Mute Chat Sounds" : "Unmute Chat Sounds";
      });
    }

    // Form submit
    const chatForm = document.getElementById("chat-form");
    if (chatForm) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });
    }

    // Render initial welcome message if empty
    if (this.messages.length === 0) {
      this.addBotMessage(
        this.data.chatbotKnowledge.welcome,
        null,
        this.data.chatbotKnowledge.quickQuestions
      );
    }
  }

  toggleChat(forceState = null) {
    this.isOpen = forceState !== null ? forceState : !this.isOpen;
    if (this.chatWidget) {
      this.chatWidget.classList.toggle("open", this.isOpen);
      if (this.isOpen) {
        if (this.unreadBadge) this.unreadBadge.style.display = "none";
        setTimeout(() => this.chatInput && this.chatInput.focus(), 250);
        this.scrollToBottom();
      }
    }
  }

  handleUserSubmit() {
    const query = this.chatInput.value.trim();
    if (!query) return;

    // Add user message
    this.addUserMessage(query);
    this.chatInput.value = "";
    this.playSound("send");

    // Display typing animation
    this.showTypingIndicator();

    // Natural bot response delay (400 - 650ms)
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.findBestMatch(query);
      this.addBotMessage(response.text, response.richHtml, response.suggestions);
      this.playSound("receive");
      this.speakText(response.text);
    }, 450 + Math.random() * 200);
  }

  addUserMessage(text) {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const msgObj = { sender: "user", text, timestamp };
    this.messages.push(msgObj);

    const msgHtml = `
      <div class="chat-msg user">
        <div class="msg-bubble">
          <div class="msg-text">${this.escapeHtml(text)}</div>
          <div class="msg-time">${timestamp}</div>
        </div>
      </div>`;

    this.chatMessagesContainer.insertAdjacentHTML("beforeend", msgHtml);
    this.scrollToBottom();
  }

  addBotMessage(text, richHtml = null, suggestions = []) {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const msgObj = { sender: "bot", text, richHtml, suggestions, timestamp };
    this.messages.push(msgObj);

    // Markdown conversion (bold, italic, links)
    const formattedText = this.formatMarkdown(text);

    let contentHtml = `<div class="msg-text">${formattedText}</div>`;
    if (richHtml) {
      contentHtml += `<div class="msg-rich">${richHtml}</div>`;
    }

    const msgHtml = `
      <div class="chat-msg bot">
        <div class="msg-avatar">🤖</div>
        <div class="msg-bubble">
          ${contentHtml}
          <div class="msg-time">${timestamp}</div>
        </div>
      </div>`;

    this.chatMessagesContainer.insertAdjacentHTML("beforeend", msgHtml);
    this.renderSuggestions(suggestions);
    this.scrollToBottom();

    // If chat is closed, increment unread badge
    if (!this.isOpen && this.unreadBadge) {
      this.unreadBadge.style.display = "flex";
      const count = parseInt(this.unreadBadge.innerText || "0", 10) + 1;
      this.unreadBadge.innerText = count > 9 ? "9+" : count;
    }
  }

  showTypingIndicator() {
    this.removeTypingIndicator();
    const vis = document.getElementById("neural-visualizer");
    if (vis) vis.classList.add("active");

    const typingHtml = `
      <div class="chat-msg bot typing-msg" id="chat-typing-indicator">
        <div class="msg-avatar">🤖</div>
        <div class="msg-bubble">
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>`;
    this.chatMessagesContainer.insertAdjacentHTML("beforeend", typingHtml);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const vis = document.getElementById("neural-visualizer");
    if (vis) vis.classList.remove("active");
    const typing = document.getElementById("chat-typing-indicator");
    if (typing) typing.remove();
  }

  renderSuggestions(suggestions) {
    if (!this.quickPillsContainer) return;
    this.quickPillsContainer.innerHTML = "";

    if (!suggestions || suggestions.length === 0) {
      suggestions = this.data.chatbotKnowledge.quickQuestions.slice(0, 4);
    }

    suggestions.forEach((q) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "quick-pill";
      pill.innerText = q;
      pill.addEventListener("click", () => {
        if (this.chatInput) {
          this.chatInput.value = q;
          this.handleUserSubmit();
        }
      });
      this.quickPillsContainer.appendChild(pill);
    });
  }

  clearChat() {
    this.messages = [];
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.innerHTML = "";
    }
    this.addBotMessage(
      "Chat history cleared. How else can I help you regarding Navadeep's profile?",
      null,
      this.data.chatbotKnowledge.quickQuestions
    );
  }

  scrollToBottom() {
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
    }
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  formatMarkdown(text) {
    if (!text) return "";
    let html = this.escapeHtml(text);
    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Line breaks
    html = html.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");
    return html;
  }
}

// Global initialization helper
window.NavadeepChatbot = NavadeepChatbot;
