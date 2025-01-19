import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

const StudyMaterial: FC = () => {
  const [studyMaterials, setStudyMaterials] = useState<any[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    teacher: "",
    image: "",
    downloadLink: "",
    openLink: "",
    classLevel: "9", // default class level
  });
  const [selectedClass, setSelectedClass] = useState<string>("9"); // Default to "9"
  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setNewMaterial((prev) => ({ ...prev, [name]: value }));
  // };

  const toggleModal = () => setShowModal((prev) => !prev);

  const fetchStudyMaterials = async () => {
    const response = await fetch(`/api/studymaterials?class=${selectedClass}`); // Send selected class
    const data = await response.json();
    setStudyMaterials(data);
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClass = e.target.value;
    console.log("Selected class: ", newClass); // Log the selected class to debug
    setSelectedClass(newClass); // Set the selected class level
    fetchStudyMaterials(); // Fetch materials for the new class
    fetchRecentlyViewed(); // Fetch recently viewed for the new class
  };

  const fetchRecentlyViewed = async () => {
    try {
      const response = await fetch(`/api/recentlyviewed`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecentlyViewed(data);
      // console.log("Fetched recently viewed materials:", data);
    } catch (error) {
      console.error("Failed to fetch recently viewed materials:", error);
    }
  };

  useEffect(() => {
    fetchStudyMaterials();
    fetchRecentlyViewed();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/studymaterials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMaterial),
    });

    if (response.ok) {
      const addedMaterial = await response.json();
      setStudyMaterials((prev) => [...prev, addedMaterial]);
      setShowModal(false); // Close the modal
    } else {
      alert("Failed to add study material");
    }
  };

  const addRecentlyViewed = async (materialId: string) => {
    try {
      const response = await fetch("/api/recentlyviewed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ materialId, email: "user@example.com" }), // Replace with user's email dynamically
      });

      if (!response.ok) {
        fetchRecentlyViewed();

        const errorData = await response.json();
        console.error(
          "Failed to add recently viewed material:",
          errorData.error
        );
      }
    } catch (error) {
      console.error("Error adding recently viewed material:", error);
    }
  };

  const filteredMaterials = studyMaterials.filter((material) =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this material?");
    if (!confirmed) return;

    const response = await fetch(`/api/studymaterials?id=${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setStudyMaterials((prev) =>
        prev.filter((material) => material._id !== id)
      );
    } else {
      alert("Failed to delete material");
    }
  };
  const filteredRecentlyViewed = recentlyViewed
    .map((viewed) => {
      const material = studyMaterials.find(
        (mat) => mat._id.toString() === viewed.materialId._id.toString()
      );
      return material ? { ...material, visitedDate: viewed.visitedDate } : null; // Spread material directly
    })
    .filter(Boolean) // Remove null entries where material is not found
    .sort(
      (a, b) =>
        new Date(b.visitedDate).getTime() - new Date(a.visitedDate).getTime() // Sort by visitedDate descending
    );

  // console.log("Filtered recently viewed materials:", filteredRecentlyViewed);

  // console.log("Filtered recently viewed materials:", filteredRecentlyViewed);

  const sortedRecentlyAdded = [...studyMaterials].sort(
    (a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexViewed, setCurrentIndexViewed] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sortedRecentlyAdded.length - 3 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sortedRecentlyAdded.length - 3 ? 0 : prevIndex + 1
    );
  };

  const handlePrevClickViewed = () => {
    setCurrentIndexViewed((prevIndex) =>
      prevIndex === 0 ? filteredRecentlyViewed.length - 3 : prevIndex - 1
    );
  };

  const handleNextClickViewed = () => {
    setCurrentIndexViewed((prevIndex) =>
      prevIndex === filteredRecentlyViewed.length - 3 ? 0 : prevIndex + 1
    );
  };

  const renderMaterials = (materials: any[]) =>
    materials.map((material, index) => (
      <motion.div
        key={material._id} // Use _id as the unique key
        className="card bg-transparent p-4 bg-white rounded-lg shadow hover:shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        <img
          src={material.image}
          alt={material.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h4 className="font-bold text-gray-800">{material.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{material.description}</p>
        <span className="text-xs text-gray-500">By {material.teacher}</span>
        <div className="mt-4 space-x-4">
          <a
            href={material.downloadLink}
            className="text-primary-a20 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => addRecentlyViewed(material._id)} // Add to recently viewed
          >
            Download PDF
          </a>

          <a
            href={material.openLink}
            className="text-green-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => addRecentlyViewed(material._id)} // Add to recently viewed
          >
            Open PDF
          </a>
          <button
            onClick={() => handleDelete(material._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </motion.div>
    ));

  return (
    <motion.div
      className="bg-transparent text-gray-600 p-6 my-8 pt-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with search bar */}
      <header className="flex items-center justify-between p-4 bg-transparent">
        <h1 className="text-xl font-bold text-SessionContext">
          My StudyMaterial
        </h1>
        <motion.div
          className="relative flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered rounded-full w-full pr-12 text-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="bg-primary-a30 right-0 top-1/2 transform -translate-y-1/2 absolute text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
              <span>👤</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Modal for adding new study material */}
      {/* {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg w-96 relative z-60"
            onClick={(e) => e.stopPropagation()} // Prevent modal closure when clicking inside
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Add New Material
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newMaterial.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newMaterial.description}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Teacher</label>
                <input
                  type="text"
                  name="teacher"
                  value={newMaterial.teacher}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={newMaterial.image}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Download Link</label>
                <input
                  type="text"
                  name="downloadLink"
                  value={newMaterial.downloadLink}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Open Link</label>
                <input
                  type="text"
                  name="openLink"
                  value={newMaterial.openLink}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Class Level</label>
                <select
                  name="classLevel"
                  value={newMaterial.classLevel}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                >
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-a20 text-white py-2 px-4 rounded-lg"
                >
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      {/* <button
        onClick={toggleModal}
        className="bg-primary-a20 text-white py-2 px-4 rounded-lg hover:bg-primary-a20 transition duration-300"
      >
        Add New Material
      </button> */}
      <select
        className="select select-bordered text-gray-600"
        value={selectedClass}
        onChange={handleClassChange}
      >
        <option value="9">Class 9</option>
        <option value="10">Class 10</option>
        <option value="11">Class 11</option>
        <option value="12">Class 12</option>
      </select>

      {/* Displaying search results (if any) */}
      {searchQuery && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Search Results
          </h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {renderMaterials(filteredMaterials)}
          </div>
        </div>
      )}

      {/* Recently Viewed Section */}
      {/* <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recently Viewed
        </h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {renderMaterials(
            filteredRecentlyViewed.slice(
              currentIndexViewed,
              currentIndexViewed + 3
            )
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevClickViewed}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg"
          >
            Prev
          </button>
          <button
            onClick={handleNextClickViewed}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg"
          >
            Next
          </button>
        </div> */}
      {/* </div> */}

      {/* Recently Added Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recently Added
        </h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {renderMaterials(
            sortedRecentlyAdded.slice(currentIndex, currentIndex + 3)
          )}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg"
          >
            Prev
          </button>
          <button
            onClick={handleNextClick}
            className="bg-primary-a20 text-white py-2 px-4 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* All Materials Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          All Materials
        </h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {renderMaterials(
            studyMaterials.sort((a, b) => a.title.localeCompare(b.title))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudyMaterial;
