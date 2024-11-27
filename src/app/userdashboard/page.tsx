"use client";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import StatisticsGraph from "../components/statisticsgraph/StatisticsGraph";
import CircularProgress from "../components/circularprogress/CircularProgress";
import Calendar from "../components/calendar/Calendar";
import NoticeBoard from "../components/noticeboard/NoticeBoard";
import StatCard from "../components/statcard/StatCard";

const userdashboard = () => {
  return (
    <div className="flex bg-primary-content">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <main className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
        <Header />
            <div className="grid grid-cols-4 gap-4">
              <StatCard title="Total Students" value="1220" bgColor="bg-blue-500" />
              <StatCard title="Total Teachers" value="120" bgColor="bg-red-500" />
              <StatCard title="Total Courses" value="15" bgColor="bg-green-500" />
              <StatCard title="Faculty Room" value="100" bgColor="bg-yellow-500" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <StatisticsGraph />
              </div>
              <div className="flex-none">
                <CircularProgress percentage={75} />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Calendar />
            <NoticeBoard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default userdashboard;
