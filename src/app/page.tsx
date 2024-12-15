'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
// import ThemeButton from "./components/mainpage/themebutton/ThemeButton"
import TopRankingStudents from "./components/UserDashboardcomponents/onetimeusedcomponents/toprankingstudents/TopRankingStudents"
import Banner from "./components/mainpage/Banner/Banner"
import AcademicTimeline from "./components/mainpage/academictimeline/AcademicTimeline"
// import CallToAction from "./components/mainpage/calltoaction/CallToAction"
import CoachingProcess from "./components/mainpage/coachingprocess/CoachingProcess"
import FAQs from "./components/mainpage/faqs/FAQs"
import FeaturesSection from "./components/mainpage/featuressection/FeaturesSection"
import FeedbackSection from "./components/mainpage/feedbacksection/FeedbackSection"
import Footer from "./components/mainpage/footer/Footer"
import Game from "./components/mainpage/game/Game"
import HeroSection from "./components/mainpage/herosection/HeroSection"
import MapComponent from "./components/mainpage/mapcomponent/MapComponent"
import TeacherSlideshow from "./components/mainpage/teacherslideshow/TeacherSlideshow"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Check if the session is loaded and user data is available
    if (status === "authenticated") {
      // Redirect based on the user's role
      if (session.user?.role === "student") {
        router.push("/userdashboard")
      } else if (session.user?.role === "teacher") {
        router.push("/admindashboard")
      }
    }
  }, [status, session, router])

  return (
    <div className="min-h-screen bg-primary-content">
      <HeroSection />
      <div className="my-20">
        <Banner />
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
      </div>
      <CoachingProcess />
      <AcademicTimeline />
      <FAQs />
      <MapComponent />
      <Footer />
    </div>
  )
}
