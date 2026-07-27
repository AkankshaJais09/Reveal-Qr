import express from "express";
import { validateQR, updateSubStage } from "../controllers/qr.controller.js";
import { protect, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/validate/:token", protect, validateQR);
router.patch("/substage/:id", protect, allowRoles("delivery", "admin"), updateSubStage);

// Lookup by tracking number
router.get("/track/:trackingNumber", protect, async (req, res) => {
  try {
    const { default: Shipment } = await import("../models/Shipment.model.js");
    const shipment = await Shipment.findOne({
      trackingNumber: req.params.trackingNumber,
    });
    if (!shipment)
      return res.status(404).json({ message: "Tracking number not found" });
    res.json({ qrToken: shipment.qrToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;