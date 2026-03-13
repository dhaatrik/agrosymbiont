import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FAQPage from './FAQPage';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down" />,
  ChevronUp: () => <div data-testid="chevron-up" />,
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className} data-testid="motion-div">{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

describe('FAQPage', () => {
  it('renders the main titles and contact section', () => {
    render(<FAQPage />);

    // Check titles
    expect(screen.getByText('faq_title')).toBeInTheDocument();
    expect(screen.getByText('faq_subtitle')).toBeInTheDocument();

    // Check contact section
    expect(screen.getByText('faq_still_questions')).toBeInTheDocument();
    const contactLink = screen.getByText('faq_contact_support');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '#/contact');
  });

  it('renders exactly 10 FAQ items', () => {
    render(<FAQPage />);

    // Check 10 questions and 10 answers are present (based on translation keys)
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`faq_q${i}`)).toBeInTheDocument();
      expect(screen.getByText(`faq_a${i}`)).toBeInTheDocument();
    }
  });

  it('opens the first FAQ item by default', () => {
    render(<FAQPage />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(10);

    // First item should be open
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[0].querySelector('[data-testid="chevron-up"]')).toBeInTheDocument();

    // Other items should be closed
    for (let i = 1; i < 10; i++) {
      expect(buttons[i]).toHaveAttribute('aria-expanded', 'false');
      expect(buttons[i].querySelector('[data-testid="chevron-down"]')).toBeInTheDocument();
    }
  });

  it('toggles FAQ items on click', () => {
    render(<FAQPage />);

    const buttons = screen.getAllByRole('button');

    // Initially, item 0 is open, item 1 is closed
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');

    // Click item 1 to open it
    fireEvent.click(buttons[1]);

    // Now item 0 should be closed, item 1 should be open
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');

    // Click item 1 again to close it
    fireEvent.click(buttons[1]);

    // Now item 1 should be closed (and item 0 remains closed)
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });
});
