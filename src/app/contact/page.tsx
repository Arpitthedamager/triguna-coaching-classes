
import { Metadata } from "next";
import Main from "../components/contect/main";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://trigunacoachingclasses.in"),
  title: "Contact Us - Triguna Coaching Classes",
  description:
    "Get in touch with Triguna Coaching Classes for top-notch coaching in Agra. Call +91 99179 89914 or visit us in Kalindi Vihar.",
  keywords: [
    "Triguna Coaching Classes contact",
    "coaching classes Agra",
    "tutoring in Agra",
    "Kalindi Vihar education",
    "best coaching institute in Agra",
  ],
  openGraph: {
    title: "Contact Us - Triguna Coaching Classes",
    description:
      "Reach out to Triguna Coaching Classes for inquiries and assistance. Located in Agra, we are here to guide you.",
    url: "https://trigunacoachingclasses.in/contact",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Updated Open Graph image path
        width: 1200,
        height: 630,
        alt: "Triguna Coaching Classes Contact Page Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "Contact Us - Triguna Coaching Classes",
    description:
      "Get in touch with Triguna Coaching Classes for top-notch coaching in Agra. Call +91 99179 89914 or visit us in Kalindi Vihar.",
    images: ["/opengraph-image.jpg"], // Updated Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/contact",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
  },
};

export default function ContactUs() {
  return (
    <div className="bg-primary-content">
      <Main/>
          </div>
  );
}
