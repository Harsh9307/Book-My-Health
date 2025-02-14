const express = require("express");
const { auth } = require("../../utils");
const appointmentController = require("../../controllers/");

const appointmentRouter = express.Router();

/**
 * @route   POST /api/v1/appointments
 * @desc    Book an appointment
 * @access  Protected (Only authenticated patients)
 */
appointmentRouter.post("/", auth, appointmentController.bookAppointment);

/**
 * @route   GET /api/v1/appointments/patient
 * @desc    Get all appointments for a patient
 * @access  Protected (Only authenticated patients)
 */
appointmentRouter.get("/patient", auth, appointmentController.getPatientAppointments);

/**
 * @route   GET /api/v1/appointments/doctor
 * @desc    Get all appointments for a doctor
 * @access  Protected (Only authenticated doctors)
 */
appointmentRouter.get("/doctor", auth, appointmentController.getDoctorAppointments);

/**
 * @route   PATCH /api/v1/appointments/:id/status
 * @desc    Update appointment status (approve/reject)
 * @access  Protected (Only authenticated doctors)
 */
appointmentRouter.patch("/:id/status", auth, appointmentController.updateAppointmentStatus);

/**
 * @route   DELETE /api/v1/appointments/:id
 * @desc    Cancel an appointment
 * @access  Protected (Patients can cancel their own appointments)
 */
appointmentRouter.delete("/:id", auth, appointmentController.cancelAppointment);

module.exports = appointmentRouter;
