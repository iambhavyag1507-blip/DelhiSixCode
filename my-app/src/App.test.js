import { render, screen } from '@testing-library/react';
import App from './App';

test('homepage renders hero heading', () => {
  render(<App />);
  expect(screen.getByText(/Your Story, Our Silhouette/i)).toBeInTheDocument();
});

test('unknown route renders 404 message', () => {
  window.history.pushState({}, '', '/does-not-exist');
  render(<App />);
  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
});
