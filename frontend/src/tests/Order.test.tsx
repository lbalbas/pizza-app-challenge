import { render, screen } from '@testing-library/react';
import { Order } from '../components/Order';

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn()
    }
}));

jest.mock('../utils/api', () => ({
    api: {
        post: jest.fn()
    }
}));

const mockPizzas = [
    { id: "1", name: 'Margherita', price: 10, ingredients: ['tomato', 'mozzarella'] }
];

const mockOrder = [
    { pizza_id: "1", qty: 2, item_price: 10 }
];

describe('Order Component', () => {
    it('displays order items and total', () => {
        render(<Order pizzas={mockPizzas} order={mockOrder} />);

        expect(screen.getByText('Order Summary')).toBeInTheDocument();

        const pizzaItem = screen.getByText('Margherita').parentElement;
        expect(pizzaItem).toHaveTextContent('x 2');
        expect(pizzaItem).toHaveTextContent('$20');
    });

    it('shows the correct total price', () => {
        render(<Order pizzas={mockPizzas} order={mockOrder} />);

        const totalSection = screen.getByText('Total:').parentElement;
        expect(totalSection).toHaveTextContent('$20');
    });

    it('renders confirm order button', () => {
        render(<Order pizzas={mockPizzas} order={mockOrder} />);
        expect(screen.getByRole('button', { name: 'Confirm Order' })).toBeInTheDocument();
    });
});