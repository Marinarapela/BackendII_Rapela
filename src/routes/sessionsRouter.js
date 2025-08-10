import {Router} from 'express';
import bcrypt from 'bcrypt';
import User from '../dao/models/userModel.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import {auth} from '../middleware/auth.js'

export const router = Router()

router.get('/error', (req,res)=>{
    res.setHeader('Content-Type', 'application/json')
    return res.status(400).json({error:`Error al autenticar`})
})

router.post('/register',
    passport.authenticate('register', {failureRedirect: '/api/sessions/error', session: false}),
    (req, res)=>{
        res.setHeader('Content-type', 'application/json')
        return res.status(201).json({mensaje:`Registro exitoso para ${req.user.first_name} ${req.user.last_name}`, 
            usuarioGenerado:{
                id: req.user._id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                email: req.user.email,
                role: req.user.role
            }
    })
}
)    

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validar que lleguen los datos necesarios
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }
try {
    // Buscar usuario en la base
    const user = await User.findOne({ email }).lean();
    if (!user) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Validar contraseña
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
        return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    // Eliminar la contraseña del objeto para no enviarla
    const { password: _, ...userWithoutPass } = user;

    // Generar token JWT con datos relevantes
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.SECRET_SESSION,
        { expiresIn: "1h" }
    );

    // Responder con usuario (sin pass) y token
    return res.status(200).json({
        usuarioLogueado: userWithoutPass,
        token
    });
    } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.get('/perfil', auth, (req, res) => {
    const { first_name, email } = req.user;
    res.status(200).render('perfil', { first_name, email });
});

router.get('/current',
    passport.authenticate("current", { session: false }),
    (req, res) => {
        res.status(200).json({
            message: "Usuario autenticado correctamente",
            user: req.user
        });
    }
);
