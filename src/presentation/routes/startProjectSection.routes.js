import express from 'express';
import StartProjectSectionController from '../controllers/StartProjectSectionController.js';
import StartProjectSectionService from '../../application/services/StartProjectSectionService.js';
import StartProjectSectionRepository from '../../infrastructure/repositories/StartProjectSectionRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const startProjectSectionRepository = new StartProjectSectionRepository();
const startProjectSectionService = new StartProjectSectionService(startProjectSectionRepository);
const startProjectSectionController = new StartProjectSectionController(startProjectSectionService);

// Public routes
router.get('/active', startProjectSectionController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/:id', startProjectSectionController.getById);
router.post('/', upload.single('backgroundImage'), startProjectSectionController.create);
router.put('/:id', upload.single('backgroundImage'), startProjectSectionController.update);
router.delete('/:id', startProjectSectionController.delete);

export default router;
