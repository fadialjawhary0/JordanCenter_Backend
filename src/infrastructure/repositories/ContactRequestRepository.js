import { PrismaClient } from '@prisma/client';
import { IContactRequestRepository } from '../../domain/repositories/IContactRequestRepository.js';

const prisma = new PrismaClient();

export class ContactRequestRepository extends IContactRequestRepository {
  async getAll() {
    return await prisma.contactRequest.findMany({
      include: {
        requestType: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id) {
    return await prisma.contactRequest.findUnique({
      where: { id },
      include: {
        requestType: true,
      },
    });
  }

  async create(data) {
    return await prisma.contactRequest.create({
      data,
      include: {
        requestType: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.contactRequest.update({
      where: { id },
      data,
      include: {
        requestType: true,
      },
    });
  }

  async delete(id) {
    return await prisma.contactRequest.delete({
      where: { id },
    });
  }
}

export default ContactRequestRepository;
