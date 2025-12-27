import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';
import { User } from '../../domain/entities/User.js';

/**
 * User Service
 * Contains application logic and orchestrates domain entities and repositories
 */
export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserByEmail(email) {
    return await this.userRepository.findByEmail(email);
  }

  async getAllUsers(filters = {}) {
    return await this.userRepository.findAll(filters);
  }

  async createUser(userData) {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user
    const user = await this.userRepository.create(userData);
    return user;
  }

  async updateUser(id, userData) {
    // Check if email is being changed and if it's already taken
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email is already taken by another user');
      }
    }

    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}

