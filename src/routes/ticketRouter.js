import { Router } from 'express';
import TicketController from '../controllers/ticketController.js';
import { auth } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = Router();
const ticketController = new TicketController();

// Solo el usuario puede comprar su carrito
router.post('/purchase/:cid', auth, authorize('user'), ticketController.purchaseCart);

// Solo admins pueden ver todos los tickets
router.get('/', auth, authorize('admin'), ticketController.getAllTickets);
router.get('/:tid', auth, authorize('admin'), ticketController.getTicketById);

export default router;
