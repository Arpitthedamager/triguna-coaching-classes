import { FC, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeeData: FC = () => {
  // Sample Data: User payments
  const userPayments = [
    { month: "January", year: "2024", type: "Online", amount: 100 }, // 100 USD
    { month: "February", year: "2024", type: "Offline", amount: 50 }, // 50 USD
    { month: "March", year: "2024", type: "Online", amount: 150 }, // 150 USD
    { month: "April", year: "2024", type: "Offline", amount: 200 }, // 200 USD
    { month: "May", year: "2024", type: "Online", amount: 250 }, // 250 USD
    { month: "June", year: "2024", type: "Offline", amount: 300 }, // 300 USD
    // Add more data as needed
  ];

  // Conversion rate (1 USD = 83 INR as of current conversion rate)
  const usdToInr = 83;

  // Calculate total payments for each month and type (online/offline) in INR
  const processPaymentData = () => {
    const months = ["January", "February", "March", "April", "May", "June"];
    const onlinePayments = new Array(months.length).fill(0);
    const offlinePayments = new Array(months.length).fill(0);

    userPayments.forEach((payment) => {
      const monthIndex = months.indexOf(payment.month);
      if (monthIndex !== -1) {
        const amountInINR = payment.amount * usdToInr; // Convert to INR
        if (payment.type === "Online") {
          onlinePayments[monthIndex] += amountInINR;
        } else {
          offlinePayments[monthIndex] += amountInINR;
        }
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Online Payments (INR)",
          data: onlinePayments,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Offline Payments (INR)",
          data: offlinePayments,
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    setChartData(processPaymentData());
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 pt-0">
      {/* Display Graph */}
      <div className="mt-8">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Payments per Month (Online vs Offline) - INR",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem: any) =>
                      `₹${(tooltipItem.raw as number).toFixed(0)}`, // Assert raw as number
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Month",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Amount (INR)",
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default FeeData;
