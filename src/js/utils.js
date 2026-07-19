(function () {
  'use strict';

  function uid(prefix) {
    return `${prefix || 'id'}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  }

  function safeText(value) {
    return String(value ?? '').replace(/[<>]/g, '');
  }

  function announce(message) {
    var node = document.getElementById('announcer');
    if (!node) return;
    node.textContent = '';
    setTimeout(function () {
      node.textContent = safeText(message);
    }, 20);
  }

  function formatDate(ts) {
    try {
      return new Date(ts).toLocaleString();
    } catch (e) {
      return 'Unknown date';
    }
  }

  function applyTheme(theme) {
    var selected = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', selected);
  }

  window.AppUtils = {
    uid: uid,
    safeText: safeText,
    announce: announce,
    formatDate: formatDate,
    applyTheme: applyTheme
  };
})();
