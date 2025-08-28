import { PasswordService } from '../services/passwordService.js';

export default class PasswordController {
    constructor() {
        this.passwordService = new PasswordService();
    }

    requestReset = async (req, res) => {
        try {
            const result = await this.passwordService.sendPasswordReset(req.body.email);
            res.status(200).json({ status: "success", message: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { token, newPassword } = req.body;
            const result = await this.passwordService.resetPassword(token, newPassword);
            res.status(200).json({ status: "success", message: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }
}
