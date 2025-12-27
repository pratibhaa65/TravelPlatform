const Booking = require("../models/booking");
const TravelPackage = require("../models/travelPackage");

// create a booking
const createBooking = async(req ,res)=>{
    try{
        const{packageId , bookingDate ,numberOfPeople}=req.body;

        // check if package exists
        const tourPackage = await TravelPackage.findById(packageId);
        if(!tourPackage){
            return res.status(404).json({message: "Package not found"});
        }

        // calculate totalPrice
        const totalPrice =tourPackage.price * numberOfPeople;

        const booking= new Booking({
            user:req.user._id,
            package:packageId,
            bookingDate,
            numberOfPeople,
            totalPrice
        });

        const savedBooking= await booking.save();
        res.status(201).json(savedBooking);
    }
    catch(error){
        res.status(500).json({message : error.message})            
    }
};


// view user booking
const getUserBookings= async(req,res) =>{
    try{
        const bookings = await Booking.find({user:req.user._id})
        .populate("package","title price duration")
        .populate("user","name email");
        res.json(bookings);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
};

// cancel Booking
const cancelBooking =async (req,res)=>{
   try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only user who booked can cancel
    if (booking.user.toString() !== req.user._id) {
      return res.status(401).json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "canceled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully", booking });
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

module.exports ={
    createBooking,
    getUserBookings,
    cancelBooking,
    getAllBookings
};