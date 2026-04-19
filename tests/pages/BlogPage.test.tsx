import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import BlogPage from '@/pages/BlogPage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'blog_title': 'Blog Title',
        'blog_subtitle': 'Blog Subtitle',
        'blog_latest': 'Latest Articles',
        'blog_cat_all': 'All',
        'blog_cat_Technology': 'Technology',
        'blog_cat_Sustainability': 'Sustainability',
        'blog_cat_AI in Agri': 'AI in Agri',
        'blog_read_preview': 'Read Preview',
        'blog_read_article': 'Read Article',
        'blog_toast_msg': 'Article coming soon!',
        'blog_no_articles': 'No articles found',
        'blog_view_all': 'View All',
        'blog_stay_ahead': 'Stay Ahead',
        'blog_stay_ahead_desc': 'Stay ahead description',
        'blog_email_placeholder': 'Enter email',
        'blog_email_required': 'Email is required',
        'blog_email_invalid': 'Invalid email',
        'blog_notify': 'Notify Me',
        'blog_submitting': 'Submitting...',
        'blog_welcome': 'Welcome',
        'blog_welcome_desc': 'Welcome description',
        'blog_privacy': 'Privacy policy',
        'blog_coming_soon': 'Coming Soon'
      };
      return translations[key] || key;
    }
  }),
}));

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, className, ...props }: any) => <div className={className} data-testid="motion-div" {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => true,
    useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
    useTransform: () => ({}),
    useSpring: () => ({}),
    useMotionValue: () => ({ set: vi.fn(), get: vi.fn() }),
  };
});

// Mock data/blogs
vi.mock( '@/data/blogs', () => ({
  blogs: [
    {
      id: '1',
      title: 'Technology Post',
      category: 'Technology',
      excerpt: 'Tech excerpt',
      date: '2023-01-01',
      author: 'Author 1',
      imageUrl: 'image1.jpg'
    },
    {
      id: '2',
      title: 'Sustainability Post',
      category: 'Sustainability',
      excerpt: 'Sust excerpt',
      date: '2023-01-02',
      author: 'Author 2',
      imageUrl: 'image2.jpg'
    },
    {
      id: '3',
      title: 'Coming Soon Post',
      category: 'AI in Agri',
      excerpt: 'Coming soon excerpt',
      date: 'Coming Soon',
      author: 'Author 3',
      imageUrl: 'image3.jpg'
    }
  ]
}));

describe('BlogPage Component', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it('renders blog posts immediately', async () => {
    renderWithRouter(<BlogPage />);

    expect(screen.getByText('Blog Title')).toBeInTheDocument();
    expect(screen.getByText('Latest Articles')).toBeInTheDocument();

    expect(screen.getByText('Technology Post')).toBeInTheDocument();
    expect(screen.getByText('Sustainability Post')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon Post')).toBeInTheDocument();
  });

  it('filters posts by category', async () => {
    renderWithRouter(<BlogPage />);

    expect(screen.getByText('Technology Post')).toBeInTheDocument();

    // There are multiple buttons with the name 'Technology' (the category filter and the category tag on the post card).
    // We want the category filter button. Let's find it by looking for the one inside the filter container.
    const allCategoryBtns = screen.getAllByRole('button', { name: 'Technology' });
    // The filter button is the one with the specific classes for the filter bar
    const techCategoryBtn = allCategoryBtns.find(btn => btn.className.includes('rounded-full whitespace-nowrap transition-all'));

    if (techCategoryBtn) {
      fireEvent.click(techCategoryBtn);
    } else {
      throw new Error('Technology category filter button not found');
    }

    expect(screen.getByText('Technology Post')).toBeInTheDocument();
    expect(screen.queryByText('Sustainability Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Coming Soon Post')).not.toBeInTheDocument();
  });

  it('navigates to article on Read More click', async () => {
    renderWithRouter(<BlogPage />);

    expect(screen.getByText('Technology Post')).toBeInTheDocument();

    const readMoreBtns = screen.getAllByRole('button', { name: /Read Article/i });
    fireEvent.click(readMoreBtns[0]);

    expect(mockNavigate).toHaveBeenCalledWith('/blog/1');
  });

  it('shows toast message when clicking Coming Soon post', async () => {
    renderWithRouter(<BlogPage />);

    expect(screen.getByText('Coming Soon Post')).toBeInTheDocument();

    const readPreviewBtn = screen.getByRole('button', { name: /Read Preview/i });
    fireEvent.click(readPreviewBtn);

    expect(mockNavigate).not.toHaveBeenCalled();

    expect(screen.getByText('Article coming soon!')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Article coming soon!')).not.toBeInTheDocument();
    });
  });

});
