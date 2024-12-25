import Beliefs from "../components/about/beliefs/Beliefs";
import Hero from "../components/about/hero/Hero";
import OurHistory from "../components/about/ourhistory/OurHistory";
import Statement from "../components/about/statement/Statement";
import Footer from "../components/mainpage/footer/Footer";
import TeacherSlideshow from "../components/mainpage/teacherslideshow/TeacherSlideshow";

export default function About() {
    return (
        <div>
      <Hero/>
      <Statement/>
      <Beliefs/>
      <TeacherSlideshow/>
      <OurHistory/>
      <Footer/>
        </div>
    );
}
