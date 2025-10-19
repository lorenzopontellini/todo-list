import request from 'supertest';
import app from '../server';
import { prisma } from '../prismaClient'


describe('API Endpoints', () => {
  let token: string;
  let userId: string;
  let taskId: string;

  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  };

  beforeAll(async () => {
    // Pulisci eventuali utenti/record di test esistenti
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    // Registra un utente
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    userId = res.body.id;

    // Effettua login per ottenere token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Should get user info with valid token', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(testUser.email);
    expect(res.body.name).toBe(testUser.name);
  });

  test('Should update user name', async () => {
    const newName = 'Updated Name';
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: newName });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(newName);
  });

  test('Should create a new task', async () => {
    const task = { title: 'New Task', description: 'Task desc' };
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(task);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(task.title);

    taskId = res.body.id;
  });

  test('Should list tasks for user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('Should get task by id', async () => {
    const res = await request(app)
      .get(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  test('Should update task', async () => {
    const update = { title: 'Updated Task', completed: true };
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(update);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe(update.title);
    expect(res.body.completed).toBe(true);
  });

  test('Should delete task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });
});
