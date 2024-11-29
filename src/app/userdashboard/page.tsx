"use client";

import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";
import StatisticsGraph from "../components/statisticsgraph/StatisticsGraph";
import CircularProgress from "../components/circularprogress/CircularProgress";
import Calendar from "../components/calendar/Calendar";
import NoticeBoard from "../components/noticeboard/NoticeBoard";
import StatCard from "../components/statcard/StatCard";
import DatabaseTable from "../components/databasetable/DatabaseTable";
import { motion } from "framer-motion";
import StudyMaterial from "../components/study-materials/Study-Materials";

const UserDashboard = () => {
  const [activeContent, setActiveContent] = useState("dashboard"); // State for selected content

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Define content based on state
  const renderContent = () => {
    if (activeContent === "dashboard") {
      return (
        <motion.div
          key="dashboard"
          initial="hidden"
          animate="visible"
          exit="hidden"
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
          <DatabaseTable />
        </motion.div>
      );
    } else if (activeContent === "studyMaterials") {
      return (
        <motion.div
          key="studyMaterials"
          initial="hidden"
          animate="visible"
          exit="hidden"
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
      <div className="flex-1 flex flex-col ml-64">
        <main className="p-6 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">{renderContent()}</div>
          <div className="space-y-6">
            <Calendar />
            <NoticeBoard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
