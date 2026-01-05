import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders BWORM brand in header', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const brand = screen.getByText(/BWORM/i);
  expect(brand).toBeInTheDocument();
});
