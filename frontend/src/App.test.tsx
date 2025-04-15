import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the title "Mi Pizzería"', () => {
    render(<App />);
    const title = screen.getByRole('heading', { name: /mi pizzería/i });
    expect(title).toBeInTheDocument();
});