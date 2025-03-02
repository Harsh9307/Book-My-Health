const Appointment = require("../models/appointment.model");
const NotFound = require("../errors/notFound.error");

class AppointmentRepository {
    /**
     * @desc    Create a new appointment
     * @param   {Object} appointmentData - { doctorId, patientId, date, time }
     * @returns {Object} Created Appointment
     */
    async bookAppointment(appointmentData) {
        try{
            const appointment = await Appointment.create({
                patientId:appointmentData.patientId,
                doctorId:appointmentData.doctorId,
                date:appointmentData.date,
                time:appointmentData.time,
            })
            return appointment;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    /**
     * @desc    Find an appointment by ID
     * @param   {String} appointmentId
     * @returns {Object} Appointment
     */
    async findById(appointmentId) {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
        throw new NotFound("Appointment not found");
        }
        return appointment;
    }

    /**
     * @desc    Get all appointments for a specific patient
     * @param   {String} patientId
     * @returns {Array} Appointments
     */
    async findByPatientId(patientId) {
        return await Appointment.find({ patientId }).populate("doctorId");
    }

    /**
     * @desc    Get all appointments for a specific doctor
     * @param   {String} doctorId
     * @returns {Array} Appointments
     */
    async findByDoctorId(doctorId) {
        return await Appointment.find({ doctorId }).populate("patientId");
    }

    /**
     * @desc    Update appointment status (approve/reject)
     * @param   {String} appointmentId
     * @param   {String} status - 'approved' | 'rejected'
     * @returns {Object} Updated Appointment
     */
    async updateStatus(appointmentId, status) {
        return await Appointment.findByIdAndUpdate(
        appointmentId,
        { status },
        { new: true, runValidators: true }
        );
    }

    /**
     * @desc    Delete (cancel) an appointment
     * @param   {String} appointmentId
     * @returns {Object} Deleted Appointment
     */
    async delete(appointmentId) {
        return await Appointment.findByIdAndDelete(appointmentId);
    }
}

module.exports = AppointmentRepository;
