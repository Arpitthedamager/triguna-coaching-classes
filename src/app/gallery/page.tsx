import { Metadata } from "next";
import Main from "../components/gallery/main/main";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://trigunacoachingclasses.in"),
  title: "Gallery | Triguna Coaching Classes",
  description:
    "Explore the gallery of Triguna Coaching Classes showcasing top-performing students, events, and more. Join the best coaching institute in Agra today!",
  keywords: [
    "Triguna Coaching Classes",
    "gallery",
    "student achievements",
    "coaching events",
    "Agra coaching classes gallery",
    "Triguna student success",
  ],
  openGraph: {
    title: "Gallery | Triguna Coaching Classes",
    description:
      "Explore the gallery of Triguna Coaching Classes showcasing top-performing students, events, and more. Join the best coaching institute in Agra today!",
    url: "https://trigunacoachingclasses.in/gallery",
    siteName: "Triguna Coaching Classes",
    images: [
      {
        url: "/opengraph-image.jpg", // Replace with your actual Open Graph image path
        width: 1200,
        height: 630,
        alt: "Gallery - Triguna Coaching Classes",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TrigunaCoaching",
    title: "Gallery | Triguna Coaching Classes",
    description:
      "Explore the gallery of Triguna Coaching Classes showcasing top-performing students, events, and more. Join the best coaching institute in Agra today!",
    images: ["/opengraph-image.jpg"], // Replace with your actual Twitter card image path
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in/gallery",
  },
  icons: {
    icon: "/favicon1.ico",
    apple: "/apple-touch-icon.png", // Added Apple Touch Icon
  },
};

export default function Gallery() {
  return (
    <>
      <div className="bg-primary-content">
        <Main />
      </div>
    </>
  );
}
