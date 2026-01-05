import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders BWORM brand in header', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const brand = screen.getByText(/BWORM/i);
  expect(brand).toBeInTheDocument();
});

test('renders trending listing route', () => {
  render(
    <MemoryRouter initialEntries={['/trending']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Trending/i)).toBeInTheDocument();
});

test('renders global listing route', () => {
  render(
    <MemoryRouter initialEntries={['/global']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/International \/ Global Best Sellers/i)).toBeInTheDocument();
});

test('renders genres hub route', () => {
  render(
    <MemoryRouter initialEntries={['/genres']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Genres/i)).toBeInTheDocument();
  expect(screen.getByText(/Pick a shelf/i)).toBeInTheDocument();
});
