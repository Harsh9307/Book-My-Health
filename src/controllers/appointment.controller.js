const { StatusCodes } = require("http-status-codes");
const AppointmentService = require("../services/appointment.service");
const AppointmentRepository = require("../repositories/appointment.repository");

const appointmentService = new AppointmentService(new AppointmentRepository());

function pingAppointmentController(req, res) {
  return res.json({ message: "Appointment Controller is up" });
}

/**
 * @desc    Book an appointment
 * @route   POST /api/v1/appointments
 * @access  Protected (Patients only)
 */
async function bookAppointment(req, res, next) {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id; // Assuming auth middleware sets req.user

    const appointment = await appointmentService.bookAppointment({
      doctorId,
      patientId,
      date,
      time,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get all appointments for a patient
 * @route   GET /api/v1/appointments/patient
 * @access  Protected (Patients only)
 */
async function getPatientAppointments(req, res, next) {
  try {
    const patientId = req.user.id;
    const appointments = await appointmentService.getPatientAppointments(patientId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched all patient appointments",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get all appointments for a doctor
 * @route   GET /api/v1/appointments/doctor
 * @access  Protected (Doctors only)
 */
async function getDoctorAppointments(req, res, next) {
  try {
    const doctorId = req.user.id;
    const appointments = await appointmentService.getDoctorAppointments(doctorId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Fetched all doctor appointments",
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Update appointment status (approve/reject)
 * @route   PATCH /api/v1/appointments/:id/status
 * @access  Protected (Doctors only)
 */
async function updateAppointmentStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body; // Expected values: 'approved' | 'rejected'
    const doctorId = req.user.id;

    const updatedAppointment = await appointmentService.updateAppointmentStatus(
      id,
      doctorId,
      status
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Appointment status updated",
      data: updatedAppointment,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Cancel an appointment
 * @route   DELETE /api/v1/appointments/:id
 * @access  Protected (Patients only)
 */
async function cancelAppointment(req, res, next) {
  try {
    const { id } = req.params;
    const patientId = req.user.id;

    await appointmentService.cancelAppointment(id, patientId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  pingAppointmentController,
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};
