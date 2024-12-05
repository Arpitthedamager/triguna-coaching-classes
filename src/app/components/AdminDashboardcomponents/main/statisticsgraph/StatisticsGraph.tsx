"use client";

import { FC, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

// Registering the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface TestData {
  testDate: string;
  testPercentage: number;
}

const StatisticsGraph: FC = () => {
  // Test data with test date and percentage
  const initialTestData: TestData[] = [
    { testDate: "2024-12-01", testPercentage: 90 },
    { testDate: "2024-12-02", testPercentage: 60 },
    { testDate: "2024-12-05", testPercentage: 40 },
    { testDate: "2024-11-01", testPercentage: 90 },
    { testDate: "2024-11-03", testPercentage: 90 },
    { testDate: "2024-11-10", testPercentage: 80 },
    { testDate: "2024-10-20", testPercentage: 70 },
    { testDate: "2024-10-25", testPercentage: 75 },
    { testDate: "2024-09-30", testPercentage: 85 },
  ];

  const [testData, setTestData] = useState<TestData[]>(initialTestData);
  const [currentMonth, setCurrentMonth] = useState<string>("12");
  const [newTestDate, setNewTestDate] = useState<string>("");
  const [newTestPercentage, setNewTestPercentage] = useState<number>(0);
  const [editTestData, setEditTestData] = useState<TestData | null>(null);

  // Group data by month
  const groupByMonth = (data: TestData[]) => {
    return data.reduce((acc, curr) => {
      const month = curr.testDate.split("-")[1]; // Extract month from date
      if (!acc[month]) acc[month] = [];
      acc[month].push(curr);
      return acc;
    }, {} as Record<string, TestData[]>);
  };

  const groupedData = groupByMonth(testData);
  const months = Object.keys(groupedData); // Array of months (e.g., "12", "11", etc.)

  // Get the test dates and percentages for the selected month
  const selectedMonthData = groupedData[currentMonth];
  const dates = selectedMonthData.map((entry) => entry.testDate);
  const percentages = selectedMonthData.map((entry) => entry.testPercentage);

  // Chart data for the test progress
  const chartData = {
    labels: dates, // X-axis: Test dates
    datasets: [
      {
        label: "Test Percentage (%)", // Dataset label
        data: percentages, // Test percentages
        backgroundColor: "rgba(148, 84, 255, 0.6)", // Line color
        borderColor: "rgba(148, 84, 255, 1)",
        borderWidth: 2,
        fill: false, // No fill under the line
        tension: 0.3, // Smooth curve
        pointBackgroundColor: "rgba(148, 84, 255, 1)", // Point color
        pointBorderColor: "rgba(148, 84, 255, 1)",
        pointBorderWidth: 2,
        pointRadius: 5, // Larger points for emphasis
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw}%`, // Format tooltip to show percentage
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
        },
        ticks: {
          autoSkip: true, // Skip some dates to avoid clutter
        },
      },
      y: {
        title: {
          display: true,
          text: "Percentage",
        },
        beginAtZero: true,
        max: 100, // Max value for percentage
      },
    },
  };

  // Functions to navigate between months
  const goToPreviousMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex > 0) {
      setCurrentMonth(months[currentIndex - 1]);
    }
  };

  const goToNextMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex < months.length - 1) {
      setCurrentMonth(months[currentIndex + 1]);
    }
  };

  // Add or Edit Test Data
  const handleAddOrEditTestData = () => {
    if (editTestData) {
      // Update existing test data
      setTestData(testData.map((item) =>
        item.testDate === editTestData.testDate ? { ...item, testPercentage: newTestPercentage } : item
      ));
      setEditTestData(null); // Reset edit mode
    } else {
      // Add new test data
      setTestData([
        ...testData,
        { testDate: newTestDate, testPercentage: newTestPercentage },
      ]);
    }

    // Reset form after adding/editing
    setNewTestDate("");
    setNewTestPercentage(0);
  };

  // Delete Test Data
  const handleDeleteTestData = (testDate: string) => {
    setTestData(testData.filter((item) => item.testDate !== testDate));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-72 w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Test Progress</h2>
        <div className="flex space-x-4">
          <button onClick={goToPreviousMonth} className="text-sm bg-primary-a20 px-4 py-2 rounded-lg">Previous</button>
          <button onClick={goToNextMonth} className="text-sm bg-primary-a20 px-4 py-2 rounded-lg">Next</button>
        </div>
      </div>

      {/* Chart.js Graph */}
      <div className="flex h-full items-center justify-center mb-4">
        <Line data={chartData} options={options} />
      </div>

      {/* Admin Controls: Add or Edit Test Data */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Add / Edit Test Data</h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Test Date (YYYY-MM-DD)"
            value={newTestDate}
            onChange={(e) => setNewTestDate(e.target.value)}
            className="input input-bordered"
          />
          <input
            type="number"
            placeholder="Test Percentage"
            value={newTestPercentage}
            onChange={(e) => setNewTestPercentage(Number(e.target.value))}
            className="input input-bordered"
          />
          <button
            onClick={handleAddOrEditTestData}
            className="btn btn-primary mt-3"
          >
            {editTestData ? "Update Test Data" : "Add Test Data"}
          </button>
        </div>
      </div>

      {/* Admin Controls: List of Test Data */}
      <div className="overflow-x-auto">
        <table className="table w-full text-neutral">
          <thead>
            <tr>
              <th className="text-base">Test Date</th>
              <th className="text-base">Percentage</th>
              <th className="text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testData.map((item, index) => (
              <tr key={index}>
                <td>{item.testDate}</td>
                <td>{item.testPercentage}%</td>
                <td>
                  <button
                    onClick={() => {
                      setEditTestData(item);
                      setNewTestDate(item.testDate);
                      setNewTestPercentage(item.testPercentage);
                    }}
                    className="btn btn-sm btn-secondary mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTestData(item.testDate)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatisticsGraph;
