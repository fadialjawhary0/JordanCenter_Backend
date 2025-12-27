import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedProjectsSection() {
  console.log('🌱 Seeding projects section...');

  // Delete existing data
  await prisma.projectLogo.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.projectsSectionSettings.deleteMany({});

  // Create projects section settings
  const projectsSection = await prisma.projectsSectionSettings.create({
    data: {
      sectionTitleEn: 'Our proud projects',
      sectionTitleAr: 'مشاريعنا الفخورة',
      buttonTextEn: 'View project details',
      buttonTextAr: 'عرض تفاصيل المشروع',
      ctaButtonTextEn: 'View more projects',
      ctaButtonTextAr: 'عرض المزيد من المشاريع',
      ctaButtonLink: '#projects',
      isActive: true,
      projects: {
        create: [
          {
            titleEn: 'Residential construction project',
            titleAr: 'مشروع بناء سكني',
            imageUrl: '/uploads/projects/project1.jpg', // Update with actual uploaded image path
            productsCount: 320,
            buttonTextEn: 'View project details',
            buttonTextAr: 'عرض تفاصيل المشروع',
            order: 0,
            isActive: true,
          },
          {
            titleEn: 'Residential complex project',
            titleAr: 'مشروع مجمع سكني',
            imageUrl: '/uploads/projects/project2.jpg',
            productsCount: 320,
            buttonTextEn: 'View project details',
            buttonTextAr: 'عرض تفاصيل المشروع',
            order: 1,
            isActive: true,
          },
          {
            titleEn: 'Residential complex project',
            titleAr: 'مشروع مجمع سكني',
            imageUrl: '/uploads/projects/project3.jpg',
            productsCount: 320,
            buttonTextEn: 'View project details',
            buttonTextAr: 'عرض تفاصيل المشروع',
            order: 2,
            isActive: true,
          },
          {
            titleEn: 'Residential complex construction project',
            titleAr: 'مشروع بناء مجمع سكني',
            imageUrl: '/uploads/projects/project4.jpg',
            productsCount: 320,
            buttonTextEn: 'View project details',
            buttonTextAr: 'عرض تفاصيل المشروع',
            order: 3,
            isActive: true,
          },
        ],
      },
    },
  });

  console.log(`✅ Created projects section with ${projectsSection.projects?.length || 0} projects`);
}

async function main() {
  try {
    await seedProjectsSection();
    console.log('✅ Projects section seeding completed successfully');
  } catch (error) {
    console.error('❌ Error seeding projects section:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();

