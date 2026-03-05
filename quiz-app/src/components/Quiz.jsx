import data from "../data.json";
import { useState } from "react";

function Quiz({ subject }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuiz = data.quizzes.find((quiz) => quiz.title === subject);
  const currentQuestion = currentQuiz.questions[questionIndex];
  const totalQuestions = currentQuiz.questions.length; // 10
  const iconLetters = ["A", "B", "C", "D"];

  return (
    <div className="flex flex-col lg:flex-row w-full lg:justify-between">
      <div className="flex flex-col">
        <p className="text-preset-5-mobile text-grey-500 dark:text-blue-300">
          {questionIndex + 1} out of {totalQuestions}
        </p>
        <p className="text-preset-3-mobile text-blue-900 dark:text-white">
          {currentQuestion.question}
        </p>
      </div>
      <ul className="flex flex-col gap-4">
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button className="flex gap-4 md:gap-8 p-4 items-center w-full max-w-81 md:max-w-160 lg:max-w-141 rounded-lg text-blue-900 dark:bg-blue-850 dark:text-white bg-white text-preset-4-mobile md:text-preset-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-md bg-grey-50 text-grey-500 ">
                {iconLetters[index]}
              </span>
              <span className="dark:text-white text-blue-900">{option}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;
