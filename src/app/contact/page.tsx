"use client";

import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import HeaderSection from "../components/contect/hero/Hero";
import TeacherContactCard from "../components/contect/teachercard/TeacherCard";
import ContactForm from "../components/contect/form/Form";
import MapComponent from "../components/mainpage/mapcomponent/MapComponent";
import Footer from "../components/mainpage/footer/Footer";

export default function ContactUs() {
  return (
    <>
      {/* Meta Tags for SEO */}
      <Head>
        <title>Contact Us - Triguna Coaching Classes</title>
        <meta
          name="description"
          content="Contact Triguna Coaching Classes for inquiries, feedback, or assistance. Visit our location in Kalindi Vihar, Agra, or reach us at +91 99179 89914."
        />
        <meta
          name="keywords"
          content="Triguna Coaching Classes contact, coaching classes Agra, tutoring in Agra, Kalindi Vihar education, best coaching institute in Agra"
        />
        <meta name="author" content="Triguna Coaching Classes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://trigunacoachingclasses.in/contact" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph for Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us - Triguna Coaching Classes" />
        <meta
          property="og:description"
          content="Reach out to Triguna Coaching Classes for inquiries and assistance. Located in Agra, we are here to guide you."
        />
        <meta property="og:url" content="https://trigunacoachingclasses.in/contact" />
        <meta property="og:image" content="https://trigunacoachingclasses.in/images/contact-banner.jpg" />
        <meta property="og:site_name" content="Triguna Coaching Classes" />

        {/* Twitter Card for Social Sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Triguna Coaching Classes" />
        <meta
          name="twitter:description"
          content="Get in touch with Triguna Coaching Classes for top-notch coaching in Agra. Call +91 99179 89914 or visit us in Kalindi Vihar."
        />
        <meta name="twitter:image" content="https://trigunacoachingclasses.in/images/contact-banner.jpg" />

        {/* Structured Data (JSON-LD) for Contact Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              mainEntityOfPage: "https://trigunacoachingclasses.in/contact",
              name: "Contact Us - Triguna Coaching Classes",
              description:
                "Get in touch with Triguna Coaching Classes for inquiries, feedback, or assistance. Located in Agra, we are here to help you.",
              url: "https://trigunacoachingclasses.in/contact",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+919917989914",
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "B-294, A Block, Kalindi Vihar",
                addressLocality: "Agra",
                addressRegion: "UP",
                postalCode: "282006",
                addressCountry: "India",
              },
              sameAs: [
                "https://www.facebook.com/people/Triguna-Coaching-Classes/100063716935409/",
                "https://www.instagram.com/pachaurirupesh/",
              ],
            }),
          }}
        />
      </Head>

      {/* Page Content */}
      <div className="bg-primary-content">
        <nav
          aria-label="Breadcrumb"
          className="relative bg-primary-a50 py-4 flex justify-between items-center z-10 px-4 md:px-8 shadow-lg"
        >
          <motion.div
            className="text-lg font-extrabold text-yellow-500"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            TCC
          </motion.div>

          <motion.div
            className="hidden lg:flex space-x-8 text-gray-50 font-semibold"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link href="/aboutus" className="hover:text-gray-200">
              About Us
            </Link>
            <Link href="/signin" className="hover:text-gray-200">
              Enroll Now
            </Link>
            <Link href="/contact" className="text-gray-200">
              Contact
            </Link>
          </motion.div>

          <Link href="/signin">
            <motion.button
              className="px-6 py-2 bg-yellow-500 text-[#241448] font-bold rounded-lg hover:bg-yellow-400 shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </Link>
        </nav>

        <HeaderSection />
        <TeacherContactCard />
        <ContactForm />
        <MapComponent />
        <Footer />
      </div>
    </>
  );
}
