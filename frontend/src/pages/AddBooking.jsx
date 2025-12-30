import React, { useState } from "react";

const AddBooking = () => {
  const [user, setUser] = useState("");
  const [travelPackage, setTravelPackage] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [status, setStatus] = useState("pending");
  const [paymentStatus, setPaymentStatus] = useState("unpaid");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      user,
      travelPackage,
      bookingDate,
      numberOfPeople,
      totalPrice,
      status,
      paymentStatus,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-gray-200 p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold text-center">Add Booking</h2>

      {/* Package ID */}
      <div>
        <label className="block text-sm font-medium mb-1">Package</label>
        <input
          value={travelPackage}
          onChange={(e) => setTravelPackage(e.target.value)}
          placeholder="Package ID"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {/* Booking Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Booking Date</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {/* Number of People */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Number of People
        </label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {/* Total Price */}
      <div>
        <label className="block text-sm font-medium mb-1">Total Price</label>
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {/* Booking Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-900"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Payment Status */}
      {/* <div>
        <label className="block text-sm font-medium mb-1">
          Payment Status
        </label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
      </div> */}

      <button
        type="submit"
        className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Add Booking
      </button>
    </form>
  );
};

export default AddBooking;
