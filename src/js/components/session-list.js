(function () {
  'use strict';

  function render(sessions) {
    if (!sessions.length) {
      return CardComponent.render({ title: 'Saved Sessions', body: '<p>No saved sessions yet.</p>' });
    }

    var items = sessions.map(function (s) {
      return '<li>' +
        '<strong>' + AppUtils.safeText(s.topicTitle || s.topicId || 'Unknown topic') + '</strong> ' +
        '<small>(' + AppUtils.formatDate(s.lastActivityAt) + ')</small> ' +
        '<button data-resume-session="' + s.id + '">Resume</button> ' +
        '<button class="danger" data-delete-session="' + s.id + '">Delete</button>' +
      '</li>';
    }).join('');

    return CardComponent.render({ title: 'Saved Sessions', body: '<ul>' + items + '</ul>' });
  }

  window.SessionListComponent = { render: render };
})();
