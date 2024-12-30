"use client";

import ContactForm from "../components/contect/form/Form";
import HeaderSection from "../components/contect/hero/Hero";
import TeacherContactCard from "../components/contect/teachercard/TeacherCard";
// import Hero from "../components/contect/hero/Hero";


export default function ContactUs() {
  return (
    <div className="min-h-screen bg-primary-content py-10 px-4 sm:px-6 lg:px-8">
      <HeaderSection />
          <TeacherContactCard />
      <ContactForm />
    </div>
  );
}
