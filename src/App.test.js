import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header and body', () => {
  render(<App />);
  const headElement = screen.getByText(/header/i);
  const bodyElement = screen.getByText(/body/i);
  expect(headElement).toBeInTheDocument();
  expect(bodyElement).toBeInTheDocument();
});
