"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="text-xl font-semibold text-primary-a20 cursor-pointer">
        {title}
      </h3>
      <div className="text-gray-700 mt-2">{children}</div>
    </div>
  );
};

const PrivacyPolicy = () => {
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
      <div className="">
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

        <motion.div
          className="max-w-6xl  mx-auto py-12 px-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.h1
            className="text-4xl font-bold mb-10 text-center text-primary-a20"
            variants={sectionVariants}
          >
            Privacy Policy of Triguna Coaching Classes
          </motion.h1>

          {/* Introduction */}
          <motion.section className="mb-8" variants={sectionVariants}>
            <p className="text-lg leading-relaxed text-gray-700">
              Welcome to Triguna Coaching Classes! Your trust is our priority.
              This Privacy Policy outlines how we handle your data, ensuring
              transparency and security in compliance with applicable laws. By
              using our website and services, you agree to the practices
              described in this document.
            </p>
          </motion.section>

          {/* Key Highlights */}
          <motion.section
            className="mb-8 bg-gray-100 p-6 rounded-lg shadow-sm"
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-semibold text-primary-a20 mb-4">
              Quick Highlights
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                We prioritize your data privacy and security.
              </li>
              <li className="mb-2">
                We only collect the data necessary to provide and improve our
                services.
              </li>
              <li className="mb-2">
                You have control over your data, including access and deletion
                rights.
              </li>
              <li className="mb-2">
                We never sell your data to third parties.
              </li>
              <li>
                All data is stored securely with industry-standard practices.
              </li>
            </ul>
          </motion.section>

          {/* Information We Collect */}
          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-semibold text-primary-a20 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              To provide you with the best experience, we collect the following
              information:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                <strong>Personal Details:</strong> Name, email, phone number,
                and address.
              </li>
              <li className="mb-2">
                <strong>Academic Information:</strong> Subjects of interest,
                grades, and performance data.
              </li>
              <li className="mb-2">
                <strong>Payment Data:</strong> Securely processed payment
                information.
              </li>
              <li className="mb-2">
                <strong>Usage Data:</strong> Browser type, IP address, and usage
                patterns.
              </li>
              <li className="mb-2">
                <strong>Communication History:</strong> Your inquiries,
                feedback, and support interactions.
              </li>
            </ul>
          </motion.section>

          {/* How We Use Your Information */}
          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-semibold text-primary-a20 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">We use your data to:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                Provide, personalize, and improve our educational services.
              </li>
              <li className="mb-2">
                Respond to inquiries and provide customer support.
              </li>
              <li className="mb-2">
                Process enrollments and manage transactions securely.
              </li>
              <li className="mb-2">
                Analyze performance data to optimize teaching methods.
              </li>
              <li>
                Send updates, notifications, and marketing messages (if
                consented).
              </li>
            </ul>
          </motion.section>

          {/* Your Rights */}
          <motion.section className="mb-8" variants={sectionVariants}>
            <h2 className="text-2xl font-semibold text-primary-a20 mb-4">
              3. Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the following rights
              regarding your data:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                Access the personal data we hold about you.
              </li>
              <li className="mb-2">
                Request corrections or updates to your information.
              </li>
              <li className="mb-2">
                Request deletion of your data (subject to legal obligations).
              </li>
              <li className="mb-2">Opt-out of marketing communications.</li>
              <li>Restrict or object to certain data processing activities.</li>
            </ul>
            <p className="mt-4 text-gray-700">
              To exercise these rights, please contact us through our website’s
              support page.
            </p>
          </motion.section>

          {/* Accordion Section */}
          <Accordion title="4. Data Protection Measures">
            <p className="text-gray-700 mb-4">
              We implement robust security measures to protect your personal
              data from unauthorized access, alteration, disclosure, or
              destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">Encrypted databases and secure servers.</li>
              <li className="mb-2">
                Regular security audits and vulnerability assessments.
              </li>
              <li className="mb-2">
                Access controls and authentication protocols.
              </li>
              <li>Data encryption during transmission and storage.</li>
            </ul>
          </Accordion>

          <Accordion title="5. Cookies and Tracking Technologies">
            <div id="CookiesPolicy">

            <p  className="text-gray-700 mb-4">
              Our website uses cookies and similar technologies to enhance your
              browsing experience. These technologies help us:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                Understand user behavior and improve website functionality.
              </li>
              <li className="mb-2">Remember user preferences and settings.</li>
              <li>Analyze website traffic and performance metrics.</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can manage your cookie preferences through your browser
              settings. Please note that disabling cookies may affect the
              functionality of our website.
            </p>
            </div>
          </Accordion>

          <Accordion title="6. Children's Privacy">
            <p className="text-gray-700">
              We are committed to protecting the privacy of children. Our
              services are intended for individuals aged 13 and above. We do not
              knowingly collect personal data from children under 13 without
              parental consent. If you believe a child has provided us with
              personal information, please contact us to take appropriate
              measures.
            </p>
          </Accordion>

          <Accordion title="7. Sharing Your Information">
            <p className="text-gray-700 mb-4">
              We do not sell or trade your personal data. However, we may share
              your information with trusted third parties under the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                Service Providers: Third-party vendors who assist in providing
                our services (e.g., payment processors).
              </li>
              <li className="mb-2">
                Legal Compliance: When required by law or in response to valid
                legal requests.
              </li>
              <li>
                Protecting Rights: To protect the rights, safety, and property
                of Triguna Coaching Classes and our users.
              </li>
            </ul>
          </Accordion>

          <Accordion title="8. Purpose of Data Collection">
            <p className="text-gray-700 mb-4">
              The information we collect is used to:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                Facilitate course enrollments and manage student accounts.
              </li>
              <li className="mb-2">
                Enhance your learning experience with personalized content.
              </li>
              <li className="mb-2">
                Communicate important updates, class schedules, and
                announcements.
              </li>
              <li className="mb-2">
                Analyze website usage to improve our services and user
                interface.
              </li>
              <li>
                Comply with legal obligations and prevent fraudulent activities.
              </li>
            </ul>
          </Accordion>

          <Accordion title="9. Data Retention Policy">
            <p className="text-gray-700">
              We retain your personal data only for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required by law. Once the data is no
              longer needed, we securely delete or anonymize it to protect your
              privacy.
            </p>
          </Accordion>

          <Accordion title="10. Updates to This Policy">
            <p className="text-gray-700">
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. Please review this page
              regularly for the latest updates.
            </p>
          </Accordion>
          <Accordion  title="11. Refund Policy">
            <div id="RefundPolicy" >

            <p className="text-gray-700 mb-4">
              We strive to provide high-quality educational services. However,
              if you are not satisfied with our courses, we offer a refund under
              the following conditions:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">
                <strong>Refund Request:</strong> Refund requests must be made
                within 7 days of the course enrollment or payment.
              </li>
              <li className="mb-2">
                <strong>Eligibility:</strong> To be eligible for a refund, the
                student must not have attended more than one class session or
                accessed course materials.
              </li>
              <li className="mb-2">
                <strong>Processing Time:</strong> Refunds will be processed
                within 14 business days after the request is approved.
              </li>
              <li className="mb-2">
                <strong>Non-Refundable Items:</strong> Registration fees and any
                materials provided are non-refundable once the course has
                commenced.
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              To request a refund, please contact our support team through the
              contact page, providing details of your purchase and the reason
              for your request.
            </p>
            </div>
          </Accordion>
        </motion.div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
