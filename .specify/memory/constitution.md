# GenAI-tutor Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. Educational Clarity (NON-NEGOTIABLE)
All content and interactions MUST prioritize student understanding. Explanations MUST be clear, jargon-free, and scaffolded appropriately for the learner's level. Complex concepts MUST be broken into digestible steps with visual aids where possible. Feedback MUST be constructive and guide learners toward mastery.

### II. Student-First Experience (NON-NEGOTIABLE)
The learner is the primary focus of all design decisions. The interface MUST minimize cognitive load, provide clear progress indicators, and adapt to individual learning needs. Accessibility MUST be built-in from the start - all features MUST be usable by students with diverse abilities. Student data and privacy MUST be protected rigorously.

### III. Clean Architecture
All code MUST be clean, readable, and maintainable. HTML structure MUST be semantic and well-organized. JavaScript MUST follow vanilla JS best practices without unnecessary dependencies. Code MUST be modular with clear separation of concerns. Comments and documentation MUST explain the "why", not just the "what".

### IV. Mobile-First Responsive Design
The interface MUST be designed for mobile devices first, then enhanced for larger screens. All learning features MUST function seamlessly on touch devices. Layouts MUST adapt fluidly across screen sizes. Performance MUST be optimized for varying network conditions and device capabilities.

### V. Progressive Enhancement
Core functionality MUST work without JavaScript enabled. Enhanced features MUST build upon solid foundations. Fallback experiences MUST be graceful and still provide educational value.

## Technology Standards

### Frontend Architecture
- **HTML**: Semantic HTML5 with proper document structure, ARIA labels for accessibility
- **CSS**: Mobile-first responsive design, CSS custom properties for theming, minimal footprint
- **JavaScript**: Vanilla ES6+ only, no framework dependencies, modular pattern (IIFE/modules)
- **Performance**: Target <3s initial load on 3G, lazy loading for non-critical resources

### Code Quality
- All code MUST pass W3C validation for HTML
- JavaScript MUST use strict mode
- Console MUST be free of errors in production
- All interactive elements MUST be keyboard accessible

## Development Workflow

### Design Review
- All UI changes MUST be reviewed for educational clarity
- Student usability testing REQUIRED before major feature releases
- Accessibility audit REQUIRED for each new feature

### Testing Requirements
- Manual testing on mobile devices REQUIRED
- Keyboard navigation testing REQUIRED
- Screen reader compatibility testing REQUIRED

## Governance

This constitution supersedes all other practices. Amendments require:
1. Documentation of the proposed change
2. Rationale explaining how it improves student experience or code quality
3. Review and approval from at least one maintainer

All features MUST verify compliance with these principles before merge.

**Version**: 1.0.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-07-17
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
