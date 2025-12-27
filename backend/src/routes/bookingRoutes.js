const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createBooking, getUserBookings, cancelBooking, getAllBookings } = require("../controllers/bookingController");

const router = express.Router();

//  Book a trip
router.post("/", protect, createBooking);

// View user bookings
router.get("/mybookings", protect, getUserBookings);

// Cancel booking
router.put("/cancel/:id", protect, cancelBooking);

// Admin view all bookings (optional protect with isAdmin middleware)
router.get("/", protect, getAllBookings);

module.exports = router;
