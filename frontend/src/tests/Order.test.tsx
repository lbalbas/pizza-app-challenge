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

const mockOrder = [
    { pizza: { id: "1", name: 'Margherita', price: 5, ingredients: ['tomato', 'mozzarella'] }, qty: 2, item_price: 10 }
];

const mockSetOrder = jest.fn();

describe('Order Component', () => {
    it('displays order items and total', () => {
        render(<Order setOrder={mockSetOrder} order={mockOrder} />);

        expect(screen.getByText('Order Summary')).toBeInTheDocument();

        const pizzaItem = screen.getByText('Margherita').parentElement;
        expect(pizzaItem).toHaveTextContent('x 2');
        expect(pizzaItem).toHaveTextContent('$10');
    });

    it('shows the correct total price', () => {
        render(<Order setOrder={mockSetOrder} order={mockOrder} />);

        const totalSection = screen.getByText('Total:').parentElement;
        expect(totalSection).toHaveTextContent('$10');
    });

    it('renders confirm order button', () => {
        render(<Order setOrder={mockSetOrder} order={mockOrder} />);
        expect(screen.getByRole('button', { name: 'Confirm Order' })).toBeInTheDocument();
    });
});