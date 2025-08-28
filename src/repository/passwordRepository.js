import User from '../dao/models/userModel'

export class PasswordRepository {

async setResetToken(id, token, expires) {
    return await User.findByIdAndUpdate(id, {
        passwordResetToken: token,
        passwordResetExpires: expires
    });
}

async getByResetToken(token) {
    return await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() }
    });
}

async updatePassword(id, password) {
    return await User.findByIdAndUpdate(id, { password });
}

async clearResetToken(id) {
    return await User.findByIdAndUpdate(id, {
        passwordResetToken: null,
        passwordResetExpires: null
    });
}
}
