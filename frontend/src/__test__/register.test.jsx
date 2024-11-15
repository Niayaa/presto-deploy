import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/register';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'test_token' }),
  })
);

describe("Register Component", () => {
  it("renders register form fields", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    const passwordFields = screen.getAllByPlaceholderText(/password/i);
    expect(passwordFields).toHaveLength(2);
    expect(passwordFields[0]).toBeInTheDocument(); // Password field
    expect(passwordFields[1]).toBeInTheDocument(); // Confirm Password field

    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it("displays error message if passwords do not match", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const passwordFields = screen.getAllByPlaceholderText(/password/i);
    fireEvent.change(passwordFields[0], { target: { value: 'password123' } });
    fireEvent.change(passwordFields[1], { target: { value: 'password321' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it("displays error message if registration fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    const passwordFields = screen.getAllByPlaceholderText(/password/i);
    fireEvent.change(passwordFields[0], { target: { value: 'password123' } });
    fireEvent.change(passwordFields[1], { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/registration failed\. please try again\./i)).toBeInTheDocument();
    });
  });

  it("submits registration form successfully", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    const passwordFields = screen.getAllByPlaceholderText(/password/i);
    fireEvent.change(passwordFields[0], { target: { value: 'password123' } });
    fireEvent.change(passwordFields[1], { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5005/admin/auth/register',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123',
          }),
        })
      );
    });

    expect(localStorage.getItem('token')).toBe('test_token');
  });
});
