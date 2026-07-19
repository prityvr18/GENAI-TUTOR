(function () {
  'use strict';

  var quizzes = [];

  function setQuizzes(list) {
    quizzes = Array.isArray(list) ? list : [];
  }

  function getQuizByTopic(topicId) {
    return quizzes.find(function (q) { return q.topicId === topicId; }) || null;
  }

  function scoreQuiz(quiz, answers) {
    if (!quiz) return { total: 0, correct: 0, percent: 0, details: [] };
    var total = quiz.questions.length;
    var correct = 0;
    var details = quiz.questions.map(function (question, index) {
      var selected = answers[index];
      var ok = selected === question.correctIndex;
      if (ok) correct += 1;
      return {
        questionId: question.id,
        selected: selected,
        correctIndex: question.correctIndex,
        correct: ok,
        explanation: question.explanation
      };
    });

    return {
      total: total,
      correct: correct,
      percent: total ? Math.round((correct / total) * 100) : 0,
      details: details
    };
  }

  window.QuizService = {
    setQuizzes: setQuizzes,
    getQuizByTopic: getQuizByTopic,
    scoreQuiz: scoreQuiz
  };
})();
