import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/bookings/mybookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data || []);
      } catch (err) {
        console.error("Error fetching bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">My Bookings</h2>
        <button
          onClick={() => navigate("/userdashboard/bookings/addbooking")}
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Book New Package
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Package</th>
              <th className="py-3 px-4 text-center font-medium">Date</th>
              <th className="py-3 px-4 text-center font-medium">People</th>
              <th className="py-3 px-4 text-center font-medium">Total Price</th>
              <th className="py-3 px-4 text-center font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Loading your bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  You have no bookings yet
                </td>
              </tr>
            ) : (
              bookings.map((b, idx) => (
                <tr
                  key={b._id}
                  className={`border-t hover:bg-gray-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">{b.package?.title}</td>
                  <td className="py-3 px-4 text-center">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center">{b.numberOfPeople}</td>
                  <td className="py-3 px-4 text-center">Rs. {b.totalPrice}</td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium capitalize shadow-sm transition-colors duration-200 ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default MyBooking;
