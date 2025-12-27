import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import CategoryService from '../../application/services/CategoryService.js';
import CategoryRepository from '../../infrastructure/repositories/CategoryRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

// Public routes
router.get('/active', categoryController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', upload.single('image'), categoryController.create);
router.put('/:id', upload.single('image'), categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;

