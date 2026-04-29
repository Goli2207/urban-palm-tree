import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }]
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email or mobile." });
    }

    const user = await User.create({ name, email, mobile, password });
    const token = generateToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed.", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    if (!email || !mobile || !password) {
      return res.status(400).json({ message: "Email, mobile, and password are required." });
    }

    const user = await User.findOne({ email, mobile });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email, mobile number, or password." });
    }

    const token = generateToken(user._id);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Login failed.", error: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    if (!email || !mobile || !password) {
      return res.status(400).json({ message: "Email, mobile, and new password are required." });
    }

    const user = await User.findOne({ email, mobile });

    if (!user) {
      return res.status(404).json({ message: "No user found with this email and mobile number." });
    }

    user.password = password;
    await user.save();

    return res.json({ message: "Password updated successfully. Please login with your new password." });
  } catch (error) {
    return res.status(500).json({ message: "Password reset failed.", error: error.message });
  }
});

router.get("/me", protect, async (req, res) => {
  return res.json({ user: req.user });
});

export default router;
