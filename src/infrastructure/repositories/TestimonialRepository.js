import { PrismaClient } from '@prisma/client';
import { ITestimonialRepository } from '../../domain/repositories/ITestimonialRepository.js';

const prisma = new PrismaClient();

export class TestimonialRepository extends ITestimonialRepository {
  async getAll() {
    return await prisma.testimonial.findMany({
      include: {
        profiles: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.testimonial.findFirst({
      where: { isActive: true },
      include: {
        profiles: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.testimonial.findUnique({
      where: { id },
      include: {
        profiles: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data) {
    const { profiles, ...testimonialData } = data;
    
    return await prisma.testimonial.create({
      data: {
        ...testimonialData,
        profiles: profiles ? {
          create: profiles,
        } : undefined,
      },
      include: {
        profiles: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async update(id, data) {
    const { profiles, ...testimonialData } = data;
    
    return await prisma.testimonial.update({
      where: { id },
      data: testimonialData,
      include: {
        profiles: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async delete(id) {
    return await prisma.testimonial.delete({
      where: { id },
    });
  }

  async addProfile(testimonialId, profileData) {
    return await prisma.testimonialProfile.create({
      data: {
        ...profileData,
        testimonialId,
      },
    });
  }

  async updateProfile(profileId, profileData) {
    return await prisma.testimonialProfile.update({
      where: { id: profileId },
      data: profileData,
    });
  }

  async deleteProfile(profileId) {
    return await prisma.testimonialProfile.delete({
      where: { id: profileId },
    });
  }
}

export default TestimonialRepository;
