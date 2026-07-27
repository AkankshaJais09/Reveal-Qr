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

export default router;