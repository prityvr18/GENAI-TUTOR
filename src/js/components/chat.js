(function () {
  'use strict';

  function renderGlossary(items) {
    if (!items || !items.length) return '';
    var rows = items.map(function (entry) {
      return '<li><strong>' + AppUtils.safeText(entry.term) + ':</strong> ' + AppUtils.safeText(entry.meaning) + '</li>';
    }).join('');
    return '<div class="msg-glossary"><p><strong>Key terms</strong></p><ul>' + rows + '</ul></div>';
  }

  function renderMessages(messages) {
    return '<div class="chat-log" aria-label="Tutor conversation" role="log" aria-live="polite">' +
      messages.map(function (m) {
        var glossary = m.role === 'tutor' ? renderGlossary(m.glossary) : '';
        return '<div class="msg ' + m.role + '">' +
          '<small>' + AppUtils.safeText(m.role === 'user' ? 'You' : 'Tutor') + '</small>' +
          '<div>' + AppUtils.safeText(m.text) + '</div>' + glossary +
        '</div>';
      }).join('') +
    '</div>';
  }

  window.ChatComponent = {
    renderMessages: renderMessages
  };
})();
