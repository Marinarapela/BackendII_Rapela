import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { ViewService } from "../services/viewService.js";
import ViewController from "../controllers/viewController.js";

const router = Router();
const viewService = new ViewService();
const viewController = new ViewController(viewService);

// Rutas
router.get("/products", viewController.renderProducts);
router.get("/realtimeproducts", viewController.renderRealtimeProducts);
router.get("/cart/:cid", viewController.renderCart);
router.get("/register", viewController.renderRegister);
router.get("/login", viewController.renderLogin);
router.get("/perfil", auth, viewController.renderProfile);

export default router;
