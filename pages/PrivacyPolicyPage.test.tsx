import React from 'react';
import { render, screen } from '@testing-library/react';
import PrivacyPolicyPage from './PrivacyPolicyPage';
import { vi, describe, it, expect } from 'vitest';

// Mock AnimatedSection
vi.mock('../components/AnimatedSection', () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('PrivacyPolicyPage Component', () => {
  it('renders the main heading', () => {
    render(<PrivacyPolicyPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /Privacy Policy/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the Last updated date', () => {
    render(<PrivacyPolicyPage />);
    const lastUpdatedText = screen.getByText(/Last updated:/i);
    expect(lastUpdatedText).toBeInTheDocument();
  });

  it('renders the Introduction section', () => {
    render(<PrivacyPolicyPage />);
    const introHeading = screen.getByRole('heading', { level: 2, name: /1\. Introduction/i });
    expect(introHeading).toBeInTheDocument();

    const introText = screen.getByText(/Welcome to AgroSymbiont/i);
    expect(introText).toBeInTheDocument();
  });

  it('renders the Information We Collect section', () => {
    render(<PrivacyPolicyPage />);
    const infoHeading = screen.getByRole('heading', { level: 2, name: /2\. Information We Collect/i });
    expect(infoHeading).toBeInTheDocument();
  });
});
