import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "./components/mainpage/sessionwraper/SessionWraper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://trigunacoachingclasses.in"),
  title: "Triguna Coaching Classes - Leading Coaching in Agra",
  description:
    "Triguna Coaching Classes provides exceptional coaching for students from Class 1 to 12. Located in Agra, we specialize in delivering quality education and comprehensive learning experiences.",
  keywords: [
    "Triguna Coaching Classes",
    "coaching in Agra",
    "tutoring",
    "Class 1 to 12",
    "Kalindi Vihar",
    "best coaching institute",
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
    title: "Triguna Coaching Classes - Leading Coaching in Agra",
    description:
      "Triguna Coaching Classes provides exceptional coaching for students from Class 1 to 12. Located in Agra, we specialize in delivering quality education and comprehensive learning experiences.",
    url: "https://trigunacoachingclasses.in",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Updated Open Graph image path
        width: 1200,
        height: 630,
        alt: "Triguna Coaching Classes Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "Triguna Coaching Classes - Leading Coaching in Agra",
    description:
      "Triguna Coaching Classes provides exceptional coaching for students from Class 1 to 12. Located in Agra, we specialize in delivering quality education and comprehensive learning experiences.",
    images: ["/opengraph-image.jpg"], // Updated Twitter card image
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          {/* <ThemeButton /> */}
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
