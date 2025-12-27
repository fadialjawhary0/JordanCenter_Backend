import express from 'express';
import RequestTypeController from '../controllers/RequestTypeController.js';
import RequestTypeService from '../../application/services/RequestTypeService.js';
import RequestTypeRepository from '../../infrastructure/repositories/RequestTypeRepository.js';

const router = express.Router();

// Initialize dependencies
const requestTypeRepository = new RequestTypeRepository();
const requestTypeService = new RequestTypeService(requestTypeRepository);
const requestTypeController = new RequestTypeController(requestTypeService);

// Public routes
router.get('/active', requestTypeController.getActive);

// CMS routes (should be protected with authentication in production)
router.get('/', requestTypeController.getAll);
router.get('/:id', requestTypeController.getById);
router.post('/', requestTypeController.create);
router.put('/:id', requestTypeController.update);
router.delete('/:id', requestTypeController.delete);

export default router;
