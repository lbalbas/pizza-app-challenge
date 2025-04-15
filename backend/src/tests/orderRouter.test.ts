import request from 'supertest';
import app from '../app';
import { writeData } from '../utils/db';

const testOrderItem = {
    pizza_id: '1',
    qty: 2,
    item_price: 10
};

describe('Order Routes', () => {
    describe('POST /api/orders', () => {
        it('should create a new order', async () => {
            const res = await request(app)
                .post('/api/orders')
                .send({ items: [testOrderItem] });

            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({
                id: expect.any(String),
                items: [{
                    pizza_id: testOrderItem.pizza_id,
                    qty: testOrderItem.qty,
                    item_price: testOrderItem.item_price
                }]
            });
        });

        it('should validate order data', async () => {
            const tests = [
                { items: [] }, // Empty array
                { items: [{ pizza_id: '', qty: 0 }] }, // Invalid values
                { items: [{ pizza_id: 'valid', qty: -1 }] } // Negative quantity
            ];

            for (const body of tests) {
                const res = await request(app).post('/api/orders').send(body);
                expect(res.status).toBe(400);
            }
        });
    });

    describe('GET /api/orders', () => {
        it('should return all orders', async () => {
            // First create an order
            await request(app).post('/api/orders').send({ items: [testOrderItem] });

            const res = await request(app).get('/api/orders');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        items: expect.any(Array)
                    })
                ])
            );
        });
    });

    describe('GET /api/orders/:id', () => {
        it('should return a specific order', async () => {
            const createRes = await request(app)
                .post('/api/orders')
                .send({ items: [testOrderItem] });

            const res = await request(app).get(`/api/orders/${createRes.body.id}`);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(createRes.body.id);
        });

        it('should return 404 for non-existent order', async () => {
            const res = await request(app).get('/api/orders/non-existent-id');
            expect(res.status).toBe(404);
        });
    });
});

afterAll(async () => {
    await writeData('orders.json', []);
})