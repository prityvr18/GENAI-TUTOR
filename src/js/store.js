(function () {
  'use strict';

  var NS = 'genai-tutor';
  var KEYS = {
    sessions: NS + '-sessions',
    progress: NS + '-progress',
    settings: NS + '-settings',
    conversation: NS + '-conversation',
    currentSubject: NS + '-current-subject',
    recentQnA: NS + '-recent-qna'
  };

  function get(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  function ensureDefaults() {
    if (!get(KEYS.progress, null)) {
      set(KEYS.progress, {
        completedTopics: [],
        quizScores: {},
        totalTimeSpent: 0,
        currentStreak: 0,
        lastVisitDate: null
      });
    }
    if (!get(KEYS.settings, null)) {
      set(KEYS.settings, {
        preferredLearningStyle: 'balanced',
        theme: 'dark'
      });
    }
  }

  window.AppStore = {
    keys: KEYS,
    get: get,
    set: set,
    remove: remove,
    ensureDefaults: ensureDefaults
  };
})();
