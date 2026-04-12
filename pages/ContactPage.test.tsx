import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ContactPage from './ContactPage';

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

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

describe('ContactPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with all form fields', () => {
    render(<ContactPage />);

    expect(screen.getByText('contact_title')).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/contact_name_label/i);
    const emailInput = screen.getByLabelText(/contact_email_label/i);
    const phoneInput = screen.getByLabelText(/contact_phone_label/i);
    const inquirySelect = screen.getByLabelText(/contact_inquiry_label/i);
    const messageTextarea = screen.getByLabelText(/contact_message_label/i);
    const submitBtn = screen.getByRole('button', { name: /contact_send/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(inquirySelect).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<ContactPage />);

    const form = screen.getByRole('button', { name: /contact_send/i }).closest('form');
    fireEvent.submit(form!);

    // Since the errors are shown in a list and next to inputs, we look for them.
    await waitFor(() => {
      expect(screen.getAllByText('contact_name_required').length).toBeGreaterThan(0);
      expect(screen.getAllByText('contact_email_required').length).toBeGreaterThan(0);
      expect(screen.getAllByText('contact_phone_required').length).toBeGreaterThan(0);
      expect(screen.getAllByText('contact_inquiry_required').length).toBeGreaterThan(0);
      expect(screen.getAllByText('contact_message_required').length).toBeGreaterThan(0);
    });
  });

  it('validates email format correctly', async () => {
    render(<ContactPage />);

    const emailInput = screen.getByLabelText(/contact_email_label/i);
    const form = screen.getByRole('button', { name: /contact_send/i }).closest('form');

    // Invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getAllByText('contact_email_invalid').length).toBeGreaterThan(0);
    });

    // Valid email (should clear the email invalid error)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.queryByText('contact_email_invalid')).not.toBeInTheDocument();
    });
  });

  it('submits form successfully and shows success message', async () => {
    render(<ContactPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/contact_name_label/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/contact_email_label/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/contact_phone_label/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/contact_inquiry_label/i), { target: { value: 'General' } });
    fireEvent.change(screen.getByLabelText(/contact_message_label/i), { target: { value: 'Hello!' } });

    const form = screen.getByRole('button', { name: /contact_send/i }).closest('form');
    fireEvent.submit(form!);

    // After synchronous form submission, it should show success
    await waitFor(() => {
      expect(screen.getByText('contact_thank_you')).toBeInTheDocument();
    });
  });

  it('only accepts numbers in phone field', () => {
    render(<ContactPage />);

    const phoneInput = screen.getByLabelText(/contact_phone_label/i);

    fireEvent.change(phoneInput, { target: { value: '123abc456' } });
    expect((phoneInput as HTMLInputElement).value).toBe('123456');
  });
});
