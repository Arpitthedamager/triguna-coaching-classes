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
    url: "https://trigunacoachingclasses.in/privacypolicy",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Updated Open Graph image path
        width: 1200,
        height: 630,
        alt: "Triguna Coaching Classes Privacy Policy",
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
    images: ["/opengraph-image.jpg"], // Updated Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/privacypolicy",
  },
  icons: {
    icon: "/favicon1.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
  },
};

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-primary-content">
      <PrivacyPolicy />
      <Footer />
    </main>
  );
};

export default PrivacyPolicyPage;
