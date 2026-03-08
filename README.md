# Frontend Mentor - Frontend quiz app

# Quiz App - Thomas Sifferle 🚀

![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)
![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)
[![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/TomSif)
[![React](https://img.shields.io/badge/react_19-20232a?style=for-the-badge&logo=react&logocolor=61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-646cff?style=for-the-badge&logo=vite&logocolor=white)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss&logocolor=white)](https://tailwindcss.com/)

<a href="#description-fr-">🇫🇷 README en Français</a> - <a href="#en-description">🇺🇸 English README</a>

![Design preview for the Frontend quiz app coding challenge](/quiz-app/public/images/screen-home.png)

### 🌐 Démo Live :

**[Voir le site en ligne →](https://quiz-app-omega-topaz.vercel.app/)**

Déployé sur Vercel avec HTTPS et optimisations de performance.

---

# Frontend Mentor - Frontend Quiz App Solution

This is a solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark

### Screenshot

![](/quiz-app/public/images/screen-quiz.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/TomSif/Front-end_Mentor_Quiz-App/tree/main)
- Live Site URL: [Add live site URL here](https://quiz-app-omega-topaz.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties via Tailwind CSS v4 `@theme`
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React 19](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework

### What I learned

#### State management architecture

This project reinforced my understanding of React's unidirectional data flow. The `App` component serves as the single source of truth, managing `currentView`, `score`, `subject`, and `mode` states. Child components communicate upward through callback props:

```jsx
const views = {
  home: <Home onStart={() => setCurrentView("quiz")} />,
  quiz: (
    <Quiz
      onFinish={(finalScore) => {
        setScore(finalScore);
        setCurrentView("results");
      }}
    />
  ),
  results: (
    <Results
      score={score}
      onRestart={() => {
        setScore(0);
        setCurrentView("home");
      }}
    />
  ),
};
```

#### Conditional rendering with object maps

Rather than chaining ternary operators or switch statements, I used an object map pattern for cleaner view switching:

```jsx
return <div>{views[currentView]}</div>;
```

#### Tailwind CSS v4 dark mode configuration

Tailwind v4 defaults to `prefers-color-scheme` for dark mode. Since this is a single-page application that manages its own theme (similar to native apps like Discord or Notion), I configured manual toggle control:

```css
/* Dark mode is manually controlled via UI toggle.
   prefers-color-scheme is intentionally ignored —
   the app manages its own theme (native app-like behavior) */
@variant dark (&:where(.dark, .dark *));
```

This tells Tailwind to apply `dark:` utilities when the `.dark` class is present on an ancestor element, rather than relying on system preferences.

#### Custom theme colors with Tailwind v4

I extended Tailwind's default palette with project-specific colors using the new `@theme` directive:

```css
@theme {
  --color-navy: #313e51;
  --color-grey-navy: #3b4d66;
  --color-light-bluish: #abc1e1;
  --color-light-grey: #f4f6fa;
  --color-green: #26d782;
  --color-red: #ee5454;
  --color-purple: #a729f5;
}
```

#### SVG color management with currentColor

For dynamic icon coloring based on theme, I used the `currentColor` approach rather than conditional fill values:

```jsx
<svg className={mode === "dark" ? "text-gray-500" : "text-white"}>
  <path fill="currentColor" d="..." />
</svg>
```

### Continued development

Areas I want to focus on in future projects:

- **TypeScript integration**: Adding static typing to improve code reliability and developer experience
- **Component composition patterns**: Exploring more advanced patterns like compound components and render props
- **Accessibility testing**: Implementing automated a11y testing with tools like axe-core
- **Animation**: Adding micro-interactions with Framer Motion or CSS animations
- **State persistence**: Implementing localStorage to save quiz progress and theme preference

### Useful resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs) - Essential for understanding the new `@theme` and `@variant` syntax
- [React Documentation](https://react.dev/) - The new React docs are excellent for understanding hooks and component patterns
- [MDN Web Docs](https://developer.mozilla.org/) - My go-to reference for CSS and JavaScript fundamentals

### AI Collaboration

This project was developed with AI assistance from **Claude** (Anthropic), used as a learning companion and technical mentor.

**How I used AI:**

- **Architectural decisions**: Discussed state management patterns, component hierarchy, and data flow before writing code
- **Debugging**: Worked through syntax errors and logical issues, particularly around callback props and the ternary operator
- **Learning concepts**: Deepened understanding of JavaScript closures, React's rendering model, and Tailwind v4's new configuration syntax
- **Code review**: Got feedback on code structure and naming conventions

**What worked well:**

- Using AI as a "rubber duck" to think through architectural decisions before implementation
- Getting immediate explanations when encountering unfamiliar patterns
- Having concepts explained in multiple ways until they clicked

**What I learned about AI collaboration:**

- AI is most useful when you come with specific questions rather than vague requests
- Writing code yourself (even while looking at examples) builds muscle memory that copy-pasting doesn't
- It's valuable to challenge AI explanations and ask "why" to ensure genuine understanding

## Author

- Website - [Thomas Sifferle](https://thomas-sifferle.com)
- Frontend Mentor - [@TomSif](https://www.frontendmentor.io/profile/TomSif)
