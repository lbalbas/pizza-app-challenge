import express from 'express';
import * as pizzaController from '../controllers/pizzaController';

const pizzaRouter = express.Router();

pizzaRouter.get('/', async (req, res) => {
    try {
        const pizzas = await pizzaController.getPizzas();
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pizzas' });
    }
});

pizzaRouter.get('/:id', async (req, res) => {
    try {
        const pizza = await pizzaController.getPizzaById(req.params.id);
        if (pizza) {
            res.json(pizza);
        } else {
            res.status(404).json({ error: 'Pizza not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pizza' });
    }
})

export default pizzaRouter;