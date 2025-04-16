import request from 'supertest';
import app from '../app';

const testPizza = {
    id: '1',
    name: 'Margherita',
    price: 5,
    ingredients: ['tomato', 'mozzarella']
}

describe('Pizza Routes', () => {
    describe('GET /pizzas', () => {
        it('should return all pizzas', async () => {
            const res = await request(app).get('/api/pizzas');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    price: expect.any(Number),
                    ingredients: expect.any(Array)
                })
            ]));
        });
    });

    describe('GET /pizzas/:id', () => {
        it('should return a specific pizza', async () => {
            const res = await request(app).get(`/api/pizzas/${testPizza.id}`);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(testPizza);
        });

        it('should return 404 for non-existent pizza', async () => {
            const res = await request(app).get('/api/pizzas/non-existent-id');
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ error: 'Pizza not found' });
        });
    });
});