import Footer from "../../mainpage/footer/Footer";
import Hero from "../hero/hero";
import Hero1 from "../hero1/Hero1";
import Top from "../top/Top";

export default function Main() {
  return (
    <>
      <div className="bg-primary-content">
        <Top/>
        <Hero />
        <Hero1/>
        <Footer/>
      </div>
    </>
  );
}
