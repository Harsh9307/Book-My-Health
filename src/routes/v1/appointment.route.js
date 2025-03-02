const express = require("express");
const {appointmentController} = require("../../controllers/");

const appointmentRouter = express.Router();

/**
 * @route   POST /api/v1/appointments
 * @desc    Book an appointment
 * @access  Protected (Only authenticated patients)
 */
appointmentRouter.post("/", appointmentController.bookAppointment);

/**
 * @route   GET /api/v1/appointments/patient
 * @desc    Get all appointments for a patient
 * @access  Protected (Only authenticated patients)
 */
appointmentRouter.get("/patient", appointmentController.getPatientAppointments);

/**
 * @route   GET /api/v1/appointments/doctor
 * @desc    Get all appointments for a doctor
 * @access  Protected (Only authenticated doctors)
 */
appointmentRouter.get("/doctor", appointmentController.getDoctorAppointments);

/**
 * @route   PATCH /api/v1/appointments/:id/status
 * @desc    Update appointment status (approve/reject)
 * @access  Protected (Only authenticated doctors)
 */
appointmentRouter.patch("/:id/status",appointmentController.updateAppointmentStatus);

/**
 * @route   DELETE /api/v1/appointments/:id
 * @desc    Cancel an appointment
 * @access  Protected (Patients can cancel their own appointments)
 */
appointmentRouter.delete("/:id",appointmentController.cancelAppointment);

module.exports = appointmentRouter;
