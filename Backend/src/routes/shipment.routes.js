import express from "express";
import {
  getShipments, getShipment,
  createShipment, updateStage,
} from "../controllers/shipment.controller.js";
import { protect, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getShipments);
router.get("/:id", getShipment);
router.post("/", allowRoles("admin"), createShipment);
router.patch(
  "/:id/stage",
  allowRoles("admin", "warehouse", "hub", "delivery"),
  updateStage
);

export default router;