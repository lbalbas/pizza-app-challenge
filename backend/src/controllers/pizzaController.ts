import { UUID } from 'crypto';
import { readData } from '../utils/db';
import { Pizza } from '../utils/types';

export const getPizzas = async () => {
    return await readData('pizzas.json') as Pizza[]
};

export const getPizzaById = async (id: string) => {
    const pizzas = await readData('pizzas.json') as Pizza[];
    return pizzas.find((p) => p.id === id);
};