const logger = require('../config/logger.config');
const NotFound = require('../errors/notFound.error')
const {User} = require('../models');

class UserRepository{
    async findByEmail(email){
        const email = await User.findOne({email});
        return email;
    }
    async createUser(userData){
        const user = new User(userData);
        return await user.save();
    }
}
module.exports=UserRepository;