const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createBooking, getUserBookings, cancelBooking, getAllBookings } = require("../controllers/bookingController");
const { admin } = require("../middleware/adminMiddleware");

const {confirmBooking, adminCancelBooking,  markPaymentPaid ,markRefunded, updateBookingStatus} = require("../controllers/adminBookingController");
const router = express.Router();

//  Book a trip
router.post("/", protect, createBooking);

// View user bookings
router.get("/mybookings", protect, getUserBookings);

// Cancel booking
router.delete("/cancel/:id", protect, cancelBooking);

// Admin  // Suggested Clean Backend Router
router.get("/", protect, admin, getAllBookings);
router.put("/:id/confirm", protect, admin, confirmBooking);
router.put("/:id/cancel", protect, admin, adminCancelBooking);
router.put("/:id/payment/paid", protect, admin, markPaymentPaid);
router.put("/:id/payment/refund", protect, admin, markRefunded);
router.put("/:id/update", protect, admin, updateBookingStatus);
module.exports = router;
