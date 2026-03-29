import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CareersPage from './CareersPage';

// Simple mock for translations mapping keys to standard English values
const translations: Record<string, string> = {
  'car_title': 'Join Our Mission',
  'car_subtitle': "We're looking for passionate innovators and problem-solvers to help build a more sustainable future for agriculture.",
  'car_benefit_1_title': 'Health & Wellness',
  'car_benefit_2_title': 'Flexible Work',
  'car_benefit_3_title': 'Growth',
  'car_job_agronomist': 'Lead Agronomist',
  'car_job_scientist': 'Biochemical Research Scientist',
  'car_job_marketing': 'Product Marketing Manager',
  'car_cat_science': 'Science',
  'car_cat_sales': 'Sales',
  'car_cat_engineering': 'Engineering',
  'car_more_soon': 'More roles coming soon...',
  'car_apply_now': 'Apply Now',
  'car_close': 'Close',
  'car_form_name': 'Full Name',
  'car_form_name_required': 'Full Name is required.',
  'car_form_email': 'Email Address',
  'car_form_email_required': 'Email Address is required.',
  'car_form_email_invalid': 'Please enter a valid email address.',
  'car_form_linkedin': 'LinkedIn Profile Link',
  'car_form_linkedin_required': 'LinkedIn Profile Link is required.',
  'car_form_resume': 'Resume/CV',
  'car_form_resume_required': 'Please upload your resume/CV.',
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
      t: (str: string, options?: any) => {
        let text = translations[str] || str;
        if (options?.title) {
          return `${text} ${options.title}`;
        }
        return text;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: 'en'
      },
    };
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      ...actual.motion,
      div: ({ children, className, onClick, ...props }: any) => (
        <div className={className} onClick={onClick} data-testid="motion-div" {...props}>
          {children}
        </div>
      )
    }
  };
});

describe('CareersPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with title, subtitle, benefits, and job openings', () => {
    render(<CareersPage />);

    expect(screen.getByText('Join Our Mission')).toBeInTheDocument();
    expect(screen.getByText("We're looking for passionate innovators and problem-solvers to help build a more sustainable future for agriculture.")).toBeInTheDocument();

    // Check if benefits are rendered
    expect(screen.getByText('Health & Wellness')).toBeInTheDocument();
    expect(screen.getByText('Flexible Work')).toBeInTheDocument();
    expect(screen.getByText('Growth')).toBeInTheDocument();

    // Check if job listings are rendered
    expect(screen.getByText('Lead Agronomist')).toBeInTheDocument();
    expect(screen.getByText('Biochemical Research Scientist')).toBeInTheDocument();
    expect(screen.getByText('Product Marketing Manager')).toBeInTheDocument();
  });

  it('filters jobs by clicking category tabs', () => {
    render(<CareersPage />);

    // All jobs should be visible initially
    expect(screen.getByText('Lead Agronomist')).toBeInTheDocument(); // science
    expect(screen.getByText('Biochemical Research Scientist')).toBeInTheDocument(); // science
    expect(screen.getByText('Product Marketing Manager')).toBeInTheDocument(); // sales

    // Click on 'Science' tab
    const scienceTab = screen.getByText('Science');
    fireEvent.click(scienceTab);

    // Only science jobs should be visible
    expect(screen.getByText('Lead Agronomist')).toBeInTheDocument();
    expect(screen.getByText('Biochemical Research Scientist')).toBeInTheDocument();
    expect(screen.queryByText('Product Marketing Manager')).not.toBeInTheDocument();

    // Click on 'Sales' tab
    const salesTab = screen.getByText('Sales');
    fireEvent.click(salesTab);

    // Only sales jobs should be visible
    expect(screen.queryByText('Lead Agronomist')).not.toBeInTheDocument();
    expect(screen.queryByText('Biochemical Research Scientist')).not.toBeInTheDocument();
    expect(screen.getByText('Product Marketing Manager')).toBeInTheDocument();
  });

  it('displays "More roles coming soon..." when no jobs match the category', () => {
    render(<CareersPage />);

    // Click on 'Engineering' tab (which has no jobs in mock data)
    const engineeringTab = screen.getByText('Engineering');
    fireEvent.click(engineeringTab);

    expect(screen.queryByText('Lead Agronomist')).not.toBeInTheDocument();
    expect(screen.queryByText('Biochemical Research Scientist')).not.toBeInTheDocument();
    expect(screen.queryByText('Product Marketing Manager')).not.toBeInTheDocument();

    expect(screen.getByText('More roles coming soon...')).toBeInTheDocument();
  });

  it('opens and closes job application modal on clicking "Apply Now"', () => {
    render(<CareersPage />);

    // Modal shouldn't be open initially
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();

    // Click 'Apply Now' for first job
    const applyButtons = screen.getAllByText('Apply Now');
    fireEvent.click(applyButtons[0]); // Click first 'Apply Now'

    // Modal should be open, check for the close button and the job title inside the modal
    // Since there are two 'Lead Agronomist' strings now (one in card, one in modal)
    expect(screen.getAllByText('Lead Agronomist').length).toBe(2);

    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();

    // Click close button
    fireEvent.click(closeButton);

    // Modal should be closed
    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    // Only one job title again
    expect(screen.getAllByText('Lead Agronomist').length).toBe(1);
  });

  it('validates form fields sequentially and short-circuits on first error', async () => {
    render(<CareersPage />);

    // Find the generic application form
    const submitButton = screen.getAllByText('Submit Application')[0];

    // Trigger submit
    fireEvent.click(submitButton);

    // Wait for the FIRST error to appear (Full Name).
    await waitFor(() => {
      expect(screen.getAllByText('Full Name is required.').length).toBeGreaterThan(0);
      expect(screen.queryByText('Email Address is required.')).toBeNull();
    });

    // Enter a valid name, submit again, now email should fail
    const nameInput = screen.getAllByLabelText('Full Name')[0];
    fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('Email Address is required.').length).toBeGreaterThan(0);
    });

    // Fill invalid email
    const emailInput = screen.getAllByLabelText('Email Address')[0];
    fireEvent.change(emailInput, { target: { value: 'invalid-email', name: 'email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText('Please enter a valid email address.').length).toBeGreaterThan(0);
    });
  });

  it('submits the form successfully when all fields are valid', async () => {
    render(<CareersPage />);

    const nameInput = screen.getAllByLabelText('Full Name')[0];
    const emailInput = screen.getAllByLabelText('Email Address')[0];
    const linkedinInput = screen.getAllByLabelText('LinkedIn Profile Link')[0];

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: 'John Doe', name: 'name' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com', name: 'email' } });
      fireEvent.change(linkedinInput, { target: { value: 'https://linkedin.com/in/johndoe', name: 'linkedin' } });

      const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
      const fileInput = document.getElementById('general-resume') as HTMLInputElement;
      fireEvent.change(fileInput, { target: { files: [file], name: 'resume' } });
    });

    const submitButton = screen.getAllByText('Submit Application')[0];

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Submitting...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Application Received!')).toBeInTheDocument();
      expect(screen.getByText('Thank you for your interest in AgroSymbiont. We will be in touch.')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
