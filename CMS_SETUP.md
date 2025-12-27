# CMS Setup Guide

## Prerequisites
- PostgreSQL database running locally or remotely
- Node.js installed

## Database Setup

1. **Create a `.env` file in the Backend directory** with the following content:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/central_jordan?schema=public"

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT (for future authentication)
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

Replace `user`, `password`, `localhost`, and `5432` with your actual PostgreSQL credentials.

2. **Run database migrations:**

```bash
cd Backend
npm install
npx prisma migrate dev --name init
npx prisma generate
```

3. **Seed the database with initial hero section data:**

```bash
node prisma/seed-hero.js
```

## Running the Backend

```bash
cd Backend
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Hero Section

- `GET /api/hero-section/active` - Get active hero section (public)
- `POST /api/hero-section` - Create hero section (CMS)
- `PUT /api/hero-section/:id` - Update hero section (CMS)
- `DELETE /api/hero-section/:id` - Delete hero section (CMS)
- `POST /api/hero-section/:heroSectionId/media` - Upload media (CMS)
- `DELETE /api/hero-section/media/:mediaId` - Delete media (CMS)
- `POST /api/hero-section/:heroSectionId/stats` - Add stat (CMS)
- `PUT /api/hero-section/stats/:statId` - Update stat (CMS)
- `DELETE /api/hero-section/stats/:statId` - Delete stat (CMS)

## Frontend Setup

The main frontend is already configured to fetch hero section data from the API.

The frontend will automatically fetch data from the backend API. If the API is unavailable, it will fall back to static content from translation files.

## Media Files

- Upload videos/images through the CMS
- Files are stored in `Backend/public/uploads/`
- Accessible via `http://localhost:5000/uploads/filename.ext`
- Maximum file size: 100MB

## Next Steps

1. Set up your database
2. Run migrations
3. Seed initial data
4. Start the backend server
5. Access the CMS (to be created next)

