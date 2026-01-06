import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSuitcase, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";

// ================= Stat Card =================
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
    <div className="text-blue-600 text-2xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  </div>
);

// ================= User Overview =================
const UserOverview = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingTrips: 0,
    totalSpent: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user bookings
        const bookingsRes = await axios.get("/api/bookings/mybookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookings = bookingsRes.data || [];
        setRecentBookings(bookings);

        setStats({
          totalBookings: bookings.length,
          upcomingTrips: bookings.filter((b) => b.status === "confirmed").length,
          totalSpent: bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0),
        });

        // Fetch top packages
        const packagesRes = await axios.get("/api/packages");
        setPackages(packagesRes.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching user dashboard data:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="space-y-12 p-6">
      {/* Welcome Banner */}
      <div className="bg-[url('/userdashh.jpg')] bg-cover bg-center rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.name || "Traveler"} 👋
        </h2>
        <p className="mt-2 text-sm text-white/90">
          Manage your bookings and explore new destinations
        </p>
      </div>

      {/* Stats & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-7">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Recent Bookings</h3>
            <Link
              to="/userdashboard/bookings/mybookings"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Package</th>
                  <th className="py-3 px-4 text-center">Date</th>
                  <th className="py-3 px-4 text-center">No. of People</th>
                  <th className="py-3 px-4 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b._id} className="border-b hover:bg-gray-50">
                      {/* Package Names */}
                      <td className="py-2 px-4">
                        {Array.isArray(b.packages)
                          ? b.packages.map((p, i) => <div key={i}>{p.title}</div>)
                          : b.package
                            ? b.package.title
                            : "No package"}
                      </td>


                      {/* Booking Date */}
                      <td className="py-2 px-4 text-center">
                        {b.bookingDate
                          ? new Date(b.bookingDate).toLocaleDateString("en-GB")
                          : "-"}
                      </td>

                      {/* Number of People */}
                      <td className="py-2 px-4 text-center">{b.numberOfPeople || 0}</td>

                      {/* Total Price */}
                      <td className="py-2 px-4 text-center">Rs. {b.totalPrice || 0}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="lg:col-span-3 space-y-4">
          <StatCard icon={<FaSuitcase />} title="Total Bookings" value={stats.totalBookings} />
          <StatCard icon={<FaCalendarCheck />} title="Upcoming Trips" value={stats.upcomingTrips} />
          <StatCard icon={<FaMoneyBillWave />} title="Total Spent" value={`Rs. ${stats.totalSpent}`} />
        </div>
      </div>

      {/* Explore Packages */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Explore Packages</h3>
          <Link
            to="/userdashboard/packages"
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {packages.length === 0 ? (
            <p className="text-gray-500 col-span-3">No packages available.</p>
          ) : (
            packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={pkg.image || "https://via.placeholder.com/400x250"}
                  alt={pkg.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{pkg.title}</h3>
                  <p className="text-gray-600 mt-1">Rs. {pkg.price}</p>
                  <Link
                    to={`/userdashboard/packages/${pkg._id}`}
                    className="inline-block mt-3 text-blue-700 font-medium hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
