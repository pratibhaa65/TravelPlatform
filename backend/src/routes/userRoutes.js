const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { getAllUsers } = require("../controllers/adminUserController");
const { admin } = require("../middleware/adminMiddleware");

const router= express.Router();

router.post ("/register",registerUser);
router.post("/login",loginUser);

router.get("/profile",protect ,(req,res)=>{
    res.json(req.user);
});

router.get("/admin/users", protect, admin, getAllUsers);


module.exports=router;