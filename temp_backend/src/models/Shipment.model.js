import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    trackingNumber: { type: String, required: true, unique: true },
    orderId: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String },
      area: { type: String },
    },
    weight: { type: String },
    destination: { type: String, required: true },
    stage: {
      type: String,
      enum: ["warehouse", "hub", "delivery", "delivered"],
      default: "warehouse",
    },
    subStage: {
      type: String,
      enum: ["city", "area", "door"],
      default: "city",
    },
    assignedRider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    qrToken: { type: String },
    qrExpiresAt: { type: Date },
    status: {
      type: String,
      enum: ["active", "delivered", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", shipmentSchema);