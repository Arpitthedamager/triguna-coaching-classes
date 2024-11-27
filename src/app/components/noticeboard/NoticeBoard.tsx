const NoticeBoard = () => {
    const notices = [
      { title: "Special Examination", author: "Justin Langer" },
      { title: "Semester Admission", author: "Danial Vatory" },
      { title: "COVID-19 Vaccination", author: "Jacob Oram" },
    ];
  
    return (
      <div className="card bg-base-100 shadow-lg p-4">
        <h2 className="card-title">Notice Board</h2>
        <ul className="menu">
          {notices.map((notice, index) => (
            <li key={index}>
              <a>
                <span>{notice.title}</span>
                <span className="text-sm text-gray-500">
                  By {notice.author}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default NoticeBoard;
  