import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBooking = () => {
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [price, setPrice] = useState(0);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1️⃣ Fetch all packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/packages");
        setPackages(res.data);
      } catch (err) {
        setError("Failed to load packages");
      }
    };
    fetchPackages();
  }, []);

  // 2️⃣ Update price & availableSlots when package changes
  useEffect(() => {
    const selectedPackage = packages.find((p) => p._id === packageId);
    if (selectedPackage) {
      setPrice(selectedPackage.price);
      setAvailableSlots(selectedPackage.availableSlots);
      if (numberOfPeople > selectedPackage.availableSlots) {
        setNumberOfPeople(selectedPackage.availableSlots);
      }
    } else {
      setPrice(0);
      setAvailableSlots(0);
    }
  }, [packageId, packages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (numberOfPeople > availableSlots) {
      setError(
        `Only ${availableSlots} slot(s) available for this package`
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8000/api/bookings",
        {
          packageId,
          bookingDate,
          numberOfPeople,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Auto-reduce slots in frontend for immediate feedback
      setAvailableSlots((prev) => prev - numberOfPeople);
      setSuccess("Booking created successfully");
      setError("");
      setPackageId("");
      setBookingDate("");
      setNumberOfPeople(1);
      setPrice(0);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <form
      onSubmit={handleSubmit}
      
      className="max-w-md mx-auto space-y-4 bg-gray-200 p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold text-center">Add Booking</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Select Package</label>
        <select
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        >
          <option value="">-- Select Package --</option>
          {packages.map((pkg) => (
            <option key={pkg._id} value={pkg._id}>
              {pkg.title} — Rs. {pkg.price} — {pkg.availableSlots} slots
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Booking Date</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Number of People
        </label>
        <input
          type="number"
          min="1"
          max={availableSlots}
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Total Price</label>
        <p className="w-full px-4 py-2 border rounded-md bg-gray-100">
          Rs. {price * numberOfPeople}
        </p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded-md"
        disabled={!packageId || numberOfPeople < 1 || numberOfPeople > availableSlots}
      >
        Add Booking
      </button>
    </form>
    </div>
  );
};

export default AddBooking;
