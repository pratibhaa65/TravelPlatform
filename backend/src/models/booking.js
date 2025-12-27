const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "canceled"],
        default: pending
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema)

