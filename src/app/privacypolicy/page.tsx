import { Metadata } from "next";
import Footer from "../components/mainpage/footer/Footer";
import PrivacyPolicy from "../components/privacypolicy/PrivacyPolicy";

export const metadata: Metadata = {
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://trigunacoachingclasses.in"),
    title: "Privacy Policy - Triguna Coaching Classes",
    description:
      "Read the Privacy Policy of Triguna Coaching Classes, outlining how we collect, use, and protect your personal information while providing educational services in Agra.",
    keywords: [
      "Triguna Coaching Classes",
      "coaching in Agra",
      "privacy policy",
      "data protection",
      "personal information",
      "student data",
      "coaching privacy",
      "data security",
      "terms and conditions",
    ],
    openGraph: {
      title: "Privacy Policy - Triguna Coaching Classes",
      description:
        "Read the Privacy Policy of Triguna Coaching Classes, outlining how we collect, use, and protect your personal information while providing educational services in Agra.",
      url: "https://trigunacoachingclasses.in/privacy-policy",
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
      title: "Privacy Policy - Triguna Coaching Classes",
      description:
        "Read the Privacy Policy of Triguna Coaching Classes, outlining how we collect, use, and protect your personal information while providing educational services in Agra.",
      images: ["/favicon.ico"],
    },
    alternates: {
      canonical: "https://trigunacoachingclasses.in/privacy-policy",
    },
  };
  
const PrivacyPolicyPage = () => {
  return (
    <main className="bg-primary-content">
      <PrivacyPolicy />
      <Footer/>
    </main>
  );
};

export default PrivacyPolicyPage;
