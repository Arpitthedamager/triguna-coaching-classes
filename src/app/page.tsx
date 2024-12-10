// import Link from "next/link";
import ThemeButton from "./components/mainpage/themebutton/ThemeButton";
import TopRankingStudents from "./components/UserDashboardcomponents/onetimeusedcomponents/toprankingstudents/TopRankingStudents";
import Banner from "./components/mainpage/Banner/Banner";
import AcademicTimeline from "./components/mainpage/academictimeline/AcademicTimeline";
import CallToAction from "./components/mainpage/calltoaction/CallToAction";
import CoachingProcess from "./components/mainpage/coachingprocess/CoachingProcess";
import FAQs from "./components/mainpage/faqs/FAQs";
import FeaturesSection from "./components/mainpage/featuressection/FeaturesSection";
import FeedbackSection from "./components/mainpage/feedbacksection/FeedbackSection";
import Footer from "./components/mainpage/footer/Footer";
import Game from "./components/mainpage/game/Game";
import HeroSection from "./components/mainpage/herosection/HeroSection";
import MapComponent from "./components/mainpage/mapcomponent/MapComponent";
import TeacherSlideshow from "./components/mainpage/teacherslideshow/TeacherSlideshow";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen bg-primary-content">
        {/* <ThemeButton /> */}
        {/* <p className="text-secondary p-20 bg-primarycontent">hi i am a devloper</p>
        <Link href="/notes">link</Link> */}
        <HeroSection />
        <div className="my-20">
          <Banner/>
          {/* <CallToAction /> */}
        </div>
        <TopRankingStudents />
        <FeedbackSection />
        <FeaturesSection />
        <div className="overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 w-full mt-10 md:mt-0">
              <TeacherSlideshow />
            </div>
            <div className="md:w-1/2 w-full">
              <Game />
            </div>
          </div>
        </div>{" "}
        <CoachingProcess />
        <AcademicTimeline />
        <FAQs/>
        <MapComponent />
        <Footer/>
      </div>
    </>
  );
}
