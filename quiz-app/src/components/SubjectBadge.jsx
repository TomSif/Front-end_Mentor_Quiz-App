function SubjectBadge({ subject, icon }) {
  const bgColors = {
    HTML: "bg-orange-50",
    CSS: "bg-teal-50",
    JavaScript: "bg-yellow-50",
    Accessibility: "bg-purple-50",
  };

  return (
    <div className="relative flex gap-4 p-4 items-center justify-center text-preset-4-mobile w-full  rounded-lg text-blue-900  dark:text-white z-20">
      <span
        className={`flex items-center justify-center min-w-10 h-10 rounded-md ${bgColors[subject]}`}
      >
        <img className="w-7 h-7" src={icon} alt="" />
      </span>
      <p>{subject}</p>
    </div>
  );
}

export default SubjectBadge;
