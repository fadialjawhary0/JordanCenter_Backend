import express from 'express';
import ThemeController from '../controllers/ThemeController.js';
import ThemeService from '../../application/services/ThemeService.js';
import ThemeRepository from '../../infrastructure/repositories/ThemeRepository.js';

const router = express.Router();

// Initialize dependencies
const themeRepository = new ThemeRepository();
const themeService = new ThemeService(themeRepository);
const themeController = new ThemeController(themeService);

// Public routes
router.get('/settings', themeController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', themeController.updateSettings);

export default router;

