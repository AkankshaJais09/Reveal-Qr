import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const email = "admin@revealqr.com";
    const existing = await User.findOne({ email });

    if (existing) {
      console.log("⚠️  Admin already exists:", existing.email);
      process.exit(0);
    }

    const admin = await User.create({
      name: "Super Admin",
      email,
      password: "Admin@123",
      role: "admin",
      isActive: true,
    });

    console.log("🎉 Admin created successfully!");
    console.log("   Email   :", admin.email);
    console.log("   Password: Admin@123");
    console.log("   Role    :", admin.role);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
