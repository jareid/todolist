import { render, screen } from '@testing-library/react';
import Duties from '../components/Duties';

test('renders duties component', () => {
  render(<Duties />);
  const headerElement = screen.getByText(/To-Do List/i);
  expect(headerElement).toBeInTheDocument();
});
