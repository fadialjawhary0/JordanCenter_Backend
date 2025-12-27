import express from 'express';
import ProductController from '../controllers/ProductController.js';
import ProductService from '../../application/services/ProductService.js';
import ProductRepository from '../../infrastructure/repositories/ProductRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

// Public routes
router.get('/active', productController.getActive);
router.get('/filter-options', productController.getFilterOptions);
router.get('/page-settings', productController.getPageSettings);
router.get('/:id/similar', productController.getSimilarProducts);

// CMS routes (should be protected with authentication in production)
router.get('/', productController.getAll);
// IMPORTANT: Put specific routes BEFORE parameterized routes to avoid route conflicts
router.put('/page-settings', upload.single('heroImage'), productController.updatePageSettings);
router.get('/:id', productController.getById);
router.post('/', upload.fields([{ name: 'images', maxCount: 20 }, { name: 'mediaFile', maxCount: 1 }]), productController.create);
router.put('/:id', upload.fields([{ name: 'images', maxCount: 20 }, { name: 'mediaFile', maxCount: 1 }]), productController.update);
router.delete('/:id', productController.delete);

export default router;
