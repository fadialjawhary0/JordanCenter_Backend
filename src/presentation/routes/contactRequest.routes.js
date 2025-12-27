import express from 'express';
import ContactRequestController from '../controllers/ContactRequestController.js';
import ContactRequestService from '../../application/services/ContactRequestService.js';
import ContactRequestRepository from '../../infrastructure/repositories/ContactRequestRepository.js';

const router = express.Router();

// Initialize dependencies
const contactRequestRepository = new ContactRequestRepository();
const contactRequestService = new ContactRequestService(contactRequestRepository);
const contactRequestController = new ContactRequestController(contactRequestService);

// Public routes (form submission)
router.post('/', contactRequestController.create);

// CMS routes (should be protected with authentication in production)
router.get('/', contactRequestController.getAll);
router.get('/:id', contactRequestController.getById);
router.put('/:id', contactRequestController.update);
router.delete('/:id', contactRequestController.delete);

export default router;
