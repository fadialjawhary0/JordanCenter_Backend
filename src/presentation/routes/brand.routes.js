import express from 'express';
import BrandController from '../controllers/BrandController.js';
import BrandService from '../../application/services/BrandService.js';
import BrandRepository from '../../infrastructure/repositories/BrandRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const brandRepository = new BrandRepository();
const brandService = new BrandService(brandRepository);
const brandController = new BrandController(brandService);

// Public routes
router.get('/active', brandController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', brandController.getAll);
router.get('/:id', brandController.getById);
router.post('/', upload.single('logo'), brandController.create);
router.put('/:id', upload.single('logo'), brandController.update);
router.delete('/:id', brandController.delete);

export default router;
