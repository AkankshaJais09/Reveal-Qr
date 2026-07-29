import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },
    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: { type: String, required: true },
    action: { type: String, required: true },
    dataRevealed: [String],
    ip: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);