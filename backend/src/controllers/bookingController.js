const Booking = require("../models/booking");
const TravelPackage = require("../models/travelPackage");

// create a booking
const createBooking = async (req, res) => {
  try {
    const { packageId, bookingDate, numberOfPeople } = req.body;

    if (!packageId || !bookingDate || !numberOfPeople) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if package exists
    const travelPackage = await TravelPackage.findById(packageId);
    if (!travelPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Check available slots
    if (numberOfPeople > travelPackage.availableSlots) {
      return res.status(400).json({
        message: `Only ${travelPackage.availableSlots} slot(s) available`,
      });
    }

    // Calculate total price
    const totalPrice = travelPackage.price * numberOfPeople;

    // Create booking (bookingDate = travel start date)
    const booking = new Booking({
      user: req.user._id,
      package: packageId,
      bookingDate,
      numberOfPeople,
      totalPrice,
    });

    // Reduce available slots
    travelPackage.availableSlots -= numberOfPeople;
    await travelPackage.save();

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// view user booking
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("package", "title price duration")
      .populate("user", "name email");
    res.json(bookings);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only user who booked can cancel
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to cancel this booking" });
    }

    // Prevent double cancel
    if (booking.status === "canceled") {
      return res.status(400).json({ message: "Booking already canceled" });
    }

    // Restore slots
    const travelPackage = await TravelPackage.findById(booking.package);
    if (travelPackage) {
      travelPackage.availableSlots += booking.numberOfPeople;
      await travelPackage.save();
    }

    booking.status = "canceled";
    await booking.save();

    res.json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// admin view all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("package", "title price duration")
      .populate("user", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings
};