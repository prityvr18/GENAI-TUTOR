(function () {
  'use strict';

  function render() {
    var root = document.getElementById('quiz-root');
    if (!root || !window.AppState) return;

    var topics = AppState.topics;
    var selected = AppState.currentSubject || (topics[0] && topics[0].id);

    var quiz = QuizService.getQuizByTopic(selected);
    if (!quiz && topics.length) {
      var fallbackTopicId = topics[0].id;
      quiz = QuizService.getQuizByTopic(fallbackTopicId);
      if (quiz) {
        AppState.currentSubject = quiz.topicId;
        AppStore.set(AppStore.keys.currentSubject, quiz.topicId);
      }
    }

    if (!quiz) {
      root.innerHTML = CardComponent.render({ title: 'Quiz', body: '<p>No quiz available for this topic yet.</p>' });
      return;
    }

    AppStore.set('genai-tutor-quiz-state', { topicId: quiz.topicId, at: Date.now() });

    var qMarkup = quiz.questions.map(function (q, i) { return QuizComponent.renderQuestion(q, i); }).join('');

    root.innerHTML = [
      CardComponent.render({ title: 'Quiz Subject', body: SubjectSelectorComponent.render(topics, quiz.topicId) + '<p class="hint-text">Answer all questions, then submit to get instant feedback.</p>' }),
      qMarkup,
      '<button id="submit-quiz">Submit Quiz</button>',
      '<div id="quiz-result"></div>'
    ].join('');

    var select = document.getElementById('subject-select');
    if (select) {
      select.addEventListener('change', function () {
        var hasAnswers = !!root.querySelector('input[type="radio"]:checked');
        if (hasAnswers && !confirm('Switch subject and clear current quiz answers?')) {
          select.value = quiz.topicId;
          return;
        }
        AppState.currentSubject = select.value;
        AppStore.set(AppStore.keys.currentSubject, select.value);
        render();
      });
    }

    var submit = document.getElementById('submit-quiz');
    if (submit) {
      submit.addEventListener('click', function () {
        var answers = quiz.questions.map(function (_, i) {
          var sel = root.querySelector('input[name="q-' + i + '"]:checked');
          return sel ? Number(sel.value) : -1;
        });

        var unanswered = answers.filter(function (value) { return value === -1; }).length;
        if (unanswered > 0) {
          AppUtils.announce('Please answer all questions before submitting');
          return;
        }

        var result = QuizService.scoreQuiz(quiz, answers);
        ProgressService.addQuizResult(quiz.topicId, result);
        ProgressService.addStudyMinutes(2);
        if (result.percent >= 70) {
          ProgressService.markTopicCompleted(quiz.topicId);
        }
        var resultRoot = document.getElementById('quiz-result');
        if (resultRoot) resultRoot.innerHTML = QuizComponent.renderResult(result);
        AppUtils.announce('Quiz submitted');
      });
    }
  }

  window.QuizPage = { render: render };
})();
