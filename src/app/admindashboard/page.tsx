"use client";
import { useEffect, useState } from "react";
import Sidebar from "../components/AdminDashboardcomponents/reused/sidebar/Sidebar";
import Header from "../components/AdminDashboardcomponents/reused/header/Header";
import StatisticsGraph from "../components/AdminDashboardcomponents/main/statisticsgraph/StatisticsGraph";
import CircularProgress from "../components/AdminDashboardcomponents/main/circularprogress/CircularProgress";
import Calendar from "../components/AdminDashboardcomponents/reused/calendar/Calendar";
import NoticeBoard from "../components/AdminDashboardcomponents/reused/noticeboard/NoticeBoard";
import StatCard from "../components/AdminDashboardcomponents/main/statcard/StatCard";
import DatabaseTable from "../components/AdminDashboardcomponents/main/databasetable/DatabaseTable";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaBell } from "react-icons/fa";
import Profile from "../components/AdminDashboardcomponents/links/profilelink/ProfileLinks";
import Exams from "../components/AdminDashboardcomponents/links/exams/Exams";
import Fees from "../components/AdminDashboardcomponents/links/fees/Fees";
import Results from "../components/AdminDashboardcomponents/links/results/Results";
import StudyMaterial from "../components/AdminDashboardcomponents/links/study-materials/Study-Materials";
import MStudents from "../components/AdminDashboardcomponents/links/mstudents/MStudents";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const AdminDashboard = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [modalContent, setModalContent] = useState<"calendar" | "notice" | null>(null);

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring" } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } },
  };
 const { data: session, status } = useSession(); // Get session data and status
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait until session is loaded

    if (!session) {
      // Redirect to home if no session (user is not logged in)
      router.push("/");
    } else {
      // Check if user is logged in and redirect based on their role
      if (session.user?.role !== "teacher") {
        router.push("/"); // Redirect non-admin users to the homepage or another page
      }
    }
  }, [session, status, router]);
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
              <StatCard title="Total Users" value="500" bgColor="bg-blue-200" />
              <StatCard title="Pending Fees" value="$200" bgColor="bg-red-200" />
              <StatCard title="Active Exams" value="8" bgColor="bg-green-200" />
              <StatCard title="Total Notices" value="25" bgColor="bg-yellow-200" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <StatisticsGraph />
              </div>
              <div className="flex w-full max-h-72">
                <CircularProgress />
              </div>
            </div>
            <div className="mt-8">
              <DatabaseTable />
            </div>
          </motion.div>
        );
      case "profile":
        return <Profile />;
      case "exams":
        return <Exams />;
      case "fees":
        return <Fees />;
      case "results":
        return <Results />;
      case "studyMaterials":
        return <StudyMaterial />;
        case "students":
        return <MStudents />;
      default:
        return null;
    }
  };

  return (
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
  );
};

export default AdminDashboard;
