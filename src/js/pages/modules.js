(function () {
  'use strict';

  function render() {
    var root = document.getElementById('modules-root');
    if (!root || !window.AppState) return;

    var topics = AppState.topics;
    var selected = AppState.currentSubject || (topics[0] && topics[0].id);

    root.innerHTML = [
      CardComponent.render({
        title: 'Choose a subject',
        body: SubjectSelectorComponent.render(topics, selected) + '<p class="hint-text">Select a subject to update Tutor and Quiz context.</p>'
      }),
      CardComponent.render({
        title: '🔎 Find a module',
        body:
          '<div class="grid two">' +
            '<div><label for="module-search">Search topic</label><input id="module-search" class="select" placeholder="Type machine learning, NLP..." /></div>' +
            '<div><label for="module-filter">Visual type</label>' +
              '<select id="module-filter" class="select">' +
                '<option value="all">All</option>' +
                '<option value="diagram">Diagram</option>' +
                '<option value="flowchart">Flowchart</option>' +
                '<option value="interactive">Interactive</option>' +
              '</select>' +
            '</div>' +
          '</div>'
      }),
      '<div id="module-topic-list">' + TopicBrowserComponent.render(topics) + '</div>',
      CardComponent.render({ title: 'Topic details', body: '<div id="topic-detail">Select a topic card to view details.</div>' })
    ].join('');

    var select = document.getElementById('subject-select');
    if (select) {
      select.addEventListener('change', function () {
        AppState.currentSubject = select.value;
        AppStore.set(AppStore.keys.currentSubject, select.value);
        showDetails(select.value);
      });
    }

    function getFilteredTopics() {
      var searchNode = document.getElementById('module-search');
      var filterNode = document.getElementById('module-filter');
      var q = String(searchNode && searchNode.value || '').toLowerCase().trim();
      var kind = String(filterNode && filterNode.value || 'all');

      return topics.filter(function (topic) {
        var matchesQuery = !q || topic.title.toLowerCase().includes(q) || topic.description.toLowerCase().includes(q) || topic.content.toLowerCase().includes(q);
        var matchesKind = kind === 'all' || topic.visualType === kind;
        return matchesQuery && matchesKind;
      });
    }

    function renderTopicList() {
      var host = document.getElementById('module-topic-list');
      if (!host) return;
      var list = getFilteredTopics();
      host.innerHTML = TopicBrowserComponent.render(list);
      bindTopicListEvents();
      if (!list.length) {
        AppUtils.announce('No modules match your filter');
      }
    }

    function bindTopicListEvents() {
      root.querySelectorAll('[data-open-topic]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var topicId = btn.getAttribute('data-open-topic');
          AppState.currentSubject = topicId;
          AppStore.set(AppStore.keys.currentSubject, topicId);
          showDetails(topicId);
          var selector = document.getElementById('subject-select');
          if (selector) selector.value = topicId;
          var detail = document.getElementById('topic-detail');
          if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

      root.querySelectorAll('[data-topic-interact]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var topic = topics.find(function (t) { return t.id === btn.getAttribute('data-topic-interact'); });
          if (!topic) return;
          var pattern = [];
          if (topic.visualType === 'flowchart') {
            pattern = (topic.visualData && topic.visualData.steps) || ['Data', 'Learning', 'Prediction'];
          } else if (topic.visualType === 'diagram') {
            pattern = (topic.visualData && (topic.visualData.layers || topic.visualData.parts)) || ['Input', 'Feature', 'Output'];
          } else {
            pattern = (topic.visualData && topic.visualData.pipeline) || ['Input', 'Understanding', 'Response'];
          }

          btn.textContent = 'Pattern: ' + pattern.join(' → ');
          btn.setAttribute('aria-live', 'polite');
        });
      });
    }

    var searchNode = document.getElementById('module-search');
    if (searchNode) {
      searchNode.addEventListener('input', renderTopicList);
    }
    var filterNode = document.getElementById('module-filter');
    if (filterNode) {
      filterNode.addEventListener('change', renderTopicList);
    }

    function showDetails(topicId) {
      var topic = topics.find(function (t) { return t.id === topicId; });
      var detail = document.getElementById('topic-detail');
      if (!detail || !topic) return;
      var terms = Object.entries(topic.glossary || {}).map(function (entry) {
        return '<li><strong>' + AppUtils.safeText(entry[0]) + ':</strong> ' + AppUtils.safeText(entry[1]) + '</li>';
      }).join('');
      var imgById = {
        'ml-basics': './assets/icons/topic-ml.svg',
        'neural-networks': './assets/icons/topic-nn.svg',
        'nlp': './assets/icons/topic-nlp.svg',
        'computer-vision': './assets/icons/topic-cv.svg'
      };
      var detailImage = imgById[topic.id] || './assets/icons/hero-ai.svg';

      detail.innerHTML = '<img src="' + detailImage + '" alt="' + AppUtils.safeText(topic.title) + ' image" class="topic-image" />' +
        '<p><strong>' + AppUtils.safeText(topic.title) + '</strong></p>' +
        '<p>' + AppUtils.safeText(topic.content) + '</p>' +
        (terms ? '<div class="topic-glossary"><p><strong>Glossary</strong></p><ul>' + terms + '</ul></div>' : '') +
        '<div class="topic-actions">' +
          '<button class="secondary" data-start-topic-tutor="' + topic.id + '">Ask Tutor on this topic</button>' +
          '<button data-start-topic-quiz="' + topic.id + '">Take topic quiz</button>' +
        '</div>';

      detail.querySelectorAll('[data-start-topic-tutor]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-start-topic-tutor');
          AppState.currentSubject = id;
          AppStore.set(AppStore.keys.currentSubject, id);
          AppRouter.navigate('/tutor');
        });
      });

      detail.querySelectorAll('[data-start-topic-quiz]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-start-topic-quiz');
          AppState.currentSubject = id;
          AppStore.set(AppStore.keys.currentSubject, id);
          AppRouter.navigate('/quiz');
        });
      });

      ProgressService.markTopicCompleted(topic.id);
      AppUtils.announce('Opened topic details');
    }

    bindTopicListEvents();

    showDetails(selected);
  }

  window.ModulesPage = { render: render };
})();
