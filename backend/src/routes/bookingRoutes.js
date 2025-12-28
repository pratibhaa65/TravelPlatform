const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createBooking, getUserBookings, cancelBooking, getAllBookings } = require("../controllers/bookingController");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

//  Book a trip
router.post("/", protect, createBooking);

// View user bookings
router.get("/mybookings", protect, getUserBookings);

// Cancel booking
router.delete("/cancel/:id", protect, cancelBooking);

// Admin view all bookings 
router.get("/", protect, admin, getAllBookings);

module.exports = router;
