const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPackage",
      required: true,
    },

    // bookingDate = TRAVEL START DATE
    bookingDate: {
      type: Date,
      required: [true, "Travel start date is required"],
    },

    numberOfPeople: {
      type: Number,
      required: [true, "Number of people is required"],
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded" , "refund_pending"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
