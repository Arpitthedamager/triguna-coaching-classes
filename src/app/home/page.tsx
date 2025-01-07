import HomePageContent from "../components/mainpage/homee/homee";

export const metadata = {
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
        url: "/favicon.ico",
        width: 800,
        height: 600,
        alt: "Triguna Coaching Classes Logo",
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
    images: ["/favicon.ico"],
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in",
  },
};

export default function Home() {
  return <HomePageContent />;
}
