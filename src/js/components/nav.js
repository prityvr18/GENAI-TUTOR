(function () {
  'use strict';

  function init() {
    document.querySelectorAll('[data-route-link]').forEach(function (a) {
      a.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          location.hash = a.getAttribute('href');
        }
      });
    });
  }

  window.NavComponent = { init: init };
})();
