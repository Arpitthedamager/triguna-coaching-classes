"use client";
import Footer from "../../mainpage/footer/Footer";
import StudyMaterial from "../studymat/studymat";
import TestPapers from "../testpapers/TestPapers";
import Top from "../top/Top";


export default function Main() {
  return (
    <>
      <div className="bg-primary-content">
        <Top/>
        <TestPapers/>
        <StudyMaterial />
        <Footer/>
      </div>
    </>
  );
}
