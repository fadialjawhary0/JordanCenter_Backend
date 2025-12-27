import { PrismaClient } from '@prisma/client';
import { IRequestTypeRepository } from '../../domain/repositories/IRequestTypeRepository.js';

const prisma = new PrismaClient();

export class RequestTypeRepository extends IRequestTypeRepository {
  async getAll() {
    return await prisma.requestType.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.requestType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.requestType.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.requestType.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.requestType.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.requestType.delete({
      where: { id },
    });
  }
}

export default RequestTypeRepository;
