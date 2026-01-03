import axios from "axios";
import { useEffect, useState } from "react";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return <p className="text-center py-10">Loading bookings...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Bookings</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-3 px-4 text-center">User</th>
              <th className="py-3 px-4 text-center">Package</th>
              <th className="py-3 px-4 text-center">Travel Date</th>
              <th className="py-3 px-4 text-center">People</th>
              <th className="py-3 px-4 text-center">Total (Rs.)</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Payment</th>
              <th className="py-3 px-4 text-center">Booked At</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 text-center">
                  <div className="font-medium">{booking.user?.name}</div>
                  <div className="text-sm text-gray-500">
                    {booking.user?.email}
                  </div>
                </td>

                <td className="py-3 px-4 text-center">
                  {booking.package?.title}
                </td>

                <td className="py-3 px-4 text-center">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 text-center">
                  {booking.numberOfPeople}
                </td>

                <td className="py-3 px-4 text-center">
                  {booking.totalPrice}
                </td>

                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === "confirmed"
                        ? "bg-green-200 text-green-800"
                        : booking.status === "canceled"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.paymentStatus === "paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                <td className="py-3 px-4 text-center">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-4 flex gap-2 justify-center">
                  <button
                    className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Confirm
                  </button>

                  <button
                    className="bg-red-900 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Cancel
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

export default AdminBookingList;
