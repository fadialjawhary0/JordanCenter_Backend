import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  console.log('🌱 Seeding categories...');

  // Delete existing categories
  await prisma.category.deleteMany({});

  // Create categories with their grid positions
  const categories = [
    {
      titleEn: 'Personal Protective Equipment',
      titleAr: 'معدات الحماية الشخصية',
      productCount: 50,
      gridClasses: 'col-span-2 row-span-2',
      order: 0,
      isActive: true,
      imageUrl: '/uploads/categories/1.jpg', // Update with actual uploaded image path
    },
    {
      titleEn: 'Heavy Machinery and Equipment',
      titleAr: 'المعدات والآليات الثقيلة',
      productCount: 50,
      gridClasses: 'col-span-2 col-start-3 row-start-1',
      order: 1,
      isActive: true,
      imageUrl: '/uploads/categories/4.jpg',
    },
    {
      titleEn: 'Maintenance Accessories and Tools',
      titleAr: 'أدوات وملحقات الصيانة',
      productCount: 50,
      gridClasses: 'col-span-2 row-span-2 col-start-3 row-start-2',
      order: 2,
      isActive: true,
      imageUrl: '/uploads/categories/9.jpg',
    },
    {
      titleEn: 'Building Materials',
      titleAr: 'مواد البناء',
      productCount: 50,
      gridClasses: 'row-span-2 col-start-1 row-start-3',
      order: 3,
      isActive: true,
      imageUrl: '/uploads/categories/2.jpg',
    },
    {
      titleEn: 'Electrical Equipment',
      titleAr: 'المعدات الكهربائية',
      productCount: 50,
      gridClasses: 'col-span-3 col-start-2 row-start-4',
      order: 4,
      isActive: true,
      imageUrl: '/uploads/categories/3.jpg',
    },
    {
      titleEn: 'Hand Tools',
      titleAr: 'الأدوات اليدوية',
      productCount: 50,
      gridClasses: 'col-start-2 row-start-3',
      order: 5,
      isActive: true,
      imageUrl: '/uploads/categories/7.jpg',
    },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log(`✅ Created ${categories.length} categories successfully`);
}

async function main() {
  try {
    await seedCategories();
    console.log('✅ Categories seeding completed successfully');
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();

