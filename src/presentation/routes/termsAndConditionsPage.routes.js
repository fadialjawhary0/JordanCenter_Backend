import express from 'express';
import TermsAndConditionsPageController from '../controllers/TermsAndConditionsPageController.js';
import TermsAndConditionsPageService from '../../application/services/TermsAndConditionsPageService.js';
import TermsAndConditionsPageRepository from '../../infrastructure/repositories/TermsAndConditionsPageRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const termsAndConditionsPageRepository = new TermsAndConditionsPageRepository();
const termsAndConditionsPageService = new TermsAndConditionsPageService(termsAndConditionsPageRepository);
const termsAndConditionsPageController = new TermsAndConditionsPageController(termsAndConditionsPageService);

// Public routes
router.get('/settings', termsAndConditionsPageController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', upload.single('heroImage'), termsAndConditionsPageController.updateSettings);

export default router;
