"use client";

import { useState } from "react";
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
import Students from "../components/UserDashboardcomponents/links/students/Students";

const UserDashboard = () => {
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
    }else if (activeContent === "students") {
      return (
        <motion.div
          key="students"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={contentVariants}
        >
          <Students />
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

        {/* Modal */}
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
