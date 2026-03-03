function Home() {
  return (
    <div className="flex flex-col text-left gap-4 ">
      <h1 className="text-preset-2-mobile-light md:text-preset-2-light text-blue-900">
        Welcome to the
        <br />
        <strong className="text-preset-2-mobile md:text-preset-2">
          Frontend Quiz!
        </strong>
      </h1>
      <p className="text-preset-5-mobile md:text-preset-6 text-grey-500 ">
        Pick a subject to get started.
      </p>
    </div>
  );
}

export default Home;
