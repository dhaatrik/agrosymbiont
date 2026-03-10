import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { blogs, BlogPost } from '../data/blogs';
import Markdown from 'react-markdown';

import TiltCard from '../components/TiltCard';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogs
      .filter(b => b.category === post.category && b.id !== post.id)
      .slice(0, 3);
  }, [post]);

  useEffect(() => {
    const foundPost = blogs.find(b => b.id === id);
    if (foundPost) {
      setPost(foundPost);
      
      // Update meta description
      document.title = `${foundPost.title} | AgroSymbiont Blog`;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", foundPost.metaDescription || foundPost.excerpt);
      } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = foundPost.metaDescription || foundPost.excerpt;
        document.head.appendChild(meta);
      }
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory/20 dark:bg-stone-900/20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-stone-200 dark:bg-stone-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-stone-200 dark:bg-stone-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 min-h-screen bg-ivory/20 dark:bg-stone-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <Link 
            to="/blog" 
            className="inline-flex items-center text-cerulean-blue dark:text-blue-400 hover:text-burnt-orange dark:hover:text-orange-400 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="bg-white dark:bg-stone-800 rounded-[2rem] shadow-xl overflow-hidden border border-stone-100 dark:border-stone-700">
            <TiltCard>
              <div className="h-64 md:h-96 w-full relative preserve-3d">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover translate-z-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent translate-z-2"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white translate-z-10">
                  <span className="bg-cerulean-blue dark:bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block shadow-md">
                    {post.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-xl">
                    {post.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/90 drop-shadow-md">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
            
            <div className="p-8 md:p-12 text-[#000000] dark:text-gray-200">
              <div className="prose prose-lg prose-stone dark:prose-invert max-w-none prose-p:mb-8 prose-p:leading-relaxed prose-headings:mt-12 prose-headings:mb-6 prose-li:mb-2 text-[#000000] dark:text-gray-200">
                <div className="markdown-body">
                  <Markdown>{post.content || post.excerpt}</Markdown>
                </div>
              </div>
            </div>
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group">
                    <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-md overflow-hidden border border-stone-100 dark:border-stone-700 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                      <div className="h-48 overflow-hidden relative">
                        <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/20 transition-colors duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs font-bold text-cerulean-blue dark:text-blue-400 uppercase tracking-wider mb-2">{relatedPost.category}</span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors line-clamp-2">{relatedPost.title}</h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-3">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default BlogPostPage;
