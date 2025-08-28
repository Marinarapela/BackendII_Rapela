import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { PasswordRepository } from '../repositories/passwordRepository.js';

export class PasswordService {
    constructor() {
        this.passwordRepository = new PasswordRepository();
    }

    async sendPasswordReset(email) {
        // Buscamos al usuario
        const user = await this.passwordRepository.getUserByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");

        // Generar token temporal
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        await this.passwordRepository.setResetToken(user._id, token, expires);

        // Configurar nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const resetLink = `http://localhost:8080/reset-password/${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: "Recuperación de contraseña",
            html: `<p>Haz clic <a href="${resetLink}">aquí</a> para restablecer tu contraseña. Expira en 1 hora.</p>`
        });

        return "Correo de recuperación enviado";
    }

    async resetPassword(token, newPassword) {
        const user = await this.passwordRepository.getByResetToken(token);
        if (!user) throw new Error("Token inválido o expirado");

        if (bcrypt.compareSync(newPassword, user.password)) {
            throw new Error("La nueva contraseña no puede ser igual a la anterior");
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        await this.passwordRepository.updatePassword(user._id, hashedPassword);
        await this.passwordRepository.clearResetToken(user._id);

        return "Contraseña actualizada correctamente";
    }
}
