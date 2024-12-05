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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Payment {
  month: string;
  year: string;
  type: "Online" | "Offline";
  amount: number; // in USD
}

const FeeData: FC = () => {
  // State for payments
  const [userPayments, setUserPayments] = useState<Payment[]>([
    { month: "January", year: "2024", type: "Online", amount: 100 },
    { month: "February", year: "2024", type: "Offline", amount: 50 },
    { month: "March", year: "2024", type: "Online", amount: 150 },
  ]);

  // Conversion rate (1 USD = 83 INR as of current conversion rate)
  const usdToInr = 83;

  // Process payment data for the chart
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
  }, [userPayments]);

  // State for form inputs
  const [formData, setFormData] = useState<Payment>({
    month: "",
    year: "2024",
    type: "Online",
    amount: 0,
  });

  // Handlers
  const handleAddPayment = () => {
    setUserPayments((prev) => [...prev, { ...formData, amount: Number(formData.amount) }]);
    setFormData({ month: "", year: "2024", type: "Online", amount: 0 });
  };

  const handleEditPayment = (index: number) => {
    const updatedPayments = [...userPayments];
    updatedPayments[index] = { ...formData, amount: Number(formData.amount) };
    setUserPayments(updatedPayments);
    setFormData({ month: "", year: "2024", type: "Online", amount: 0 });
  };

  const handleDeletePayment = (index: number) => {
    setUserPayments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-3xl p-8 pt-0">
      <h2 className="text-xl font-bold mb-4">Admin: Fee Data Management</h2>
      {/* Admin Form */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Add/Edit Payment</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Month (e.g., January)"
            className="border p-2 rounded"
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount (USD)"
            className="border p-2 rounded"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          />
          <select
            className="border p-2 rounded"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as "Online" | "Offline" })}
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleAddPayment}
          >
            Add Payment
          </button>
        </div>
      </div>

      {/* Display Records */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Payments</h3>
        <ul>
          {userPayments.map((payment, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>
                {payment.month}, {payment.year} - {payment.type} - ₹{(payment.amount * usdToInr).toFixed(0)}
              </span>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white p-1 rounded"
                  onClick={() => setFormData(payment)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDeletePayment(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chart */}
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
