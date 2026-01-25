import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  useEffect(() => {
    fetchBookings();
  }, [token]);

  const openCancelModal = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const confirmCancelBooking = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/bookings/cancel/${selectedBooking}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      closeModal();
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation failed");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">My Bookings</h2>

        <button
          onClick={() => navigate("/userdashboard/packages")}
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Browse Packages
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Package</th>
              <th className="py-3 px-4 text-center">Date</th>
              <th className="py-3 px-4 text-center">People</th>
              <th className="py-3 px-4 text-center">Total Price</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  Loading your bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  You have no bookings yet
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{b.package?.title}</td>

                  <td className="py-3 px-4 text-center">
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {b.numberOfPeople}
                  </td>

                  <td className="py-3 px-4 text-center">
                    Rs. {b.totalPrice}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={b.status} />
                  </td>

                  <td className="py-3 px-4 text-center">
                    {(b.status === "pending" || b.status === "confirmed") && (
                      <button
                        onClick={() => openCancelModal(b._id)}
                        className="text-red-700 hover:text-red-500 font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ConfirmModal
          onClose={closeModal}
          onConfirm={confirmCancelBooking}
        />
      )}
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
      className={`px-3 py-1 rounded-full text-sm capitalize ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status || "unknown"}
    </span>
  );
};

const ConfirmModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h3 className="text-xl font-semibold mb-2">
          Cancel Booking
        </h3>

        <p className="text-gray-500 mb-6">
          Are you sure you want to cancel this booking?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
