// Quick test script to check server startup
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Checking environment variables...\n');

const required = ['DATABASE_URL', 'PORT'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach(key => console.error(`   - ${key}`));
  console.error('\n💡 Make sure Backend/.env file exists with these variables.');
  process.exit(1);
}

console.log('✅ Environment variables found:');
console.log(`   - DATABASE_URL: ${process.env.DATABASE_URL ? 'Set' : 'Missing'}`);
console.log(`   - PORT: ${process.env.PORT || 'Not set (will use default 3001)'}`);
console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   - CORS_ORIGIN: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}\n`);

console.log('🔍 Testing database connection...');

try {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();
  
  await prisma.$connect();
  console.log('✅ Database connection successful!\n');
  await prisma.$disconnect();
  
  console.log('✅ All checks passed! You can start the server with: npm run dev');
} catch (error) {
  console.error('❌ Database connection failed:');
  console.error(`   ${error.message}\n`);
  console.error('💡 Possible issues:');
  console.error('   1. PostgreSQL is not running');
  console.error('   2. DATABASE_URL is incorrect');
  console.error('   3. Database "central_jordan" does not exist');
  console.error('   4. Prisma Client not generated (run: npx prisma generate)');
  process.exit(1);
}

