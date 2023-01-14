const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import t from './translation'

test('renders welcome and sideDrawer', () => {
  render(<App />);
  const welcomeText = screen.getByText(t('welcome'));
  expect(welcomeText).toBeInTheDocument();
  expect(screen.getByRole("sideDrawer")).toHaveTextContent(/Staff Statistics/);
});
