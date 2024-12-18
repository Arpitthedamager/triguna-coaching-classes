import { FC, useState, useEffect } from "react";

const AddStudentOrTestButton: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<"student" | "test">("student");

  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");

  const [studentName, setStudentName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [testDate, setTestDate] = useState("");
  const [marks, setMarks] = useState<{ [email: string]: number | "" }>({});
  const [outOfMarks, setOutOfMarks] = useState<number | "">("");

  const [students, setStudents] = useState<
    { userName: string; userEmail: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setStudentName("");
    setUserEmail("");
    setTestDate("");
    setMarks({});
    setOutOfMarks("");
    setErrorMessage(""); // Reset error message
  };

  const fetchStudents = async () => {
    if (!className || !subject) {
      setStudents([]);
      return;
    }

    setLoading(true); // Start loading
    try {
      // Correctly construct the API URL
      const response = await fetch(
        `/api/database/addtest?class=${className}&subject=${subject}`
      );
      if (response.ok) {
        const data = await response.json();
        setStudents(data.students); // Update the students list
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setErrorMessage("An error occurred while fetching students.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleAddStudent = async () => {
    const existingStudent = students.find(
      (student) => student.userEmail === userEmail
    );
    if (existingStudent) {
      setErrorMessage("Student with this email already exists.");
      return;
    }

    if (!studentName || !userEmail) {
      alert("Please fill all student fields!");
      return;
    }

    const newStudent = {
      className,
      subject,
      userName: studentName,
      userEmail,
    };

    try {
      const response = await fetch("/api/database/addstudents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        alert("Student added successfully");
        resetForm();
        fetchStudents(); // Refresh the list of students
      } else {
        alert("Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleAddTest = async () => {
    if (!testDate) {
      alert("Please select a test date!");
      return;
    }

    const incompleteStudents = students.filter(
      (student) => !marks[student.userEmail]
    );

    if (incompleteStudents.length > 0) {
      const warning = `Marks not entered for: ${incompleteStudents
        .map((s) => s.userName)
        .join(", ")}`;
      if (!confirm(`${warning}. Do you still want to proceed?`)) {
        return;
      }
    }

    // Validate marks not exceeding outOfMarks
    const invalidMarks = Object.values(marks).some(
      (mark) => mark !== "" && mark > (outOfMarks || 0)
    );

    if (invalidMarks) {
      alert("Marks cannot exceed the out of marks value.");
      return;
    }

    const testDetails = {
      className,
      subject,
      testDate,
      marks,
      outOfMarks,
    };

    try {
      const response = await fetch("/api/database/addtest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testDetails),
      });
      console.log(testDetails);

      if (response.ok) {
        alert("Test added successfully");
        resetForm();
      } else {
        alert("Failed to add test");
      }
    } catch (error) {
      console.error("Error adding test:", error);
    }
  };

  const isValidForm = className && subject;

  useEffect(() => {
    fetchStudents(); // Fetch students whenever class or subject changes
  }, [className, subject]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary mb-4"
      >
        + Add Student/Test
      </button>

      {showModal && (
        <div className="fixed inset-0 flex overflow-auto items-center justify-center text-gray-500 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl text-gray-500"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-4">Add Student/Test</h3>

            <div className="mb-4">
              <label className="block mb-1">Class</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Class</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            {loading ? (
              <p>Loading students...</p>
            ) : students.length > 0 ? (
              <div>
                <h4 className="text-lg font-bold">Students:</h4>
                {students.map((student) => (
                  <div key={student.userEmail}>
                    <span>{student.userName}</span> -{" "}
                    <span>{student.userEmail}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No students found.</p>
            )}

            {isValidForm && (
              <div className="mb-4 flex space-x-2">
                <button
                  className={`btn ${mode === "student" ? "btn-primary" : ""}`}
                  onClick={() => setMode("student")}
                >
                  Add Student
                </button>
                <button
                  className={`btn ${mode === "test" ? "btn-primary" : ""}`}
                  onClick={() => setMode("test")}
                >
                  Add Test
                </button>
              </div>
            )}

            {mode === "student" && isValidForm && (
              <div className="">
                <div className="mb-4">
                  <label className="block mb-1">Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}

                <button
                  onClick={handleAddStudent}
                  className="btn btn-success w-full"
                >
                  Save Student
                </button>
              </div>
            )}

            {mode === "test" && isValidForm && (
              <>
                <div className="mb-4">
                  <label className="block mb-1">Test Date</label>
                  <input
                    type="date"
                    value={testDate}
                    onChange={(e) => setTestDate(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-2">Marks</h4>
                  <div className="mb-4">
                    <label className="block mb-1">Out of Marks</label>
                    <input
                      type="number"
                      value={outOfMarks}
                      onChange={(e) => setOutOfMarks(Number(e.target.value))}
                      className="input input-bordered w-full"
                    />
                  </div>
                  {students.map((student) => (
                    <div key={student.userEmail} className="mb-2">
                      <label className="block mb-1">{student.userName}</label>
                      <input
                        type="number"
                        value={marks[student.userEmail] || ""}
                        onChange={(e) =>
                          setMarks({
                            ...marks,
                            [student.userEmail]: Math.min(
                              Number(e.target.value),
                              outOfMarks || 0
                            ),
                          })
                        }
                        className="input input-bordered w-full"
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddTest}
                  className="btn btn-success w-full"
                >
                  Save Test
                </button>
              </>
            )}

            {!isValidForm && (
              <p className="text-red-500 mt-4">
                Please select both Class and Subject to proceed.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudentOrTestButton;
