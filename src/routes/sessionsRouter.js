import {Router} from 'express';
import passport from 'passport'
import {auth} from '../middleware/auth.js'
import { SessionService } from "../services/sessionsService.js";
import SessionController from "../controllers/sessionController.js";

export const router = Router()

const sessionService = new SessionService();
const sessionController = new SessionController(sessionService);

router.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "/api/sessions/error", session: false }),
    sessionController.register
);

router.post("/login", sessionController.login);

router.get("/perfil", auth, sessionController.getProfile);

router.get(
    "/current",
    passport.authenticate("current", { session: false }),
    sessionController.getCurrent
);

router.get("/error", (req, res) => {
    res.status(400).json({ error: "Error al autenticar" });
});

export default router;