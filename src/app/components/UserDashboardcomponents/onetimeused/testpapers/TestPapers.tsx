import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react"; // Import useSession hook

interface TestPaper {
  id: number;
  title: string;
  description: string;
  teacher: string;
  image: string;
  downloadLink: string;
  openLink: string;
  class: number;
  subject: string;
}

const TestPapers: FC = () => {
  const { data: session } = useSession(); // Get session data using useSession hook
  const classFromSession = session?.user?.class || 10; // Default to class 10 if not found in session
  
  // Subjects mapping for class 9 and 10
  const subjectsMap: { [key: number]: { [key: string]: string } } = {
    9: {
      Physics: "SST", // Convert Physics to SST for class 9
      Chemistry: "Science", // Convert Chemistry to Science for class 9
    },
    10: {
      Physics: "SST", // Convert Physics to SST for class 10
      Chemistry: "Science", // Convert Chemistry to Science for class 10
    },
  };
  

  const subjectsFromSession = {
    Physics: true,
    Maths: true,
    Chemistry: true,
  };

  const [subjectFlags, setSubjectFlags] = useState(subjectsFromSession);
  const [testPapers, setTestPapers] = useState<TestPaper[]>([]);

  const [formData, setFormData] = useState<TestPaper>({
    id: 0,
    title: "",
    description: "",
    teacher: "",
    image: "",
    downloadLink: "",
    openLink: "",
    class: classFromSession, // Set the class based on the session
    subject: "", // Subject should be empty initially
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchTestPapers = async (
    selectedClass: number,
    subjectFlags: { [key: string]: boolean }
  ) => {
    try {
      const query = new URLSearchParams();
      query.append("class", selectedClass.toString());

      // Map subjects based on the class
      const subjectsForClass = subjectsMap[selectedClass] || {};

      Object.keys(subjectFlags).forEach((subject) => {
        if (subjectFlags[subject]) {
          const mappedSubject = subjectsForClass[subject] || subject; // Use mapped subject or original subject
          query.append("subject", mappedSubject);
        }
      });

      const response = await fetch(`/api/testpapers?${query.toString()}`);
      const data = await response.json();
      // console.log(data);
      if (data.length === 0) {
        alert("No test papers found for the selected criteria.");
      }

      // Flatten the test papers structure
      const flattenedTestPapers = data.reduce(
        (acc: TestPaper[], subjectObj: any) => {
          const testPapers = subjectObj.testPapers || [];
          testPapers.forEach((paper: any) => {
            acc.push({
              id: paper.id,
              title: paper.title,
              description: paper.description,
              teacher: paper.teacher,
              image: paper.image,
              downloadLink: paper.downloadLink,
              openLink: paper.openLink,
              class: subjectObj.class,
              subject: subjectObj.subject,
            });
          });
          return acc;
        },
        []
      );
      setTestPapers(flattenedTestPapers);
    } catch (error) {
      console.error("Error fetching test papers:", error);
      alert("An error occurred while fetching test papers.");
    }
  };

  useEffect(() => {
    fetchTestPapers(formData.class, subjectFlags);
  }, [formData.class, subjectFlags]);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= testPapers.length ? 0 : prevIndex + 3
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? testPapers.length - 3 : prevIndex - 3
    );
  };

  return (
    <motion.div
      className="bg-transparent text-gray-600 p-6 pt-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="p-4 bg-transparent flex justify-between items-center">
        <h1 className="text-xl text-primary-a20 font-bold">
          Admin: Manage Test Papers
        </h1>
      </header>

      <div className="mt-4">
        <div className="flex gap-4">
          {testPapers.slice(currentIndex, currentIndex + 3).map((paper) => (
            <motion.div
              key={paper.id}
              className="w-full lg:w-1/2 p-2 md:p-4 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={paper.image}
                alt={paper.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div>
                <h4 className="font-bold text-gray-800">{paper.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  {paper.description}
                </p>
                <span className="text-xs text-gray-500">
                  By {paper.teacher}
                </span>
                <div className="mt-4 space-x-4">
                  <a
                    href={paper.downloadLink}
                    className="text-primary-a20 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                  <a
                    href={paper.openLink}
                    className="text-green-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded hover:bg-primary-a20"
          >
            Prev
          </button>
          <button
            onClick={handleNextClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded hover:bg-primary-a20"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TestPapers;
