const { StatusCodes } = require('http-status-codes');
const DoctorRepository = require('../repositories/doctor.repository')
const DoctorService =  require('../services/doctor.service')

const doctorService = new DoctorService(new DoctorRepository());

function pingDoctorController(req,res){
    return res.json({message:'Doctor Contoller is up'});
}

async function getDoctors(req,res,next){
    try{
        const doctors = await doctorService.getAllDoctors();
        return res.status(StatusCodes.OK).json({
            success:true,
            message: 'Successfully fetched alll the doctors',
            error:{},
            data: doctors
        })
    }
    catch(error){
        next(error);
    }
}

async function getDoctor(req,res,next){
    try{
        const doctor = await doctorService.getDoctor(req.params.id);
        return res.status(StatusCodes.OK).json({
            success:true,
            error:{},
            message:"Successfully fetched a doctor",
            data:doctor
        })
    }
    catch(error){
        next(error);
    }
}

async function applyForRequests(req,res,next){
    try{
        const { userId, isDoctor } = req.body;
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "User ID is required.",
                error: {},
                data: {},
            });
        }

        if (!isDoctor) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "You must select isDoctor: true to apply.",
                error: {},
                data: {},
            });
        }

        const request = await doctorService.applyForDoctorRequests(userId);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Request sent to admin for approval",
            error: {},
            data: request,
        });
    }
    catch(error){
        next(error);
    }
}

module.exports ={
    pingDoctorController,
    getDoctors,
    getDoctor,
    applyForRequests
};