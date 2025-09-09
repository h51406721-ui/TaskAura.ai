import request from 'supertest';
import app from '../app';

test('supertest smoke test', async () => {
  expect(typeof app).toBe('function');
  const res = await request(app).get('/api/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});
