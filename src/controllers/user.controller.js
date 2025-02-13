const {UserService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {UserRepository}= require('../repositories');

const userService = new UserService(new UserRepository());

function pingUserController(req,res){
    return res.json({message:'User Controller is up'});
}

async function getUsers(req,res,next){
    try{
        const users = await DoctorService.getUsers();
        return res.status(StatusCodes.OK).json({
            success : true,
            message: 'Successfully fetched all the users',
            error: {},
            data: users
        })
    }
    catch(err){
        next(err);
    }
}

async function getUser(req,res,next){
    try{
        const user = await userService.getUser(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            error:{},
            message: "Successfully fetched a user",
            data: user

    })
    }
    catch(err){
        next(err);
    }
}

async function registerUser(req,res,next){
    try{
        const userData = req.body;
        const user = await userService.registerUser(userData);

        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"User registered successfully",
            data: user,
        })
    }
    catch(err){
        next(err);
    }
}

async function loginUser(req,res,next){
    try{
        const {email,password} = req.body;
        const userData= await userService.loginUser(email,password);
        
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User logged in successfully",
            data: userData,
        });
    }
    catch(err){
        next(err);
    }
}

async function logoutUser(req,res,next){
    try{
        
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    registerUser,
    loginUser
};