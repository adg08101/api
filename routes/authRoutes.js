const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController"); // adjust path if needed

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", registerUser).post("/login", loginUser);

module.exports = router;
