import express from 'express';
import { UserController } from '../controllers/UserController.js';
import { validateUser } from '../validators/user.validator.js';

const router = express.Router();
const userController = new UserController();

// GET /api/users - Get all users
router.get('/', userController.getAll);

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getById);

// POST /api/users - Create new user
router.post('/', validateUser, userController.create);

// PUT /api/users/:id - Update user
router.put('/:id', validateUser, userController.update);

// DELETE /api/users/:id - Delete user
router.delete('/:id', userController.delete);

export default router;

