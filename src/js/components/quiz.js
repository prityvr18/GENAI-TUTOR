(function () {
  'use strict';

  function renderQuestion(question, index) {
    var options = question.options.map(function (opt, i) {
      return '<label class="quiz-option"><input type="radio" name="q-' + index + '" value="' + i + '" /> ' + AppUtils.safeText(opt) + '</label>';
    }).join('<br/>');

    return CardComponent.render({
      title: 'Question ' + (index + 1),
      body: '<p>' + AppUtils.safeText(question.question) + '</p><div>' + options + '</div>'
    });
  }

  function renderResult(result) {
    var cls = result.percent >= 70 ? 'result-good' : 'result-bad';
    var details = result.details.map(function (d, idx) {
      return '<li><strong>Q' + (idx + 1) + '</strong>: ' + (d.correct ? '✅ Correct' : '❌ Incorrect') + ' — ' + AppUtils.safeText(d.explanation) + '</li>';
    }).join('');

    var label = result.percent >= 80 ? 'Excellent' : (result.percent >= 60 ? 'Good progress' : 'Keep practicing');

    return CardComponent.render({
      title: 'Quiz Result',
      body: '<p class="kpi ' + cls + '">' + result.percent + '% (' + result.correct + '/' + result.total + ')</p><p>' + label + '.</p><ul>' + details + '</ul>'
    });
  }

  window.QuizComponent = {
    renderQuestion: renderQuestion,
    renderResult: renderResult
  };
})();
