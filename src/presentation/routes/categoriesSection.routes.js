import express from 'express';
import CategoriesSectionController from '../controllers/CategoriesSectionController.js';
import CategoriesSectionService from '../../application/services/CategoriesSectionService.js';
import CategoriesSectionRepository from '../../infrastructure/repositories/CategoriesSectionRepository.js';

const router = express.Router();

// Initialize dependencies
const categoriesSectionRepository = new CategoriesSectionRepository();
const categoriesSectionService = new CategoriesSectionService(categoriesSectionRepository);
const categoriesSectionController = new CategoriesSectionController(categoriesSectionService);

// Public routes
router.get('/settings', categoriesSectionController.getSectionSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', categoriesSectionController.updateSectionSettings);

export default router;
