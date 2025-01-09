// pages/signin.js
import { Metadata } from "next";
import SignIncomponent from "../components/signincomponent/SIgnincomponent"; // Ensure the import path is correct

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://trigunacoachingclasses.in"),
  title: "Login | Triguna Coaching Classes",
  description:
    "Login to your Triguna Coaching Classes account to access student or teacher dashboards.",
  keywords: [
    "Triguna Coaching Classes",
    "login",
    "student login",
    "teacher login",
    "coaching login",
    "Agra top coaching login",
    "Triguna login",
  ],
  openGraph: {
    title: "Login | Triguna Coaching Classes",
    description:
      "Login to your Triguna Coaching Classes account to access student or teacher dashboards.",
    url: "https://trigunacoachingclasses.in/signin",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Updated Open Graph image path
        width: 1200,
        height: 630,
        alt: "Triguna Coaching Classes Login",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "Login | Triguna Coaching Classes",
    description:
      "Login to your Triguna Coaching Classes account to access student or teacher dashboards.",
    images: ["/opengraph-image.jpg"], // Updated Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/signin",
  },
  icons: {
    icon: "/favicon1.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
  },
};

export default function SignIn() {
  return (
    <>
      <SignIncomponent />
    </>
  );
}
