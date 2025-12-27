import express from 'express';
import ServiceController from '../controllers/ServiceController.js';
import ServiceService from '../../application/services/ServiceService.js';
import ServiceRepository from '../../infrastructure/repositories/ServiceRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const serviceRepository = new ServiceRepository();
const serviceService = new ServiceService(serviceRepository);
const serviceController = new ServiceController(serviceService);

// Public routes
router.get('/active', serviceController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);
router.post('/', upload.single('image'), serviceController.create);
router.put('/:id', upload.single('image'), serviceController.update);
router.delete('/:id', serviceController.delete);

export default router;

