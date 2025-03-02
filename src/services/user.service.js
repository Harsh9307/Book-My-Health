const jwt = require("jsonwebtoken");


class UserService{
    constructor(userRepository){
        this.userRepository=userRepository;
    }
    
    async registerUser(userData){
        const user = await this.userRepository.registerUser(userData);
        return user;
    }

    // async loginUser(email,password){
    //     const user = await this.userRepository.findByEmail(email);
    //     if(!user){
    //         throw new Error("Invalid email or password");
    //     }
    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         throw new Error("Invalid email or password");
    //     }
    //     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    //         expiresIn: "7d",
    //       });
      
    //     return {
    //         id: user._id,
    //         firstname: user.firstname,
    //         lastname: user.lastname,
    //         email: user.email,
    //         isDoctor: user.isDoctor,
    //         isAdmin: user.isAdmin,
    //         token,
    //     };
    // }
    async getUsers(){
        const users = await this.userRepository.getUsers();
        return users;
    }

    async getUser(id){
        const user = await this.userRepository.getUser(id);
        return user;
    }

}
module.exports=UserService;