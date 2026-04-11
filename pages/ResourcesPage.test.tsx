import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ResourcesPage from './ResourcesPage';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...(actual as any),
    motion: {
      div: ({ children, className }: any) => <div className={className}>{children}</div>,
    },
    useReducedMotion: () => false,
  };
});

describe('ResourcesPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ResourcesPage />);
    expect(screen.getByText('Knowledge Hub')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /notify me/i })).toBeInTheDocument();
  });

  it('validates empty email submission', async () => {
    render(<ResourcesPage />);
    const submitButton = screen.getByRole('button', { name: /notify me/i });

    fireEvent.click(submitButton);

    expect(await screen.findByText('Email Address is required.')).toBeInTheDocument();
  });

  it('validates invalid email format submission', async () => {
    render(<ResourcesPage />);
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /notify me/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('clears error after typing a valid email', async () => {
    render(<ResourcesPage />);
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /notify me/i });

    // Trigger error
    fireEvent.click(submitButton);
    expect(await screen.findByText('Email Address is required.')).toBeInTheDocument();

    // Type valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Error should be cleared
    expect(screen.queryByText('Email Address is required.')).not.toBeInTheDocument();
    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
  });

  it('handles successful submission', async () => {
    render(<ResourcesPage />);
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const submitButton = screen.getByRole('button', { name: /notify me/i });

    // Type valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // Submit form
    fireEvent.click(submitButton);

    // Should show success message immediately
    expect(screen.getByText("You're on the list!")).toBeInTheDocument();
  });
});
