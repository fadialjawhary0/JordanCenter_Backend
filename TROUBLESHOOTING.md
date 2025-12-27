# Backend Server Troubleshooting

## ERR_CONNECTION_REFUSED - Server Not Starting

### Step 1: Check if .env file exists and has correct values

Make sure `Backend/.env` exists with:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/central_jordan?schema=public"
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

### Step 2: Check if database is running

```bash
# Try connecting to PostgreSQL
psql -U postgres -d central_jordan
```

If this fails, PostgreSQL is not running or database doesn't exist.

### Step 3: Check if port 5000 is already in use

**Windows:**
```bash
netstat -ano | findstr :5000
```

**Mac/Linux:**
```bash
lsof -i :5000
```

If something is using port 5000, either:
- Stop that process
- Change PORT in `.env` to another port (e.g., 5001)

### Step 4: Install dependencies

```bash
cd Backend
npm install
```

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

### Step 6: Run migrations (if database exists but tables don't)

```bash
npx prisma migrate dev
```

### Step 7: Start the server and check for errors

```bash
npm run dev
```

**Common errors:**

1. **"Missing required environment variables"**
   - Check `.env` file exists
   - Check DATABASE_URL is set correctly

2. **"Can't reach database server"**
   - PostgreSQL is not running
   - DATABASE_URL is incorrect
   - Database `central_jordan` doesn't exist

3. **"Port already in use"**
   - Another process is using port 5000
   - Change PORT in `.env`

4. **"Prisma Client not generated"**
   - Run `npx prisma generate`

### Step 8: Test the server

Once running, test with:
```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "development"
}
```

## Quick Fix Checklist

- [ ] `.env` file exists in `Backend/` folder
- [ ] DATABASE_URL is correct
- [ ] PostgreSQL is running
- [ ] Database `central_jordan` exists
- [ ] `npm install` completed successfully
- [ ] `npx prisma generate` completed successfully
- [ ] Port 5000 is not in use
- [ ] Server starts without errors

