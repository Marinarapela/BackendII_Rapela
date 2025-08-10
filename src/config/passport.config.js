import passport from 'passport'
import passportJWT from 'passport-jwt'
import local from "passport-local"
import bcrypt from 'bcrypt'
import User from '../dao/models/userModel.js'

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const LocalStrategy = local.Strategy;

const buscarToken = req => {
    const authHeader = req.headers.authorization || '';
        if (authHeader.startsWith('Bearer ')) {
        return authHeader.slice(7); 
        }
    return null;
};

export const iniciarPassport=()=>{
passport.use("register",
    new local.Strategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async(req, username, password, done)=>{
            try {
                let {first_name, last_name, age, cart}=req.body
                if(!first_name || !last_name || !username || !password){
                    return done (null,false, { message: "Todos los campos obligatorios deben estar completos" })
                }

                const existingUser = await User.findOne({ email: username });
                if (existingUser) {
                    return done(null, false, { message: "El email ya está registrado" });
                }

                password=bcrypt.hashSync(password,10)

                let newUser = await User.create({
                    first_name,
                    last_name,
                    email:username,
                    age,
                    cart,
                    password
                })
            
                return done (null, newUser)

            } catch (error) {
                return done (error)
                
            }
        }
    )
)

passport.use("login",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: false
        },
        async (email, password, done) => {
            try {
                
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "Usuario no encontrado" });
                }

                
                const isValidPassword = bcrypt.compareSync(password, user.password);
                if (!isValidPassword) {
                    return done(null, false, { message: "Contraseña incorrecta" });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use("current",
    new JwtStrategy(
        {
            secretOrKey: process.env.SECRET_SESSION,
            jwtFromRequest: ExtractJwt.fromExtractors([buscarToken])
        },
        async(payload, done)=>{
            try {
                const user = await User.findById(payload.id)
                if (!user){
                    return done (null, false, {message: 'Usuario no encontrado'})
                }
                return done (null, user)
            } catch (error) {
                return done (error)
            }
        }
    )
)
    passport.serializeUser((user,done)=>{
        return done (null, user)
    })

    passport.deserializeUser((user,done)=>{
        return done (null, user)
    })
}