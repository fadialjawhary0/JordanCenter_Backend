import express from 'express';
import HeroSectionController from '../controllers/HeroSectionController.js';
import HeroSectionService from '../../application/services/HeroSectionService.js';
import HeroSectionRepository from '../../infrastructure/repositories/HeroSectionRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const heroSectionRepository = new HeroSectionRepository();
const heroSectionService = new HeroSectionService(heroSectionRepository);
const heroSectionController = new HeroSectionController(heroSectionService);

// Public routes
router.get('/active', heroSectionController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/:id', heroSectionController.getById);
router.post('/', heroSectionController.create);
router.put('/:id', heroSectionController.update);
router.delete('/:id', heroSectionController.delete);

// Media routes
router.post('/:heroSectionId/media', upload.single('file'), heroSectionController.uploadMedia);
router.delete('/media/:mediaId', heroSectionController.deleteMedia);

// Stats routes
router.post('/:heroSectionId/stats', heroSectionController.addStat);
router.put('/stats/:statId', heroSectionController.updateStat);
router.delete('/stats/:statId', heroSectionController.deleteStat);

export default router;

