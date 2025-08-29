import User from './models/userModel.js'

export class usersMongoDao{
    async getByEmail(email) {
        const normalizedEmail = email.trim().toLowerCase()
        return User.findOne({ email: normalizedEmail });
    }

    async getById(id) {
        return User.findById(id).lean();
    }

    async create(userData) {
        const normalizedData = {
        ...userData,
        email: userData.email.trim().toLowerCase()
        };
        const newUser = await User.create(normalizedData);
        return newUser.toJSON();
    }
}