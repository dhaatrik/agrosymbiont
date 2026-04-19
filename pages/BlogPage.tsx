
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bell } from 'lucide-react';
import { blogs } from '../data/blogs';
import { useTranslation } from 'react-i18next';

import BlogCard from '../components/BlogCard';
import { BlogSkeletonCard, BLOG_SKELETON_ITEMS } from '../components/BlogSkeletonCard';
import BlogNewsletterForm from '../components/BlogNewsletterForm';

// ⚡ Bolt Optimization: Extracted the static categories array outside the component body.
// This prevents unnecessary array creation and memory allocation on every render cycle,
// which reduces garbage collection overhead and improves performance.
const categories = ['All', 'Technology', 'Sustainability', 'AI in Agri'];

// ⚡ Bolt Optimization: Memoized the category button to prevent all buttons from re-rendering
// when the user selects a new category. Only the buttons whose selection state changes will re-render.
interface CategoryButtonProps {
    category: string;
    isSelected: boolean;
    onClick: (category: string) => void;
    label: string;
}

const MemoizedCategoryButton = React.memo(({ category, isSelected, onClick, label }: CategoryButtonProps) => (
    <button
        onClick={() => onClick(category)}
        className={`text-sm font-bold py-2.5 px-6 rounded-full whitespace-nowrap transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${
            isSelected
                ? 'bg-cerulean-blue dark:bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-cerulean-blue dark:hover:border-blue-500 hover:text-cerulean-blue dark:hover:text-blue-400'
        }`}
    >
        {label}
    </button>
));
MemoizedCategoryButton.displayName = 'MemoizedCategoryButton';

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // ⚡ Bolt Optimization: Removed artificial 1.5s delay by initializing isLoading to false.
  // This eliminates the forced wait for the skeleton state and improves perceived performance.
  const [isLoading, setIsLoading] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string) => {
      setToastMessage(message);
      if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
          setToastMessage(null);
      }, 5000);
  }, []);

  useEffect(() => {
      return () => {
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      };
  }, []);

  const handleCategorySelect = useCallback((category: string) => {
      setSelectedCategory(category);
  }, []);

  const filteredPosts = useMemo(() => {
    return selectedCategory === 'All'
      ? blogs
      : blogs.filter(post => post.category === selectedCategory);
  }, [selectedCategory]);

  const handleReadMore = useCallback((post: typeof blogs[0]) => {
      if (post.date === "Coming Soon") {
          showToast(t('blog_toast_msg'));
      } else {
          navigate(`/blog/${post.id}`);
      }
  }, [t, navigate, showToast]);

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{t('blog_title')}</h1>
           <p className="text-xl text-stone-gray dark:text-stone-300 max-w-3xl mx-auto font-light">
            {t('blog_subtitle')}
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-24">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('blog_latest')}</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide p-1">
                    {categories.map((category) => (
                        <MemoizedCategoryButton
                            key={category}
                            category={category}
                            isSelected={selectedCategory === category}
                            onClick={handleCategorySelect}
                            label={category === 'All' ? t('blog_cat_all') : t(`blog_cat_${category}`)}
                        />
                    ))}
                </div>
            </div>
            
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {BLOG_SKELETON_ITEMS.map(i => <BlogSkeletonCard key={i} />)}
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredPosts.map(post => (
                        <BlogCard 
                            key={post.id} 
                            post={post} 
                            onCategoryClick={setSelectedCategory}
                            readPreviewText={t('blog_read_preview')}
                            readArticleText={t('blog_read_article')}
                            onReadMore={handleReadMore}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white/50 dark:bg-stone-800/50 rounded-[2rem] border border-dashed border-stone-300 dark:border-stone-700">
                    <p className="text-stone-500 dark:text-stone-400 text-lg mb-4">{t('blog_no_articles')}</p>
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className="text-cerulean-blue dark:text-blue-400 hover:underline font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-800 rounded px-2 py-1"
                    >
                        {t('blog_view_all')}
                    </button>
                </div>
            )}
        </AnimatedSection>

        <AnimatedSection className="max-w-4xl mx-auto">
          <BlogNewsletterForm />
        </AnimatedSection>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-8 z-50 bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-start gap-4 max-w-md w-[calc(100%-2rem)]"
            >
                <div className="bg-cerulean-blue/20 dark:bg-blue-900/40 p-2 rounded-full flex-shrink-0 mt-0.5">
                    <Bell className="w-5 h-5 text-cerulean-blue" />
                </div>
                <div className="flex-grow pr-2">
                    <h4 className="font-bold text-sm mb-1">{t('blog_coming_soon')}</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{toastMessage}</p>
                </div>
                <button 
                    onClick={() => setToastMessage(null)}
                    className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Close notification"
                >
                    <X className="w-4 h-4" />
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
