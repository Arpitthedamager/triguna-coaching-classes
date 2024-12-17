"use client";

import { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import test from "node:test";

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
      }
    };

    fetchData();
  }, [session]);

  if (!session) return <div>Loading session...</div>;
  if (!data) return <div>Loading graph data...</div>;

  // Filter the data based on the current month
  const filterDataByMonth = (subjectData: TestData[]) => {
    return subjectData.filter((test) => {
      const testDate = new Date(test.date);
      const testMonth = testDate.toLocaleString("default", { month: "long", year: "numeric" });
      return testMonth === currentMonth;
    });
  };
  console.log();

 

  // Prepare chart datasets
  const createDataset = (subjectData: TestData[], label: string, color: string) => ({
    label,
    data: subjectData.map((test) => test.percentage), // Use the 'percentage' field directly
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
    labels: filterDataByMonth(data.physics).map((test) => new Date(test.date).toLocaleDateString()),
    datasets: [
      createDataset(filterDataByMonth(data.physics), "Physics", "rgba(255, 99, 132, 1)"),
      createDataset(filterDataByMonth(data.chemistry), "Chemistry", "rgba(54, 162, 235, 1)"),
      createDataset(filterDataByMonth(data.maths), "Maths", "rgba(75, 192, 192, 1)"),
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
      x: { title: { display: true, text: "Test Date" }, ticks: { autoSkip: true } },
      y: { title: { display: true, text: "Percentage (%)" }, beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-72 w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatisticsGraph;
