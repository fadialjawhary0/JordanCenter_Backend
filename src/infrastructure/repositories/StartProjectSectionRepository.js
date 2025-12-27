import { PrismaClient } from '@prisma/client';
import { IStartProjectSectionRepository } from '../../domain/repositories/IStartProjectSectionRepository.js';

const prisma = new PrismaClient();

export class StartProjectSectionRepository extends IStartProjectSectionRepository {
  async getActive() {
    return await prisma.startProjectSection.findFirst({
      where: { isActive: true },
    });
  }

  async findById(id) {
    return await prisma.startProjectSection.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.startProjectSection.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.startProjectSection.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.startProjectSection.delete({
      where: { id },
    });
  }
}

export default StartProjectSectionRepository;
