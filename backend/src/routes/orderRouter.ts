import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as orderController from '../controllers/orderController';
import { Pizza } from '../utils/types';

const router = express.Router();

function isValidPizza(obj: any): obj is Pizza {
    return (
        typeof obj?.id === 'string' &&
        typeof obj?.name === 'string' &&
        typeof obj?.price === 'number' &&
        Array.isArray(obj?.ingredients) &&
        obj?.ingredients.every((ingredient: any) => typeof ingredient === 'string')
    );
}


router.post('/',
    [
        body('items').isArray({ min: 1 }),
        body('items.*.qty').isInt({ min: 1 }),
        body('items.*.pizza').custom((pizza) => {
            if (!isValidPizza(pizza)) throw new Error('Invalid pizza structure');
            return true;
        }),
        body('items.*.item_price').isFloat({ min: 1 })
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
                return
            }
            const order = await orderController.createOrder(req.body.items);
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ error: 'Invalid order data' });
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const orders = await orderController.getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await orderController.getOrderById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

export default router;