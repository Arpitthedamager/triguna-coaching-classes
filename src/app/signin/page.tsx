// pages/signin.js
import SignIncomponent from "../components/signincomponent/SIgnincomponent"; // Make sure the import path is correct


export const metadata = {
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
    "Agra coaching login",
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
        url: "/favicon.ico",
        width: 800,
        height: 600,
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
    images: ["/favicon.ico"],
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/signin",
  },
};

export default function SignIn() {
  return (
    <>
      <SignIncomponent />
    </>
  );
}