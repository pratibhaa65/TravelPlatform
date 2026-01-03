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

// Admin: Cancel booking
const adminCancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("package");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "canceled") {
      return res.status(400).json({ message: "Already canceled" });
    }

    // Restore slots
    booking.package.availableSlots += booking.numberOfPeople;
    await booking.package.save();

    booking.status = "canceled";
    await booking.save();

    res.json({ message: "Booking canceled by admin", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Mark payment as paid
const markPaymentPaid = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    await booking.save();

    res.json({ message: "Payment marked as paid", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  confirmBooking,
  adminCancelBooking,
  markPaymentPaid,
};
