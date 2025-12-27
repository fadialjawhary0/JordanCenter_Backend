# PostgreSQL Database Setup Guide

## Step 1: Install PostgreSQL

If you don't have PostgreSQL installed:

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Or use: https://www.postgres.app/ (Postgres.app - easier)
- Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

**Mac:**
- Download from: https://www.postgresql.org/download/macosx/
- Or use Homebrew: `brew install postgresql@14`

**Linux:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

## Step 2: Start PostgreSQL Service

**Windows:**
- Open Services (Win+R → services.msc)
- Find "postgresql" service and start it
- Or use pgAdmin to start it

**Mac/Linux:**
```bash
sudo service postgresql start
# or
brew services start postgresql
```

## Step 3: Create the Database

Open PostgreSQL command line (psql) or pgAdmin:

**Using psql:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE central_jordan;

# Exit psql
\q
```

**Using pgAdmin:**
1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" → "Database"
4. Name: `central_jordan`
5. Click "Save"

## Step 4: Configure Backend Connection

Create a `.env` file in the `Backend/` directory:

```env
# Database Connection String
# Format: postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/central_jordan?schema=public"

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS (Frontend URL)
CORS_ORIGIN=http://localhost:5173

# JWT (for future authentication)
JWT_SECRET=central-jordan-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

**Important:** Replace these values with your actual PostgreSQL credentials:
- `postgres:postgres` → `YOUR_USERNAME:YOUR_PASSWORD`
- `localhost:5432` → Your PostgreSQL host and port (default is 5432)
- `central_jordan` → Database name (should match what you created)

## Step 5: Install Backend Dependencies

```bash
cd Backend
npm install
```

## Step 6: Generate Prisma Client

```bash
npx prisma generate
```

This reads the schema and generates the Prisma Client.

## Step 7: Create Database Tables (Run Migrations)

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables based on `prisma/schema.prisma`
- Create a migration history
- Apply the migration to your database

**What this creates:**
- `users` table
- `hero_sections` table
- `hero_media` table
- `hero_stats` table
- `categories` table
- `solutions` table
- `projects` table
- `articles` table
- `testimonials` table
- `testimonial_profiles` table
- `section_orders` table
- `theme_settings` table

## Step 8: Seed Initial Data (Optional)

```bash
node prisma/seed-hero.js
```

This creates initial hero section data so you can test immediately.

## Step 9: Verify Everything Works

```bash
# Start the backend server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📦 Environment: development
🌐 Health check: http://localhost:5000/health
```

## Troubleshooting

### Error: "database does not exist"
- Make sure you created the database `central_jordan`
- Check your DATABASE_URL in `.env`

### Error: "password authentication failed"
- Check your PostgreSQL username and password
- Default username is usually `postgres`
- Reset password if needed

### Error: "connection refused"
- Make sure PostgreSQL service is running
- Check if PostgreSQL is on port 5432 (default)
- Try: `psql -U postgres -h localhost -p 5432`

### Error: "relation does not exist"
- Run migrations: `npx prisma migrate dev`
- Check if tables were created: `npx prisma studio` (opens database viewer)

## View Your Database

**Option 1: Prisma Studio (Easiest)**
```bash
npx prisma studio
```
Opens a web interface at `http://localhost:5555`

**Option 2: pgAdmin**
- Open pgAdmin
- Connect to your server
- Navigate to Databases → central_jordan → Schemas → public → Tables

**Option 3: psql**
```bash
psql -U postgres -d central_jordan
\dt  # List all tables
SELECT * FROM hero_sections;  # View data
```

## Configuration File Location

The database connection is configured in:
- **Environment Variable**: `Backend/.env` → `DATABASE_URL`
- **Config File**: `Backend/src/config/env.js` (reads from `.env`)
- **Schema File**: `Backend/prisma/schema.prisma` (defines tables)

## Next Steps

Once the database is set up:
1. Backend API will work ✅
2. CMS can connect and manage content ✅
3. Frontend will fetch dynamic data ✅

