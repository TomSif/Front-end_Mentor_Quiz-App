import data from "../data.json";

function Home({ onStart }) {
  const iconColors = [
    "bg-orange-50",
    "bg-blue-50",
    "bg-green-100",
    "bg-purple-100",
  ];

  return (
    <div className="relative  w-full md:max-w-160 pt-8 md:pt-12">
      <div className="flex flex-col text-left gap-4 z-10">
        <h1 className="text-preset-2-mobile-light md:text-preset-2-light transition-all duration-200 dark:text-white text-blue-900">
          Welcome to the
          <br />
          <strong className="text-preset-2-mobile md:text-preset-2">
            Frontend Quiz!
          </strong>
        </h1>
        <p className="text-preset-5-mobile md:text-preset-6  dark:text-blue-300 text-grey-500">
          Pick a subject to get started.
        </p>
        <div>
          <ul className="flex flex-col gap-4 w-full md:max-w-160">
            {data.quizzes.map(({ title, icon }, index) => (
              <li key={index}>
                <button
                  onClick={() => onStart(title, icon)}
                  className="flex gap-4 p-4 items-center text-preset-4-mobile w-full  rounded-lg text-blue-900 dark:bg-blue-850 dark:text-white bg-white"
                >
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-md ${iconColors[index]}`}
                  >
                    <img className="w-7 h-7" src={icon} alt="" />
                  </span>
                  <span>{title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
