import { Metadata } from "next";
import HomePageContent from "../components/mainpage/homee/homee";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://trigunacoachingclasses.in"),
  title: "Home | Triguna Coaching Classes - Best Coaching for 10 to 12 in Agra",
  description:
    "Home of Triguna Coaching Classes, the leading coaching institute in Agra. Specializing in Classes 10 to 12 with top-quality education, personalized attention, and proven results for students.",
  keywords: [
    "Triguna Coaching Classes",
    "best coaching in Agra",
    "coaching for Class 10 to 12",
    "Agra tuition center",
    "Kalindi Vihar coaching",
    "top coaching institute",
    "CBSE coaching",
    "ICSE coaching",
    "science coaching Agra",
    "math coaching Agra",
    "quality education Agra",
    "personalized learning Agra",
    "coaching for board exams",
  ],
  openGraph: {
    title: "Home | Triguna Coaching Classes - Best Coaching for 10 to 12 in Agra",
    description:
      "Welcome to the home of Triguna Coaching Classes in Agra, specializing in Classes 10 to 12. We provide exceptional coaching and proven results with personalized attention.",
    url: "https://trigunacoachingclasses.in",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Updated Open Graph image path
        width: 1200,
        height: 630,
        alt: "Triguna Coaching Classes Home Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "Home | Triguna Coaching Classes - Best Coaching for 10 to 12 in Agra",
    description:
      "Triguna Coaching Classes is the best coaching institute in Agra for Classes 10 to 12, offering top-quality education and personalized attention to students.",
    images: ["/opengraph-image.jpg"], // Updated Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in",
  },
  icons: {
    icon: "/favicon1.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
  },
};

export default function Home() {
  return <HomePageContent />;
}
