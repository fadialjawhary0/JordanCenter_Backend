import express from 'express';
import BrandsSectionController from '../controllers/BrandsSectionController.js';
import BrandsSectionService from '../../application/services/BrandsSectionService.js';
import BrandsSectionRepository from '../../infrastructure/repositories/BrandsSectionRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const brandsSectionRepository = new BrandsSectionRepository();
const brandsSectionService = new BrandsSectionService(brandsSectionRepository);
const brandsSectionController = new BrandsSectionController(brandsSectionService);

// Public routes
router.get('/active', brandsSectionController.getActive);
router.get('/settings', brandsSectionController.getSectionSettings);

// Section Settings routes (must be before /:id routes to avoid route conflicts)
router.put('/settings', brandsSectionController.updateSectionSettings);

// CMS routes (should be protected with authentication in production)
router.get('/:id', brandsSectionController.getById);
router.post('/', brandsSectionController.create);
router.put('/:id', brandsSectionController.update);
router.delete('/:id', brandsSectionController.delete);

// Logo routes
router.post('/:brandsSectionId/logos', upload.single('file'), brandsSectionController.uploadLogo);
router.put('/logos/:logoId', brandsSectionController.updateLogo);
router.delete('/logos/:logoId', brandsSectionController.deleteLogo);

export default router;
