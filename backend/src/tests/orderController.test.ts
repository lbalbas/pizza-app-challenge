import { createOrder, getOrderById, getOrders } from '../controllers/orderController';
import { writeData } from '../utils/db';

describe('Order Controller', () => {
    it('should create a new order', async () => {
        const newOrder = await createOrder([
            {
                pizza: {
                    "id": "2",
                    "name": "Bufala",
                    "price": 6,
                    "ingredients": [
                        "tomato",
                        "mozarella di bufala"
                    ]
                },
                item_price: 6,
                qty: 1,
            }
        ]);

        expect(newOrder).toMatchObject({
            id: expect.any(String),
            items: [
                {
                    pizza: {
                        "id": "2",
                        "name": "Bufala",
                        "price": 6,
                        "ingredients": [
                            "tomato",
                            "mozarella di bufala"
                        ]
                    }, item_price: 6, qty: 1
                },
            ],
            total: 6
        });

        const orders = await getOrders();
        expect(orders).toHaveLength(1);
    });
    it("should return order by id", async () => {
        const order = await createOrder([
            {
                pizza: {
                    "id": "1",
                    "name": "Margherita",
                    "price": 5,
                    "ingredients": [
                        "tomato",
                        "mozzarella"
                    ]
                }, item_price: 10, qty: 2
            },
            {
                pizza: {
                    "id": "2",
                    "name": "Bufala",
                    "price": 6,
                    "ingredients": [
                        "tomato",
                        "mozarella di bufala"
                    ]
                }, item_price: 6, qty: 1
            }
        ]);
        const foundOrder = await getOrderById(order.id);
        expect(foundOrder).toMatchObject(order);
    })
    it('should calculate total price', async () => {
        const order = await createOrder([
            {
                pizza: {
                    "id": "1",
                    "name": "Margherita",
                    "price": 5,
                    "ingredients": [
                        "tomato",
                        "mozzarella"
                    ]
                }, item_price: 10, qty: 2
            },
            {
                pizza: {
                    "id": "2",
                    "name": "Bufala",
                    "price": 6,
                    "ingredients": [
                        "tomato",
                        "mozarella di bufala"
                    ]
                }, item_price: 6, qty: 1
            }
        ]);

        const total = order.items.reduce((sum: number, item) => sum + item.item_price, 0);
        expect(order.total).toBe(total);
    });
    it('should reject invalid pizza IDs', async () => {
        await expect(createOrder([
            {
                pizza: {
                    "id": "999",
                    "name": "Invalid Pizza",
                    "price": 5,
                    "ingredients": [
                        "tomato",
                        "mozzarella"
                    ]
                }, qty: 1,
                item_price: 0
            }
        ])).rejects.toThrow('Invalid pizza ID');
    });
});

//delete all orders 
afterAll(async () => {
    await writeData('orders.json', []);
})