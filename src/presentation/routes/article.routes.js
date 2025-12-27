import express from 'express';
import ArticleController from '../controllers/ArticleController.js';
import ArticleService from '../../application/services/ArticleService.js';
import ArticleRepository from '../../infrastructure/repositories/ArticleRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

// Public routes
router.get('/active', articleController.getActive);
router.get('/settings', articleController.getSectionSettings);

// CMS routes (should be protected with authentication in production)
router.get('/', articleController.getAll);
router.get('/:id', articleController.getById);
router.post('/', upload.single('image'), articleController.create);
router.put('/:id', upload.single('image'), articleController.update);
router.delete('/:id', articleController.delete);
router.put('/settings/update', articleController.updateSectionSettings);

export default router;
