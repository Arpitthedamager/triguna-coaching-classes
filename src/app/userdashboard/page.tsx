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
import { FaCalendarAlt, FaBell } from "react-icons/fa";
import Link from "next/link";
import StudyMaterial from "../components/UserDashboardcomponents/links/study-materials/Study-Materials";
import Results from "../components/UserDashboardcomponents/links/results/Results";
import Exams from "../components/UserDashboardcomponents/links/exams/Exams";
import Fees from "../components/UserDashboardcomponents/links/fees/Fees";
import ProfileLink from "../components/UserDashboardcomponents/links/profilelink/ProfileLink";
import Head from "next/head";

const UserDashboard = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [modalContent, setModalContent] = useState<
    "calendar" | "notice" | null
  >(null);

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, type: "spring" },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };

  // useEffect(() => {
  //   if (status === "loading") return;
  //   if (!session) {
  //     router.push("/signin");
  //   }
  // }, [session, status, router]);

  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return (
          <motion.div
            key="dashboard"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
          >
            <div className="hidden lg:block">
              <Header />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Students"
                value="220"
                bgColor="bg-blue-200"
              />
              <StatCard title="Total Books" value="120" bgColor="bg-red-200" />
              <StatCard title="Total Notes" value="15" bgColor="bg-green-200" />
              <StatCard
                title="Total Tests"
                value="100"
                bgColor="bg-yellow-200"
              />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <StatisticsGraph />
              </div>
              <div className="flex justify-center items-center w-full max-h-72">
                <CircularProgress />
              </div>
            </div>
            <div className="mt-8">
              <DatabaseTable />
            </div>
          </motion.div>
        );
      case "studyMaterials":
        return <StudyMaterial />;
      case "profile":
        return <ProfileLink />;
      case "results":
        return <Results />;
      case "exams":
        return <Exams />;
      case "fees":
        return <Fees />;
      default:
        return (
          <motion.div
            key="notStudent"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
          >
            <h2 className="text-xl font-semibold text-red-500">
              You are not a student!
            </h2>
            <p>
              Please use the appropriate dashboard for your role.
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                Go to the main page
              </Link>
            </p>
          </motion.div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>
          {activeContent === "dashboard" ? "User Dashboard" : activeContent} -
          UserDashbord-Triguna Coaching Classes
        </title>
        <meta
          name="description"
          content={`Access ${activeContent} details, notifications, and statistics for your class at Triguna Coaching Classes.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row bg-primary-content">
        <div className="md:sticky block top-0 left-0 h-full lg:w-64 z-10">
          <Sidebar onMenuClick={setActiveContent} />
        </div>
        <div className="flex-1 p-4 md:p-0 space-y-6">
          <div className="sticky flex justify-end space-x-4 md:sticky lg:hidden">
            {activeContent === "dashboard" && <Header />}

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
          <main className="md:p-6 pt-0 mt-0 min-h-screen overflow-auto flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3 space-y-6">{renderContent()}</div>
            <div className="hidden md:hidden lg:block lg:w-1/3 space-y-6">
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
    </>
  );
};

export default UserDashboard;
