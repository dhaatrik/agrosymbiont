import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import JobApplicationForm from './JobApplicationForm';

// Simple mock for translations mapping keys to standard English values
const translations: Record<string, string> = {
  'car_form_name': 'Full Name',
  'car_form_name_placeholder': 'Enter your full name',
  'car_form_name_required': 'Full Name is required.',
  'car_form_email': 'Email Address',
  'car_form_email_placeholder': 'Enter your email address',
  'car_form_email_required': 'Email Address is required.',
  'car_form_email_invalid': 'Please enter a valid email address.',
  'car_form_linkedin': 'LinkedIn Profile Link',
  'car_form_linkedin_placeholder': 'https://linkedin.com/in/yourprofile',
  'car_form_linkedin_required': 'LinkedIn Profile Link is required.',
  'car_form_resume': 'Resume/CV',
  'car_form_resume_required': 'Please upload your resume/CV.',
  'car_form_upload': 'Upload a file',
  'car_form_drag_drop': 'or drag and drop',
  'car_form_file_types': 'PDF, DOC, DOCX up to 10MB',
  'car_form_selected': 'Selected file: ',
  'car_form_submit': 'Submit Application',
  'car_form_submitting': 'Submitting...',
  'car_form_success_title': 'Application Received!',
  'car_form_success_desc': 'Thank you for your interest in AgroSymbiont. We will be in touch.',
  'car_form_error_header': 'Please fix the following errors:',
};

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => translations[str] || str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'en'
      },
    };
  },
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  AlertCircle: () => <div data-testid="alert-circle" />,
  UploadCloud: () => <div data-testid="upload-cloud" />,
  Loader2: ({ className }: { className?: string }) => <div data-testid="loader-2" className={className} />,
}));

describe('JobApplicationForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with all fields', () => {
    render(<JobApplicationForm />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn Profile Link')).toBeInTheDocument();
    expect(screen.getByText('Resume/CV')).toBeInTheDocument();
    expect(screen.getByText('Submit Application')).toBeInTheDocument();
  });

  it('validates form fields sequentially and short-circuits on first error', async () => {
    render(<JobApplicationForm />);

    const submitButton = screen.getByText('Submit Application');
    fireEvent.click(submitButton);

    // Name should be the first and only error due to short-circuiting
    await waitFor(() => {
      expect(screen.getAllByText('Full Name is required.').length).toBeGreaterThan(0);
      expect(screen.queryByText('Email Address is required.')).toBeNull();
    });

    // Fix name, submit again, now email should fail
    const nameInput = screen.getByLabelText('Full Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('Email Address is required.').length).toBeGreaterThan(0);
    });

    // Make email invalid
    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'invalid-email', name: 'email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('Please enter a valid email address.').length).toBeGreaterThan(0);
    });
  });

  it('submits the form successfully when all fields are valid', async () => {
    const onSuccess = vi.fn();
    render(<JobApplicationForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe', name: 'name' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText('LinkedIn Profile Link'), { target: { value: 'https://linkedin.com/in/johndoe', name: 'linkedin' } });

    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText('Upload a file');
    fireEvent.change(fileInput, { target: { files: [file], name: 'resume' } });

    const submitButton = screen.getByText('Submit Application');
    fireEvent.click(submitButton);

    expect(screen.getByText('Submitting...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Application Received!')).toBeInTheDocument();
      expect(onSuccess).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it('uses jobId in id attributes if provided', () => {
    const jobId = 'test-job-id';
    render(<JobApplicationForm jobId={jobId} />);

    expect(screen.getByLabelText('Full Name')).toHaveAttribute('id', `${jobId}-name`);
    expect(screen.getByLabelText('Email Address')).toHaveAttribute('id', `${jobId}-email`);
    expect(screen.getByLabelText('LinkedIn Profile Link')).toHaveAttribute('id', `${jobId}-linkedin`);
  });
});
