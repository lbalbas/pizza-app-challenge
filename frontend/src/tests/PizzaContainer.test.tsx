import { render, screen } from '@testing-library/react';
import { PizzaContainer } from '../components/PizzaContainer';
import userEvent from '@testing-library/user-event';

const mockPizzas = [
    { id: "1", name: 'Margherita', price: 10, ingredients: ['tomato', 'mozzarella'] },
    { id: "2", name: 'Pepperoni', price: 12, ingredients: ['tomato', 'mozzarella', 'pepperoni'] }
];

describe('PizzaContainer', () => {
    it('renders pizza menu items', () => {
        render(<PizzaContainer pizzas={mockPizzas} addPizzaToOrder={jest.fn()} />);
        expect(screen.getByText('Menu')).toBeInTheDocument();
        expect(screen.getByText('Margherita')).toBeInTheDocument();
        expect(screen.getByText('Pepperoni')).toBeInTheDocument();
    });

    it('calls addPizzaToOrder when button clicked', async () => {
        const mockAdd = jest.fn();
        render(<PizzaContainer pizzas={mockPizzas} addPizzaToOrder={mockAdd} />);
        await userEvent.click(screen.getAllByText('Add to order')[0]);
        expect(mockAdd).toHaveBeenCalledWith(mockPizzas[0]);
    });
});