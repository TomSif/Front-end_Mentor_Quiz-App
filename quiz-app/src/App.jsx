import { useState } from "react";
import "./App.css";
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
        onStart={(chosenSubject) => {
          setSubject(chosenSubject);
          setCurrentView("quiz");
        }}
      />
    ),
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

  return (
    <>
      <Header mode={mode} onToggleMode={toggleMode} subject={subject} />
      <div>{views[currentView]}</div>
    </>
  );
}

export default App;
