(function () {
  'use strict';

  var FALLBACK_TOPICS = [
    {
      id: 'ml-basics',
      title: 'Machine Learning Basics',
      description: 'How computers learn patterns from examples.',
      visualType: 'flowchart',
      visualData: { steps: ['Data', 'Learning', 'Prediction'] },
      content: 'Machine learning means teaching a computer with examples so it can make smart guesses later.',
      glossary: {
        model: 'A model is the pattern-finder the computer builds from data.',
        dataset: 'A dataset is a collection of examples used for learning.'
      }
    },
    {
      id: 'neural-networks',
      title: 'Neural Networks',
      description: 'A system inspired by how connected brain cells process signals.',
      visualType: 'diagram',
      visualData: { layers: ['Input', 'Hidden', 'Output'] },
      content: 'Neural networks are made of layers that pass information forward to make decisions.',
      glossary: {
        neuron: 'A tiny calculation unit in a neural network.',
        layer: 'A group of neurons that work at the same stage.'
      }
    },
    {
      id: 'nlp',
      title: 'Natural Language Processing',
      description: 'How computers read and generate human language.',
      visualType: 'interactive',
      visualData: { pipeline: ['Text Input', 'Understanding', 'Response'] },
      content: 'NLP helps computers understand text and speech, then respond in useful ways.',
      glossary: {
        token: 'A small piece of text, often a word or part of a word.',
        intent: 'What the user is trying to do with a message.'
      }
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision',
      description: 'How AI interprets images and videos.',
      visualType: 'diagram',
      visualData: { parts: ['Pixels', 'Features', 'Label'] },
      content: 'Computer vision turns image pixels into meaningful understanding, like recognizing objects.',
      glossary: {
        feature: 'A useful pattern in an image, such as an edge or shape.',
        classification: 'Assigning a label, like cat or dog, to an image.'
      }
    }
  ];

  var FALLBACK_QUIZZES = [
    {
      id: 'quiz-ml',
      topicId: 'ml-basics',
      questions: [
        {
          id: 'ml-q1',
          question: 'What is the main goal of machine learning?',
          options: ['To manually code every rule', 'To learn patterns from data', 'To replace all humans', 'To store files faster'],
          correctIndex: 1,
          explanation: 'Machine learning finds patterns in examples so it can predict or decide later.'
        },
        {
          id: 'ml-q2',
          question: 'A dataset is...',
          options: ['A hardware device', 'A list of users', 'A collection of examples for learning', 'A coding language'],
          correctIndex: 2,
          explanation: 'Datasets provide examples that AI uses during training.'
        },
        {
          id: 'ml-q3',
          question: 'After training, a machine learning model is mostly used to...',
          options: ['Install operating systems', 'Make predictions on new data', 'Design hardware chips', 'Compress videos'],
          correctIndex: 1,
          explanation: 'A trained model applies learned patterns to unseen examples and predicts outcomes.'
        },
        {
          id: 'ml-q4',
          question: 'Which example best fits supervised learning?',
          options: ['Grouping similar photos without labels', 'Learning from labeled spam/not-spam emails', 'Randomly guessing game moves', 'Drawing UI icons'],
          correctIndex: 1,
          explanation: 'Supervised learning uses labeled input-output examples, such as spam classification with known labels.'
        }
      ]
    },
    {
      id: 'quiz-nn',
      topicId: 'neural-networks',
      questions: [
        {
          id: 'nn-q1',
          question: 'What is a hidden layer in a neural network?',
          options: ['A secret file', 'A middle processing stage', 'A type of dataset', 'A network cable'],
          correctIndex: 1,
          explanation: 'Hidden layers process signals between input and output layers.'
        },
        {
          id: 'nn-q2',
          question: 'The input layer in a neural network mainly does what?',
          options: ['Stores backups', 'Receives raw feature values', 'Prints reports', 'Deletes incorrect data'],
          correctIndex: 1,
          explanation: 'The input layer accepts feature values (like pixels or numbers) and passes them forward.'
        },
        {
          id: 'nn-q3',
          question: 'An activation function is used to...',
          options: ['Add non-linearity to model behavior', 'Increase monitor brightness', 'Connect Wi-Fi', 'Create folder names'],
          correctIndex: 0,
          explanation: 'Activation functions add non-linearity, helping neural networks learn complex patterns.'
        },
        {
          id: 'nn-q4',
          question: 'During training, weights are updated to...',
          options: ['Increase prediction error', 'Reduce loss and improve accuracy', 'Change screen resolution', 'Stop all computations'],
          correctIndex: 1,
          explanation: 'Weight updates aim to minimize loss, so predictions become more accurate over time.'
        }
      ]
    },
    {
      id: 'quiz-nlp',
      topicId: 'nlp',
      questions: [
        {
          id: 'nlp-q1',
          question: 'NLP primarily helps computers with...',
          options: ['Cooking', 'Language understanding', 'Battery charging', 'Car repair'],
          correctIndex: 1,
          explanation: 'NLP focuses on text and speech understanding and generation.'
        },
        {
          id: 'nlp-q2',
          question: 'Tokenization means...',
          options: ['Breaking text into smaller units', 'Translating images into pixels', 'Cooling down processors', 'Encrypting passwords'],
          correctIndex: 0,
          explanation: 'Tokenization splits text into pieces such as words or subwords for processing.'
        },
        {
          id: 'nlp-q3',
          question: 'Sentiment analysis tries to detect...',
          options: ['Weather conditions', 'User emotion or opinion in text', 'File size', 'Battery status'],
          correctIndex: 1,
          explanation: 'Sentiment analysis estimates whether text expresses positive, negative, or neutral opinions.'
        },
        {
          id: 'nlp-q4',
          question: 'A chatbot uses NLP primarily to...',
          options: ['Understand user messages and respond', 'Repair hardware devices', 'Render 3D games', 'Measure internet speed'],
          correctIndex: 0,
          explanation: 'Chatbots rely on NLP to interpret language intent and generate relevant replies.'
        }
      ]
    },
    {
      id: 'quiz-cv',
      topicId: 'computer-vision',
      questions: [
        {
          id: 'cv-q1',
          question: 'Computer vision starts from...',
          options: ['Pixels', 'Audio waves', 'Source code', 'Game scores'],
          correctIndex: 0,
          explanation: 'Images are made of pixels, which are the starting point for visual analysis.'
        },
        {
          id: 'cv-q2',
          question: 'Image classification is about...',
          options: ['Assigning a label to an image', 'Compressing text files', 'Generating music playlists', 'Updating operating systems'],
          correctIndex: 0,
          explanation: 'Classification predicts one or more labels for an image, such as cat, dog, or car.'
        },
        {
          id: 'cv-q3',
          question: 'A feature in computer vision is...',
          options: ['A useful visual pattern like edge/shape', 'A keyboard shortcut', 'A network password', 'A PDF bookmark'],
          correctIndex: 0,
          explanation: 'Features are meaningful image patterns (edges, corners, textures) used for recognition.'
        },
        {
          id: 'cv-q4',
          question: 'Object detection differs from classification because it...',
          options: ['Only uses text input', 'Finds object locations and labels', 'Needs no training data', 'Works only in black-and-white images'],
          correctIndex: 1,
          explanation: 'Object detection predicts both what objects are present and where they appear in the image.'
        }
      ]
    }
  ];

  window.AppState = {
    topics: [],
    quizzes: [],
    currentSubject: null
  };

  function registerRoutes() {
    AppRouter.register('/', LandingPage.render);
    AppRouter.register('/tutor', TutorPage.render);
    AppRouter.register('/modules', ModulesPage.render);
    AppRouter.register('/quiz', QuizPage.render);
    AppRouter.register('/dashboard', DashboardPage.render);
    AppRouter.register('/settings', SettingsPage.render);
  }

  function initializeServices() {
    AIService.setTopics(AppState.topics);
    QuizService.setQuizzes(AppState.quizzes);
  }

  function loadJson(path, fallbackValue) {
    return fetch(path)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load ' + path);
        }
        return response.json();
      })
      .catch(function () {
        return fallbackValue;
      });
  }

  function loadData() {
    return Promise.all([
      loadJson('./data/topics.json', FALLBACK_TOPICS),
      loadJson('./data/quizzes.json', FALLBACK_QUIZZES)
    ]).then(function (results) {
      AppState.topics = results[0] || [];
      AppState.quizzes = results[1] || [];
      var persistedSubject = AppStore.get(AppStore.keys.currentSubject, null);
      AppState.currentSubject = persistedSubject || (AppState.topics[0] && AppState.topics[0].id) || null;
      initializeServices();
    });
  }

  function start() {
    AppStore.ensureDefaults();
    var settings = AppStore.get(AppStore.keys.settings, { theme: 'dark' });
    AppUtils.applyTheme(settings.theme || 'dark');
    NavComponent.init();
    registerRoutes();

    loadData().then(function () {
      AppRouter.start();
      AppUtils.announce('GenAI Tutor is ready');
    }).catch(function () {
      var landingRoot = document.getElementById('landing-root');
      if (landingRoot) {
        landingRoot.innerHTML = CardComponent.render({
          title: 'Could not load learning data',
          body: '<p>Please check that <code>topics.json</code> and <code>quizzes.json</code> are available.</p>'
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', start);
})();
