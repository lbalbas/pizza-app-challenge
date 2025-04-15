import request from 'supertest';
import app from '../app'; // Assuming app.ts imports and uses your router

describe('Dummy Route', () => {
  it('GET / should return the dummy object', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      lorem: "Ipsum"
    });
  });
});