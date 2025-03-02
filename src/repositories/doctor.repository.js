const {Doctor} = require('../models')
const NotFound = require('../errors/notFound.error')

class DoctorRepository{
    async getAllDoctors(){
        try{
            // let doctors;
            // if(!req.locals){
            //     doctors = await Doctor.find({ isDoctor: true }).populate("userId");
            // }
            // else{
            //     doctors= await Doctor.find({isDoctor:true}).find({
            //         _id: { $ne: req.locals },
            //       }).populate("userId");
            // }
            const doctors = await Doctor.find({ isDoctor: true }).populate("userId");
            return doctors;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async getDoctor(id){
        try{
            const doctor = await Doctor.findById(id);
            if(!doctor){
                throw new NotFound("Doctor",id);
            }
            return doctor;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async findRequestByUserId(userId) {
        return await ApprovalRequest.findOne({ userId });
    }
    
    async createDoctorRequest(userId) {
        const request = new DoctorRequest({
            userId,
            status: "pending",
        });
    
        return await request.save();
    }
    
    
}
module.exports = DoctorRepository;