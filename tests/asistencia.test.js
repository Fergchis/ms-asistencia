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

describe('POST /api/asistencias', () => {
  test('debe crear una asistencia', async () => {
    const response = await request(app).post('/api/asistencias').send({
      alumnoId: 1,
      cargaAcademicaId: 1,
      fecha: '2026-06-09',
      estado: 'PRESENTE'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('debe rechazar datos inválidos', async () => {
    const response = await request(app).post('/api/asistencias').send({
      alumnoId: 'abc',
      estado: 'INVALIDO'
    });

    expect(response.statusCode).toBe(400);
  });
});

describe('POST /api/justificativos', () => {
  test('debe crear un justificativo', async () => {
    const asistenciaResponse = await request(app).post('/api/asistencias').send({
      alumnoId: 1,
      cargaAcademicaId: 1,
      fecha: '2026-06-09',
      estado: 'AUSENTE'
    });

    const response = await request(app).post('/api/justificativos').send({
      asistenciaId: asistenciaResponse.body.id,
      motivo: 'Enfermedad',
      descripcion: 'Justificativo creado desde test',
      urlArchivo: 'https://example.com/test.pdf',
      fechaCarga: '2026-06-09'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('debe rechazar datos inválidos', async () => {
    const response = await request(app).post('/api/justificativos').send({
      asistenciaId: 'abc',
      motivo: 'Enfermedad'
    });

    expect(response.statusCode).toBe(400);
  });
});

describe('POST /api/anotaciones', () => {
  test('debe crear una anotación', async () => {
    const response = await request(app).post('/api/anotaciones').send({
      alumnoId: 1,
      profesorId: 1,
      tipo: 'POSITIVA',
      descripcion: 'Anotación creada desde test',
      fecha: '2026-06-09'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('debe rechazar datos inválidos', async () => {
    const response = await request(app).post('/api/anotaciones').send({
      alumnoId: 1,
      profesorId: 1,
      tipo: 'INVALIDA'
    });

    expect(response.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await sequelize.close();
});