import { PrismaClient } from '@prisma/client';
import { IProductTypeRepository } from '../../domain/repositories/IProductTypeRepository.js';

const prisma = new PrismaClient();

export class ProductTypeRepository extends IProductTypeRepository {
  async getAll() {
    return await prisma.productType.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.productType.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.productType.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.productType.create({
      data: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        order: parseInt(data.order) || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async update(id, data) {
    const updateData = {};
    if (data.nameEn !== undefined) updateData.nameEn = data.nameEn;
    if (data.nameAr !== undefined) updateData.nameAr = data.nameAr;
    if (data.order !== undefined) updateData.order = parseInt(data.order);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return await prisma.productType.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id) {
    return await prisma.productType.delete({
      where: { id },
    });
  }
}

export default ProductTypeRepository;
