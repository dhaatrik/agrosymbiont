import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlogSkeletonCard, BLOG_SKELETON_ITEMS } from './BlogSkeletonCard';

describe('BlogSkeletonCard Component', () => {
    it('renders the skeleton card with correct container classes', () => {
        const { container } = render(<BlogSkeletonCard />);
        const firstElement = container.firstChild as HTMLElement;
        expect(firstElement).toBeInTheDocument();
        expect(firstElement.className).toContain('animate-pulse');
        expect(firstElement.className).toContain('bg-white');
        expect(firstElement.className).toContain('dark:bg-stone-800');
    });

    it('exports a valid array of items', () => {
        expect(Array.isArray(BLOG_SKELETON_ITEMS)).toBe(true);
        expect(BLOG_SKELETON_ITEMS.length).toBeGreaterThan(0);
        expect(BLOG_SKELETON_ITEMS).toEqual([1, 2, 3]);
    });
});
