"use client";
import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";  // Import the NextAuth session hook
import Sidebar from "../components/UserDashboardcomponents/reused/sidebar/Sidebar";
import Header from "../components/UserDashboardcomponents/reused/header/Header";
import StatisticsGraph from "../components/UserDashboardcomponents/main/statisticsgraph/StatisticsGraph";
import CircularProgress from "../components/UserDashboardcomponents/main/circularprogress/CircularProgress";
import Calendar from "../components/UserDashboardcomponents/reused/calendar/Calendar";
import NoticeBoard from "../components/UserDashboardcomponents/reused/noticeboard/NoticeBoard";
import StatCard from "../components/UserDashboardcomponents/main/statcard/StatCard";
import DatabaseTable from "../components/UserDashboardcomponents/main/databasetable/DatabaseTable";
import { motion } from "framer-motion";
import StudyMaterial from "../components/UserDashboardcomponents/links/study-materials/Study-Materials";
import Profile from "../components/UserDashboardcomponents/links/profile/Profile";
import { FaCalendarAlt, FaBell } from "react-icons/fa";
import Results from "../components/UserDashboardcomponents/links/results/Results";
import Exams from "../components/UserDashboardcomponents/links/exams/Exams";
import Fees from "../components/UserDashboardcomponents/links/fees/Fees";
// import { useRouter } from "next/navigation";
import Link from "next/link";

const UserDashboard = () => {
  // const { data: session, status } = useSession();  // Use NextAuth's session hook to get session data
  const [activeContent, setActiveContent] = useState("dashboard");
  const [modalContent, setModalContent] = useState<"calendar" | "notice" | null>(null);
  // const router = useRouter();

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };

  // useEffect(() => {
  //   // If not logged in, redirect to the sign-in page
  //   if (status === "loading") return; // Wait until session is loaded
  //   if (!session) {
  //     router.push("/signin");
  //   } else if (session.user.role !== "student") {
  //     // If user is not a student, show a message and redirect
  //     setActiveContent("notStudent");
  //   }
  // }, [session, status, router]);

  const renderContent = () => {
    if (activeContent === "dashboard") {
      return (
        <motion.div
          key="dashboard"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <Header />
          <div className="grid grid-cols-4 gap-4">
            <StatCard title="Total Students" value="220" bgColor="bg-blue-200" />
            <StatCard title="Total Books" value="120" bgColor="bg-red-200" />
            <StatCard title="Total Notes" value="15" bgColor="bg-green-200" />
            <StatCard title="Total Test" value="100" bgColor="bg-yellow-200" />
          </div>
          <div className="flex gap-4 mt-6">
            <div className="flex-1">
              <StatisticsGraph />
            </div>
            <div className="flex-none">
              <CircularProgress percentage={75} />
            </div>
          </div>
          <div className="mt-8">
            <DatabaseTable />
          </div>
        </motion.div>
      );
    } else if (activeContent === "notStudent") {
      return (
        <motion.div
          key="notStudent"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <h2 className="text-xl font-semibold text-red-500">You are not a student!</h2>
          <p>If you are an admin or another type of user, please use the respective dashboard.</p>
          <p>
            <Link href="/" className="text-blue-500 hover:text-blue-700">Go to the main page</Link>
          </p>
        </motion.div>
      );
    } else if (activeContent === "studyMaterials") {
      return (
        <motion.div
          key="studyMaterials"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <StudyMaterial />
        </motion.div>
      );
    } else if (activeContent === "profile") {
      return (
        <motion.div
          key="profile"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <Profile />
        </motion.div>
      );
    } else if (activeContent === "results") {
      return (
        <motion.div
          key="results"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <Results />
        </motion.div>
      );
    } else if (activeContent === "exams") {
      return (
        <motion.div
          key="exams"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <Exams />
        </motion.div>
      );
    } else if (activeContent === "fees") {
      return (
        <motion.div
          key="fees"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <Fees />
        </motion.div>
      );
    }
  };

  if (status === "loading") return <div>Loading...</div>; // Show loading while session is being fetched

  return (
    <div className="flex overflow-x-hidden bg-primary-content">
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar onMenuClick={setActiveContent} />
      </div>
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <div className="flex justify-end space-x-4 p-4 lg:hidden">
          <button
            onClick={() => setModalContent("calendar")}
            className="text-primary hover:text-primary-focus"
          >
            <FaCalendarAlt size={24} />
          </button>
          <button
            onClick={() => setModalContent("notice")}
            className="text-primary hover:text-primary-focus"
          >
            <FaBell size={24} />
          </button>
        </div>

        <main className="p-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">{renderContent()}</div>
          <div className="hidden lg:block space-y-6">
            <Calendar />
            <NoticeBoard />
          </div>
        </main>

        {modalContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-lg">
              <button
                onClick={() => setModalContent(null)}
                className="text-primary mb-4 hover:text-primary-focus"
              >
                Close
              </button>
              {modalContent === "calendar" && <Calendar />}
              {modalContent === "notice" && <NoticeBoard />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
