import express from 'express';
import ServicesPageController from '../controllers/ServicesPageController.js';
import ServicesPageService from '../../application/services/ServicesPageService.js';
import ServicesPageRepository from '../../infrastructure/repositories/ServicesPageRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const servicesPageRepository = new ServicesPageRepository();
const servicesPageService = new ServicesPageService(servicesPageRepository);
const servicesPageController = new ServicesPageController(servicesPageService);

// Public routes
router.get('/page-settings', servicesPageController.getPageSettings);

// CMS routes (should be protected with authentication in production)
router.put('/page-settings', upload.single('heroImage'), servicesPageController.updatePageSettings);

export default router;
