import express from 'express';
import FooterController from '../controllers/FooterController.js';
import FooterService from '../../application/services/FooterService.js';
import FooterRepository from '../../infrastructure/repositories/FooterRepository.js';

const router = express.Router();

// Initialize dependencies
const footerRepository = new FooterRepository();
const footerService = new FooterService(footerRepository);
const footerController = new FooterController(footerService);

// Public routes
router.get('/settings', footerController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', footerController.updateSettings);

// Footer Links routes
router.get('/links', footerController.getAllLinks);
router.get('/links/:id', footerController.getLinkById);
router.post('/links', footerController.createLink);
router.put('/links/:id', footerController.updateLink);
router.delete('/links/:id', footerController.deleteLink);

// Social Media routes
router.get('/social-media', footerController.getAllSocialMedia);
router.get('/social-media/:id', footerController.getSocialMediaById);
router.post('/social-media', footerController.createSocialMedia);
router.put('/social-media/:id', footerController.updateSocialMedia);
router.delete('/social-media/:id', footerController.deleteSocialMedia);

export default router;
