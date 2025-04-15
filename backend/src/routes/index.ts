import { Router } from 'express';
import pizzaRouter from './pizzaRouter';

const router = Router();


router.use('/api/pizzas', pizzaRouter);

export default router;