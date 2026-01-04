const Booking = require("../models/booking");
const TravelPackage = require("../models/travelPackage");

// Admin: Confirm booking
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "canceled") {
      return res.status(400).json({ message: "Cannot confirm canceled booking" });
    }

    booking.status = "confirmed";
    await booking.save();

    res.json({ message: "Booking confirmed", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminCancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.status === "canceled") {
    return res.status(400).json({ message: "Booking already canceled" });
  }

  booking.status = "canceled";

  if (booking.paymentStatus === "paid") {
    booking.paymentStatus = "refund_pending";
  }

  await booking.save();

  res.json({
    message:
      booking.paymentStatus === "refund_pending"
        ? "Booking canceled. Refund pending."
        : "Booking canceled.",
    booking, 
  });
};

// Admin: Mark payment as paid
const markPaymentPaid = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking)
    return res.status(404).json({ message: "Booking not found" });

  if (booking.paymentStatus === "paid") {
    return res.status(400).json({ message: "Payment already marked as paid" });
  }

  booking.paymentStatus = "paid";
  await booking.save();

  res.json({ message: "Payment marked as paid", booking });
};

const markRefunded = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking)
    return res.status(404).json({ message: "Booking not found" });

  if (booking.paymentStatus !== "refund_pending") {
    return res.status(400).json({ message: "Refund not applicable" });
  }

  booking.paymentStatus = "refunded";
  await booking.save();

  res.json({ message: "Refund completed", booking });
};


const updateBookingStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    console.log("Updating booking:", req.params.id, "status:", status, "paymentStatus:", paymentStatus);

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    console.log("Current booking:", booking);

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    console.log("Booking after update:", booking);

    await booking.save();

    res.json({ message: "Updated successfully", booking });
  } catch (error) {
    console.error("Update booking error:", error); // <-- this will show full stack trace
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  confirmBooking,
  adminCancelBooking,
  markPaymentPaid,
  markRefunded,
   updateBookingStatus,
};
