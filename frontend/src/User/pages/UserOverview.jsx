import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSuitcase, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";
import PackageDetailsModal from "../components/PackageDetailsModal";

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 flex items-center gap-4">
    <div className="text-blue-600 text-2xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-semibold">{value}</h3>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const UserOverview = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingTrips: 0,
    totalSpent: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsRes = await axios.get("/api/bookings/mybookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bookings = bookingsRes.data || [];

        setRecentBookings(bookings.slice(0, 5));

        setStats({
          totalBookings: bookings.length,
          upcomingTrips: bookings.filter(b => b.status === "confirmed").length,
          totalSpent: bookings
            .filter(b => b.status === "confirmed")
            .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
        });

        const packagesRes = await axios.get("/api/packages");
        setPackages(packagesRes.data.slice(0, 3));

      } catch (err) {
        console.error("Dashboard data error:", err);
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

        <div className="mt-4">
          <button
            onClick={() => navigate("/userdashboard/packages")}
            className="bg-white text-blue-900 px-4 py-2 rounded font-medium hover:bg-gray-100"
          >
            Explore Packages →
          </button>
        </div>
      </div>

      {/* Bookings + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">

        {/* Recent Bookings */}
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
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Package</th>
                  <th className="py-3 px-4 text-center">Date</th>
                  <th className="py-3 px-4 text-center">People</th>
                  <th className="py-3 px-4 text-center">Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-6 text-center text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((b) => (
                    <tr key={b._id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">
                        {b.package?.title || "No package"}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {b.bookingDate
                          ? new Date(b.bookingDate).toLocaleDateString("en-GB")
                          : "-"}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {b.numberOfPeople || 0}
                      </td>
                      <td className="py-2 px-4 text-center">
                        Rs. {b.totalPrice || 0}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <StatusBadge status={b.status} />
                      </td>
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
          <Link to="/userdashboard/packages" className="text-sm text-blue-600 hover:underline">
            View all
          </Link>
        </div>

        <div
          className={`flex gap-6 overflow-x-auto pb-4 scroll-smooth transition ${selectedPackage ? "opacity-40 pointer-events-none" : ""
            }`}
        >
          {packages.length === 0 ? (
            <div className="min-w-full text-center text-gray-500 py-10">
              <p className="text-lg font-medium">No packages available</p>
              <p className="text-sm mt-1">Please check back later ✈️</p>
            </div>
          ) : (
            packages.map(pkg => (
              <div key={pkg._id}
                className="flex-shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%] bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="relative">
                  <img
                    src={pkg.image || "https://via.placeholder.com/400x250"}
                    alt={pkg.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{pkg.title}</h3>
                  <p className="text-gray-600 mt-1">Rs. {pkg.price}</p>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setSelectedPackage(pkg)}
                      className="text-blue-700 font-medium hover:underline"
                    >
                      View details →
                    </button>

                    <button
                      onClick={() =>
                        navigate("/userdashboard/bookings/addbooking", {
                          state: { selectedPackage: pkg },
                        })
                      }
                      className="bg-blue-900 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Package Modal */}
      {selectedPackage && (
        <PackageDetailsModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBook={() =>
            navigate("/userdashboard/bookings/addbooking", {
              state: { selectedPackage },
            })
          }
        />
      )}
    </div>
  );
};

export default UserOverview;
