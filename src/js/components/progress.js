(function () {
  'use strict';

  function ring(label, value, colorClass) {
    var clamped = Math.max(0, Math.min(100, Number(value) || 0));
    return [
      '<div class="progress-ring-card">',
      '<div class="progress-ring ' + colorClass + '" style="--p:' + clamped + '">',
      '<span>' + clamped + '%</span>',
      '</div>',
      '<p>' + AppUtils.safeText(label) + '</p>',
      '</div>'
    ].join('');
  }

  function render(summary) {
    var completionRate = Math.min(100, summary.completedTopics * 25);
    var effortRate = Math.min(100, summary.totalTimeSpent * 2);
    var body = [
      '<div class="grid two">',
      '<div><p>Completed topics</p><p class="kpi">' + summary.completedTopics + '</p></div>',
      '<div><p>Average quiz score</p><p class="kpi">' + summary.avgQuizScore + '%</p></div>',
      '<div><p>Total attempts</p><p class="kpi">' + summary.totalAttempts + '</p></div>',
      '<div><p>Time spent</p><p class="kpi">' + summary.totalTimeSpent + ' min</p></div>',
      '</div>',
      '<div class="grid three">',
      ring('Completion', completionRate, 'is-completion'),
      ring('Quiz mastery', summary.avgQuizScore, 'is-score'),
      ring('Study effort', effortRate, 'is-effort'),
      '</div>'
    ].join('');

    return CardComponent.render({ title: 'Learning Progress', body: body });
  }

  window.ProgressComponent = { render: render };
})();
