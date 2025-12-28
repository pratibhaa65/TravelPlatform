const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // user is admin, allow access
    } else {
        res.status(403).json({ message: "Admins only" });
    }
};

module.exports = { admin };