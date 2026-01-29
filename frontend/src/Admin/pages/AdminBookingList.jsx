import axios from "axios";
import { useEffect, useState } from "react";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // FETCH BOOKINGS
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/bookings", { headers })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  // MARK PAYMENT PAID
  const markPaymentPaid = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/bookings/${id}/payment/paid`,
        {},
        { headers }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, paymentStatus: "paid" } : b
        )
      );
    } catch {
      alert("Failed to mark payment as paid");
    }
  };

  // MARK REFUNDED
  const markRefunded = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/bookings/${id}/payment/refund`,
        {},
        { headers }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, paymentStatus: "refunded" } : b
        )
      );
    } catch {
      alert("Failed to mark refunded");
    }
  };

  // CONFIRM BOOKING
  const confirmBooking = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/bookings/${id}/confirm`,
        {},
        { headers }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "confirmed" } : b
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Confirm failed");
    }
  };

  // CANCEL BOOKING
  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel booking? Refund if paid.")) return;

    try {
      await axios.put(
        `http://localhost:8000/api/bookings/${id}/cancel`,
        {},
        { headers }
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id
            ? {
              ...b,
              status: "canceled",
              paymentStatus:
                b.paymentStatus === "paid"
                  ? "refund_pending"
                  : b.paymentStatus,
            }
            : b
        )
      );
    } catch {
      alert("Cancel failed");
    }
  };

const updateBookingField = async (id, field, value) => {
  console.log("Updating booking:", id, field, value);
  try {
    await axios.put(
      `http://localhost:8000/api/bookings/${id}/update`,
      { [field]: value },
      { headers }
    );

    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, [field]: value } : b))
    );
  } catch (err) {
    alert("Update failed: " + err.message);
  }
};

  if (loading) {
    return <p className="text-center py-10">Loading bookings...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Manage Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 shadow rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-3 px-4 text-center">User</th>
              <th className="py-3 px-4 text-center">Package</th>
              <th className="py-3 px-4 text-center">Travel Date</th>
              <th className="py-3 px-4 text-center">People</th>
              <th className="py-3 px-4 text-center">Total (Rs.)</th>
              <th className="py-3 px-4 text-center">Booked At</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Payment</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b bg-gray-100 hover:bg-white">
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
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>

                {/* STATUS COLUMN */}
                <td className="py-3 px-4 text-center">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      updateBookingField(booking._id, "status", e.target.value)
                    }
                    className={`px-3 py-1 rounded-full border text-xs font-bold focus:outline-none cursor-pointer ${booking.status === "confirmed"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : booking.status === "canceled"
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-yellow-100 text-yellow-700 border-yellow-300"
                      }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>

                {/* PAYMENT COLUMN */}
                <td className="py-3 px-4 text-center">
                  <select
                    value={booking.paymentStatus}
                    onChange={(e) =>
                      updateBookingField(booking._id, "paymentStatus", e.target.value)
                    }
                    className={`px-3 py-1 rounded-full border text-xs font-bold focus:outline-none cursor-pointer ${booking.paymentStatus === "paid"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                        : booking.paymentStatus === "refunded"
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : booking.paymentStatus === "refund_pending"
                            ? "bg-orange-100 text-orange-700 border-orange-300"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                      }`}
                  >
                    <option value="pending">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="refund_pending">Refund Pending</option>
                    <option value="refunded">Refunded</option>
                  </select>
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
