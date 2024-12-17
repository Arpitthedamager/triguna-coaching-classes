"use client";

import { FC, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface TestData {
  average: string;  // Changed from 'marksObtained' and 'totalMarks'
  month: string;    // Changed from 'date'
}

interface SubjectData {
  physics: TestData[];
  chemistry: TestData[];
  maths: TestData[];
}

const StatisticsGraph: FC = () => {
  const [data, setData] = useState<SubjectData | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedClass, setSelectedClass] = useState<string>("11");

  // Year navigation functions
  const goToPreviousYear = () => {
    setCurrentYear((prevYear) => prevYear - 1);
  };

  const goToNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1);
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedClass) return;

      try {
        const response = await fetch("/api/teachersgraph", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ className: selectedClass }),
        });

        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        // console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchData();
  }, [selectedClass]);

  if (!data) return <div>Loading graph data...</div>;

  // Filter data based on the selected year
  const filterDataByYear = (subjectData: TestData[]) =>
    subjectData.filter((test) => {
      const testYear = new Date(test.month).getFullYear(); // Get the year from the 'month' field
      return testYear === currentYear;
    });

  // Prepare chart datasets
  const createDataset = (subjectData: TestData[], label: string, color: string) => ({
    label,
    data: filterDataByYear(subjectData).map((test) => parseFloat(test.average)), // Use 'average' instead of 'percentage'
    borderColor: color,
    backgroundColor: color,
    borderWidth: 2,
    tension: 0.3,
    pointBackgroundColor: color,
    pointBorderColor: color,
    pointBorderWidth: 2,
    pointRadius: 5,
  });

  // Chart data
  const chartData = {
    labels: filterDataByYear(data.physics).map((test) =>
      new Date(test.month).toLocaleDateString() // Using the 'month' field here
    ),
    datasets: [
      createDataset(filterDataByYear(data.physics), "Physics", "rgba(255, 99, 132, 1)"),
      createDataset(filterDataByYear(data.chemistry), "Chemistry", "rgba(54, 162, 235, 1)"),
      createDataset(filterDataByYear(data.maths), "Maths", "rgba(75, 192, 192, 1)"),
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "" }, ticks: { autoSkip: true } },
      y: { title: { display: true, text: "Percentage (%)" }, beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-72 w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Test Progress</h2>
        <div className="flex space-x-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-sm bg-primary-a20 hover:bg-primary-a30 px-4 py-2 rounded-lg"
          >
            <option className="hover:bg-primary-a30"value="9">Class 9</option>
            <option className="hover:bg-primary-a30"value="10">Class 10</option>
            <option className="hover:bg-primary-a30" value="11">Class 11</option>
            <option className="hover:bg-primary-a30"value="12">Class 12</option>

            {/* Add more class options if needed */}
          </select>
          <button
            onClick={goToPreviousYear}
            className="text-sm bg-primary-a20 px-4 py-2 rounded-lg"
          >
            Previous Year
          </button>
          <button
            onClick={goToNextYear}
            className="text-sm bg-primary-a20 px-4 py-2 rounded-lg"
          >
            Next Year
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="flex h-full items-center justify-center">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StatisticsGraph;
