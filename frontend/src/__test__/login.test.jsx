import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AuthContext } from '../../component/authcontext';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/login'

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'test_token' }),
  })
);

describe("Login Component", () => {
  it("renders login form fields", () => {
    render(
      <AuthContext.Provider value={{ login: vi.fn() }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it("displays error message if login fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <AuthContext.Provider value={{ login: vi.fn() }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed\. please check your credentials\./i)).toBeInTheDocument();
    });
  });

  it("stores token and calls login function on successful login", async () => {
    const mockLogin = vi.fn();

    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5005/admin/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
        })
      );
    });

    expect(mockLogin).toHaveBeenCalledWith('test_token');
    expect(localStorage.getItem('token') || sessionStorage.getItem('token')).toBe('test_token');
  });

});

