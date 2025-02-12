const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
      index: true, // Optimizes queries
    },
    specialization: {
      type: String,
      required: true,
      enum: [
        "General Practitioner",
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Orthopedic",
        "Neurologist",
        "Psychiatrist",
        "Dentist",
        "ENT Specialist",
      ], // Restricts to valid options
    },
    experience: {
      type: Number,
      required: true,
      min: 1, 
      max: 50, 
    },
    fees: {
      type: Number,
      required: true,
      min: 0, 
    },
    hospital: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 500, 
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
