import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from "recharts";

// Card
const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-6 text-center">
    <p className="text-gray-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [lineData, setLineData] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const statsRes = await axios.get(
          "http://localhost:8000/api/admin/analytics",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(statsRes.data);

        const bookingsRes = await axios.get(
          "http://localhost:8000/api/admin/bookings?limit=3",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Bookings API response:", bookingsRes.data);
        setBookings(bookingsRes.data);

        const packagesRes = await axios.get(
          "http://localhost:8000/api/admin/packages?limit=3",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPackages(packagesRes.data);

        const lineRes = await axios.get(
          "http://localhost:8000/api/admin/bookingspermonth",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLineData(lineRes.data);

      } catch (error) {
        console.error("Error fetching analytics:", error);
        setStats({
          totalUsers: 0,
          totalAdmins: 0,
          totalBookings: 0,
          totalRevenue: 0,
          paymentStats: [],
          bookingStatus: []
        });
        setBookings([]);
        setPackages([]);
        setLineData([]);
      }
    };

    fetchAnalytics();
  }, [token]);


  if (!stats) return null;

  const pieData = stats.paymentStats.map(s => ({
    name: s._id,
    value: s.count
  }));

  const barData = stats.bookingStatus.map(s => ({
    status: s._id,
    count: s.count
  }));

  return (
    <div className="space-y-6 p-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Pie */}
        <div className="bg-white rounded-xl shadow p-4 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Payment Status</h3>

          {pieData.length > 0 && (
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6">
          <Card title="Total Users" value={stats.totalUsers} />
          <Card title="Total Admins" value={stats.totalAdmins} />
          <Card title="Total Bookings" value={stats.totalBookings} />
          <Card title="Total Revenue" value={`Rs. ${stats.totalRevenue}`} />
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Line */}
        <div className="bg-white rounded-xl shadow p-4 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Bookings Over Months</h3>

          {lineData.length > 0 && (
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Bar */}
        <div className="bg-white rounded-xl shadow p-4 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Booking Status</h3>

          {barData.length > 0 && (
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-sm text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Package</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookings.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{b.userName}</td>
                    <td className="px-4 py-3">{b.packageName}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${b.status === "confirmed" && "bg-green-100 text-green-700"}
                  ${b.status === "pending" && "bg-yellow-100 text-yellow-700"}
                  ${b.status === "cancelled" && "bg-red-100 text-red-700"}
                `}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => navigate("/admindashboard/bookings")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View All Bookings
          </button>
        </div>

        {/* Recent Packages */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Packages</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 text-sm text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {packages.map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3">Rs.{p.price}</td>
                    <td className="px-4 py-3">{p.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => navigate("/admindashboard/packages")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View All Packages
          </button>
        </div>

      </div>



    </div>
  );
};

export default Analytics;
