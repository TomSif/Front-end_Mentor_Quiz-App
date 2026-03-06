import SubjectBadge from "./SubjectBadge";

function Results({ score, length, onRestart, subject, icon }) {
  return (
    <div className="flex flex-col lg:flex-row pt-8 md:pt-12 lg:pt-21 items-center gap:10 md:gap-16 lg:gap-36 w-full">
      <div className="flex flex-col text-left gap-2 text-blue-900 dark:text-white">
        <p className="text-preset-2-mobile-light md:text-preset-2-light">
          Quiz completed
        </p>
        <p className="text-preset-2-mobile md:text-preset-2">You scored...</p>
      </div>
      <div className="flex flex-col items-center p-8 gap-4 bg-white dark:bg-blue-850 text-blue-900 dark:text-white rounded-lg">
        <SubjectBadge subject={subject} icon={icon}></SubjectBadge>
        <div className="flex flex-col items-center gap-8 md:gap-10">
          <p className="text-preset-1-mobile md:text-preset-1">{score}</p>
          <p className="text-preset-4-mobile md:text-preset-4 text-grey-500">
            {length}
          </p>
        </div>
        <button
          onClick={() => onRestart()}
          className="bg-purple-600 w-full p-4 md:p-8 text-white rounded-lg hover:bg-purple-50 text-preset-4-mobile md:text-preset-4"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Results;
