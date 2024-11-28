const NoticeBoard = () => {
  const notices = [
    {
      title: "Notice of Special Examinations of Semester Spring 2021",
      author: "Justin Langer",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Time Extension Notice of Semester Admission",
      author: "Danial Vatory",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "COVID-19 Vaccination Survey October 2021",
      author: "Jacob Oram",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Scholarship Viva Notice Spring 2021",
      author: "Name",
      image: "https://via.placeholder.com/100",
    },
  ];

  return (
    <div className="card bg-white shadow-lg rounded-lg p-4 mt-8">
      <h2 className="text-xl font-semibold text-SessionContext">Notice Board</h2>
      <ul className="mt-4 space-y-4">
        {notices.map((notice, index) => (
          <li
            key={index}
            className="flex items-center bg-gray-50 p-4 rounded-lg shadow"
          >
            <img
              src={notice.image}
              alt={notice.title}
              className="w-16 h-16 rounded-lg"
            />
            <div className="ml-4">
              <p className="font-semibold text-SessionContext">{notice.title}</p>
              <p className="text-sm text-gray-500">By {notice.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
