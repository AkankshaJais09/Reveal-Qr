import Shipment from "../models/Shipment.model.js";
import AuditLog from "../models/AuditLog.model.js";

const getDataByRole = (shipment, role) => {
  const base = {
    _id: shipment._id,
    trackingNumber: shipment.trackingNumber,
    stage: shipment.stage,
    subStage: shipment.subStage,
    status: shipment.status,
  };

  if (role === "admin") return shipment.toObject();

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

  if (role === "delivery") {
    if (shipment.subStage === "city") {
      return {
        ...base,
        reveal: "city",
        city: shipment.customer?.city ||
          shipment.customer?.address?.split(",").pop()?.trim() ||
          shipment.destination,
        hint: "Package is heading to this city",
      };
    }
    if (shipment.subStage === "area") {
      return {
        ...base,
        reveal: "area",
        city: shipment.customer?.city ||
          shipment.customer?.address?.split(",").pop()?.trim() ||
          shipment.destination,
        area: shipment.customer?.area ||
          shipment.customer?.address?.split(",").slice(-2, -1)[0]?.trim() ||
          "Area info available",
        customerName: shipment.customer?.name,
        hint: "You are near the delivery area",
      };
    }
    if (shipment.subStage === "door") {
      return {
        ...base,
        reveal: "door",
        customer: shipment.customer,
        hint: "Full details revealed — you are at the door",
      };
    }
  }

  return base;
};

// Stage advancement order — only allow forward, never backward
const subStageOrder = ["city", "area", "door"];

export const validateQR = async (req, res) => {
  try {
    const { token } = req.params;
    const { advance } = req.query; // "area" | "door" — sent by Scan.jsx on re-scan

    if (!token || token.length < 10)
      return res.status(400).json({ message: "Invalid QR code format" });

    let shipment = await Shipment.findOne({ qrToken: token });

    if (!shipment)
      return res.status(404).json({ message: "Invalid QR code" });

    if (shipment.stage === "delivered")
      return res.status(410).json({ message: "QR expired — delivery completed" });

    if (shipment.qrExpiresAt && shipment.qrExpiresAt < new Date())
      return res.status(410).json({ message: "QR code expired" });

    const role = req.user.role;

    // Auto-advance subStage on re-scan (delivery only)
    if (role === "delivery" && advance) {
      const validAdvance = subStageOrder.includes(advance);
      const currentIndex = subStageOrder.indexOf(shipment.subStage || "city");
      const newIndex = subStageOrder.indexOf(advance);

      // Only advance forward, never allow going backward
      if (validAdvance && newIndex > currentIndex) {
        shipment = await Shipment.findByIdAndUpdate(
          shipment._id,
          { subStage: advance },
          { new: true }
        );

        await AuditLog.create({
          shipment: shipment._id,
          scannedBy: req.user._id,
          role,
          action: `SUBSTAGE_ADVANCE_${advance.toUpperCase()}`,
          dataRevealed: [advance],
          ip: req.ip,
        });
      }
    }

    const data = getDataByRole(shipment, role);

    await AuditLog.create({
      shipment: shipment._id,
      scannedBy: req.user._id,
      role,
      action: "QR_SCAN",
      dataRevealed: [shipment.subStage || "base"],
      ip: req.ip,
    });

    res.json({ shipment: data, role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Keep this for admin use only
export const updateSubStage = async (req, res) => {
  try {
    const { id } = req.params;
    const { subStage } = req.body;

    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admins can manually update subStage" });

    const validSubStages = ["city", "area", "door"];
    if (!validSubStages.includes(subStage))
      return res.status(400).json({ message: "Invalid subStage" });

    const shipment = await Shipment.findByIdAndUpdate(
      id,
      { subStage },
      { new: true }
    );

    if (!shipment)
      return res.status(404).json({ message: "Shipment not found" });

    await AuditLog.create({
      shipment: shipment._id,
      scannedBy: req.user._id,
      role: req.user.role,
      action: `SUBSTAGE_UPDATE_${subStage.toUpperCase()}`,
      dataRevealed: [subStage],
      ip: req.ip,
    });

    res.json({ shipment, message: `SubStage updated to ${subStage}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};