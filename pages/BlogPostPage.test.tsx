import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import BlogPostPage from './BlogPostPage';
// Don't import blogs here since it creates hoisting problems. Let's just create mock data.

const mockBlogsData = [
  {
    id: "test-post-1",
    title: "Test Post 1",
    excerpt: "Excerpt 1",
    content: "Content 1",
    category: "Tech",
    date: "March 1, 2026",
    author: "Tester 1",
    imageUrl: "https://example.com/1.jpg",
    metaDescription: "Meta 1",
  },
  {
    id: "test-post-2",
    title: "Test Post 2",
    excerpt: "Excerpt 2",
    content: "Content 2",
    category: "Tech", // Same category for related posts
    date: "March 2, 2026",
    author: "Tester 2",
    imageUrl: "https://example.com/2.jpg",
  }
];

// Mock the blogs module entirely
vi.mock('../data/blogs', () => {
  return {
    blogs: [
      {
        id: "test-post-1",
        title: "Test Post 1",
        excerpt: "Excerpt 1",
        content: "Content 1",
        category: "Tech",
        date: "March 1, 2026",
        author: "Tester 1",
        imageUrl: "https://example.com/1.jpg",
        metaDescription: "Meta 1",
      },
      {
        id: "test-post-2",
        title: "Test Post 2",
        excerpt: "Excerpt 2",
        content: "Content 2",
        category: "Tech", // Same category for related posts
        date: "March 2, 2026",
        author: "Tester 2",
        imageUrl: "https://example.com/2.jpg",
      }
    ]
  };
});

// Import the mocked blogs array to mutate it for the last test
import { blogs } from '../data/blogs';

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="markdown">{children}</div>,
}));

// Mock Framer Motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    useReducedMotion: () => true, // Simplify animations for tests
  };
});

// Mock react-router-dom so we can safely capture the navigation event
// and prevent it from unmounting the component during our loading check.
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as any;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


describe('BlogPostPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.title = '';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.remove();
    }

    // Restore the mock data state
    blogs.length = 0;
    blogs.push(...mockBlogsData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithRouter = (initialRoute: string) => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/blog" element={<div data-testid="blog-page">Blog List</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders loading state initially', async () => {
    // We mock navigate globally above, so when the component tries to navigate,
    // it just calls the spy, leaving the component mounted.
    const { container } = render(
      <MemoryRouter initialEntries={['/blog/loading-id']}>
        <Routes>
          <Route path="/blog/:id" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Since navigate is a spy and doesn't actually unmount or change routes,
    // the pulse animation div should still be present.
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders a blog post when a valid ID is provided', async () => {
    const validPost = mockBlogsData[0];
    renderWithRouter(`/blog/${validPost.id}`);

    await waitFor(() => {
      expect(screen.getByText(validPost.title)).toBeInTheDocument();
    });

    expect(screen.getAllByText(validPost.author)[0]).toBeInTheDocument();
    expect(screen.getAllByText(validPost.date)[0]).toBeInTheDocument();
    expect(screen.getAllByText(validPost.category)[0]).toBeInTheDocument();

    // Check if Markdown content is rendered
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
  });

  it('navigates to /blog when an invalid ID is provided', async () => {
    renderWithRouter('/blog/invalid-id');

    // Should call the mocked navigate function with /blog
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/blog');
    });
  });

  it('updates document title and meta description dynamically', async () => {
    const validPost = mockBlogsData[0];
    renderWithRouter(`/blog/${validPost.id}`);

    await waitFor(() => {
      expect(document.title).toBe(`${validPost.title} | AgroSymbiont Blog`);
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toBeInTheDocument();
    expect(metaDescription?.getAttribute('content')).toBe(validPost.metaDescription || validPost.excerpt);
  });

  it('renders related posts based on matching category', async () => {
    const validPost = mockBlogsData[0];
    renderWithRouter(`/blog/${validPost.id}`);

    await waitFor(() => {
      expect(screen.getByText('Related Posts')).toBeInTheDocument();
    });

    // Post 2 is related to Post 1
    expect(screen.getByText(mockBlogsData[1].title)).toBeInTheDocument();
  });

  it('does not render related posts section if there are no related posts', async () => {
    const uniquePost = {
      id: "unique-category-test-post",
      title: "Test Post with Unique Category",
      excerpt: "Test",
      content: "Test",
      category: "Super Unique Category 123",
      date: "March 10, 2026",
      author: "Tester",
      imageUrl: "https://example.com/test.jpg"
    };

    // Append dynamically to the exported module's array
    blogs.push(uniquePost);

    renderWithRouter(`/blog/${uniquePost.id}`);

    await waitFor(() => {
      expect(screen.getByText(uniquePost.title)).toBeInTheDocument();
    });

    expect(screen.queryByText('Related Posts')).not.toBeInTheDocument();
  });
});
