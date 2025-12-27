import { UserService } from '../../application/services/UserService.js';

/**
 * User Controller
 * Handles HTTP requests and responses
 */
export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.json({
        success: true,
        data: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  getByEmail = async (req, res, next) => {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({
          success: false,
          error: { message: 'Email query parameter is required' },
        });
      }

      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: { message: 'User not found' },
        });
      }

      res.json({
        success: true,
        data: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const filters = {
        page: parseInt(req.query.page, 10) || 1,
        limit: parseInt(req.query.limit, 10) || 10,
      };

      const result = await this.userService.getAllUsers(filters);
      res.json({
        success: true,
        data: result.data.map((user) => user.toJSON()),
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const userData = req.body;
      const user = await this.userService.createUser(userData);
      res.status(201).json({
        success: true,
        data: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await this.userService.updateUser(id, userData);
      res.json({
        success: true,
        data: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

