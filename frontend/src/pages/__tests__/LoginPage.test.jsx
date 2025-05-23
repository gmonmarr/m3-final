import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { BrowserRouter } from 'react-router-dom';

// ✅ Mock alert to avoid jsdom crash
global.alert = jest.fn();

// ✅ Mocks
const mockLogin = jest.fn();
const mockPost = jest.fn();
const mockNavigate = jest.fn();

// ✅ Mock AuthContext
jest.mock('../../AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

// ✅ Mock API module
jest.mock('../../api', () => ({
  __esModule: true,
  default: {
    post: mockPost,
  },
}));

// ✅ Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('LoginPage', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockLogin.mockReset();
    mockNavigate.mockReset();
    global.alert.mockReset();
  });

  test('renders login form', () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows alert on login failure', async () => {
    mockPost.mockRejectedValue(new Error('Unauthorized'));

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'failuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Login failed');
    });
  });
});
