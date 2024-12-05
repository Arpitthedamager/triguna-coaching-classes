import { FC, useState } from "react";
import { motion } from "framer-motion";

interface TestPaper {
  id: number;
  title: string;
  description: string;
  teacher: string;
  image: string;
  downloadLink: string;
  openLink: string;
}

const TestPapers: FC = () => {
  // State for test papers
  const [testPapers, setTestPapers] = useState<TestPaper[]>([
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
  ]);

  // State for managing form data
  const [formData, setFormData] = useState<TestPaper>({
    id: 0,
    title: "",
    description: "",
    teacher: "",
    image: "",
    downloadLink: "",
    openLink: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Tracks edit mode
  const [currentIndex, setCurrentIndex] = useState(0); // For pagination

  // Add or Update Test Paper
  const handleAddOrEdit = () => {
    if (isEditing) {
      setTestPapers((prev) =>
        prev.map((paper) => (paper.id === formData.id ? formData : paper))
      );
      setIsEditing(false);
    } else {
      setTestPapers((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setFormData({
      id: 0,
      title: "",
      description: "",
      teacher: "",
      image: "",
      downloadLink: "",
      openLink: "",
    });
  };

  // Edit a Test Paper
  const handleEdit = (paper: TestPaper) => {
    setFormData(paper);
    setIsEditing(true);
  };

  // Delete a Test Paper
  const handleDelete = (id: number) => {
    setTestPapers((prev) => prev.filter((paper) => paper.id !== id));
  };

  // Pagination Handlers
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= testPapers.length ? 0 : prevIndex + 3));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? testPapers.length - 3 : prevIndex - 3));
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
        <h1 className="text-xl font-bold">Admin: Manage Test Papers</h1>
      </header>

      {/* Admin Form */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h2 className="font-semibold text-lg mb-4">{isEditing ? "Edit Test Paper" : "Add Test Paper"}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Teacher"
            className="border p-2 rounded"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 rounded"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <input
            type="text"
            placeholder="Download Link"
            className="border p-2 rounded"
            value={formData.downloadLink}
            onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
          />
          <input
            type="text"
            placeholder="Open Link"
            className="border p-2 rounded"
            value={formData.openLink}
            onChange={(e) => setFormData({ ...formData, openLink: e.target.value })}
          />
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleAddOrEdit}
        >
          {isEditing ? "Update Test Paper" : "Add Test Paper"}
        </button>
      </div>

      {/* Test Papers Section */}
      <div>
        <div className="flex gap-4">
          {testPapers.slice(currentIndex, currentIndex + 3).map((paper) => (
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
                <div className="mt-4 space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(paper)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(paper.id)}
                  >
                    Delete
                  </button>
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
