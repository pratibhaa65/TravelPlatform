const express = require("express");
const router = express.Router();

const {
  getAnalytics,
  getBookings,
  getPackages,
  getBookingsPerMonth
} = require("../controllers/adminAnalyticsController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/analytics", protect, admin, getAnalytics);
router.get("/bookings", protect, admin, getBookings);
router.get("/packages", protect, admin, getPackages);
router.get("/bookingspermonth", protect, admin, getBookingsPerMonth);

module.exports = router;
