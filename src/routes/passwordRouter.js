import { Router } from 'express';
import PasswordController from '../controllers/passwordController.js';

const router = Router();
const passwordController = new PasswordController();

router.post('/forgot-password', passwordController.requestReset);
router.post('/reset-password', passwordController.resetPassword);

export default router;
