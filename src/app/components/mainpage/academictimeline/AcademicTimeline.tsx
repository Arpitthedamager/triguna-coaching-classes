"use client";

import Image from "next/image";
import React from "react";

const AcademicTimeline = () => {
  // Timeline item data without images
  const timelineItems = [
    {
      title: "Central Board of Secondary Education (CBSE)",
      description:
        "Stay updated with CBSE curriculum, exam schedules, and other announcements.",
      icon: "ℹ️",
      link: "https://www.cbse.gov.in",
    },
    {
      title: "Uttar Pradesh Board (UPMSP)",
      description:
        "Access academic calendars, syllabus details, and board examination updates for the Uttar Pradesh Board.",
      icon: "📈",
      link: "https://upmsp.edu.in",
    },
    {
      title: "Joint Entrance Examination (JEE)",
      description:
        "Check JEE Main exam dates, registration details, and study resources.",
      icon: "📝",
      link: "https://jeemain.nta.nic.in",
    },
    {
      title: "National Testing Agency (NTA)",
      description:
        "Find updates on national-level exams like JEE, NEET, CUET, and others.",
      icon: "📋",
      link: "https://nta.ac.in",
    },
  ];
  // Separate constant for image URLs
  const timelineImages = [
    "/party/3.jpeg", // Image for Important Dates
    "/party/5.jpg", // Image for Results
    "/party/6.jpeg", // Image for Test Schedule
    "/party/7.jpeg", // Image for JEE Registration
  ];

  return (
    <section className="md:py-16 py-10 px-4 md:min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start">
        {/* Left Image Section */}
        <div className="flex-shrink-0 w-full mt-0 md:mt-28 md:w-1/2 mb-8 md:mb-0">
          <div className="relative md:block hidden ">
            {timelineImages.map((imageUrl, index) => (
              <div
                key={index}
                className="flex items-center justify-center mb-12 md:mb-80 md:mt-24"
              >
                <Image
                  width={500}
                  height={500}
                  src={imageUrl}
                  alt={`Timeline image ${index + 1}`}
                  className="w-full h-48 md:h-64 object-cover border-white shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Timeline Section */}
        <div className="w-full md:w-1/2 md:pl-8 sticky md:top-16  z-10">
          <h2 className="text-2xl md:text-3xl text-primary-a10 font-bold mb-6 text-center md:text-left">
            Academic Year Timeline:
          </h2>
          <div className="space-y-0 md:space-y-6">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 md:flex-row items-start md:space-x-4 hover:bg-primary-a50 p-4 rounded-lg transition"
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <div className="flex mt-3 md:mt-0  items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black text-white text-xl md:text-2xl font-bold rounded-md">
                    {item.icon}
                  </div>
                  <div className="mt-2 md:mt-0">
                    <h3 className="text-base md:text-lg text-primary-a20 font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicTimeline;
// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const AcademicTimeline = () => {
//   const timelineItems = [
//     {
//       title: "Important Dates",
//       description: "Stay informed with our key academic dates and events",
//       icon: "ℹ️",
//     },
//     {
//       title: "Results",
//       description: "Stay informed on every result",
//       icon: "📈",
//     },
//     {
//       title: "Test Schedule",
//       description: "Stay informed with our class test series",
//       icon: "📝",
//     },
//     {
//       title: "Registration of JEE",
//       description: "Stay informed with registration forms and admit cards",
//       icon: "📋",
//     },
//   ];

//   const timelineImages = [
//     "/2.jpg", // Image for Important Dates
//     "/images/results.jpg", // Image for Results
//     "/2.jpg", // Image for Test Schedule
//     "/images/jee-registration.jpg", // Image for JEE Registration
//   ];

//   return (
//     <section className="relative">
//       {/* Mobile Background Scrolling Section */}
//       <div className="md:hidden">
//         {timelineImages.map((imageUrl, index) => (
//           <motion.div
//             key={index}
//             className="h-screen bg-fixed bg-cover bg-center text-white py-8 px-6 flex flex-col justify-center items-center"
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.5 }} // Trigger as 50% of the section is in view
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             style={{ backgroundImage: `url(${imageUrl})` }}
//           >
//             <div className="text-center space-y-4">
//               <h2 className="text-2xl font-bold">{timelineItems[index].title}</h2>
//               <p className="text-lg">{timelineItems[index].description}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Desktop Section */}
//       <div className="hidden md:block py-16 px-4 min-h-screen max-w-7xl mx-auto flex flex-col md:flex-row items-start">
//         {/* Left Image Section */}
//         <div className="flex-shrink-0 w-full md:w-1/2 mb-8 md:mb-0">
//           {timelineImages.map((imageUrl, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-center mb-12 md:mb-80 md:mt-24"
//             >
//               <img
//                 src={imageUrl}
//                 alt={`Timeline image ${index + 1}`}
//                 className="w-full h-64 object-cover border-white shadow-md"
//               />
//             </div>
//           ))}
//         </div>

//         {/* Right Timeline Section */}
//         <div className="w-full md:w-1/2 md:pl-8">
//           <h2 className="text-3xl text-primary-a10 font-bold mb-6 text-left">
//             Academic Year Timeline:
//           </h2>
//           <div className="space-y-12">
//             {timelineItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-start space-x-4 hover:bg-primary-a50 p-4 rounded-lg transition"
//               >
//                 <div className="flex items-center justify-center w-12 h-12 bg-black text-white text-2xl font-bold rounded-md">
//                   {item.icon}
//                 </div>
//                 <div>
//                   <h3 className="text-lg text-primary-a20 font-semibold">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AcademicTimeline;
