import User from './models/userModel.js'

export class usersMongoDao{
    async getByEmail(email) {
        return User.findOne({ email }).lean();
    }

    async getById(id) {
        return User.findById(id).lean();
    }

    async create(userData) {
        const newUser = await User.create(userData);
        return newUser.toJSON();
    }
}