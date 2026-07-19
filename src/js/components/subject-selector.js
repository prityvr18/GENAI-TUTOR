(function () {
  'use strict';

  function render(topics, selected) {
    var options = topics.map(function (t) {
      var isSel = t.id === selected ? ' selected' : '';
      return '<option value="' + t.id + '"' + isSel + '>' + AppUtils.safeText(t.title) + '</option>';
    }).join('');

    return [
      '<label for="subject-select">Subject</label>',
      '<select id="subject-select" class="select" aria-label="AI subject selector">',
      options,
      '</select>'
    ].join('');
  }

  window.SubjectSelectorComponent = { render: render };
})();
