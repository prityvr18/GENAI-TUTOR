(function () {
  'use strict';

  var TOPIC_IMAGES = {
    'ml-basics': './assets/icons/topic-ml.svg',
    'neural-networks': './assets/icons/topic-nn.svg',
    'nlp': './assets/icons/topic-nlp.svg',
    'computer-vision': './assets/icons/topic-cv.svg'
  };

  function getHeadingEmoji(topic) {
    var byTopic = {
      'ml-basics': '🧭',
      'neural-networks': '🧠',
      'nlp': '💬',
      'computer-vision': '👁️'
    };
    if (topic && byTopic[topic.id]) return byTopic[topic.id];
    if (!topic) return '📘';
    if (topic.visualType === 'flowchart') return '🧭';
    if (topic.visualType === 'diagram') return '📊';
    return '✨';
  }

  function getViewEmoji(visualType) {
    if (visualType === 'flowchart') return '🧭';
    if (visualType === 'diagram') return '📊';
    return '✨';
  }

  function visualMarkup(topic) {
    if (!topic) return '<div class="topic-visual">No visual</div>';
    return '<button class="secondary" data-topic-interact="' + topic.id + '">Tap to explore pattern</button><p class="hint-text">Interactive visual available for this topic.</p>';
  }

  function render(topics) {
    return '<div class="topic-list">' + topics.map(function (topic) {
      var terms = Object.keys(topic.glossary || {});
      var headingEmoji = getHeadingEmoji(topic);
      var visualEmoji = getViewEmoji(topic.visualType);
      var imageSrc = TOPIC_IMAGES[topic.id] || './assets/icons/hero-ai.svg';
      var body =
        '<img src="' + imageSrc + '" alt="' + AppUtils.safeText(topic.title) + ' illustration" class="topic-image" />' +
        '<p>' + AppUtils.safeText(topic.description) + '</p>' +
        visualMarkup(topic) +
        '<p class="hint-text">' + visualEmoji + ' ' + AppUtils.safeText(topic.visualType) + ' view</p>' +
        (terms.length ? '<p class="topic-terms"><strong>Key terms:</strong> ' + AppUtils.safeText(terms.join(', ')) + '</p>' : '') +
        '<p><button data-open-topic="' + topic.id + '">Open topic 🚀</button></p>';
      return CardComponent.render({ title: headingEmoji + ' ' + topic.title, body: body });
    }).join('') + '</div>';
  }

  window.TopicBrowserComponent = { render: render };
})();
