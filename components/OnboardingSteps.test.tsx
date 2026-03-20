import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  StepCrop,
  StepChallenge,
  StepFarmSize,
  StepSoilType,
  StepContact,
  StepSuccess,
  OnboardingSelections,
} from './OnboardingSteps';

// Translation mappings based on i18n.ts
const translations: Record<string, string> = {
  onb_crop_title: "What is your primary focus?",
  onb_crop_subtitle: "Help us tailor a sustainable solution for your fields.",
  onb_crop_cereals: "Cereals & Grains",
  onb_crop_fruits: "Fruits & Orchards",
  onb_crop_cash: "Cash Crops (Tea, Coffee)",
  onb_crop_vegetables: "Vegetables",
  onb_challenge_title: "What is your biggest challenge?",
  onb_challenge_subtitle: "Identify your priority to discover how Nano-fertility can help.",
  onb_ch_yield: "Low Yield / Stunted Growth",
  onb_ch_soil: "Poor Soil Health",
  onb_ch_pest: "Pest & Disease Resistance",
  onb_ch_climate: "Climate Stress (Drought, Heat)",
  onb_farmsize_title: "How large is your farm?",
  onb_farmsize_subtitle: "This helps us recommend the right quantity and plan.",
  onb_fs_small: "< 5 Acres",
  onb_fs_medium: "5 – 25 Acres",
  onb_fs_large: "25 – 100 Acres",
  onb_fs_commercial: "100+ Acres",
  onb_soil_title: "What's your soil type?",
  onb_soil_subtitle: "Different soils respond differently to nano-inputs.",
  onb_soil_alluvial: "Alluvial",
  onb_soil_red: "Red / Laterite",
  onb_soil_black: "Black (Regur)",
  onb_soil_sandy: "Sandy / Loam",
  onb_soil_clay: "Clay",
  onb_soil_unknown: "Not Sure",
  onb_contact_title: "Let's build a plan.",
  onb_contact_subtitle: "Where should we send your custom agronomy strategy?",
  onb_name_label: "Full Name",
  onb_name_placeholder: "Jane Doe",
  onb_email_label: "Email Address",
  onb_email_placeholder: "jane@farm.com",
  onb_submit: "Get My Strategy",
  onb_submitting: "Processing...",
  onb_success_title: "Welcome to AgroSymbiont.",
  onb_success_desc: "We've received your details and are preparing a strategy based on your focus (wheat) and primary challenge (yield). Look out for an email shortly!",
  onb_return_home: "Return to Homepage",
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      let text = translations[key] || key;
      if (options && key === 'onb_success_desc') {
        text = `We've received your details and are preparing a strategy based on your focus (${options.crop}) and primary challenge (${options.challenge}). Look out for an email shortly!`;
      }
      return text;
    },
  }),
}));

vi.mock('framer-motion', () => {
  const React = require('react');
  return {
    useReducedMotion: () => false,
    useMotionValue: () => ({ set: vi.fn(), get: vi.fn() }),
    useTransform: () => ({ get: vi.fn() }),
    useSpring: () => ({ get: vi.fn() }),
    motion: {
      div: React.forwardRef(({ children, className, ...props }: any, ref: any) => {
        // Strip out framer-motion props
        const {
          initial, animate, exit, variants, transition, whileHover, whileTap,
          layoutId, layout,
          ...domProps
        } = props;
        return <div ref={ref} className={className} data-testid="motion-div" {...domProps}>{children}</div>;
      }),
      button: ({ children, className, ...props }: any) => {
        const {
          initial, animate, exit, variants, transition, whileHover, whileTap,
          layoutId, layout,
          ...domProps
        } = props;
        return <button className={className} data-testid="motion-button" {...domProps}>{children}</button>;
      },
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('OnboardingSteps Components', () => {
  const mockSelections: OnboardingSelections = {
    crop: '',
    challenge: '',
    farmSize: '',
    soilType: '',
    name: '',
    email: '',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('StepCrop', () => {
    it('renders crops and handles selection', async () => {
      const setSelections = vi.fn();
      const handleNext = vi.fn();

      render(
        <StepCrop selections={mockSelections} setSelections={setSelections} handleNext={handleNext} />
      );

      expect(screen.getByText('What is your primary focus?')).toBeInTheDocument();
      expect(screen.getByText('Help us tailor a sustainable solution for your fields.')).toBeInTheDocument();

      const cropButton = screen.getByText('Cereals & Grains');
      fireEvent.click(cropButton);

      expect(setSelections).toHaveBeenCalledWith({ ...mockSelections, crop: 'wheat' });

      // handleNext is called via setTimeout
      await waitFor(() => {
        expect(handleNext).toHaveBeenCalled();
      });
    });
  });

  describe('StepChallenge', () => {
    it('renders challenges and handles selection', async () => {
      const setSelections = vi.fn();
      const handleNext = vi.fn();

      render(
        <StepChallenge selections={mockSelections} setSelections={setSelections} handleNext={handleNext} />
      );

      expect(screen.getByText('What is your biggest challenge?')).toBeInTheDocument();

      const challengeButton = screen.getByText('Low Yield / Stunted Growth');
      fireEvent.click(challengeButton);

      expect(setSelections).toHaveBeenCalledWith({ ...mockSelections, challenge: 'yield' });

      await waitFor(() => {
        expect(handleNext).toHaveBeenCalled();
      });
    });
  });

  describe('StepFarmSize', () => {
    it('renders farm sizes and handles selection', async () => {
      const setSelections = vi.fn();
      const handleNext = vi.fn();

      render(
        <StepFarmSize selections={mockSelections} setSelections={setSelections} handleNext={handleNext} />
      );

      expect(screen.getByText('How large is your farm?')).toBeInTheDocument();

      const farmSizeButton = screen.getByText('< 5 Acres');
      fireEvent.click(farmSizeButton);

      expect(setSelections).toHaveBeenCalledWith({ ...mockSelections, farmSize: 'small' });

      await waitFor(() => {
        expect(handleNext).toHaveBeenCalled();
      });
    });
  });

  describe('StepSoilType', () => {
    it('renders soil types and handles selection', async () => {
      const setSelections = vi.fn();
      const handleNext = vi.fn();

      render(
        <StepSoilType selections={mockSelections} setSelections={setSelections} handleNext={handleNext} />
      );

      expect(screen.getByText("What's your soil type?")).toBeInTheDocument();

      const soilButton = screen.getByText('Alluvial');
      fireEvent.click(soilButton);

      expect(setSelections).toHaveBeenCalledWith({ ...mockSelections, soilType: 'alluvial' });

      await waitFor(() => {
        expect(handleNext).toHaveBeenCalled();
      });
    });
  });

  describe('StepContact', () => {
    it('renders contact form, handles input and submission', () => {
      const setSelections = vi.fn();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <StepContact
          selections={mockSelections}
          setSelections={setSelections}
          handleSubmit={handleSubmit}
          isSubmitting={false}
        />
      );

      expect(screen.getByText("Let's build a plan.")).toBeInTheDocument();

      const nameInput = screen.getByLabelText('Full Name');
      const emailInput = screen.getByLabelText('Email Address');

      // The input handler sets the whole object, but we didn't update it in the mock wrapper,
      // so each call has the initial mockSelections
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      expect(setSelections).toHaveBeenCalledWith({ ...mockSelections, name: 'John Doe' });

      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      expect(setSelections).toHaveBeenCalledWith({ ...mockSelections, email: 'john@example.com' });

      const form = screen.getByRole('button', { name: /Get My Strategy/i }).closest('form')!;
      fireEvent.submit(form);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('displays submitting state', () => {
      const setSelections = vi.fn();
      const handleSubmit = vi.fn();

      render(
        <StepContact
          selections={mockSelections}
          setSelections={setSelections}
          handleSubmit={handleSubmit}
          isSubmitting={true}
        />
      );

      expect(screen.getByText('Processing...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('StepSuccess', () => {
    it('renders success message and link', () => {
      render(
        <MemoryRouter>
          <StepSuccess selections={{ ...mockSelections, crop: 'wheat', challenge: 'yield' }} />
        </MemoryRouter>
      );

      expect(screen.getByText('Welcome to AgroSymbiont.')).toBeInTheDocument();
      expect(screen.getByText("We've received your details and are preparing a strategy based on your focus (wheat) and primary challenge (yield). Look out for an email shortly!")).toBeInTheDocument();
      expect(screen.getByText('Return to Homepage')).toBeInTheDocument();
    });
  });
});
