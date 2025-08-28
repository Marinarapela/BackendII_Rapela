import { Router } from 'express';
import ProductController from '../controllers/productController.js'
import { uploader } from '../utils/multerUtil.js';
import { productService } from '../services/productService.js';
import { ProductsRepository } from '../repository/productsRepository.js';
import { auth } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';

const router = Router();

// Inyección de dependencias
const ProductService = new productService(new ProductsRepository())
const productController = new ProductController(ProductService)

//Rutas
router.get('/', productController.getAll)
router.get('/:pid', productController.getById)
router.post(
    '/',
    auth,
    authorize('admin'),
    uploader.array('thumbnails', 3),
    productController.create
)
router.put(
    '/:pid',
    auth,
    authorize ('admin'),
    uploader.array('thumbnails', 3),
    productController.update
)
router.delete('/:pid', auth, authorize('admin'), productController.delete)

export default router;