import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import BlogCard from './BlogCard';
import { BlogPost } from '../data/blogs';

// Mock TiltCard to just render its children
vi.mock('./TiltCard', () => {
    return {
        default: ({ children }: { children: React.ReactNode }) => <div data-testid="tilt-card-mock">{children}</div>,
    };
});

const mockPost: BlogPost = {
    id: 'test-1',
    title: 'Test Blog Title',
    excerpt: 'This is a test excerpt for the blog card.',
    category: 'Technology',
    date: 'October 12, 2023',
    author: 'Jane Doe',
    imageUrl: '/test-image.jpg',
};

describe('BlogCard', () => {
    it('renders blog post details correctly', () => {
        render(
            <BlogCard
                post={mockPost}
                onCategoryClick={vi.fn()}
                onReadMore={vi.fn()}
                readPreviewText="Read Preview"
                readArticleText="Read Article"
            />
        );

        expect(screen.getByText('Test Blog Title')).toBeInTheDocument();
        expect(screen.getByText('This is a test excerpt for the blog card.')).toBeInTheDocument();
        expect(screen.getByText('Technology')).toBeInTheDocument();
        expect(screen.getByText('October 12, 2023')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', '/test-image.jpg');
        expect(image).toHaveAttribute('alt', 'Test Blog Title');
    });

    it('calls onCategoryClick when category button is clicked', () => {
        const handleCategoryClick = vi.fn();

        render(
            <BlogCard
                post={mockPost}
                onCategoryClick={handleCategoryClick}
                onReadMore={vi.fn()}
                readPreviewText="Read Preview"
                readArticleText="Read Article"
            />
        );

        const categoryButton = screen.getByText('Technology');
        fireEvent.click(categoryButton);

        expect(handleCategoryClick).toHaveBeenCalledTimes(1);
        expect(handleCategoryClick).toHaveBeenCalledWith('Technology');
    });

    it('calls onReadMore when read more button is clicked', () => {
        const handleReadMore = vi.fn();

        render(
            <BlogCard
                post={mockPost}
                onCategoryClick={vi.fn()}
                onReadMore={handleReadMore}
                readPreviewText="Read Preview"
                readArticleText="Read Article"
            />
        );

        // The button has "Read Article" text plus an arrow
        const readMoreButton = screen.getByRole('button', { name: /Read Article/i });
        fireEvent.click(readMoreButton);

        expect(handleReadMore).toHaveBeenCalledTimes(1);
    });

    it('displays readArticleText when date is not "Coming Soon"', () => {
        render(
            <BlogCard
                post={mockPost}
                onCategoryClick={vi.fn()}
                onReadMore={vi.fn()}
                readPreviewText="Read Preview"
                readArticleText="Read Article Text"
            />
        );

        expect(screen.getByText(/Read Article Text/)).toBeInTheDocument();
        expect(screen.queryByText(/Read Preview/)).not.toBeInTheDocument();
    });

    it('displays readPreviewText when date is "Coming Soon"', () => {
        const comingSoonPost = { ...mockPost, date: 'Coming Soon' };

        render(
            <BlogCard
                post={comingSoonPost}
                onCategoryClick={vi.fn()}
                onReadMore={vi.fn()}
                readPreviewText="Read Preview Text"
                readArticleText="Read Article Text"
            />
        );

        expect(screen.getByText(/Read Preview Text/)).toBeInTheDocument();
        expect(screen.queryByText(/Read Article Text/)).not.toBeInTheDocument();
    });
});
