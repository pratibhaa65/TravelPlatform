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
        <table className="min-w-full bg-gray-200 shadow rounded-lg">
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
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
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


                {/* ACTIONS COLUMN */}
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* WhatsApp Reminder (Since manual payment) */}
                    {booking.paymentStatus === "pending" && (
                      <a
                        href={`https://wa.me/${booking.user?.phone || ''}?text=Hi, regarding your booking...`}
                        target="_blank"
                        className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                        title="Send WhatsApp Reminder"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    )}

                    {/* Quick Logic: If Paid but still Pending status, show Confirm button */}
                    {booking.status === "pending" && booking.paymentStatus === "paid" && (
                      <button
                        onClick={() => updateBookingField(booking._id, "status", "confirmed")}
                        className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
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
