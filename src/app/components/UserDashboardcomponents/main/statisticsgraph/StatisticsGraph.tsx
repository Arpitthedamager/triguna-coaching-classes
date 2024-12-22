"use client";

import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface TestData {
  date: string;
  marksObtained: number;
  totalMarks: number;
  percentage?: number; // Add the percentage field
}

interface SubjectData {
  physics: TestData[];
  chemistry: TestData[];
  maths: TestData[];
}

const StatisticsGraph: FC = () => {
  const { data: session } = useSession(); // Get user session
  const [data, setData] = useState<SubjectData | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentMonth, setCurrentMonth] = useState<string>(new Date().toLocaleString("default", { month: "long", year: "numeric" }));

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    const currentDate = new Date(currentMonth);
    currentDate.setMonth(currentDate.getMonth() - 1);
    setCurrentMonth(currentDate.toLocaleString("default", { month: "long", year: "numeric" }));
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    const currentDate = new Date(currentMonth);
    currentDate.setMonth(currentDate.getMonth() + 1);
    setCurrentMonth(currentDate.toLocaleString("default", { month: "long", year: "numeric" }));
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email || !session?.user?.class) return; // Ensure email and class exist

      try {
        const response = await fetch("/api/statisticsgraph", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ className: session.user.class, userEmail: session.user.email }),
        });
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [session]);

  // Filter the data based on the current month
  const filterDataByMonth = (subjectData: TestData[]) => {
    return subjectData.filter((test) => {
      const testDate = new Date(test.date);
      const testMonth = testDate.toLocaleString("default", { month: "long", year: "numeric" });
      return testMonth === currentMonth;
    });
  };

  // Determine subject names based on the class
  const getSubjectNames = () => {
    const userClass = String(session?.user?.class); // Convert class to string for comparison
    if (userClass === "9" || userClass === "10") {
      return { physics: "SST", chemistry: "Science", maths: "Maths" };
    }
    return { physics: "Physics", chemistry: "Chemistry", maths: "Maths" };
  };

  const subjectNames = getSubjectNames();

  // Prepare chart datasets
  const createDataset = (subjectData: TestData[], label: string, color: string) => ({
    label,
    data: subjectData.map((test) => test.percentage || 0), // Default to 0 if no percentage
    borderColor: color,
    backgroundColor: color,
    borderWidth: 2,
    fill: false,
    tension: 0.3,
    pointBackgroundColor: color,
    pointBorderColor: color,
    pointBorderWidth: 2,
    pointRadius: 5,
  });

  // Prepare chart data with labels (dates) and datasets (subjects)
  const chartData = {
    labels: filterDataByMonth(data?.physics || []).map((test) =>
      new Date(test.date).toLocaleDateString()
    ),
    datasets: [
      createDataset(filterDataByMonth(data?.physics || []), subjectNames.physics, "rgba(255, 99, 132, 1)"),
      createDataset(filterDataByMonth(data?.chemistry || []), subjectNames.chemistry, "rgba(54, 162, 235, 1)"),
      createDataset(filterDataByMonth(data?.maths || []), subjectNames.maths, "rgba(75, 192, 192, 1)"),
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw}%`, // Show percentage
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "" }, ticks: { autoSkip: true } },
      y: { title: { display: true, text: "Percentage (%)" }, beginAtZero: true, max: 100 },
    },
  };

  const hasData =
    chartData.datasets.some((dataset) => dataset.data.some((value) => value > 0)) &&
    chartData.labels.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 md:p-6 h-72 w-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Test Progress</h2>
        <div className="flex space-x-4">
          <button onClick={goToPreviousMonth} className="text-sm bg-primary-a20 px-4 py-2 rounded-lg">
            Previous
          </button>
          <button onClick={goToNextMonth} className="text-sm bg-primary-a20 px-4 py-2 rounded-lg">
            Next
          </button>
        </div>
      </div>

      <div className="flex h-full items-center justify-center">
        {!loading ? (
          hasData ? (
            <Line data={chartData} options={options} />
          ) : (
            <Line data={{ labels: [], datasets: [] }} options={options} /> // Empty graph while loading
          )
        ) : (
          <Line data={{ labels: [], datasets: [] }} options={options} /> // Empty graph while loading
        )}
      </div>
    </div>
  );
};

export default StatisticsGraph;
