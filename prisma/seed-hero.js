import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedHeroSection() {
  console.log('🌱 Seeding hero section...');

  // Delete existing data
  await prisma.heroStat.deleteMany({});
  await prisma.heroMedia.deleteMany({});
  await prisma.heroSection.deleteMany({});

  // Create hero section
  const heroSection = await prisma.heroSection.create({
    data: {
      isActive: true,
      titleEn: 'We provide building materials and equipment solutions for the success.',
      titleAr: 'نوفر حلول مواد البناء والمعدات لتحقيق النجاح.',
      descriptionEn: 'From the first nail to the heaviest equipment, we supply everything you need to complete construction projects efficiently, with quality, and on time.',
      descriptionAr: 'من أول مسمار إلى أثقل معدات، نوفر كل ما تحتاجه لإكمال مشاريع البناء بكفاءة وجودة وفي الوقت المحدد.',
      buttonTextEn: 'Request a quote now.',
      buttonTextAr: 'اطلب عرض سعر الآن.',
      buttonLink: '#contact',
      mediaItems: {
        create: [
          {
            type: 'video',
            url: '/hero-video.mp4', // This should be the actual video path
            order: 0,
          },
        ],
      },
      stats: {
        create: [
          {
            numberEn: '1,000+',
            numberAr: '1,000+',
            labelEn: 'products.',
            labelAr: 'منتج.',
            descriptionEn: 'A wide range project needs.',
            descriptionAr: 'مجموعة واسعة من احتياجات المشروع.',
            order: 0,
          },
          {
            numberEn: '1,200+',
            numberAr: '1,200+',
            labelEn: 'projects.',
            labelAr: 'مشروع.',
            descriptionEn: 'Full support at all stages of',
            descriptionAr: 'دعم كامل في جميع مراحل',
            order: 1,
          },
          {
            numberEn: '2,500+',
            numberAr: '2,500+',
            labelEn: 'clients.',
            labelAr: 'عميل.',
            descriptionEn: 'Companies and contractors rely',
            descriptionAr: 'الشركات والمقاولون يعتمدون',
            order: 2,
          },
          {
            numberEn: '2,500+',
            numberAr: '2,500+',
            labelEn: 'clients.',
            labelAr: 'عميل.',
            descriptionEn: 'Companies and contractors rely on',
            descriptionAr: 'الشركات والمقاولون يعتمدون على',
            order: 3,
          },
        ],
      },
    },
  });

  console.log('✅ Hero section seeded successfully');
  return heroSection;
}

async function main() {
  try {
    await seedHeroSection();
    console.log('✅ All seeds completed successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();

