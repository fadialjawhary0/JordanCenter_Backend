import express from 'express';
import ContactPageController from '../controllers/ContactPageController.js';
import ContactPageService from '../../application/services/ContactPageService.js';
import ContactPageRepository from '../../infrastructure/repositories/ContactPageRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const contactPageRepository = new ContactPageRepository();
const contactPageService = new ContactPageService(contactPageRepository);
const contactPageController = new ContactPageController(contactPageService);

// Public routes
router.get('/settings', contactPageController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'bottomImage', maxCount: 1 }
]), contactPageController.updateSettings);

export default router;
