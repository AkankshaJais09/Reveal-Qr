import express from "express";
import { login, register, getMe } from "../controllers/auth.controller.js";
import { protect, allowRoles } from "../middlewares/auth.middleware.js";
import User from "../models/User.model.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/users", protect, allowRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password").sort("-createdAt");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// One-time admin setup route — protected by secret key
router.post("/setup-admin", async (req, res) => {
  try {
    const { secret } = req.body;
    if (secret !== process.env.SETUP_SECRET) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const existing = await User.findOne({ email: "admin@revealqr.com" });
    if (existing) {
      return res.status(200).json({ message: "Admin already exists", email: existing.email });
    }
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@revealqr.com",
      password: "Admin@123",
      role: "admin",
      isActive: true,
    });
    res.status(201).json({ message: "Admin created!", email: admin.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;