import React, { useState, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';


const PaginationDot = memo(({ index, isActive, onClick }: { index: number, isActive: boolean, onClick: (index: number) => void }) => {
    return (
        <button
            onClick={() => onClick(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900 ${
                isActive ? 'bg-cerulean-blue dark:bg-blue-500 w-6 sm:w-8' : 'bg-stone-300 dark:bg-stone-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
        />
    );
});

const TEAM_MEMBERS = [
    { name: "Dhaatrik Chowdhury", title: "Founder & CEO", imageUrl: "https://picsum.photos/400/600?random=1" },
    { name: "Aarav Patel", title: "Chief Technology Officer", imageUrl: "https://picsum.photos/400/600?random=2" },
    { name: "Priya Sharma", title: "Head of Global Operations", imageUrl: "https://picsum.photos/400/600?random=3" },
    { name: "Rohan Desai", title: "Lead Agronomist", imageUrl: "https://picsum.photos/400/600?random=4" },
    { name: "Ananya Singh", title: "VP of Sustainability", imageUrl: "https://picsum.photos/400/600?random=5" },
];

const TeamCarousel: React.FC = () => {

const TeamCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

        const handleDotClick = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === TEAM_MEMBERS.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? TEAM_MEMBERS.length - 1 : prevIndex - 1
        );
    };

    return (
        <div
            className="relative max-w-5xl mx-auto px-4 sm:px-12"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="overflow-hidden rounded-3xl">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(calc(-${currentIndex} * (100% / var(--items-per-screen, 1))))` }}
                >
                    <style>{`
                        @media (min-width: 768px) { .flex { --items-per-screen: 2; } }
                        @media (min-width: 1024px) { .flex { --items-per-screen: 3; } }
                    `}</style>
                    {TEAM_MEMBERS.map((member, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4 md:w-1/2 lg:w-1/3">
                            <TeamMemberCard name={member.name} title={member.title} imageUrl={member.imageUrl} />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 hover:bg-white dark:hover:bg-stone-800 p-3 rounded-full shadow-lg text-cerulean-blue dark:text-blue-400 transition-all duration-300 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 hover:bg-white dark:hover:bg-stone-800 p-3 rounded-full shadow-lg text-cerulean-blue dark:text-blue-400 transition-all duration-300 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900"
            >
                <ChevronRight size={24} />
            </button>

            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
                {TEAM_MEMBERS.map((_, index) => (
                    <PaginationDot
                        key={index}
                        index={index}
                        isActive={currentIndex === index}
                        onClick={handleDotClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default TeamCarousel;