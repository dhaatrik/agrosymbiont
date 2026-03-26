import React from 'react';

export const BlogSkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-stone-800 rounded-[2rem] shadow-lg overflow-hidden flex flex-col h-full border border-stone-100 dark:border-stone-700 animate-pulse">
        <div className="h-64 bg-stone-200 dark:bg-stone-700"></div>
        <div className="p-8 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-stone-200 dark:bg-stone-700 rounded-md w-24"></div>
                <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-20"></div>
            </div>
            <div className="h-8 bg-stone-200 dark:bg-stone-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-5/6 mb-8 flex-grow"></div>
            <div className="h-10 bg-stone-200 dark:bg-stone-700 rounded-full w-32 mt-auto"></div>
        </div>
    </div>
);

// Performance optimization: Pre-allocate static array outside the render loop
// to avoid unnecessary object creation/GC pressure on every render.
export const BLOG_SKELETON_ITEMS = [1, 2, 3];
