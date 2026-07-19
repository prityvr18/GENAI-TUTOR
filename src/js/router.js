(function () {
  'use strict';

  var routes = {};

  function normalize(hash) {
    if (!hash || hash === '#') return '/';
    return hash.replace(/^#/, '') || '/';
  }

  function render(path) {
    var normalized = normalize(path);
    var allSections = document.querySelectorAll('section[data-route]');
    allSections.forEach(function (section) {
      section.classList.remove('is-active');
    });

    var target = document.querySelector('section[data-route="' + normalized + '"]');
    if (!target) {
      normalized = '/';
      target = document.querySelector('section[data-route="/"]');
    }
    if (target) target.classList.add('is-active');

    document.querySelectorAll('[data-route-link]').forEach(function (link) {
      var active = link.getAttribute('href') === '#' + normalized;
      link.classList.toggle('active', active);
    });

    if (routes[normalized]) {
      routes[normalized]();
    }

    var main = document.getElementById('main-content');
    if (main) main.focus();
  }

  function register(path, fn) {
    routes[path] = fn;
  }

  function start() {
    window.addEventListener('hashchange', function () {
      render(location.hash);
    });
    if (!location.hash) {
      location.hash = '#/';
    }
    render(location.hash);
  }

  window.AppRouter = {
    register: register,
    start: start,
    navigate: function (path) {
      location.hash = '#' + path;
    }
  };
})();
