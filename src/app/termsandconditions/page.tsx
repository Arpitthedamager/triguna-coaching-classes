// app/terms-and-conditions/page.tsx or pages/terms-and-conditions.tsx
import { Metadata } from "next";
import TermsAndConditions from "../components/tac/TAC";
import Footer from "../components/mainpage/footer/Footer";

// Enhanced SEO Metadata for Terms and Conditions page
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://trigunacoachingclasses.in"),
  title: "Terms and Conditions - Triguna Coaching Classes | Best Coaching in Agra",
  description:
    "Read the Terms and Conditions of Triguna Coaching Classes, your trusted coaching institute in Agra. Learn about our services, payment policies, and more.",
  keywords: [
    "Terms and Conditions",
    "Triguna Coaching Classes",
    "coaching in Agra",
    "best coaching in Agra",
    "coaching institute Agra",
    "student services Agra",
    "terms of service",
    "coaching policies",
    "payment terms Agra",
    "educational agreements Agra",
    "refund policy Agra",
    "student rights Agra",
  ],
  openGraph: {
    title: "Terms and Conditions - Triguna Coaching Classes | Best Coaching in Agra",
    description:
      "Read the Terms and Conditions of Triguna Coaching Classes, your trusted coaching institute in Agra. Learn about our services, payment policies, and more.",
    url: "https://trigunacoachingclasses.in/terms-and-conditions",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Updated Open Graph image path
        width: 1200,
        height: 630,
        alt: "Triguna Coaching Classes Terms and Conditions",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "Terms and Conditions - Triguna Coaching Classes | Best Coaching in Agra",
    description:
      "Read the Terms and Conditions of Triguna Coaching Classes, your trusted coaching institute in Agra. Learn about our services, payment policies, and more.",
    images: ["/opengraph-image.jpg"], // Updated Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/terms-and-conditions",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
  },
};

const TermsPage = () => {
  return (
    <div className="bg-primary-content">
      <TermsAndConditions />
      <Footer/>
    </div>
  );
};

export default TermsPage;
