(function () {
  'use strict';

  var topics = [];
  var OUT_OF_DOMAIN_HINTS = ['weather', 'movie', 'sports', 'cricket', 'football', 'recipe', 'politics', 'stock'];

  function setTopics(list) {
    topics = Array.isArray(list) ? list : [];
  }

  function findTopicByQuery(query, explicitTopicId) {
    if (explicitTopicId) {
      var exact = topics.find(function (t) { return t.id === explicitTopicId; });
      if (exact) return exact;
    }
    var q = String(query || '').toLowerCase();
    return topics.find(function (t) {
      return t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q);
    }) || topics[0] || null;
  }

  function isOutOfDomain(query) {
    var q = String(query || '').toLowerCase();
    if (!q.trim()) return false;
    if (q.includes('ai') || q.includes('machine learning') || q.includes('neural') || q.includes('nlp') || q.includes('vision')) {
      return false;
    }
    return OUT_OF_DOMAIN_HINTS.some(function (term) {
      return q.includes(term);
    });
  }

  function explain(query, topicId, depth, style) {
    var normalizedQuery = String(query || '').trim();
    if (isOutOfDomain(normalizedQuery)) {
      return {
        topicId: null,
        topicTitle: null,
        text: 'I can best help with AI topics. Try asking about machine learning, neural networks, NLP, or computer vision.',
        glossary: []
      };
    }

    var topic = findTopicByQuery(query, topicId);
    if (!topic) {
      return {
        topicId: null,
        text: 'I could not find a matching AI topic yet. Try asking about machine learning, neural networks, NLP, or computer vision.',
        glossary: []
      };
    }

    var base = topic.content;
    var opening = 'Great question! ';
    if (style === 'step-by-step') opening = 'Let us break it down step by step. ';
    if (style === 'visual') opening = 'Imagine this visually: ';

    var extra = depth > 1
      ? ' In simple terms, the system looks for useful patterns in examples, then uses those patterns to answer new situations. Think of it like learning from practice questions before taking a new test.'
      : '';

    if (normalizedQuery.length > 220) {
      extra += ' Your question is detailed, so we can also split it into smaller parts if you want.';
    }

    var glossaryEntries = Object.entries(topic.glossary || {}).map(function (pair) {
      return { term: pair[0], meaning: pair[1] };
    });

    return {
      topicId: topic.id,
      topicTitle: topic.title,
      text: opening + base + extra,
      glossary: glossaryEntries
    };
  }

  function conversationReply(messages, profile) {
    var safeMessages = Array.isArray(messages) ? messages : [];
    var lastUser = safeMessages.filter(function (m) { return m.role === 'user'; }).slice(-1)[0];
    var q = lastUser ? lastUser.text : '';
    var depth = profile && profile.needsMoreDepth ? 2 : 1;
    var style = profile && profile.preferredLearningStyle ? profile.preferredLearningStyle : 'balanced';
    var result = explain(q, profile && profile.currentTopicId, depth, style);

    var hint = '';
    if (profile && profile.lowRecentScores) {
      hint = ' Hint: focus on one concept at a time and connect it to a real-life example.';
    }

    var followUp = '';
    if (result.topicId) {
      followUp = ' You can ask: "Give me a simple example" or "Quiz me on this".';
    }

    return {
      role: 'tutor',
      text: result.text + hint + followUp,
      topicId: result.topicId,
      topicTitle: result.topicTitle,
      glossary: result.glossary,
      createdAt: Date.now()
    };
  }

  window.AIService = {
    setTopics: setTopics,
    explain: explain,
    conversationReply: conversationReply
  };
})();
