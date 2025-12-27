import express from 'express';
import SolutionController from '../controllers/SolutionController.js';
import SolutionService from '../../application/services/SolutionService.js';
import SolutionRepository from '../../infrastructure/repositories/SolutionRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const solutionRepository = new SolutionRepository();
const solutionService = new SolutionService(solutionRepository);
const solutionController = new SolutionController(solutionService);

// Public routes
router.get('/active', solutionController.getActive);
router.get('/settings', solutionController.getSectionSettings);

// CMS routes (should be protected with authentication in production)
router.get('/', solutionController.getAll);
router.get('/:id', solutionController.getById);
router.post('/', upload.single('image'), solutionController.create);
router.put('/:id', upload.single('image'), solutionController.update);
router.delete('/:id', solutionController.delete);
router.put('/settings/update', solutionController.updateSectionSettings);

// Image upload route
router.post('/:id/image', upload.single('file'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const imageUrl = `/uploads/${file.filename}`;
    const solution = await solutionService.updateSolution(id, { imageUrl });

    res.status(200).json({
      success: true,
      data: solution,
    });
  } catch (error) {
    next(error);
  }
});

export default router;


