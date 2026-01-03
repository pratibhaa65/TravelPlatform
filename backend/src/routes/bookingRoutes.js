const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createBooking, getUserBookings, cancelBooking, getAllBookings } = require("../controllers/bookingController");
const { admin } = require("../middleware/adminMiddleware");

const {confirmBooking, adminCancelBooking,  markPaymentPaid} = require("../controllers/adminBookingController");
const router = express.Router();

//  Book a trip
router.post("/", protect, createBooking);

// View user bookings
router.get("/mybookings", protect, getUserBookings);

// Cancel booking
router.delete("/cancel/:id", protect, cancelBooking);

// Admin  
router.get("/", protect, admin, getAllBookings);
router.put("/bookings/:id/confirm", protect, admin, confirmBooking);
router.put("/bookings/:id/cancel", protect, admin, adminCancelBooking);
router.put("/bookings/:id/pay", protect, admin, markPaymentPaid);

module.exports = router;
