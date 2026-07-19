(function () {
  'use strict';

  function render() {
    var root = document.getElementById('settings-root');
    if (!root) return;

    var settings = AppStore.get(AppStore.keys.settings, {
      preferredLearningStyle: 'balanced',
      theme: 'dark'
    });

    root.innerHTML = CardComponent.render({
      title: 'Preferences',
      body: [
        '<label for="learning-style">Learning style</label>',
        '<select id="learning-style" class="select">',
        '<option value="balanced">Balanced</option>',
        '<option value="step-by-step">Step-by-step</option>',
        '<option value="visual">Visual</option>',
        '</select>',
        '<p class="hint-text">This affects how Tutor explanations are written.</p>',
        '<label><input id="setting-long-context" type="checkbox" /> Keep longer conversation context</label>',
        '<label for="feedback-style">Quiz feedback style</label>',
        '<select id="feedback-style" class="select">',
        '<option value="detailed">Detailed explanations</option>',
        '<option value="concise">Short explanations</option>',
        '</select>',
        '<p class="hint-text">Choose how much detail you prefer after quiz submission.</p>',
        '<p><button id="save-settings">Save settings</button></p>'
      ].join('')
    });

    var styleSelect = document.getElementById('learning-style');
    if (styleSelect) styleSelect.value = settings.preferredLearningStyle || 'balanced';
    var longContext = document.getElementById('setting-long-context');
    if (longContext) longContext.checked = !!settings.keepLongContext;
    var feedbackStyle = document.getElementById('feedback-style');
    if (feedbackStyle) feedbackStyle.value = settings.feedbackStyle || 'detailed';

    var saveBtn = document.getElementById('save-settings');
    if (saveBtn) {
      saveBtn.addEventListener('click', function () {
        var next = {
          preferredLearningStyle: styleSelect ? styleSelect.value : 'balanced',
          keepLongContext: !!(longContext && longContext.checked),
          feedbackStyle: feedbackStyle ? feedbackStyle.value : 'detailed',
          theme: settings.theme || 'dark'
        };
        AppStore.set(AppStore.keys.settings, next);
        AppUtils.announce('Settings saved');
      });
    }
  }

  window.SettingsPage = { render: render };
})();
