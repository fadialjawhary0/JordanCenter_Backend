# Quick PostgreSQL Setup (TL;DR)

## 1. Make sure PostgreSQL is installed and running

## 2. Create the database:
```sql
CREATE DATABASE central_jordan;
```

## 3. Create `.env` file in `Backend/` folder:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/central_jordan?schema=public"
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

**Replace `YOUR_PASSWORD` with your actual PostgreSQL password!**

## 4. Run these commands in `Backend/` folder:
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed-hero.js
npm run dev
```

Done! ✅

See `DATABASE_SETUP.md` for detailed instructions.

