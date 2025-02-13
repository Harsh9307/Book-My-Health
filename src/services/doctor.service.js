
class DoctorService{
    constructor(doctorRepository){
        this.doctorRepository = doctorRepository;
    }

    async getAllDoctors(){
        const doctors = await this.doctorRepository.getAllDoctors();
        return doctors;
    }

    async getDoctor(doctorId){
        const doctor = await this.doctorRepository.getDoctor(doctorId);
        return doctor;
    }

    async applyForDoctorRequests(doctorId){
        const existingRequest = await this.doctorRepository.findRequestByUserId(userId);

        if (existingRequest) {
            throw new Error("You have already applied to become a doctor.");
        }
        const newRequest = await this.doctorRepository.createDoctorRequest(userId);
        return newRequest;
    }

    
}
module.exports = DoctorService;