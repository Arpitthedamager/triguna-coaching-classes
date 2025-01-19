"use clent";
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  const [testPapers, setTestPapers] = useState<TestPaper[]>([]);
  // console.log(testPapers);
  const [formData, setFormData] = useState<TestPaper>({
    id: 0,
    title: "",
    description: "",
    teacher: "",
    image: "",
    downloadLink: "",
    openLink: "",
    class: 10, // Default class
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

      Object.keys(subjectFlags).forEach((subject) => {
        if (subjectFlags[subject]) {
          query.append("subject", subject);
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
      // console.log("aik",flattenedTestPapers);
      setTestPapers(flattenedTestPapers);
    } catch (error) {
      console.error("Error fetching test papers:", error);
      alert("An error occurred while fetching test papers.");
    }
  };

  const [subjectFlags, setSubjectFlags] = useState<{ [key: string]: boolean }>({
    SST: false,
    Maths: false,
    Science: false,
    Physics: false,
    Chemistry: false,
  });

  const handleSubjectChange = (subject: string) => {
    setSubjectFlags((prevFlags) => ({
      ...prevFlags,
      [subject]: !prevFlags[subject], // Toggle the selected state of the subject
    }));
  };

  useEffect(() => {
    fetchTestPapers(formData.class, subjectFlags);
  }, [formData.class, subjectFlags]);

  const subjects: { [key: number]: string[] } = {
    9: ["SST", "Maths", "Science"],
    10: ["SST", "Maths", "Science"],
    11: ["Physics", "Chemistry", "Maths"],
    12: ["Physics", "Chemistry", "Maths"],
  };
  // Get subjects based on class
  const getSubjects = (classNumber: number) => {
    switch (classNumber) {
      case 9:
      case 10:
        return ["SST", "Maths", "Science"];
      case 11:
      case 12:
        return ["Physics", "Chemistry", "Maths"];
      default:
        return [];
    }
  };



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
           Test Papers
        </h1>
        <select
          value={formData.class}
          onChange={(e) => {
            const newClass = Number(e.target.value);
            setFormData({
              ...formData,
              class: newClass,
            });
          }}
          className="border p-2 rounded"
        >
          <option value={9}>Class 9</option>
          <option value={10}>Class 10</option>
          <option value={11}>Class 11</option>
          <option value={12}>Class 12</option>
        </select>

        <div className="mt-4">
          {getSubjects(formData.class).map((subject) => (
            <div key={subject} className="flex items-center">
              <input
                type="checkbox"
                checked={subjectFlags[subject]}
                onChange={() => handleSubjectChange(subject)}
                id={subject}
                className="mr-2"
              />
              <label htmlFor={subject} className="text-sm">
                {subject}
              </label>
            </div>
          ))}
        </div>
      </header>

      <div className="mt-4">
        <div className="flex gap-4">
          {testPapers.slice(currentIndex, currentIndex + 3).map((paper) => (
            <motion.div
              key={paper.id}
              className="w-full lg:w-1/2 p-4 md:p-4 bg-white rounded-lg shadow-lg"
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
