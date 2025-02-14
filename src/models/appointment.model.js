const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String, // Example: "10:30 AM"
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed"],
        default: "pending",
      },
    },
    { timestamps: true }
  );
  
  const Appointment = mongoose.model("Appointment", appointmentSchema);
  module.exports = Appointment;
  