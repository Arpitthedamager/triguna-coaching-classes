import { Metadata } from "next";
import Beliefs from "../components/about/beliefs/Beliefs";
import Hero from "../components/about/hero/Hero";
import OurHistory from "../components/about/ourhistory/OurHistory";
import Statement from "../components/about/statement/Statement";
import Footer from "../components/mainpage/footer/Footer";
import TeacherSlideshow from "../components/mainpage/teacherslideshow/TeacherSlideshow";

export const metadata: Metadata = {
  title: "About Us | Triguna Coaching Classes - Best Coaching in Agra",
  description:
    "Learn about Triguna Coaching Classes, the leading coaching center in Agra offering quality education for students from Class 1 to 12. Discover our mission, beliefs, and exceptional team.",
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://trigunacoachingclasses.in"),
  keywords: [
    "Triguna Coaching Classes",
    "about Triguna Coaching Classes",
    "coaching in Agra",
    "quality education Agra",
    "top coaching institute",
    "CBSE coaching",
    "ICSE coaching",
    "personalized learning Agra",
    "Kalindi Vihar coaching",
  ],
  openGraph: {
    title: "About Us | Triguna Coaching Classes - Best Coaching in Agra",
    description:
      "Learn about Triguna Coaching Classes, the leading coaching center in Agra offering quality education for students from Class 1 to 12. Discover our mission, beliefs, and exceptional team.",
    url: "https://trigunacoachingclasses.in/about",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Updated Open Graph image path
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
    title: "About Us | Triguna Coaching Classes - Best Coaching in Agra",
    description:
      "Learn about Triguna Coaching Classes, the leading coaching center in Agra offering quality education for students from Class 1 to 12. Discover our mission, beliefs, and exceptional team.",
    images: ["/opengraph-image.jpg"], // Updated Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/about",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
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
