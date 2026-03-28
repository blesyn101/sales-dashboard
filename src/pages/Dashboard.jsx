import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import {
  Bar,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("KEY:", import.meta.env.VITE_SUPABASE_KEY);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2024-02-25"); // First date in your data
  const [endDate, setEndDate] = useState("2024-03-03"); // Last date in your data

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch sales data from Supabase
      const { data: salesData, error } = await supabase
        .from("sales")
        .select("date, revenue, orders")
        .gte("date", startDate)
        .lte("date", endDate)
        .order("date", { ascending: true });
      console.log("Filtering by:", { startDate, endDate });

      if (error) {
        throw error;
      }

      setData(salesData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  let totalRevenue = 0;
  let totalOrders = 0;

  if (data.length > 0) {
    totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);
    totalOrders = data.reduce((sum, row) => sum + row.orders, 0);
  }

  let averageRevenuePerDay = 0;
  let averageOrdersPerDay = 0;
  let highestRevenueDays = [];
  if (data.length > 0) {
    const daysCount = data.length;
    averageRevenuePerDay = totalRevenue / daysCount;
    averageOrdersPerDay = totalOrders / daysCount;
    const maxRevenue = Math.max(...data.map((row) => row.revenue));
    highestRevenueDays = data
      .filter((row) => row.revenue === maxRevenue)
      .map((row) => row.date);
  }

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-semibold mb-4">Sales Dashboard</h1>

        {/* <div className='mb-6'>Total Revenue: ${data.reduce((sum, row) => sum + row.revenue, 0).toFixed(2)}</div> */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-blue-600">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Average revenue per day</p>
            <p className="text-3xl font-bold text-blue-600">
              ${averageRevenuePerDay.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Average orders per day</p>
            <p className="text-3xl font-bold text-blue-600">
              {averageOrdersPerDay.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Highest revenue days</p>
            <p className="text-3xl font-bold text-green-600">
              {highestRevenueDays.join(", ")}
            </p>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded py-2 px-4"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded py-2 px-4"
            />
          </div>
        </div>

        <div className="charts-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="chart revenueChart bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart ordersChart bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Orders Trend</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  label={{
                    position: "insideBottomRight",
                    value: "Date",
                    offset: -10,
                  }}
                />
                <YAxis
                  label={{
                    position: "insideTopLeft",
                    value: "Orders",
                    angle: -90,
                    dy: 60,
                  }}
                />
                <Bar dataKey="orders" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className=" chart rawData md:col-span-2 lg:col-span-1 mt-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Revenue</th>
                  <th className="border px-4 py-2">Orders</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{row.date}</td>
                    <td className="border px-4 py-2">
                      ${row.revenue.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{row.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={fetchData}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Data
        </button>
      </div>
    </>
  );
}

export default Dashboard;
