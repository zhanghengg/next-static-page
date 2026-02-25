import { render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home page', () => {
  it('renders the heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /hello, next\.js/i })).toBeInTheDocument();
  });

  it('mentions static export', () => {
    render(<Home />);
    expect(screen.getByText(/static export/i)).toBeInTheDocument();
  });
});
