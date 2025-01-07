"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const TermsAndConditions = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.3 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      {/* Navbar */}
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
          <Link href="/contact" className="hover:text-gray-200">
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
      {/* Main Content */}
      <motion.div
        className="max-w-7xl mx-auto py-12 px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.h1
          className="text-5xl font-extrabold mb-12 text-center text-primary-a20"
          variants={sectionVariants}
        >
          Terms and Conditions of Triguna Coaching Classes - Your Best Coaching
          in Agra
        </motion.h1>

        {/* Introduction */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to Triguna Coaching Classes, the premier coaching institute
            in Agra. By accessing or using our website and services, you agree
            to comply with and be bound by the following Terms and Conditions.
            If you disagree with any part of these terms, you must immediately
            cease using our services.
          </p>
        </motion.section>

        {/* Section 1: General Terms */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            1. General Terms
          </h2>
          <p className="text-gray-700">
            These Terms and Conditions ("Terms") apply to all users of the
            Triguna Coaching Classes website and services, including students,
            parents, and other users. By using our services, you agree to these
            Terms in full. If you are under the age of 18, you must obtain
            parental or guardian consent before using our services.
          </p>
          <p className="text-gray-700 mt-4">
            Triguna Coaching Classes, located in Agra, India, reserves the right
            to modify, suspend, or discontinue any aspect of our website or
            services at any time without prior notice.
          </p>
        </motion.section>

        {/* Section 2: User Responsibilities */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            2. User Responsibilities
          </h2>
          <p className="text-gray-700 mb-4">
            By using our services, you agree to the following responsibilities:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li className="mb-3">
              Provide accurate and up-to-date personal information during
              registration.
            </li>
            <li className="mb-3">
              Comply with all applicable local, state, and federal laws when
              using our services in Agra, Uttar Pradesh.
            </li>
            <li className="mb-3">
              Use our services solely for educational purposes and refrain from
              any illegal or unethical activities.
            </li>
            <li className="mb-3">
              Not disrupt, damage, or interfere with the website’s operation or
              other users' experience.
            </li>
          </ul>
        </motion.section>

        {/* Section 3: Payment and Fees */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            3. Payment and Fees
          </h2>
          <p className="text-gray-700">
            All payments for courses, study materials, and any additional
            services must be made in advance. Fees are non-refundable unless
            specified otherwise in the Refund Policy.
          </p>
          <p className="text-gray-700 mt-4">
            Users are responsible for ensuring that all payments are processed
            correctly. Failure to pay any applicable fees may result in the
            suspension or termination of your access to the services offered by
            Triguna Coaching Classes in Agra.
          </p>
        </motion.section>

        {/* Section 4: Termination of Access */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            4. Termination of Access
          </h2>
          <p className="text-gray-700">
            Triguna Coaching Classes reserves the right to suspend or terminate
            access to its services without notice if a user violates any of
            these Terms or engages in any conduct detrimental to the functioning
            of our services.
          </p>
          <p className="text-gray-700 mt-4">
            Users can terminate their use of our services at any time by
            discontinuing access to the website or by notifying us in writing.
          </p>
        </motion.section>

        {/* Section 5: Limitation of Liability */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            Triguna Coaching Classes shall not be liable for any indirect,
            incidental, special, or consequential damages arising from the use
            of our website or services, even if we have been advised of the
            possibility of such damages. This includes loss of data, financial
            loss, or reputational harm.
          </p>
        </motion.section>

        {/* Section 6: Modifications to the Terms */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            6. Modifications to the Terms
          </h2>
          <p className="text-gray-700">
            Triguna Coaching Classes reserves the right to change or modify
            these Terms and Conditions at any time. We will notify users of
            material changes, and it is your responsibility to review these
            Terms periodically.
          </p>
        </motion.section>

        {/* Section 7: Additional Policies */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            7. Additional Policies
          </h2>
          <p className="text-gray-700">
            For further details on how we collect and handle your data, please
            refer to the following links to our other policies:
          </p>
          <ul className="list-disc pl-6 text-primary-a20">
            <li className="mb-3">
              <Link href="/privacypolicy" className="underline">
                Privacy Policy
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/privacypolicy#CookiesPolicy" className="underline">
                Cookie Policy
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/privacypolicy#RefundPolicy" className="underline">
                Refund Policy
              </Link>
            </li>
            <li className="mb-3">
              <Link href="#disclaimer" className="underline">
                Disclaimer
              </Link>
            </li>
          </ul>
        </motion.section>

        {/* Section 8: Governing Law */}
        <motion.section className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            8. Governing Law
          </h2>
          <p className="text-gray-700">
            These Terms and Conditions are governed by the laws of India. Any
            disputes arising from these Terms shall be resolved in the courts of
            Agra, Uttar Pradesh.
          </p>
        </motion.section>

        {/* Section 9: Disclaimer */}
        <motion.section id="disclaimer" className="mb-10" variants={sectionVariants}>
          <h2 className="text-3xl font-semibold text-primary-a20 mb-4">
            9. Disclaimer
          </h2>
          <p className="text-lg text-gray-700">
            The information provided on this website is for general
            informational purposes only. Triguna Coaching Classes strives to
            ensure the accuracy of all content but makes no guarantees regarding
            its completeness or reliability. Any reliance you place on such
            information is strictly at your own risk.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            We are not responsible for any loss, damage, or inconvenience caused
            by the use of the information provided on this website.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Our website may also contain links to third-party sites. We do not
            control and are not responsible for the content or practices of
            these external sites.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            While we aim to provide helpful educational content, Triguna
            Coaching Classes does not guarantee specific academic outcomes.
            Performance and results depend on the effort and circumstances of
            each individual.
          </p>
        </motion.section>

        {/* Closing Note */}
        <motion.section
          className="text-center mt-10"
          variants={sectionVariants}
        >
          <p className="text-gray-600 text-sm">
            Last Updated: January 2025. These Terms and Conditions are subject
            to periodic review and updates. Please check back periodically for
            changes.
          </p>
        </motion.section>
      </motion.div>
    </>
  );
};

export default TermsAndConditions;
