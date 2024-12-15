"use client";
import { useState } from "react";
import Sidebar from "../components/AdminDashboardcomponents/reused/sidebar/Sidebar";
import Header from "../components/AdminDashboardcomponents/reused/header/Header";
import StatisticsGraph from "../components/AdminDashboardcomponents/main/statisticsgraph/StatisticsGraph";
import CircularProgress from "../components/AdminDashboardcomponents/main/circularprogress/CircularProgress";
import Calendar from "../components/AdminDashboardcomponents/reused/calendar/Calendar";
import NoticeBoard from "../components/AdminDashboardcomponents/reused/noticeboard/NoticeBoard";
import StatCard from "../components/AdminDashboardcomponents/main/statcard/StatCard";
import DatabaseTable from "../components/AdminDashboardcomponents/main/databasetable/DatabaseTable";
import { motion } from "framer-motion";
// import ManageUsers from "../components/AdminDashboardcomponents/links/manage-users/ManageUsers";
// import ManageFees from "../components/AdminDashboardcomponents/links/manage-fees/ManageFees";
import { FaCalendarAlt, FaBell } from "react-icons/fa";
import Profile from "../components/AdminDashboardcomponents/links/profile/Profile";
import Exams from "../components/AdminDashboardcomponents/links/exams/Exams";
import Fees from "../components/AdminDashboardcomponents/links/fees/Fees";
import Results from "../components/AdminDashboardcomponents/links/results/Results";
import StudyMaterial from "../components/AdminDashboardcomponents/links/study-materials/Study-Materials";

const AdminDashboard = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [modalContent, setModalContent] = useState<"calendar" | "notice" | null>(null);

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };

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
            <StatCard title="Total Users" value="500" bgColor="bg-blue-200" />
            <StatCard title="Pending Fees" value="$200" bgColor="bg-red-200" />
            <StatCard title="Active Exams" value="8" bgColor="bg-green-200" />
            <StatCard title="Total Notices" value="25" bgColor="bg-yellow-200" />
          </div>
          <div className="flex gap-4 mt-6">
            <div className="flex-1">
              <StatisticsGraph />
            </div>
            <div className="flex-none">
              <CircularProgress />
            </div>
          </div>
          <div className="mt-8">
            <DatabaseTable />
          </div>
        </motion.div>
      );
    } else if (activeContent === "manageUsers") {
      return (
        <motion.div
          key="manageUsers"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          {/* <ManageUsers /> */}
        </motion.div>
      );
    } else if (activeContent === "manageFees") {
      return (
        <motion.div
          key="manageFees"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          {/* <ManageFees /> */}
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
    }else if (activeContent === "exams") {
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
    }else if (activeContent === "fees") {
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
    }else if (activeContent === "results") {
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
    }else if (activeContent === "study matarials") {
      return (
        <motion.div
          key="study matarials"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <StudyMaterial />
        </motion.div>
      );
    }
  };

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

export default AdminDashboard;
