import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionWrapper from "./components/mainpage/sessionwraper/SessionWraper";
import Head from "next/head";

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
  ],
  openGraph: {
    title: "Triguna Coaching Classes - Leading Coaching in Agra",
    description:
      "Triguna Coaching Classes provides exceptional coaching for students from Class 1 to 12. Located in Agra, we specialize in delivering quality education and comprehensive learning experiences.",
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
    title: "Triguna Coaching Classes - Leading Coaching in Agra",
    description:
      "Triguna Coaching Classes provides exceptional coaching for students from Class 1 to 12. Located in Agra, we specialize in delivering quality education and comprehensive learning experiences.",
    images: ["/favicon.ico"],
  },
  alternates: {
    canonical: "https://trigunacoachingclasses.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="ZxOhBMQBy8eaOIRimm2wJyD2GyQgOnoYs-ioSIyt-tY"
        />
        <meta name="google-site-verification" content="ZckhkEhywL0SFdQLM3GyQaSgujJyOvpPk_NSgCGv0dE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Triguna Coaching Classes",
              url: "https://trigunacoachingclasses.in",
              logo: "/favicon.ico",
              description: "Exceptional coaching for Class 1 to 12 in Agra.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "B-294, A Block, Kalindi Vihar",
                addressLocality: "Agra",
                addressRegion: "UP",
                postalCode: "282006",
                addressCountry: "India",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+919917989914",
                contactType: "Customer Service",
              },
              sameAs: [
                "https://www.facebook.com/people/Triguna-Coaching-Classes/100063716935409/",
                "https://www.instagram.com/pachaurirupesh/",
              ],
            }),
          }}
        />{" "}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://trigunacoachingclasses.in/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "About Us",
                  item: "https://trigunacoachingclasses.in/about",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Contact Us",
                  item: "https://trigunacoachingclasses.in/contact",
                },
              ],
            }),
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

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
