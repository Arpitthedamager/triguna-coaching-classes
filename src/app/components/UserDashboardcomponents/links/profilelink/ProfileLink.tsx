"use client";

import CircularProgress from "../../main/circularprogress/CircularProgress";
import StatisticsGraph from "../../main/statisticsgraph/StatisticsGraph";
import Header from "../../reused/header/Header";
import Profile from "../../onetimeused/profile/Profile";
import AttendanceCalendar from "../../onetimeused/attendancecalendar/AttendanceCalendar";

const ProfileLink: React.FC = () => {
  return (
    <>
      <main className="md:p-6 pt-0 mt-0 min-h-screen overflow-autogap-6">
        <Header />
        <Profile />
        <div className="md:flex gap-4">
          <div className="flex-1">
            <StatisticsGraph />
          </div>
          <div className="flex-none pt-10 md:pt-0">
            <CircularProgress />
          </div>
        </div>
        {/* <div className="flex-none"> <AttendanceCalendar/></div> */}
      </main>
    </>
  );
};

export default ProfileLink;
