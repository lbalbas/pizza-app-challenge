import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

jest.mock('../components/LoadingSpinner', () => ({
    LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>
}));

jest.mock('../components/PizzaContainer', () => ({
    PizzaContainer: () => <div>PizzaContainer Mock</div>
}));

jest.mock('../components/Order', () => ({
    Order: () => <div>Order Mock</div>
}));

jest.mock('react-toastify', () => ({
    ToastContainer: () => <div data-testid="toast-container" />
}));

jest.mock('../utils/api', () => ({
    api: {
        get: jest.fn().mockResolvedValue({
            data: [
                { id: 1, name: 'Margherita', price: 10, ingredients: ['tomato', 'mozzarella'] }
            ]
        }),
        post: jest.fn()
    }
}));

describe('App Component', () => {
    it('shows loading spinner initially', async () => {
        render(<App />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
        });
    });

    it('renders the app title after loading', async () => {
        render(<App />);
        expect(await screen.findByText('PizzaApp')).toBeInTheDocument();
    });

    it('renders main layout structure', async () => {
        render(<App />);
        await waitFor(() => {
            expect(screen.getByText('PizzaContainer Mock')).toBeInTheDocument();
            expect(screen.getByText('Order Mock')).toBeInTheDocument();
        });
    });
});