(function () {
  'use strict';

  function getProgress() {
    return AppStore.get(AppStore.keys.progress, {
      completedTopics: [],
      quizScores: {},
      totalTimeSpent: 0,
      currentStreak: 0,
      lastVisitDate: null
    });
  }

  function saveProgress(progress) {
    AppStore.set(AppStore.keys.progress, progress);
  }

  function markTopicCompleted(topicId) {
    var progress = getProgress();
    if (topicId && !progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
    }
    saveProgress(progress);
  }

  function addQuizResult(topicId, result) {
    var progress = getProgress();
    if (!progress.quizScores[topicId]) progress.quizScores[topicId] = [];
    progress.quizScores[topicId].push({
      score: result.percent,
      correct: result.correct,
      total: result.total,
      at: Date.now()
    });
    saveProgress(progress);
  }

  function addStudyMinutes(minutes) {
    var progress = getProgress();
    progress.totalTimeSpent += Math.max(0, minutes || 0);

    var today = new Date().toDateString();
    var last = progress.lastVisitDate ? new Date(progress.lastVisitDate).toDateString() : null;
    if (!last) {
      progress.currentStreak = 1;
    } else if (last !== today) {
      var lastDate = new Date(progress.lastVisitDate);
      var diffDays = Math.floor((new Date(today).getTime() - new Date(lastDate.toDateString()).getTime()) / 86400000);
      if (diffDays === 1) {
        progress.currentStreak += 1;
      } else if (diffDays > 1) {
        progress.currentStreak = 1;
      }
    }
    progress.lastVisitDate = Date.now();

    saveProgress(progress);
  }

  function getSummary() {
    var progress = getProgress();
    var allScores = Object.values(progress.quizScores).flat();
    var avg = allScores.length
      ? Math.round(allScores.reduce(function (a, b) { return a + b.score; }, 0) / allScores.length)
      : 0;

    return {
      completedTopics: progress.completedTopics.length,
      avgQuizScore: avg,
      totalAttempts: allScores.length,
      totalTimeSpent: progress.totalTimeSpent
    };
  }

  window.ProgressService = {
    getProgress: getProgress,
    saveProgress: saveProgress,
    markTopicCompleted: markTopicCompleted,
    addQuizResult: addQuizResult,
    addStudyMinutes: addStudyMinutes,
    getSummary: getSummary
  };
})();
