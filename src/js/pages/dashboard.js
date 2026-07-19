(function () {
  'use strict';

  function render() {
    var root = document.getElementById('dashboard-root');
    if (!root) return;

    var summary = ProgressService.getSummary();
    var sessions = SessionService.listSessions();
    var progress = ProgressService.getProgress();
    var activeTopic = (window.AppState && AppState.currentSubject) || null;
    var activeTopicTitle = '';
    if (window.AppState && Array.isArray(AppState.topics)) {
      var active = AppState.topics.find(function (topic) { return topic.id === activeTopic; });
      activeTopicTitle = active ? active.title : '';
    }

    var insights = [
      '<div class="grid two">',
      '<div><p><strong>Current subject</strong></p><p>' + AppUtils.safeText(activeTopicTitle || 'Not selected yet') + '</p></div>',
      '<div><p><strong>Learning streak</strong></p><p>' + (progress.currentStreak || 0) + ' day(s)</p></div>',
      '</div>'
    ].join('');

    root.innerHTML = [
      ProgressComponent.render(summary),
      CardComponent.render({ title: 'Learning Insights', body: insights }),
      SessionListComponent.render(sessions)
    ].join('');

    root.querySelectorAll('[data-resume-session]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-resume-session');
        var session = sessions.find(function (s) { return s.id === id; });
        if (!session) return;

        if (session.topicId) {
          AppState.currentSubject = session.topicId;
          AppStore.set(AppStore.keys.currentSubject, session.topicId);
        }
        if (session.conversation) {
          AppStore.set(AppStore.keys.conversation, session.conversation);
        }
        if (session.quizState) {
          AppStore.set('genai-tutor-quiz-state', session.quizState);
        }
        AppRouter.navigate(session.route || '/tutor');
        AppUtils.announce('Session resumed');
      });
    });

    root.querySelectorAll('[data-delete-session]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        SessionService.removeSession(btn.getAttribute('data-delete-session'));
        render();
        AppUtils.announce('Session deleted');
      });
    });
  }

  window.DashboardPage = { render: render };
})();
