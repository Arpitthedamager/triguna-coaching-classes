// import Link from "next/link";
// import ThemeButton from "./components/mainpage/themebutton/ThemeButton";
import TopRankingStudents from "./components/UserDashboardcomponents/onetimeusedcomponents/toprankingstudents/TopRankingStudents";
import AcademicTimeline from "./components/mainpage/academictimeline/AcademicTimeline";
import CallToAction from "./components/mainpage/calltoaction/CallToAction";
import CoachingProcess from "./components/mainpage/coachingprocess/CoachingProcess";
import FeaturesSection from "./components/mainpage/featuressection/FeaturesSection";
import FeedbackSection from "./components/mainpage/feedbacksection/FeedbackSection";
import HeroSection from "./components/mainpage/herosection/HeroSection";
import TeacherSlideshow from "./components/mainpage/teacherslideshow/TeacherSlideshow";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen bg-primary-content">
        {/* <ThemeButton />
        <p className="text-secondary p-20 bg-primarycontent">hi i am a devloper</p>
        <Link href="/notes">link</Link> */}
        <HeroSection/>
        <div className="my-20">
          
        <CallToAction/>
        </div>
        <TopRankingStudents/>
        <FeedbackSection/>
        <FeaturesSection/>
        <TeacherSlideshow/>
        <CoachingProcess/>
        <AcademicTimeline/>
      </div>
    </>
  );
}
