class AppointmentService {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  /**
   * @desc    Book an appointment
   * @param   {Object} appointmentData - { doctorId, patientId, date, time }
   * @returns {Object} Appointment
   */
  async bookAppointment(appointmentData) {
    return await this.appointmentRepository.create(appointmentData);
  }

  /**
   * @desc    Get all appointments for a patient
   * @param   {String} patientId
   * @returns {Array} Appointments
   */
  async getPatientAppointments(patientId) {
    return await this.appointmentRepository.findByPatientId(patientId);
  }

  /**
   * @desc    Get all appointments for a doctor
   * @param   {String} doctorId
   * @returns {Array} Appointments
   */
  async getDoctorAppointments(doctorId) {
    return await this.appointmentRepository.findByDoctorId(doctorId);
  }

  /**
   * @desc    Update appointment status (approve/reject)
   * @param   {String} appointmentId
   * @param   {String} doctorId
   * @param   {String} status - 'approved' | 'rejected'
   * @returns {Object} Updated Appointment
   */
  async updateAppointmentStatus(appointmentId, doctorId, status) {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.doctorId.toString() !== doctorId) {
      throw new Error("Unauthorized to update this appointment");
    }

    return await this.appointmentRepository.updateStatus(appointmentId, status);
  }

  /**
   * @desc    Cancel an appointment
   * @param   {String} appointmentId
   * @param   {String} patientId
   * @returns {Object} Deleted Appointment
   */
  async cancelAppointment(appointmentId, patientId) {
    const appointment = await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.patientId.toString() !== patientId) {
      throw new Error("Unauthorized to cancel this appointment");
    }

    return await this.appointmentRepository.delete(appointmentId);
  }
}

module.exports = AppointmentService;
