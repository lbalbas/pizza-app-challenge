import { Router } from 'express';
import pizzaRouter from './pizzaRouter';
import orderRouter from './orderRouter';

const router = Router();


router.use('/api/pizzas', pizzaRouter);
router.use('/api/orders', orderRouter);

export default router;