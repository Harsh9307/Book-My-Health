const mongoose = require("mongoose");

const doctorRequestSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        unique: true // Ensures a user can only apply once
    },
    status: { 
        type: String, 
        enum: ["pending", "approved", "rejected"], 
        default: "pending" // Default status until admin approves
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DoctorRequest", doctorRequestSchema);