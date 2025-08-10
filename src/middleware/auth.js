import jwt from 'jsonwebtoken'
import User from '../dao/models/userModel.js'

export const auth = async (req, res, next) => {
    try {
    const authHeader = req.headers.authorization;

        if (!authHeader) {
        return res.status(401).json({ error: 'No hay token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const payload = jwt.verify(token, process.env.SECRET_SESSION);

    
    const user = await User.findById(payload.id);
    if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
