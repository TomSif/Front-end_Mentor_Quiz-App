import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState("light");
  const [subject, setSubject] = useState(null);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.classList.toggle("dark");
  };

  const views = {
    home: (
      <Home
        mode={mode}
        onStart={(chosenSubject) => {
          setSubject(chosenSubject);
          setCurrentView("quiz");
        }}
      />
    ),
    quiz: (
      <Quiz
        subject={subject}
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

  return (
    <div className="relative w-auto overflow-hidden py-4 px-8 transition-all duration-300 dark:bg-blue-900 bg-grey-50">
      <picture className="absolute top-0 left-0 z-0 transition-all duration-300">
        <source
          srcSet={
            mode === "dark"
              ? "/images/pattern-background-desktop-dark.svg"
              : "/images/pattern-background-desktop-light.svg"
          }
          media="(min-width: 1024px)"
        />
        <source
          srcSet={
            mode === "dark"
              ? "/images/pattern-background-tablet-dark.svg"
              : "/images/pattern-background-tablet-light.svg"
          }
          media="(min-width: 768px)"
        />
        <source
          srcSet={
            mode === "dark"
              ? "/images/pattern-background-mobile-dark.svg"
              : "/images/pattern-background-mobile-light.svg"
          }
          media="(min-width: 480px)"
        />
        <img src="/images/pattern-background-mobile-light.svg" alt="" />
      </picture>
      <div className="z-20 flex flex-col w-auto">
        <Header mode={mode} onToggleMode={toggleMode} subject={subject} />
        <div className="z-20">{views[currentView]}</div>
      </div>
    </div>
  );
}

export default App;
