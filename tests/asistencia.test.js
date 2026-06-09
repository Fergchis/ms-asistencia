const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/db');

describe('MS Asistencia - endpoints base', () => {
  test('GET /health debe responder 200', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
    expect(response.body.service).toBe('ms-asistencia');
  });

  test('GET /api/asistencias debe responder 200', async () => {
    const response = await request(app).get('/api/asistencias');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/justificativos debe responder 200', async () => {
    const response = await request(app).get('/api/justificativos');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/anotaciones debe responder 200', async () => {
    const response = await request(app).get('/api/anotaciones');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

afterAll(async () => {
  await sequelize.close();
});