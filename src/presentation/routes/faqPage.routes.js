import express from 'express';
import FAQPageController from '../controllers/FAQPageController.js';
import FAQPageService from '../../application/services/FAQPageService.js';
import FAQPageRepository from '../../infrastructure/repositories/FAQPageRepository.js';

const router = express.Router();

// Initialize dependencies
const faqPageRepository = new FAQPageRepository();
const faqPageService = new FAQPageService(faqPageRepository);
const faqPageController = new FAQPageController(faqPageService);

// Public routes
router.get('/settings', faqPageController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', faqPageController.updateSettings);
router.get('/items', faqPageController.getAllFAQItems);
router.get('/items/:id', faqPageController.getFAQItemById);
router.post('/items', faqPageController.createFAQItem);
router.put('/items/:id', faqPageController.updateFAQItem);
router.delete('/items/:id', faqPageController.deleteFAQItem);

export default router;
