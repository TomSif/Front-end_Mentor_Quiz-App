import data from "../data.json";
import { useState, useEffect } from "react";

function Quiz({ subject, onFinish }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmited, setHasSubmited] = useState(false);
  const [score, setScore] = useState(0);
  const currentQuiz = data.quizzes.find((quiz) => quiz.title === subject);
  const currentQuestion = currentQuiz.questions[questionIndex];
  const totalQuestions = currentQuiz.questions.length; // 10
  const iconLetters = ["A", "B", "C", "D"];

  function calculateScore() {
    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (hasSubmited && questionIndex === totalQuestions - 1) {
      onFinish(score);
      console.log(score);
    }
  }, [hasSubmited, onFinish, score, questionIndex, totalQuestions]);

  return (
    <fieldset className="flex flex-col lg:flex-row w-full lg:justify-between">
      <div className="flex flex-col">
        <legend className="text-preset-5-mobile text-grey-500 dark:text-blue-300">
          {questionIndex + 1} out of {totalQuestions}
        </legend>
        <p className="text-preset-3-mobile text-blue-900 dark:text-white">
          {currentQuestion.question}
        </p>
      </div>
      <div className="flex flex-col items-center max-w-81 md:max-w-160 lg:max-w-141 gap-4 md:gap-8">
        <ul className="flex flex-col gap-4 md:gap-6 w-full ">
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setSelectedAnswer(option);
                  console.log(option);
                }}
                className="flex  gap-4 md:gap-8 p-4 items-center w-full  rounded-lg text-blue-900 dark:bg-blue-850 dark:text-white bg-white text-preset-4-mobile md:text-preset-4"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-md bg-grey-50 text-grey-500 ">
                  {iconLetters[index]}
                </span>
                <span className="dark:text-white text-blue-900">{option}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          disabled={selectedAnswer === null || hasSubmited}
          onClick={() => {
            setHasSubmited(true);
            calculateScore(selectedAnswer);
            if (questionIndex !== totalQuestions - 1) {
              setQuestionIndex((prev) => prev + 1);
              setSelectedAnswer(null);
              setHasSubmited(false);
            }
          }}
          className="bg-purple-600 w-full p-4 md:p-8 text-white rounded-lg hover:bg-purple-50 text-preset-4-mobile md:text-preset-4"
        >
          Submit Answer
        </button>
      </div>
    </fieldset>
  );
}

export default Quiz;
