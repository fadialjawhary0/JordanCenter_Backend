import express from 'express';
import ProjectController from '../controllers/ProjectController.js';
import ProjectService from '../../application/services/ProjectService.js';
import ProjectRepository from '../../infrastructure/repositories/ProjectRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const projectRepository = new ProjectRepository();
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(projectService);

// Public routes
router.get('/active', projectController.getActiveSection);
router.get('/projects/active', projectController.getActiveProjects);

// CMS routes (should be protected with authentication in production)
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.post('/projects', upload.single('image'), projectController.createProject);
router.put('/projects/:id', upload.single('image'), projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// Project Logo routes
router.post('/projects/:projectId/logos', upload.single('file'), projectController.uploadProjectLogo);
router.put('/projects/logos/:logoId', projectController.updateProjectLogo);
router.delete('/projects/logos/:logoId', projectController.deleteProjectLogo);

// Section Settings routes
router.post('/settings', projectController.createSectionSettings);
router.put('/settings/:id', projectController.updateSectionSettings);

export default router;

