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

const TestProgressGraph: FC = () => {
  // Test data with test date and percentage
  const testData: TestData[] = [
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

  // Group data by month
  const groupByMonth = (data: TestData[]) => {
    return data.reduce((acc, curr) => {
      const month = curr.testDate.split("-")[1]; // Extract month from date
      if (!acc[month]) acc[month] = [];
      acc[month].push(curr);
      return acc;
    }, {} as Record<string, TestData[]>);
  };

  // Group data by month
  const groupedData = groupByMonth(testData);
  const months = Object.keys(groupedData); // Array of months (e.g., "12", "11", etc.)
  
  // Initial state: display data for December (month "12")
  const [currentMonth, setCurrentMonth] = useState(months[0]);

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
          // text: "Test Date",
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-72 w-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-semibold text-gray-800">Test Progress</h2>
        <div className="flex space-x-4">
          <button onClick={goToPreviousMonth} className="text-sm bg-primary-a20 px-4 py-2 rounded-lg">Previous</button>
          <button onClick={goToNextMonth} className="text-sm bg-primary-a20 px-4 py-2 rounded-lg">Next</button>
        </div>
      </div>

      {/* Chart.js Graph */}
      <div className="flex h-full items-center justify-center">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TestProgressGraph;
