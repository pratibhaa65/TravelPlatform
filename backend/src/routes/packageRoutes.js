const express =require("express");
const { getAllPackages, createPackage, updatePackage, deletePackage } = require("../controllers/packageController");
const { protect } = require("../middleware/authMiddleware");

const router=express.Router();

// Private(Admin)
router.post("/",protect, createPackage);
// Public
router.get("/", getAllPackages);
// Protected
router.put("/:id",protect ,updatePackage);
// Protected
router.delete("/:id", protect, deletePackage);


module.exports =router;