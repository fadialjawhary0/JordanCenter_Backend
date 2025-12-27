import express from 'express';
import TestimonialController from '../controllers/TestimonialController.js';
import TestimonialService from '../../application/services/TestimonialService.js';
import TestimonialRepository from '../../infrastructure/repositories/TestimonialRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const testimonialRepository = new TestimonialRepository();
const testimonialService = new TestimonialService(testimonialRepository);
const testimonialController = new TestimonialController(testimonialService);

// Public routes
router.get('/active', testimonialController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', testimonialController.getAll);
router.get('/:id', testimonialController.getById);
router.post('/', upload.single('image'), testimonialController.create);
router.put('/:id', upload.single('image'), testimonialController.update);
router.delete('/:id', testimonialController.delete);

// Profile routes
router.post('/:testimonialId/profiles', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'testimonialImage', maxCount: 1 }
]), testimonialController.addProfile);
router.put('/profiles/:profileId', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'testimonialImage', maxCount: 1 }
]), testimonialController.updateProfile);
router.delete('/profiles/:profileId', testimonialController.deleteProfile);

export default router;
