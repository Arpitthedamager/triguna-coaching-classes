import { Metadata } from "next";
import Beliefs from "../components/about/beliefs/Beliefs";
import Hero from "../components/about/hero/Hero";
import OurHistory from "../components/about/ourhistory/OurHistory";
import Statement from "../components/about/statement/Statement";
import Footer from "../components/mainpage/footer/Footer";
import TeacherSlideshow from "../components/mainpage/teacherslideshow/TeacherSlideshow";

export const metadata: Metadata = {
  title: "About Us - Triguna Coaching Classes",
  description:
    "Learn about Triguna Coaching Classes, the leading coaching center in Agra offering quality education for students from Class 1 to 12.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Us - Triguna Coaching Classes",
    description:
      "Learn about Triguna Coaching Classes, the leading coaching center in Agra offering quality education for students from Class 1 to 12.",
    url: "https://trigunacoachingclasses.in/about",
    images: [
      {
        url: "/about-banner.jpg", // Your about page image
        width: 1200,
        height: 630,
        alt: "About Triguna Coaching Classes",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "About Us - Triguna Coaching Classes",
    description:
      "Learn about Triguna Coaching Classes, the leading coaching center in Agra offering quality education for students from Class 1 to 12.",
    images: ["/about-banner.jpg"],
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/about",
  },
};

export default function About() {
  return (
    <div>
      <Hero />
      <Statement />
      <Beliefs />
      <TeacherSlideshow />
      <OurHistory />
      <Footer />
    </div>
  );
}
