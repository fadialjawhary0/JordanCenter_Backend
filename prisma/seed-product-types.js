import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productTypes = [
  { nameEn: 'Power Tools', nameAr: 'أدوات كهربائية', order: 1 },
  { nameEn: 'Hand Tools', nameAr: 'أدوات يدوية', order: 2 },
  { nameEn: 'Measuring Tools', nameAr: 'أدوات القياس', order: 3 },
  { nameEn: 'Safety Equipment', nameAr: 'معدات السلامة', order: 4 },
  { nameEn: 'Hardware', nameAr: 'أدوات معدنية', order: 5 },
  { nameEn: 'Paint & Supplies', nameAr: 'الدهانات والمستلزمات', order: 6 },
  { nameEn: 'Plumbing', nameAr: 'السباكة', order: 7 },
  { nameEn: 'Electrical', nameAr: 'الكهرباء', order: 8 },
  { nameEn: 'Garden Tools', nameAr: 'أدوات الحديقة', order: 9 },
  { nameEn: 'Automotive', nameAr: 'السيارات', order: 10 },
];

async function main() {
  console.log('Seeding product types...');

  // Delete existing product types
  await prisma.productType.deleteMany({});

  // Create product types
  for (const productType of productTypes) {
    await prisma.productType.create({
      data: productType,
    });
  }

  console.log(`✅ Created ${productTypes.length} product types successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
