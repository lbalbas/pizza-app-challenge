import { getPizzas, getPizzaById } from '../controllers/pizzaController';

describe('Pizza Controller Test', () => {
    it('should return all pizzas', async () => {
        const pizzas = await getPizzas();
        expect(pizzas).toEqual([
            expect.objectContaining({ name: 'Margherita' }),
            expect.objectContaining({ name: 'Bufala' }),
            expect.objectContaining({ name: 'Romana' }),
            expect.objectContaining({ name: 'Diavola' }),
            expect.objectContaining({ name: 'Pizza Bianca' }),
        ]);
    });

    it('should return a specific pizza by ID', async () => {
        const pizza = await getPizzaById('1');
        expect(pizza).toEqual({
            id: '1',
            name: 'Margherita',
            "ingredients": [
                "tomato",
                "mozzarella"
            ],
            price: 5
        });
    });

    it('should return undefined for non-existent pizza', async () => {
        const pizza = await getPizzaById('999');
        expect(pizza).toBeUndefined();
    });
});