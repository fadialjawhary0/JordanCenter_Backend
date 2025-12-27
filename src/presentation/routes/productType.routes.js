import express from 'express';
import ProductTypeController from '../controllers/ProductTypeController.js';
import ProductTypeService from '../../application/services/ProductTypeService.js';
import ProductTypeRepository from '../../infrastructure/repositories/ProductTypeRepository.js';

const router = express.Router();

// Initialize dependencies
const productTypeRepository = new ProductTypeRepository();
const productTypeService = new ProductTypeService(productTypeRepository);
const productTypeController = new ProductTypeController(productTypeService);

// Public routes
router.get('/active', productTypeController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', productTypeController.getAll);
router.get('/:id', productTypeController.getById);
router.post('/', productTypeController.create);
router.put('/:id', productTypeController.update);
router.delete('/:id', productTypeController.delete);

export default router;
