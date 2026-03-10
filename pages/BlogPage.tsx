
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Bell, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { blogs, BlogPost } from '../data/blogs';

import TiltCard from '../components/TiltCard';

const BlogCard: React.FC<{ post: BlogPost; onCategoryClick: (category: string) => void; onReadMore: () => void }> = ({ post, onCategoryClick, onReadMore }) => {
    const handleReadMore = (e: React.MouseEvent) => {
        e.preventDefault();
        onReadMore();
    };

    const handleCategoryClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCategoryClick(post.category);
    };

    return (
        <TiltCard className="h-full">
            <div className="group bg-white dark:bg-stone-800 rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-stone-100 dark:border-stone-700 hover:-translate-y-2 relative transform-style-3d">
                <div className="h-64 overflow-hidden relative translate-z-2">
                     <img src={post.imageUrl} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-black/20 transition-colors duration-500"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     <button 
                        onClick={handleCategoryClick}
                        className="absolute top-4 left-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm text-cerulean-blue dark:text-blue-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-lg hover:bg-cerulean-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors z-10 translate-z-4"
                     >
                        {post.category}
                     </button>
                </div>
                <div className="p-8 flex flex-col flex-grow text-left translate-z-4 bg-white dark:bg-stone-800">
                    <div className="flex justify-between items-center text-xs font-medium text-stone-400 dark:text-stone-500 mb-4 uppercase tracking-wider">
                        <span className="text-burnt-orange dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-md">{post.date}</span>
                        <span>{post.author}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors leading-tight">{post.title}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-base mb-8 flex-grow leading-relaxed">{post.excerpt}</p>
                    <button 
                        onClick={handleReadMore}
                        className="text-cerulean-blue dark:text-blue-400 font-bold text-sm hover:text-burnt-orange dark:hover:text-orange-400 transition-colors self-start flex items-center mt-auto group/btn bg-blue-50 dark:bg-blue-900/20 px-5 py-2.5 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 shadow-sm hover:shadow-md active:translate-y-1 active:shadow-none"
                    >
                        {post.date === "Coming Soon" ? "Read Preview" : "Read Article"} <span className="ml-2 transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </button>
                </div>
            </div>
        </TiltCard>
    );
};

const BlogSkeletonCard: React.FC = () => (
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

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
      setToastMessage(message);
      if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
          setToastMessage(null);
      }, 5000);
  };

  useEffect(() => {
      // Simulate data fetching
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 1500);
      return () => {
          clearTimeout(timer);
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      };
  }, []);

  const categories = ['All', 'Technology', 'Sustainability', 'AI in Agri'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(post => post.category === selectedCategory);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      if (!value.trim()) {
          setEmailError('Email Address is required.');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
          setEmailError('Please enter a valid email address.');
      } else {
          setEmailError('');
      }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) {
        setEmailError('Email Address is required.');
        return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Please enter a valid email address.');
        return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Email submitted:', email);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Insights & News</h1>
           <p className="text-xl text-stone-gray dark:text-stone-300 max-w-3xl mx-auto font-light">
            Exploring the frontiers of sustainable agriculture, technology, and soil science.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-24">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Updates</h2>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide p-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-sm font-bold py-2.5 px-6 rounded-full whitespace-nowrap transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-cerulean-blue dark:bg-blue-600 text-white shadow-md transform scale-105'
                                    : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-cerulean-blue dark:hover:border-blue-500 hover:text-cerulean-blue dark:hover:text-blue-400'
                            }`}
                        >
                            {category === 'All' ? 'All Posts' : category}
                        </button>
                    ))}
                </div>
            </div>
            
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[1, 2, 3].map(i => <BlogSkeletonCard key={i} />)}
                </div>
            ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredPosts.map(post => (
                        <BlogCard 
                            key={post.id} 
                            post={post} 
                            onCategoryClick={setSelectedCategory}
                            onReadMore={() => {
                                if (post.date === "Coming Soon") {
                                    showToast("This article is currently in the final stages of editing. Sign up for our newsletter below to be notified when it goes live!");
                                } else {
                                    navigate(`/blog/${post.id}`);
                                }
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white/50 dark:bg-stone-800/50 rounded-[2rem] border border-dashed border-stone-300 dark:border-stone-700">
                    <p className="text-stone-500 dark:text-stone-400 text-lg mb-4">No articles found in this category.</p>
                    <button 
                        onClick={() => setSelectedCategory('All')}
                        className="text-cerulean-blue dark:text-blue-400 hover:underline font-bold"
                    >
                        View all posts
                    </button>
                </div>
            )}
        </AnimatedSection>

        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] shadow-2xl text-center relative overflow-hidden p-16">
             <div className="absolute top-0 right-0 w-96 h-96 bg-cerulean-blue/20 dark:bg-blue-900/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
             
            {isSubmitted ? (
              <div className="py-8 relative z-10">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle className="w-10 h-10 text-green-400" strokeWidth={2} />
                </div>
                <h3 className="text-4xl font-bold text-white mb-4">Welcome to the Community!</h3>
                <p className="text-gray-300 text-xl">You've successfully subscribed. We'll notify you when these articles go live.</p>
              </div>
            ) : (
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Ahead of the Curve</h3>
                <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg font-light">
                    Get the latest insights on regenerative farming, nanotechnology, and agritech delivered directly to your inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto relative">
                  <div className="flex-grow relative w-full">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        className={`w-full px-8 py-4 bg-white/10 border ${emailError ? 'border-red-500 bg-red-900/20' : 'border-white/20'} rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-mustard-yellow transition-all text-white placeholder-gray-400 backdrop-blur-sm text-center sm:text-left`}
                        aria-label="Email for blog notifications"
                      />
                      {emailError && (
                          <p className="absolute -bottom-6 left-0 sm:left-4 text-xs text-red-400 font-medium w-full text-center sm:text-left flex items-center justify-center sm:justify-start">
                              <AlertCircle className="w-3 h-3 mr-1" strokeWidth={2} />
                              {emailError}
                          </p>
                      )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-mustard-yellow dark:bg-yellow-500 text-cerulean-blue dark:text-blue-900 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg whitespace-nowrap flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-stone-200 transform hover:scale-105'}`}
                  >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-cerulean-blue" />
                            Submitting...
                        </>
                    ) : (
                        'Notify Me'
                    )}
                  </button>
                </form>
                <p className="mt-8 text-xs text-gray-500">
                    We respect your privacy. No spam, ever. Unsubscribe at any time.
                </p>
              </div>
            )}
          </div>
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
                    <h4 className="font-bold text-sm mb-1">Coming Soon</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{toastMessage}</p>
                </div>
                <button 
                    onClick={() => setToastMessage(null)}
                    className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
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
