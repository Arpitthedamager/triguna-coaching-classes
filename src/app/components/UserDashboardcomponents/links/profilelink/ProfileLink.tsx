"use client";

import CircularProgress from "../../main/circularprogress/CircularProgress";
import StatisticsGraph from "../../main/statisticsgraph/StatisticsGraph";
import Header from "../../reused/header/Header";
import Profile from "../../onetimeused/profile/Profile";
// import AttendanceCalendar from "../../onetimeused/attendancecalendar/AttendanceCalendar";
interface AttendanceData {
  [date: string]: ("present" | "absent" | null)[] | undefined;
}
const ProfileLink: React.FC = () => {
  const attendanceData = {
    "2024-12-01": ["present", "absent", null],
    "2024-12-02": ["present", "present", "present"],
    "2024-12-03": [null, "absent", null],
    "2024-12-04": ["absent", null, "present"],
    "2024-12-05": ["present", "present", null],
  } as AttendanceData; // Add this type assertion
  
  

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
        <div className="flex-none"> 
        {/* <AttendanceCalendar attendanceData={attendanceData} /> */}
        </div>
      </main>
    </>
  );
};

export default ProfileLink;
