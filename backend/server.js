const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const packageRoutes = require("./src/routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

connectDB();

// middleware
app.use(cors())
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/packages",packageRoutes);
app.use("/api/bookings", bookingRoutes);


// test route
app.get("/", (req, res) => {
    res.send("Travel Platform backend is running...");
});

// server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
