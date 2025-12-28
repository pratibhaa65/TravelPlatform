const express =require("express");
const { getAllPackages, createPackage, updatePackage, deletePackage } = require("../controllers/packageController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const router=express.Router();

// Private(Admin)
router.post("/",protect,admin, createPackage);
// Public
router.get("/", getAllPackages);
// Protected
router.put("/:id",protect, admin, updatePackage);
// Protected
router.delete("/:id", protect, admin, deletePackage);


module.exports =router;