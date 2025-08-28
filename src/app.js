import express from 'express';
import sessions from 'express-session';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import passport from 'passport';
import {config} from './config/config.js';
import connectMongo from 'connect-mongo';
import 'dotenv/config';

import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import ticketRouter from './routes/ticketRouter.js';
import passwordRouter from './routes/passwordRouter.js';
import { router as sessionsRouter } from './routes/sessionsRouter.js'
import __dirname from './utils/constantsUtil.js';
import websocket from './websocket.js';
import { iniciarPassport } from './config/passport.config.js';


const app = express();


mongoose.connect(config.MONGO_URL).then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=> console.error(err))

//Handlebars Config
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(sessions ({
    secret: config.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: connectMongo.create({
        mongoUrl: config.MONGO_URL,
        dbName: config.DB_NAME,
        ttl: 3600
    })
}))

iniciarPassport()
app.use(passport.initialize())
//app.use(passport.session())


//Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/password', passwordRouter);
app.use('/api/tickets', ticketRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Start server in PORT ${PORT}`);
});

const io = new Server(httpServer);

websocket(io);