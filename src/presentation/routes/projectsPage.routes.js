import express from 'express';
import ProjectsPageController from '../controllers/ProjectsPageController.js';
import ProjectsPageService from '../../application/services/ProjectsPageService.js';
import ProjectsPageRepository from '../../infrastructure/repositories/ProjectsPageRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const projectsPageRepository = new ProjectsPageRepository();
const projectsPageService = new ProjectsPageService(projectsPageRepository);
const projectsPageController = new ProjectsPageController(projectsPageService);

// Public routes
router.get('/settings', projectsPageController.getSettings);

// CMS routes (should be protected with authentication in production)
router.put('/settings', upload.single('heroImage'), projectsPageController.updateSettings);
router.get('/hero-buttons', projectsPageController.getAllHeroButtons);
router.get('/hero-buttons/:id', projectsPageController.getHeroButtonById);
router.post('/hero-buttons', projectsPageController.createHeroButton);
router.put('/hero-buttons/:id', projectsPageController.updateHeroButton);
router.delete('/hero-buttons/:id', projectsPageController.deleteHeroButton);

export default router;









