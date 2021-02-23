import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const tablist = screen.getByRole('tablist');
  expect(tablist).toBeInTheDocument();
});
