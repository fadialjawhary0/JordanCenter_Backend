import { PrismaClient } from '@prisma/client';
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository.js';

const prisma = new PrismaClient();

export class CategoryRepository extends ICategoryRepository {
  async getAll() {
    return await prisma.category.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.category.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.category.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.category.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.category.delete({
      where: { id },
    });
  }
}

export default CategoryRepository;

