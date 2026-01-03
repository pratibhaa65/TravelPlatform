const express = require("express");
const { 
  getAllPackages, 
  getPackageById, 
  createPackage, 
  updatePackage, 
  deletePackage 
} = require("../controllers/packageController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Admin only - create package
router.post("/", protect, admin, upload.single("imageFile"), createPackage);

// Get all packages - public
router.get("/", getAllPackages);

// Get single package by ID - public
router.get("/:id", getPackageById);

// Admin only - update package
router.put("/:id", protect, admin, upload.single("imageFile"), updatePackage);

// Admin only - delete package
router.delete("/:id", protect, admin, deletePackage);

module.exports = router;
