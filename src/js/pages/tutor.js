(function () {
  'use strict';

  function readLearningStyle() {
    var settings = AppStore.get(AppStore.keys.settings, { preferredLearningStyle: 'balanced' });
    return settings.preferredLearningStyle || 'balanced';
  }

  function keepLongContext() {
    var settings = AppStore.get(AppStore.keys.settings, { keepLongContext: false });
    return !!settings.keepLongContext;
  }

  function render() {
    var root = document.getElementById('tutor-root');
    if (!root || !window.AppState) return;

    var topics = AppState.topics;
    var selected = AppState.currentSubject || (topics[0] && topics[0].id);
    var subjectSelector = SubjectSelectorComponent.render(topics, selected);

    var qna = AppStore.get(AppStore.keys.recentQnA, []);
    var convo = AppStore.get(AppStore.keys.conversation, []);
    var combined = convo.length ? convo : qna.map(function (item) {
      return { role: 'tutor', text: item.answer, createdAt: item.at };
    });

    root.innerHTML = [
      CardComponent.render({
        title: 'Ask your AI question',
        body:
          '<div class="grid">' +
            subjectSelector +
            '<div class="input-row"><input id="tutor-input" aria-label="Ask AI question" maxlength="500" placeholder="e.g. What is machine learning?" /><button id="send-q">Ask</button></div>' +
            '<p class="hint-text">Tip: press Enter to send. Use “Explain More” for deeper detail.</p>' +
            '<div class="session-actions">' +
              '<button class="secondary" id="explain-more">Explain More</button>' +
              '<button class="secondary" id="save-session">Save Session</button>' +
              '<button class="danger" id="reset-chat">Reset Chat</button>' +
            '</div>' +
          '</div>'
      }),
      ChatComponent.renderMessages(combined)
    ].join('');

    var select = document.getElementById('subject-select');
    if (select) {
      select.addEventListener('change', function () {
        AppState.currentSubject = select.value;
        AppStore.set(AppStore.keys.currentSubject, select.value);
        AppUtils.announce('Subject changed');
      });
    }

    var sendBtn = document.getElementById('send-q');
    var input = document.getElementById('tutor-input');

    function ask(depthBoost) {
      var text = (input && input.value || '').trim();
      if (!text) return;
      if (text.length > 500) {
        AppUtils.announce('Please keep your question within 500 characters');
        return;
      }
      var messages = AppStore.get(AppStore.keys.conversation, []);
      messages.push({ role: 'user', text: text, createdAt: Date.now() });
      if (!keepLongContext() && messages.length > 12) {
        messages = messages.slice(-12);
      }

      var progressSummary = ProgressService.getSummary();
      var profile = {
        currentTopicId: AppState.currentSubject,
        preferredLearningStyle: readLearningStyle(),
        needsMoreDepth: !!depthBoost,
        lowRecentScores: progressSummary.avgQuizScore > 0 && progressSummary.avgQuizScore < 60
      };
      var reply = AIService.conversationReply(messages, profile);
      messages.push(reply);
      AppStore.set(AppStore.keys.conversation, messages);

      var recent = AppStore.get(AppStore.keys.recentQnA, []);
      recent.unshift({ question: text, answer: reply.text, topicId: reply.topicId, at: Date.now() });
      AppStore.set(AppStore.keys.recentQnA, recent.slice(0, 12));

      ProgressService.markTopicCompleted(reply.topicId);
      ProgressService.addStudyMinutes(1);
      render();
      var refreshedInput = document.getElementById('tutor-input');
      if (refreshedInput) refreshedInput.focus();
      AppUtils.announce('Tutor replied with a beginner-friendly explanation');
    }

    if (sendBtn) sendBtn.addEventListener('click', function () { ask(false); });
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') ask(false);
      });
    }

    var explainBtn = document.getElementById('explain-more');
    if (explainBtn) {
      explainBtn.addEventListener('click', function () {
        if (!input) return;
        if (!input.value.trim()) input.value = 'Explain this topic in more detail';
        ask(true);
      });
    }

    var reset = document.getElementById('reset-chat');
    if (reset) {
      reset.addEventListener('click', function () {
        AppStore.remove(AppStore.keys.conversation);
        render();
        AppUtils.announce('Conversation reset');
      });
    }

    var saveSession = document.getElementById('save-session');
    if (saveSession) {
      saveSession.addEventListener('click', function () {
        var session = {
          id: AppUtils.uid('session'),
          topicId: AppState.currentSubject,
          topicTitle: (AppState.topics.find(function (t) { return t.id === AppState.currentSubject; }) || {}).title,
          route: '/tutor',
          conversation: AppStore.get(AppStore.keys.conversation, []),
          quizState: AppStore.get('genai-tutor-quiz-state', null),
          lastActivityAt: Date.now()
        };
        SessionService.saveSession(session);
        AppUtils.announce('Session saved');
      });
    }
  }

  window.TutorPage = { render: render };
})();
