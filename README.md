# GenAI Tutor 🎓

A beginner-friendly AI learning platform with an interactive AI tutor, visual learning modules, and quizzes.

![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Tech Stack](https://img.shields.io/badge/Tech-Vanilla%20HTML%2FCSS%2FJS-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- **AI Tutor Chat** 🤖 - Ask questions and get beginner-friendly explanations powered by a simulated AI
- **Visual Learning Modules** 📚 - Explore Machine Learning, Neural Networks, NLP, and Computer Vision with custom SVG illustrations
- **Interactive Quizzes** 📝 - Test your knowledge with 4 questions per topic and detailed explanations
- **Progress Tracking** 📊 - Track your learning journey with animated progress metrics
- **Session Saving** 💾 - Save and resume your learning sessions anytime
- **Subject Switching** 🔄 - Easily switch between different AI topics
- **Light/Dark Theme** 🌙 - Toggle between light and dark themes for comfortable viewing
- **Mobile Friendly** 📱 - Responsive design works on all devices

## 🚀 Getting Started

### Option 1: Open Directly in Browser
Simply open `src/index.html` in any modern web browser:
```bash
# Windows
start src/index.html

# macOS
open src/index.html

# Linux
xdg-open src/index.html
```

### Option 2: Using a Local Server

#### Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000/src/index.html
```

#### Node.js
```bash
# Using npx
npx serve src

# Then open http://localhost:3000
```

#### VS Code Live Server
1. Install the "Live Server" extension
2. Right-click `src/index.html` → "Open with Live Server"

## 📖 How to Use

1. **Home Page** - Click "Start Learning" or use the navigation
2. **Modules** - Browse topics, search, and filter by type
3. **AI Tutor** - Ask questions about any AI topic
4. **Quiz** - Test your knowledge after learning
5. **Dashboard** - View your progress and saved sessions
6. **Settings** - Customize your learning experience

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, responsive design
- **JavaScript (ES6+)** - SPA architecture, localStorage persistence
- **No frameworks** - Pure vanilla implementation

## 📁 Project Structure

```
GenAI-tutor/
├── src/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   ├── main.css        # Global styles & theming
│   │   ├── components.css  # Reusable components
│   │   └── pages.css       # Page-specific styles
│   ├── js/
│   │   ├── app.js          # Main application logic
│   │   ├── router.js       # Hash-based routing
│   │   ├── store.js        # State management
│   │   ├── utils.js        # Utility functions
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page views
│   │   └── services/       # Business logic
│   ├── data/
│   │   ├── topics.json     # Learning topics data
│   │   └── quizzes.json    # Quiz questions
│   └── assets/
│       └── icons/          # SVG illustrations
├── specs/                  # Project specifications
└── README.md
```

## 🎨 Theme Customization

The app uses CSS custom properties for theming. Edit these variables in `src/css/main.css`:

```css
:root {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --accent: #6366f1;
  /* ... more variables */
}
```

## 📝 License

This project is licensed under the MIT License.

---

Made with ❤️ for AI learners everywhere