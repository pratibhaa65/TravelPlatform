const User = require("../models/user");
const Booking = require("../models/booking");
const TravelPackage = require("../models/travelPackage");

const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalBookings = await Booking.countDocuments();
    const totalPackages = await TravelPackage.countDocuments();

    const revenueData = await Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    const paymentStats = await Booking.aggregate([
      { $group: { _id: "$paymentStatus", count: { $sum: 1 } } }
    ]);

    const bookingStatus = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalAdmins,
      totalBookings,
      totalPackages,
      totalRevenue,
      paymentStats,
      bookingStatus
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};

const getBookings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(limit);

    const formatted = await Promise.all(bookings.map(async (b) => {
      const user = await User.findById(b.user) || { name: "Unknown" };
      const pack = await TravelPackage.findById(b.package) || { title: "Unknown" };

      return {
        _id: b._id,
        userName: user.name,
        packageName: pack.title,
        status: b.status
      };
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent bookings" });
  }
};


const getPackages = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const packages = await TravelPackage.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    const formatted = packages.map(p => ({
      _id: p._id,
      title: p.title,
      price: p.price,
      duration: p.duration
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent packages" });
  }
};

const getBookingsPerMonth = async (req, res) => {
  try {
    const data = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatted = data.map(item => ({
      month: monthNames[item._id - 1],
      bookings: item.count
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings per month" });
  }
};

module.exports = {
  getAnalytics,
  getBookings,
  getPackages,
  getBookingsPerMonth
};
