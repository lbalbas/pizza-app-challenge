import { readData, writeData } from '../utils/db';
import { randomUUID } from 'crypto';
import { getPizzas } from './pizzaController';
import { Order, OrderItems } from '../utils/types';

export const createOrder = async (items: OrderItems[]) => {
    const pizzas = await getPizzas();
    const orders = await readData('orders.json');

    items.forEach((item) => {
        const pizza = pizzas.find((p) => p.id === item.pizza_id);
        if (pizza) {
            item.item_price = pizza.price * item.qty;
        } else {
            throw new Error('Invalid pizza ID');
        }
    })

    const newOrder: Order = {
        id: randomUUID() as string,
        items,
        total: calculateTotal(items)
    };

    orders.push(newOrder);
    await writeData('orders.json', orders);
    return newOrder;
};

export const getOrders = async () => {
    return await readData('orders.json') as Order[];
};

export const getOrderById = async (id: string) => {
    const orders = await getOrders();
    return orders.find((o) => o.id === id);
}

function calculateTotal(items: OrderItems[]) {
    return items.reduce((sum: number, item) => sum + item.item_price, 0)
}