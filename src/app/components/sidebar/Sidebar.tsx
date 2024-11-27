import { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <aside className="w-64 bg-base-100 shadow-lg h-screen flex flex-col justify-between">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary">Education Dashboard</h2>
        <ul className="menu p-4">
          <li className="text-purple-600 font-semibold">
            <a>Dashboard</a>
          </li>
          <li><a>Overview</a></li>
          <li><a>Courses</a></li>
          <li><a>Students</a></li>
          <li><a>Teachers</a></li>
          <li><a>Exams</a></li>
          <li><a>Results</a></li>
          <li><a>Videos</a></li>
        </ul>
      </div>
      <div className="p-4 bg-base-200 text-center">
        <div className="flex flex-col items-center">
          <img
            src="/invite-illustration.png"
            alt="Invite"
            className="w-20 h-20"
          />
          <button className="btn btn-primary mt-4">Invite Friend</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
