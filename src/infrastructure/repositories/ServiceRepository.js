import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ServiceRepository {
  async getAll() {
    return await prisma.service.findMany({
      include: {
        tags: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.service.findMany({
      where: { isActive: true },
      include: {
        tags: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.service.findUnique({
      where: { id },
      include: {
        tags: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data) {
    const { tags = [], ...serviceData } = data;
    
    return await prisma.service.create({
      data: {
        type: serviceData.type || 'card',
        count: serviceData.type === 'card' ? (parseInt(serviceData.count) || 0) : 0,
        titleEn: serviceData.titleEn,
        titleAr: serviceData.titleAr,
        descriptionEn: serviceData.type === 'card' ? (serviceData.descriptionEn || null) : null,
        descriptionAr: serviceData.type === 'card' ? (serviceData.descriptionAr || null) : null,
        imageUrl: serviceData.imageUrl,
        order: parseInt(serviceData.order) || 0,
        isActive: serviceData.isActive !== undefined ? serviceData.isActive : true,
        tags: {
          create: serviceData.type === 'card' ? tags.map((tag, index) => ({
            textEn: tag.textEn,
            textAr: tag.textAr,
            order: index,
          })) : [],
        },
      },
      include: {
        tags: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async update(id, data) {
    const { tags, ...serviceUpdateData } = data;
    const updateData = {};
    
    if (serviceUpdateData.type !== undefined) updateData.type = serviceUpdateData.type;
    if (serviceUpdateData.count !== undefined) {
      updateData.count = serviceUpdateData.type === 'card' ? parseInt(serviceUpdateData.count) : 0;
    }
    if (serviceUpdateData.titleEn !== undefined) updateData.titleEn = serviceUpdateData.titleEn;
    if (serviceUpdateData.titleAr !== undefined) updateData.titleAr = serviceUpdateData.titleAr;
    if (serviceUpdateData.descriptionEn !== undefined) {
      updateData.descriptionEn = serviceUpdateData.type === 'card' ? (serviceUpdateData.descriptionEn || null) : null;
    }
    if (serviceUpdateData.descriptionAr !== undefined) {
      updateData.descriptionAr = serviceUpdateData.type === 'card' ? (serviceUpdateData.descriptionAr || null) : null;
    }
    if (serviceUpdateData.imageUrl !== undefined) updateData.imageUrl = serviceUpdateData.imageUrl;
    if (serviceUpdateData.order !== undefined) updateData.order = parseInt(serviceUpdateData.order);
    if (serviceUpdateData.isActive !== undefined) updateData.isActive = serviceUpdateData.isActive;

    // Handle tags update - only for cards
    if (tags !== undefined) {
      // Delete existing tags
      await prisma.serviceTag.deleteMany({
        where: { serviceId: id },
      });
      
      // Only create tags if it's a card type
      if (serviceUpdateData.type === 'card' || (serviceUpdateData.type === undefined && data.type === 'card')) {
        updateData.tags = {
          create: tags.map((tag, index) => ({
            textEn: tag.textEn,
            textAr: tag.textAr,
            order: index,
          })),
        };
      }
    }

    return await prisma.service.update({
      where: { id },
      data: updateData,
      include: {
        tags: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async delete(id) {
    return await prisma.service.delete({
      where: { id },
    });
  }
}

export default ServiceRepository;

