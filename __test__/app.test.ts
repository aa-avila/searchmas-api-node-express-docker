import app from '../src/server';
import request from 'supertest';

describe('health check', () => {
  it('/health (GET)', async () => {
    const {
      status,
      body: { data },
    } = await request(app).get('/health');

    expect(status).toBe(200);
    expect(data).toBe('OK');
  });
});
