const User = require("../models/User"); // Adjust path as needed
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretConfig } = require("../config");

const SECRET_KEY = secretConfig.secretToken;

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    // Create new user (password will be hashed by pre-save hook)
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If using JWT, generate token (optional)
    const token = generateToken(user);

    res.cookie("user", user).status(200).json({
      message: "Login successful",
      token, // uncomment if token-based authentication is added later
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const generateToken = (user) => {
  return jwt.sign({ user: user }, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { registerUser, loginUser };
