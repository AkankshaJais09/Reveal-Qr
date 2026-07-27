import Shipment from "../models/Shipment.model.js";
import crypto from "crypto";

// Role-based field filtering
const filterByRole = (shipment, role) => {
  const base = {
    _id: shipment._id,
    trackingNumber: shipment.trackingNumber,
    stage: shipment.stage,
    status: shipment.status,
  };

  if (role === "admin") return shipment;

  if (role === "warehouse") return {
    ...base,
    orderId: shipment.orderId,
    weight: shipment.weight,
    destination: shipment.destination,
  };

  if (role === "hub") return {
    ...base,
    orderId: shipment.orderId,
    destination: shipment.destination,
    weight: shipment.weight,
  };

  if (role === "delivery") return {
    ...base,
    qrToken: shipment.qrToken,
    customer: shipment.customer,
    destination: shipment.destination,
    assignedRider: shipment.assignedRider,
  };

  return base;
};

export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate("assignedRider", "name email");
    const filtered = shipments.map((s) => filterByRole(s.toObject(), req.user.role));
    res.json({ shipments: filtered });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate("assignedRider", "name email");
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.json({ shipment: filterByRole(shipment.toObject(), req.user.role) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createShipment = async (req, res) => {
  try {
    const qrToken = crypto.randomBytes(32).toString("hex");
    const shipment = await Shipment.create({
      ...req.body,
      qrToken,
      qrExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.status(201).json({ shipment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStage = async (req, res) => {
  try {
    const { stage } = req.body;

    const update = { stage };

    // When moving to delivery stage, reset subStage to 'city' for fresh progressive reveal
    if (stage === "delivery") {
      update.subStage = "city";
    }

    // When delivered, mark status and clear QR token so it truly expires
    if (stage === "delivered") {
      update.status = "delivered";
      update.qrToken = null;
      update.qrExpiresAt = null;
    }

    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    if (!shipment) return res.status(404).json({ message: "Not found" });
    res.json({ shipment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};