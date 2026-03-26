import React from 'react';
import TiltCard from './TiltCard';
import { BlogPost } from '../data/blogs';

interface BlogCardProps {
    post: BlogPost;
    onCategoryClick: (category: string) => void;
    onReadMore: () => void;
    readPreviewText: string;
    readArticleText: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onCategoryClick, onReadMore, readPreviewText, readArticleText }) => {
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
                        className="absolute top-4 left-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm text-cerulean-blue dark:text-blue-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-lg hover:bg-cerulean-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors z-10 translate-z-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-800"
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
                        className="text-cerulean-blue dark:text-blue-400 font-bold text-sm hover:text-burnt-orange dark:hover:text-orange-400 transition-colors self-start flex items-center mt-auto group/btn bg-blue-50 dark:bg-blue-900/20 px-5 py-2.5 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 shadow-sm hover:shadow-md active:translate-y-1 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-800"
                    >
                        {post.date === "Coming Soon" ? readPreviewText : readArticleText} <span className="ml-2 transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </button>
                </div>
            </div>
        </TiltCard>
    );
};

export default BlogCard;