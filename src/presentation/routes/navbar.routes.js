import express from 'express';
import NavbarController from '../controllers/NavbarController.js';
import NavbarService from '../../application/services/NavbarService.js';
import NavbarRepository from '../../infrastructure/repositories/NavbarRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const navbarRepository = new NavbarRepository();
const navbarService = new NavbarService(navbarRepository);
const navbarController = new NavbarController(navbarService);

// Public routes
router.get('/settings', navbarController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', upload.single('logo'), navbarController.updateSettings);
router.get('/links', navbarController.getAllLinks);
router.get('/links/:id', navbarController.getLinkById);
router.post('/links', navbarController.createLink);
router.put('/links/:id', navbarController.updateLink);
router.delete('/links/:id', navbarController.deleteLink);

export default router;

