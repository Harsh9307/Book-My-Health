const logger = require('../config/logger.config');
const NotFound = require('../errors/notFound.error')
const {User, Doctor} = require('../models');

class UserRepository{
    async registerUser(userData){
        try{
            const existingUser = await User.findOne({ email: userData.email });

            if(existingUser){
                throw new Error('User already exists');
            }
            const user = await User.create({
                firstname : userData.firstname,
                lastname : userData.lastname,
                email : userData.email,
                password : userData.password,
                isDoctor : userData.isDoctor || false,
                isAdmin : userData.isAdmin || false,
                age : userData.age,
                gender : userData.gender,
                mobile: userData.mobile,
                address : userData.address,
                pic: userData.pic
            });

            if(userData.isDoctor){
                if(!userData.specialization || !userData.experience || !userData.fees){
                    throw new Error('Doctor details are required');
                }
                await Doctor.create({
                    userId: user._id,
                    specialization: userData.specialization,
                    experience: userData.experience,
                    fees: userData.fees,
                    hospital:userData.hospital || "",
                    location:userData.location,
                    bio:userData.bio || "",
                    status : "pending"
                });
            }
            return user;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async getUsers(){
        try{
            const users = await User.find({});
            return users;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async getUser(id){
        try{
            const user = await User.findById(id);
            if(!user){
                throw new NotFound('User not found');
            }
            return user;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    
    // async findByEmail(email){
    //     return await User.findOne({email});
    // }
    // async createUser(userData){
    //     const user = new User(userData);
    //     return await user.save();
    // }
}
module.exports=UserRepository;