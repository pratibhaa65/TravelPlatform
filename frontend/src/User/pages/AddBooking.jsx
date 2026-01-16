import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const AddBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedPackage = location.state?.selectedPackage;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [bookingDate, setBookingDate] = useState("");

  if (!selectedPackage) {
    return (
      <p className="text-red-600">
        No package selected. Please go back and select a package.
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      package: selectedPackage._id,
      bookingDate,
      numberOfPeople,
      totalPrice: numberOfPeople * selectedPackage.price,
    };

    try {
      await axios.post(
        "http://localhost:8000/api/bookings",
        {
          packageId: selectedPackage._id,
          bookingDate,
          numberOfPeople,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Booking confirmed!");
      setError("");

      setTimeout(() => {
        navigate("/userdashboard/bookings/mybookings");
      }, 1500);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      );

    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
  <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow">
    <h2 className="text-2xl font-bold mb-6 text-center">
      Book Package
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* PACKAGE */}
      <div>
        <label className="block font-medium mb-1">Package</label>
        <input
          type="text"
          value={`${selectedPackage.title} — Rs. ${selectedPackage.price}`}
          disabled
          className="w-full px-4 py-2 border rounded-md bg-gray-100"
        />
      </div>

      {/* DATE */}
      <div>
        <label className="block font-medium mb-1">Booking Date</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      {/* PEOPLE */}
      <div>
        <label className="block font-medium mb-1">Number of People</label>
        <input
          type="number"
          min="1"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      {/* TOTAL */}
      <div className="font-semibold text-center">
        Total Price: Rs. {numberOfPeople * selectedPackage.price}
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded text-center">
          {error}
        </div>
      )}

      {/* SUCCESS */}
      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded text-center">
          {success}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Confirm Booking
      </button>
    </form>
  </div>
</div>

  );
};

export default AddBooking;
