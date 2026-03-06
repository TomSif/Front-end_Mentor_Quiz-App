function SubjectBadge({ subject, icon }) {
  return (
    <div className="flex ">
      <img src={icon} alt="" />
      <p>{subject}</p>
    </div>
  );
}

export default SubjectBadge;
