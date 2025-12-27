import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const countries = [
  { nameEn: 'United States', nameAr: 'الولايات المتحدة' },
  { nameEn: 'United Kingdom', nameAr: 'المملكة المتحدة' },
  { nameEn: 'Canada', nameAr: 'كندا' },
  { nameEn: 'Australia', nameAr: 'أستراليا' },
  { nameEn: 'Germany', nameAr: 'ألمانيا' },
  { nameEn: 'France', nameAr: 'فرنسا' },
  { nameEn: 'Italy', nameAr: 'إيطاليا' },
  { nameEn: 'Spain', nameAr: 'إسبانيا' },
  { nameEn: 'Japan', nameAr: 'اليابان' },
  { nameEn: 'China', nameAr: 'الصين' },
  { nameEn: 'India', nameAr: 'الهند' },
  { nameEn: 'Brazil', nameAr: 'البرازيل' },
  { nameEn: 'Mexico', nameAr: 'المكسيك' },
  { nameEn: 'South Korea', nameAr: 'كوريا الجنوبية' },
  { nameEn: 'Netherlands', nameAr: 'هولندا' },
  { nameEn: 'Sweden', nameAr: 'السويد' },
  { nameEn: 'Norway', nameAr: 'النرويج' },
  { nameEn: 'Denmark', nameAr: 'الدنمارك' },
  { nameEn: 'Finland', nameAr: 'فنلندا' },
  { nameEn: 'Poland', nameAr: 'بولندا' },
  { nameEn: 'Turkey', nameAr: 'تركيا' },
  { nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية' },
  { nameEn: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة' },
  { nameEn: 'Egypt', nameAr: 'مصر' },
  { nameEn: 'Jordan', nameAr: 'الأردن' },
  { nameEn: 'Lebanon', nameAr: 'لبنان' },
  { nameEn: 'Iraq', nameAr: 'العراق' },
  { nameEn: 'Kuwait', nameAr: 'الكويت' },
  { nameEn: 'Qatar', nameAr: 'قطر' },
  { nameEn: 'Bahrain', nameAr: 'البحرين' },
  { nameEn: 'Oman', nameAr: 'عمان' },
  { nameEn: 'Yemen', nameAr: 'اليمن' },
  { nameEn: 'Syria', nameAr: 'سوريا' },
  { nameEn: 'Palestine', nameAr: 'فلسطين' },
  { nameEn: 'Morocco', nameAr: 'المغرب' },
  { nameEn: 'Algeria', nameAr: 'الجزائر' },
  { nameEn: 'Tunisia', nameAr: 'تونس' },
  { nameEn: 'Libya', nameAr: 'ليبيا' },
  { nameEn: 'Sudan', nameAr: 'السودان' },
  { nameEn: 'Iran', nameAr: 'إيران' },
  { nameEn: 'Cyprus', nameAr: 'قبرص' },
  { nameEn: 'Greece', nameAr: 'اليونان' },
  { nameEn: 'Russia', nameAr: 'روسيا' },
  { nameEn: 'Ukraine', nameAr: 'أوكرانيا' },
  { nameEn: 'Belgium', nameAr: 'بلجيكا' },
  { nameEn: 'Switzerland', nameAr: 'سويسرا' },
  { nameEn: 'Austria', nameAr: 'النمسا' },
  { nameEn: 'Portugal', nameAr: 'البرتغال' },
  { nameEn: 'Ireland', nameAr: 'أيرلندا' },
  { nameEn: 'New Zealand', nameAr: 'نيوزيلندا' },
  { nameEn: 'Singapore', nameAr: 'سنغافورة' },
  { nameEn: 'Malaysia', nameAr: 'ماليزيا' },
  { nameEn: 'Thailand', nameAr: 'تايلاند' },
  { nameEn: 'Indonesia', nameAr: 'إندونيسيا' },
  { nameEn: 'Philippines', nameAr: 'الفلبين' },
  { nameEn: 'Vietnam', nameAr: 'فيتنام' },
  { nameEn: 'Taiwan', nameAr: 'تايوان' },
  { nameEn: 'Hong Kong', nameAr: 'هونغ كونغ' },
  { nameEn: 'South Africa', nameAr: 'جنوب أفريقيا' },
  { nameEn: 'Nigeria', nameAr: 'نيجيريا' },
  { nameEn: 'Kenya', nameAr: 'كينيا' },
  { nameEn: 'Ghana', nameAr: 'غانا' },
  { nameEn: 'Ethiopia', nameAr: 'إثيوبيا' },
  { nameEn: 'Tanzania', nameAr: 'تنزانيا' },
  { nameEn: 'Uganda', nameAr: 'أوغندا' },
  { nameEn: 'Argentina', nameAr: 'الأرجنتين' },
  { nameEn: 'Chile', nameAr: 'تشيلي' },
  { nameEn: 'Colombia', nameAr: 'كولومبيا' },
  { nameEn: 'Peru', nameAr: 'بيرو' },
  { nameEn: 'Venezuela', nameAr: 'فنزويلا' },
  { nameEn: 'Ecuador', nameAr: 'الإكوادور' },
  { nameEn: 'Uruguay', nameAr: 'أوروغواي' },
  { nameEn: 'Paraguay', nameAr: 'باراغواي' },
  { nameEn: 'Bolivia', nameAr: 'بوليفيا' },
];

async function seedCountries() {
  console.log('Seeding countries...');

  // Delete all existing countries
  await prisma.country.deleteMany({});
  console.log('Deleted existing countries');

  // Create new countries
  let order = 0;
  for (const country of countries) {
    await prisma.country.create({
      data: {
        nameEn: country.nameEn,
        nameAr: country.nameAr,
        order: order++,
        isActive: true,
      },
    });
  }

  console.log(`✅ Created ${countries.length} countries`);
}

seedCountries()
  .catch((e) => {
    console.error('Error seeding countries:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
