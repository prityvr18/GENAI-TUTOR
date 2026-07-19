(function () {
  'use strict';

  function render(opts) {
    var title = opts && opts.title ? opts.title : '';
    var body = opts && opts.body ? opts.body : '';
    var footer = opts && opts.footer ? opts.footer : '';
    return [
      '<article class="card">',
      title ? '<h3>' + AppUtils.safeText(title) + '</h3>' : '',
      '<div>' + body + '</div>',
      footer ? '<footer>' + footer + '</footer>' : '',
      '</article>'
    ].join('');
  }

  window.CardComponent = { render: render };
})();
