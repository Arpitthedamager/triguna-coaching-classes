"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeaderSection from "./hero/Hero";
import ContactForm from "./form/Form";
import MapComponent from "../mainpage/mapcomponent/MapComponent";
import Footer from "../mainpage/footer/Footer";
import TeacherContactCard from "./teachercard/TeacherCard";


export default function Main() {
    return (
      <div className="bg-primary-content">
        {/* Breadcrumb Navigation */}
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
  
        {/* Page Content */}
        <HeaderSection />
        <TeacherContactCard />
        <ContactForm />
        <MapComponent />
        <Footer />
      </div>
    );
  }
  