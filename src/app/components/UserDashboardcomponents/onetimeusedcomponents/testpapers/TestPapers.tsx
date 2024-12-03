import { FC, useState } from "react";
import { motion } from "framer-motion";

const TestPapers: FC = () => {
  // All available test papers
  const allTestPapers = [
    {
      id: 3,
      title: "Physics Test Paper",
      description: "Test covering mechanics and thermodynamics.",
      teacher: "Prof. Alan Walker",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 4,
      title: "Computer Science Test Paper",
      description: "Covers algorithms, data structures, and basic programming.",
      teacher: "Ms. Rachel Green",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 5,
      title: "Statistics Test Paper",
      description: "Advanced statistical problems for practice.",
      teacher: "Dr. Michael Scott",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 6,
      title: "Chemistry Test Paper",
      description: "Test covering organic and inorganic chemistry.",
      teacher: "Dr. Emma Watson",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 7,
      title: "Advanced Calculus Test Paper",
      description: "Calculus problems for higher-level students.",
      teacher: "Dr. John Doe",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 8,
      title: "Biology Test Paper",
      description: "Cell biology and genetics problems.",
      teacher: "Dr. Angela Smith",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 9,
      title: "Mathematics Test Paper",
      description: "Algebra and geometry exercises.",
      teacher: "Dr. William Johnson",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
    {
      id: 10,
      title: "History Test Paper",
      description: "World history practice questions.",
      teacher: "Prof. Maria Lee",
      image: "https://via.placeholder.com/150",
      downloadLink: "#",
      openLink: "#",
    },
  ];

  // State for the current index of the first card in the displayed group of 3
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next set of 3 cards
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 3 >= allTestPapers.length) {
        return 0; // Loop back to the start when the last set is reached
      }
      return prevIndex + 3; // Show the next set of 3 cards
    });
  };

  // Function to move to the previous set of 3 cards
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex - 3 < 0) {
        return Math.floor(allTestPapers.length / 3) * 3 - 3; // Loop back to the last set
      }
      return prevIndex - 3; // Show the previous set of 3 cards
    });
  };

  return (
    <motion.div
      className="bg-transparent p-6 pt-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="p-4 bg-transparent">
        <h1 className="text-xl font-bold text-SessionContext">Test Papers</h1>
      </header>

      {/* Test Papers Section */}
      <div className="mt-8">
        {/* Display the current set of 3 test papers */}
        <div className="flex gap-4">
          {allTestPapers
            .slice(currentIndex, currentIndex + 3) // Slice to show only 3 cards at a time
            .map((paper) => (
              <motion.div
                key={paper.id}
                className="w-1/3 p-4 bg-white rounded-lg shadow-lg"
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
                  <p className="text-sm text-gray-600 mb-2">{paper.description}</p>
                  <span className="text-xs text-gray-500">By {paper.teacher}</span>
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

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg hover:bg-primary-a20 transition duration-300"
          >
            Prev
          </button>
          <button
            onClick={handleNextClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg hover:bg-primary-a20 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TestPapers;
