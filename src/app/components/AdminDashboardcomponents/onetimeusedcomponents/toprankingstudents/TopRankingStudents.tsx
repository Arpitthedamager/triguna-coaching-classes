"use client";
import React, { useState } from "react";

interface Student {
  name: string;
  rank: string;
  info: string;
  imageUrl: string;
}

const TopRankingStudents = () => {
  // State for students
  const [students, setStudents] = useState<Student[]>([
    { name: "Ram", rank: "92%", info: "in class 12th", imageUrl: "/images/ram.jpg" },
    { name: "Diksha", rank: "95%", info: "in class 10th", imageUrl: "/images/diksha.jpg" },
    { name: "Harsh", rank: "98.6%ile", info: "in Jee Mains", imageUrl: "/images/harsh.jpg" },
    { name: "Abhishek", rank: "97%ile", info: "in Jee Mains", imageUrl: "/images/abhishek.jpg" },
    { name: "Mohit Gola", rank: "99%ile", info: "in Advance", imageUrl: "/images/mohit.jpg" },
    { name: "Agrim", rank: "95%", info: "in class 12th", imageUrl: "/images/agrim.jpg" },
    { name: "Simran", rank: "94%", info: "in class 11th", imageUrl: "/images/simran.jpg" },
    { name: "Raj", rank: "93%", info: "in class 10th", imageUrl: "/images/raj.jpg" },
  ]);

  // State for form inputs
  const [formData, setFormData] = useState<Student>({
    name: "",
    rank: "",
    info: "",
    imageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [showAll, setShowAll] = useState(false); // Toggle scrollable list

  // Limit displayed students
  const displayedStudents = showAll ? students : students.slice(0, 6);

  // Add or Update Student
  const handleAddOrEdit = () => {
    if (isEditing) {
      setStudents((prev) =>
        prev.map((student) => (student.name === formData.name ? formData : student))
      );
      setIsEditing(false);
    } else {
      setStudents((prev) => [...prev, formData]);
    }

    // Reset form
    setFormData({ name: "", rank: "", info: "", imageUrl: "" });
  };

  // Edit Student
  const handleEdit = (student: Student) => {
    setFormData(student);
    setIsEditing(true);
  };

  // Delete Student
  const handleDelete = (name: string) => {
    setStudents((prev) => prev.filter((student) => student.name !== name));
  };

  return (
    <div className="p-8 my-6 rounded-3xl bg-primary-content">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Meet Our Stars</h1>
        <p className="text-lg text-gray-600">Explore our list Toppers of 2023-24</p>
      </div>

      {/* Admin Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="font-semibold text-lg mb-4">
          {isEditing ? "Edit Student" : "Add New Student"}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Rank"
            value={formData.rank}
            onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Info"
            value={formData.info}
            onChange={(e) => setFormData({ ...formData, info: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleAddOrEdit}
        >
          {isEditing ? "Update Student" : "Add Student"}
        </button>
      </div>

      {/* Student Grid */}
      <div
        className={`${
          showAll ? "max-h-[500px] overflow-y-auto" : ""
        } rounded-lg shadow-inner p-4`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStudents.map((student, index) => (
            <div
              key={index}
              className="bg-primary-a40 text-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={student.imageUrl}
                alt={student.name}
                className="w-24 h-24 object-cover rounded-full border-2 border-yellow-400 mb-4"
              />
              <h2 className="text-xl font-semibold">{student.name}</h2>
              <p className="text-yellow-400 font-medium">{student.rank}</p>
              <p className="text-gray-300">{student.info}</p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(student.name)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "Many More" Button */}
      {!showAll && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-orange-500 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-orange-600"
          >
            Many More
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRankingStudents;
