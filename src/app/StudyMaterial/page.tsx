import { Metadata } from "next";
import Main from "../components/studymat/main/main";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://trigunacoachingclasses.in"),
  title: "Study Material | Triguna Coaching Classes",
  description:
    "Access comprehensive study materials from Triguna Coaching Classes to excel in your academic journey. Join the best coaching institute in Agra today!",
  keywords: [
    "Triguna Coaching Classes",
    "study materials",
    "academic resources",
    "coaching classes study materials",
    "Agra coaching institute",
    "Triguna study materials",
  ],
  openGraph: {
    title: "Study Material | Triguna Coaching Classes",
    description:
      "Access comprehensive study materials from Triguna Coaching Classes to excel in your academic journey. Join the best coaching institute in Agra today!",
    url: "https://trigunacoachingclasses.in/study-material",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Replace with your actual Open Graph image path
        width: 1200,
        height: 630,
        alt: "Study Material - Triguna Coaching Classes",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "Study Material | Triguna Coaching Classes",
    description:
      "Access comprehensive study materials from Triguna Coaching Classes to excel in your academic journey. Join the best coaching institute in Agra today!",
    images: ["/opengraph-image.jpg"], // Replace with your actual Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/study-material",
  },
  icons: {
    icon: "/favicon1.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function StudyMaterial() {
  return (
    <>
      <div className="bg-primary-content">
        <Main />
      </div>
    </>
  );
}
