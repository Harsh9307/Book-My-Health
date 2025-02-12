const DoctorRepository = require('../repositories/doctor.repository')
const DoctorService =  require('../services/doctor.service')

const doctorService = new DoctorService(new DoctorRepository());

function pingDoctorController(req,res){
    return res.json({message:'Doctor Contoller is up'});
}