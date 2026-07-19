(function () {
  'use strict';

  function getStoredTheme() {
    var settings = AppStore.get(AppStore.keys.settings, { theme: 'dark' });
    return settings.theme === 'light' ? 'light' : 'dark';
  }

  function toggleTheme() {
    var current = getStoredTheme();
    var nextTheme = current === 'dark' ? 'light' : 'dark';
    var settings = AppStore.get(AppStore.keys.settings, {
      preferredLearningStyle: 'balanced',
      keepLongContext: false,
      theme: 'dark'
    });
    settings.theme = nextTheme;
    AppStore.set(AppStore.keys.settings, settings);
    AppUtils.applyTheme(nextTheme);
    AppUtils.announce('Theme switched to ' + nextTheme);
    render();
  }

  function render() {
    var root = document.getElementById('landing-root');
    if (!root) return;

    var topicCount = (window.AppState && AppState.topics && AppState.topics.length) || 0;
    var quizCount = (window.AppState && AppState.quizzes && AppState.quizzes.length) || 0;

    root.innerHTML = [
      '<div class="hero">',
      '<section class="hero-banner" aria-label="Welcome to GenAI Tutor">' +
        '<div>' +
          '<div class="hero-brand-row"><img src="./assets/icons/genai-logo.svg" alt="GenAI Tutor logo" class="hero-logo" /><span class="hero-brand-text">GenAI Tutor</span> 🤖</div>' +
          '<p class="hero-kicker">Beginner-first learning platform</p>' +
          '<h3 class="hero-title">Learn AI with confidence, one concept at a time.</h3>' +
          '<p class="hero-copy">Ask questions, explore visual modules, practice quizzes, and track your progress in one place.</p>' +
          '<div class="hero-stats">' +
            '<span class="pill">' + topicCount + ' AI topics</span>' +
            '<span class="pill">' + quizCount + ' quiz sets</span>' +
            '<span class="pill">Conversation tutor</span>' +
          '</div>' +
          '<div class="hero-cta-row">' +
            '<a href="#/tutor" class="cta-link">Start with Tutor</a>' +
            '<a href="#/modules" class="cta-link secondary">Explore Modules</a>' +
            '<button id="home-theme-toggle" class="secondary">' +
              (getStoredTheme() === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode') +
            '</button>' +
          '</div>' +
        '</div>' +
        '<aside class="hero-panel" aria-label="Quick plan">' +
          '<img src="./assets/icons/hero-ai.svg" alt="AI tutor illustration" class="hero-art" />' +
          '<p><strong>Your quick learning path</strong></p>' +
          '<ol>' +
            '<li>📚 Pick a topic in Modules</li>' +
            '<li>💬 Ask follow-up questions in Tutor</li>' +
            '<li>✅ Take a quiz and track results</li>' +
          '</ol>' +
        '</aside>' +
      '</section>',
      '<div class="quick-links">',
      CardComponent.render({ title: '💬 Start Tutor', body: '<p>Ask beginner-friendly AI questions with context-aware guidance.</p><p><a href="#/tutor" class="cta-link">Open Tutor</a></p>' }),
      CardComponent.render({ title: '🧠 Explore Modules', body: '<p>Visual AI topics with diagrams, flowcharts, and interactive views.</p><p><a href="#/modules" class="cta-link">Open Modules</a></p>' }),
      CardComponent.render({ title: '📝 Practice Quiz', body: '<p>Check understanding and get instant feedback plus explanations.</p><p><a href="#/quiz" class="cta-link">Open Quiz</a></p>' }),
      CardComponent.render({ title: '📈 Track Dashboard', body: '<p>See completed topics, scores, time spent, and saved sessions.</p><p><a href="#/dashboard" class="cta-link">Open Dashboard</a></p>' }),
      '</div>',
      '</div>'
    ].join('');

    var themeBtn = document.getElementById('home-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  }

  window.LandingPage = { render: render };
})();
