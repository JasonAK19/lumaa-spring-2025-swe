# Full-Stack Coding Challenge

**Demo**: https://youtu.be/YzRjqO-_C0Q

# Task Management Application

## Setup Instructions

### Database Setup
1. Install PostgreSQL if not already installed
2. Create a new database:
```sql
CREATE DATABASE lumaaSWE;
```
3. Configure environment variables:
   - Copy the env example below to `.env` in both `/back` and `/frontend` files
   - Update the `DATABASE_URL` in `/back/.env` and create a jwt key:
```
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/lumaaSWE?schema=public"
JWT_SECRET=your_secret_key
PORT=3005

command for jwt key: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
4. Run Prisma migrations:
```bash
cd back
npx prisma migrate dev
```

### Backend Setup
1. Navigate to backend directory:
```bash
cd back
```
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm run start
```
The backend will run on `http://localhost:3005` 

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the application:
```bash
npm start
```
The frontend will run on `http://localhost:3000`

### Testing
1. Backend tests can be run with:
```bash
cd back
npm test
```
2. Test coverage includes:
   - Authentication (register/login)
   - Task CRUD operations
   - JWT token verification
   - Database operations

### Notes
- Ensure PostgreSQL is running before starting the backend
- The backend must be running for the frontend to work
- JWT tokens expire after 24 hours
- All API routes under `/tasks` require authentication

## Salary Expectations
Monthly salary expectation: $1,600 USD ($20 per hour, 20 hours per week)