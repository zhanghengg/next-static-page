import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /neon notes/i })).toBeInTheDocument();
  });

  it('links to notes page', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /open notes/i })).toBeInTheDocument();
  });
});
