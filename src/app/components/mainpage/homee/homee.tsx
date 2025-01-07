"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "../herosection/HeroSection";
import Banner from "../Banner/Banner";
import FeedbackSection from "../feedbacksection/FeedbackSection";
import FeaturesSection from "../coachingprocess/CoachingProcess";
import TeacherSlideshow from "../teacherslideshow/TeacherSlideshow";
import AcademicTimeline from "../academictimeline/AcademicTimeline";
import FAQs from "../faqs/FAQs";
import MapComponent from "../mapcomponent/MapComponent";
import Footer from "../footer/Footer";
import CoachingProcess from "../coachingprocess/CoachingProcess";

export default function HomePageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user?.role === "student") {
        router.push("/userdashboard");
      } else if (session.user?.role === "teacher") {
        router.push("/admindashboard");
      }
    }
  }, [status, session, router]);

  return (
    <div className="min-h-screen bg-primary-content">
      <HeroSection />
      <div className="my-20">
        <Banner />
      </div>
      <FeedbackSection />
      <FeaturesSection />
      <div className="overflow-hidden">
        <TeacherSlideshow />
      </div>
      <CoachingProcess />
      <AcademicTimeline />
      <FAQs />
      <MapComponent />
      <Footer />
    </div>
  );
}
