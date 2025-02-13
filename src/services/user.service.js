const jwt = require("jsonwebtoken");


class UserService{
    constructor(userRepository){
        this.userRepository=userRepository;
    }

    async registerUser(userData){
        const {firstname, lastname, email,password,isDoctor,isAdmin} = userData;

        const existingUser = await this.userRepository.findByEmail(email);
        if(existingUser){
            throw new Error('User already exists');
        }
        const user = await this.userRepository.createUser({
            firstname,
            lastname,
            email,
            password,
            isDoctor : isDoctor || false,
            isAdmin : isDoctor || false
        });

        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET,{
            expiresIn: "7d",
        })

        return{
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isDoctor: user.isDoctor,
            isAdmin: user.isAdmin,
            token,
        }
    }

    async loginUser(email,password){
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
      
        return {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isDoctor: user.isDoctor,
            isAdmin: user.isAdmin,
            token,
        };
    }
}
module.exports=UserService;