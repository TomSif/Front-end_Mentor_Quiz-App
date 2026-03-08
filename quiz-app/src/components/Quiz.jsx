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
  const length =
    totalQuestions > 0 ? ((questionIndex + 1) / totalQuestions) * 100 : 0;
  function calculateScore() {
    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (hasSubmited && questionIndex === totalQuestions - 1) {
      onFinish(score, totalQuestions);
    }
  }, [hasSubmited, onFinish, score, questionIndex, totalQuestions]);

  return (
    <fieldset className="flex flex-col lg:flex-row w-full lg:justify-between gap-10  ">
      <div className="flex flex-col md:max-w-160 lg:w-120">
        <legend className="text-preset-5-mobile text-grey-500 dark:text-blue-300">
          {questionIndex + 1} out of {totalQuestions}
        </legend>
        <p className="text-preset-3-mobile text-blue-900 dark:text-white">
          {currentQuestion.question}
        </p>
        <div className="bg-white dark:blue-850 rounded-md h-4 p-1 w-full flex item-center mt-6 md:mt-10 lg:mt-46 ">
          <div
            className="relative rounded-md  z-50  bg-purple-600 h-2 "
            style={{ width: `${length}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col items-center  w-full md:max-w-160 lg:max-w-141 gap-4 md:gap-8">
        <ul className="flex flex-col gap-4 md:gap-6 w-full  ">
          {currentQuestion.options.map((option, index) => (
            <li key={index}>
              <button
                disabled={hasSubmited}
                onClick={() => {
                  setSelectedAnswer(option);
                }}
                className={`flex  gap-4 md:gap-8 p-4 items-center w-full  min-w-full rounded-lg text-blue-900 dark:bg-blue-850 dark:text-white bg-white text-preset-4-mobile md:text-preset-4 ${
                  selectedAnswer === option && !hasSubmited
                    ? "border-purple-500 border-2"
                    : hasSubmited && option === currentQuestion.answer
                      ? "border-green-500 border-2"
                      : hasSubmited && selectedAnswer === option
                        ? "border-red-500 border-2"
                        : "border-2 border-transparent"
                }`}
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-md bg-grey-50 text-grey-500 ">
                  {iconLetters[index]}
                </span>
                <span className="flex justify-between w-full item-center">
                  <span className="dark:text-white text-blue-900">
                    {option}
                  </span>
                  {hasSubmited && option === currentQuestion.answer ? (
                    <span className="w-6">
                      <img src="/images/icon-correct.svg" alt="" />
                    </span>
                  ) : hasSubmited && selectedAnswer === option ? (
                    <span className="w-6">
                      <img src="/images/icon-incorrect.svg" alt="" />
                    </span>
                  ) : (
                    <span className="w-6"></span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          disabled={selectedAnswer === null}
          onClick={() => {
            if (!hasSubmited) {
              //first click
              setHasSubmited(true);
              calculateScore(selectedAnswer);
            } else {
              //second click
              if (questionIndex !== totalQuestions - 1) {
                setQuestionIndex((prev) => prev + 1);
                setSelectedAnswer(null);
                setHasSubmited(false);
              }
            }
          }}
          className="bg-purple-600 w-full p-4 md:p-8 text-white rounded-lg hover:bg-purple-50 text-preset-4-mobile md:text-preset-4"
        >
          {!hasSubmited
            ? "Submit Answer"
            : questionIndex !== totalQuestions - 1
              ? "Next Question "
              : "See Results"}
        </button>
      </div>
    </fieldset>
  );
}

export default Quiz;
