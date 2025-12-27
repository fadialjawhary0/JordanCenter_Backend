import prisma from '../../config/database.js';
import { User } from '../../domain/entities/User.js';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';

/**
 * User Repository Implementation
 * Handles database operations for User entity
 */
export class UserRepository extends IUserRepository {
  async findById(id) {
    const userData = await prisma.user.findUnique({
      where: { id },
    });

    return userData ? new User(userData) : null;
  }

  async findByEmail(email) {
    const userData = await prisma.user.findUnique({
      where: { email },
    });

    return userData ? new User(userData) : null;
  }

  async findAll(filters = {}) {
    const { page = 1, limit = 10, ...where } = filters;

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: data.map((userData) => new User(userData)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(userData) {
    const user = new User(userData);
    const validation = user.validate();

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
      },
    });

    return new User(createdUser);
  }

  async update(id, userData) {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = new User({ ...existingUser, ...userData });
    const validation = updatedUser.validate();

    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: {
        email: updatedUser.email,
        name: updatedUser.name,
      },
    });

    return new User(updated);
  }

  async delete(id) {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    await prisma.user.delete({
      where: { id },
    });

    return true;
  }
}

