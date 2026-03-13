import { bench, describe } from 'vitest';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FAQPage from './pages/FAQPage';
import { vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ initial, whileInView, viewport, transition, ...props }: any) => <div {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useReducedMotion: () => false,
}));

describe('FAQPage toggle FAQ benchmark', () => {
  let container: HTMLElement;
  let buttons: NodeListOf<HTMLButtonElement>;

  bench('toggles FAQ', () => {
    if (!container) {
      const res = render(<FAQPage />);
      container = res.container;
      buttons = container.querySelectorAll('button');
    }

    // Perform multiple toggles to really stress the re-render where the array gets recreated
    for (let i = 0; i < 5; i++) {
        fireEvent.click(buttons[i % buttons.length]);
    }
  }, { time: 1000, warmupTime: 200, iterations: 100 });
});
