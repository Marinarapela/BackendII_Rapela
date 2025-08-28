import bcrypt from "bcrypt";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { UsersRepository } from "../repository/userRepository.js";
import { UserDTO } from "../dto/userDTO.js";
import nodemailer from 'nodemailer';

export class SessionService {
    constructor() {
        this.userRepository = new UsersRepository();
    }

    async registerUser(userData) {
        // Validar si ya existe email
        const existingUser = await this.userRepository.getUserByEmail(userData.email);
        if (existingUser) throw new Error("El email ya está registrado");

        // Hashear password
        const hashedPass = bcrypt.hashSync(userData.password, 10);
        const userToSave = { ...userData, password: hashedPass };

        return this.userRepository.createUser(userToSave);
    }

    async loginUser(email, password) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new Error("Credenciales incorrectas");

        const validPass = bcrypt.compareSync(password, user.password);
        if (!validPass) throw new Error("Credenciales incorrectas");

        const userDto = new UserDTO(user)

        const token = this.generateToken (user)

        return {user:userDto, token}
    }

        generateToken (user) {
            return jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.SECRET_SESSION,
            { expiresIn: "1h" }
        );
    }
    
    async getUserProfile(id) {
        const user = await this.userRepository.getUserById(id);
        if (!user) throw new Error("Usuario no encontrado");
        return user;
    }
}

class PasswordService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    // 1. Generar token y enviarlo por email
    async sendPasswordReset(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) throw new Error("Usuario no encontrado");

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        await this.userRepository.setResetToken(user._id, token, expires);

        // Configurar Nodemailer 
        const transporter = nodemailer.createTransport({   
            host: process.env.SMTP_HOST,       
            port: process.env.SMTP_PORT,       
            secure: false,                     
            auth: {
                user: process.env.SMTP_USER,   
                pass: process.env.SMTP_PASS,  
            }
    });
    
        const resetLink = `http://tuapp.com/reset-password/${token}`;
            

        await transporter.sendMail({
            to: user.email,
            subject: "Recuperación de contraseña",
            html: `<p>Para restablecer tu contraseña haz clic <a href="${resetLink}">aquí</a>. Este enlace expira en 1 hora.</p>`
        });

        return "Correo de recuperación enviado";
    }

    // 2. Validar token y cambiar contraseña
    async resetPassword(token, newPassword) {
        const user = await this.userRepository.getByResetToken(token);
        if (!user) throw new Error("Token inválido o expirado");

        if (bcrypt.compareSync(newPassword, user.password)) {
            throw new Error("La nueva contraseña no puede ser igual a la anterior");
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        await this.userRepository.updatePassword(user._id, hashedPassword);

        // Limpiar token
        await this.userRepository.clearResetToken(user._id);

        return "Contraseña actualizada correctamente";
    }
}

export { PasswordService };
