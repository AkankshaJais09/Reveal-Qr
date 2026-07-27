import express from "express";
import { protect, allowRoles } from "../middlewares/auth.middleware.js";
import AuditLog from "../models/AuditLog.model.js";

const router = express.Router();

router.get("/", protect, allowRoles("admin"), async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate("scannedBy", "name email role")
      .populate("shipment", "trackingNumber")
      .sort("-createdAt")
      .limit(100);
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;