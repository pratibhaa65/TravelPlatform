const axios = require("axios");
const Payment = require("../models/payment");
const Booking = require("../models/booking");

const verifyPayment = async (req, res) => {
    try {
        const { token, amount, bookingId } = req.body;

        const response = await axios.post(
            "https://khalti.com/api/v2/payment/verify/",
            { token, amount },
            {
                headers: {
                    Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
                },
            }
        );

        if (response.data.idx) {
            await Payment.create({
                booking: bookingId,
                user: req.user._id,
                amount: amount / 100,
                method: "khalti",
                transactionId: response.data.idx
            });

            const booking = await Booking.findById(bookingId);
            if (!booking) 
                return res.status(404).json({ message: "Booking not found" });

            booking.status = "confirmed";
            booking.paymentStatus = "paid";
            await booking.save();

            res.json({ message: "Payment successful", booking });
        } else {
            res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (error) {
        res.status(400).json({ message: "Payment verification failed" });
    }
};

module.exports = verifyPayment;