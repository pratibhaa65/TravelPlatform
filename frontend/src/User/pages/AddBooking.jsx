import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const AddBooking = () => {
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [price, setPrice] = useState(0);
  const [availableSlots, setAvailableSlots] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Fetch all packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/packages");
        setPackages(res.data);
      } catch {
        setError("Failed to load packages");
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const selectedPackage = packages.find((p) => p._id === packageId);
    if (selectedPackage) {
      setPrice(selectedPackage.price);
      setAvailableSlots(selectedPackage.availableSlots);
      setNumberOfPeople((prev) =>
        prev > selectedPackage.availableSlots ? selectedPackage.availableSlots : prev
      );
    } else {
      setPrice(0);
      setAvailableSlots(0);
      setNumberOfPeople(1);
    }
  }, [packageId, packages]);

  const handleNumberChange = (e) => {
    const value = Number(e.target.value);
    if (value > availableSlots) {
      setNumberOfPeople(availableSlots);
      setError(`Only ${availableSlots} slot(s) available`);
      setTimeout(() => setError(""), 3000);
    } else if (value < 1) {
      setNumberOfPeople(1);
    } else {
      setNumberOfPeople(value);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (numberOfPeople > availableSlots) {
      setError(`Only ${availableSlots} slot(s) available`);
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
          totalPrice: price * numberOfPeople,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAvailableSlots((prev) => prev - numberOfPeople);
      setSuccess("Booking created successfully!");
      setError("");

      // reset form
      setPackageId("");
      setBookingDate("");
      setNumberOfPeople(1);
      setPrice(0);

      // clear success after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-6 rounded-xl shadow-md space-y-4 transition-all duration-200 hover:shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Add New Booking</h2>

        {/* Select Package */}
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
          {packageId && availableSlots > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {availableSlots} slot(s) available for this package
            </p>
          )}
        </div>

        {/* Booking Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Booking Date</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // block past dates
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Number of People */}
        <div>
          <label className="block text-sm font-medium mb-1">Number of People</label>
          <input
            type="number"
            min="1"
            max={availableSlots || 1}
            value={numberOfPeople}
            onChange={handleNumberChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Total Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Total Price</label>
          <p className="w-full px-4 py-2 border rounded-md bg-gray-100">
            Rs. {price * numberOfPeople}
          </p>
        </div>

        {/* Messages */}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={!packageId || numberOfPeople < 1 || numberOfPeople > availableSlots}
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Add Booking
          </button>

          <Link
            to="/userdashboard/bookings/mybookings"
            className="text-blue-900 py-2  hover:bg-blue-50 transition text-center"
          >
            View Bookings
          </Link>
        </div>

      </form>
    </div>
  );
};

export default AddBooking;
