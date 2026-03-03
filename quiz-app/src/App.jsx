import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [score, setScore] = useState(0);

  const views = {
    home: (
      <Home
        onStart={() => {
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

  return <div>{views[currentView]}</div>;
}

export default App;
