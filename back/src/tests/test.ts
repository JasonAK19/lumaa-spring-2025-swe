import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from '../routes/auth';
import taskRoutes from '../routes/tasks';
import { authenticateToken } from '../middleware/auth';

const app = express();
const prisma = new PrismaClient();

// Setup
beforeAll(() => {
  app.use(express.json());
  app.use('/auth', authRoutes);
  app.use('/tasks', authenticateToken, taskRoutes);
});

// Cleanup
afterAll(async () => {
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe('Auth Endpoints', () => {
  const testUser = {
    username: 'testuser4',
    password: 'password123'
  };

  test('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('User created successfully');
  });

  test('should login user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(testUser);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

describe('Task Endpoints', () => {
  let authToken: string;
  
  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser4',
        password: 'password123'
      });
    authToken = res.body.token;
  });

  test('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Task',
        description: 'Test Description'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
  });

  test('should get all tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});