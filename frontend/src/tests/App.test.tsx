import { render, screen } from '@testing-library/react';
import App from '../App';
import { api } from '../utils/api';

jest.mock('../utils/api', () => ({
    api: {
        post: jest.fn(),
        get: jest.fn()
    }
}));

describe('App Component', () => {
    beforeEach(() => {
        (api.get as jest.Mock).mockResolvedValue({
            data: [
                { id: 1, name: 'Margherita', price: 10, ingredients: ['tomato', 'mozzarella'] }
            ]
        });
    });

    it('renders the app title', async () => {
        render(<App />);
        expect(await screen.findByText('PizzaApp')).toBeInTheDocument();
    });

    it('fetches pizzas on mount', async () => {
        render(<App />);
        expect(api.get).toHaveBeenCalledWith('/api/pizzas');
        expect(await screen.findByText('Menu')).toBeInTheDocument();
    });
});