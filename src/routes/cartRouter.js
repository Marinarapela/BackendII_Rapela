import { Router } from 'express';
import CartController from '../controllers/cartController.js';
import { cartService } from '../services/cartService.js';
import { productService } from '../services/productService.js';
import { auth } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = Router();

// Inyección de dependencias
const ProductService = new productService();
const CartService = new cartService(ProductService);
const cartController = new CartController(CartService);

// Rutas
router.get('/:cid', auth, cartController.getById);
router.post('/', auth, cartController.create);
router.post(
    '/:cid/product/:pid',
    auth,
    authorize ('user'),
    cartController.addProduct
);
router.delete('/:cid/product/:pid', auth, authorize('user'), cartController.deleteProduct);
router.put('/:cid', auth, authorize('user'), cartController.updateAllProducts);
router.put(
    '/:cid/product/:pid',
    auth,
    authorize('user'),
    cartController.updateProduct
);
router.delete('/:cid', auth, authorize('user'), cartController.deleteAllProducts);

export default router;
