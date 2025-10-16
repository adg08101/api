const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController"); // adjust path if needed
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router
  .post("/register", verifyToken, registerUser)
  .post("/login", loginUser)
  .get("/profile", getProfile);

module.exports = router;
