# Quick Start Guide

## Initial Setup

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and update the DATABASE_URL with your PostgreSQL credentials
# Example: DATABASE_URL="postgresql://postgres:password@localhost:5432/central_jordan?schema=public"
```

### 3. Set Up Database

**Option A: Create database manually**
```sql
CREATE DATABASE central_jordan;
```

**Option B: Let Prisma create it** (if your PostgreSQL user has CREATE DATABASE permission)
```bash
npm run prisma:migrate
```

### 4. Generate Prisma Client
```bash
npm run prisma:generate
```

### 5. Run Migrations
```bash
npm run prisma:migrate
# When prompted, enter a migration name (e.g., "init")
```

### 6. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## Verify Installation

### Health Check
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### API Base
```bash
curl http://localhost:3001/api
```

Expected response:
```json
{
  "success": true,
  "message": "API is running",
  "version": "1.0.0"
}
```

## Testing the User API

### Create a User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### Get All Users
```bash
curl http://localhost:3001/api/users
```

### Get User by ID
```bash
curl http://localhost:3001/api/users/{user-id}
```

### Update User
```bash
curl -X PUT http://localhost:3001/api/users/{user-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'
```

### Delete User
```bash
curl -X DELETE http://localhost:3001/api/users/{user-id}
```

## Useful Commands

### Prisma Studio (Database GUI)
```bash
npm run prisma:studio
```
Opens a web interface at `http://localhost:5555` to browse and edit your database.

### Create a New Migration
After modifying `prisma/schema.prisma`:
```bash
npm run prisma:migrate
```

### Deploy Migrations (Production)
```bash
npm run prisma:migrate:deploy
```

### Seed Database
```bash
npm run prisma:seed
```

## Project Structure Overview

```
Backend/
├── prisma/
│   ├── schema.prisma      # Database schema (code-first)
│   └── seed.js            # Database seeding script
├── src/
│   ├── domain/            # Business logic layer
│   │   ├── entities/      # Domain entities
│   │   └── repositories/  # Repository interfaces
│   ├── application/       # Application logic layer
│   │   └── services/      # Application services
│   ├── infrastructure/    # External concerns layer
│   │   └── repositories/  # Repository implementations
│   ├── presentation/      # API layer
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # Route definitions
│   │   └── validators/    # Input validation
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── utils/             # Utility functions
│   └── server.js          # Application entry point
├── package.json
├── .env.example
└── README.md
```

## Next Steps

1. **Add Your Entities**: Follow the guide in `ARCHITECTURE.md` to add new entities
2. **Configure Authentication**: Add JWT authentication middleware
3. **Add Logging**: Integrate a logging library (e.g., Winston)
4. **Add Testing**: Set up Jest or Mocha for unit/integration tests
5. **Add API Documentation**: Integrate Swagger/OpenAPI

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env` file
- Ensure database exists

### Port Already in Use
- Change PORT in `.env` file
- Or stop the process using port 3001

### Prisma Client Not Generated
- Run `npm run prisma:generate`
- Ensure `prisma/schema.prisma` is valid

### Migration Errors
- Check database connection
- Verify schema.prisma syntax
- Check if database exists

