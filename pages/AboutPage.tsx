
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import { ChevronLeft, ChevronRight, Lightbulb, Leaf, ShieldCheck, Users } from 'lucide-react';

const TeamMemberCard: React.FC<{ name: string, title: string, imageUrl: string }> = ({ name, title, imageUrl }) => (
    <TiltCard className="h-96 w-full">
        <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-stone-800 h-full w-full preserve-3d">
            <img src={imageUrl} alt={name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 translate-z-2" />
            <div className="absolute inset-0 bg-gradient-to-t from-cerulean-blue/90 dark:from-blue-900/90 via-cerulean-blue/20 dark:via-blue-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 translate-z-4"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 translate-z-10">
                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{name}</h3>
                <p className="text-mustard-yellow dark:text-yellow-400 font-medium tracking-wide uppercase text-sm drop-shadow-sm">{title}</p>
            </div>
        </div>
    </TiltCard>
);

const TimelineItem: React.FC<{ year: string, title: string, description: string, align: 'left' | 'right' }> = ({ year, title, description, align }) => (
    <div className={`mb-16 flex w-full ${align === 'right' ? 'flex-row-reverse' : ''} items-center justify-between group perspective-1000`}>
        <div className="w-[45%]">
            <TiltCard>
                <div className={`bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-xl preserve-3d ${align === 'right' ? 'text-right' : 'text-left'}`}>
                    <h3 className="mb-2 font-bold text-cerulean-blue dark:text-blue-400 text-2xl translate-z-4">{title}</h3>
                    <p className="text-stone-gray dark:text-stone-400 leading-relaxed translate-z-2">{description}</p>
                </div>
            </TiltCard>
        </div>
        
        <div className="w-[10%] flex justify-center relative">
            <div className="w-0.5 h-full bg-stone-200 dark:bg-stone-700 absolute top-0 bottom-0 -z-10"></div>
            <div className="w-14 h-14 bg-white dark:bg-stone-800 border-4 border-mustard-yellow dark:border-yellow-600 rounded-full flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                <span className="font-bold text-stone-800 dark:text-stone-200 text-sm">{year}</span>
            </div>
        </div>

        <div className="w-[45%]"></div>
    </div>
);

const ValueCard: React.FC<{ title: string, description: string, icon: React.ReactNode }> = ({ title, description, icon }) => (
    <TiltCard className="h-full">
        <div className="bg-white/70 dark:bg-stone-800/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/50 dark:border-stone-700/50 text-center transform hover:scale-105 transition-all duration-300 hover:bg-white dark:hover:bg-stone-800 group h-full preserve-3d">
            <div className="text-burnt-orange dark:text-orange-400 w-16 h-16 mx-auto mb-6 p-4 bg-orange-50 dark:bg-orange-900/30 rounded-2xl group-hover:bg-burnt-orange dark:group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300 shadow-sm translate-z-10">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors translate-z-4">{title}</h3>
            <p className="text-stone-gray dark:text-stone-400 text-sm leading-relaxed translate-z-2">{description}</p>
        </div>
    </TiltCard>
);


const AboutPage: React.FC = () => {
    return (
        <div className="pb-20">
            {/* Hero Banner */}
            <div className="bg-cerulean-blue dark:bg-blue-900 py-32 text-center text-white relative overflow-hidden mb-16 isolate">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                 <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
                 <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-mustard-yellow/10 dark:bg-yellow-900/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
                 
                 <AnimatedSection className="relative z-10 max-w-5xl mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">Rooted in Science, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-mustard-yellow to-orange-300 dark:from-yellow-400 dark:to-orange-400">Growing a Verdant Future</span></h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
                        We are shaping the future of eco-friendly, technology-driven agriculture.
                    </p>
                </AnimatedSection>
            </div>

            {/* Mission & Vision Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
                <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-stone-50 dark:border-stone-700 hover:shadow-2xl transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-cerulean-blue dark:bg-blue-600"></div>
                         <div className="absolute top-0 right-0 w-32 h-32 bg-cerulean-blue/5 dark:bg-blue-900/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 relative z-10">Our Mission</h2>
                        <p className="text-stone-gray dark:text-stone-300 text-base md:text-lg leading-relaxed relative z-10">To revolutionize farming through nanotechnology-powered organic solutions that balance productivity, profitability, and sustainability.</p>
                    </div>
                     <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-stone-50 dark:border-stone-700 hover:shadow-2xl transition-shadow relative overflow-hidden group">
                         <div className="absolute top-0 left-0 w-2 h-full bg-mustard-yellow dark:bg-yellow-600"></div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-mustard-yellow/5 dark:bg-yellow-900/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 relative z-10">Our Vision</h2>
                        <p className="text-stone-gray dark:text-stone-300 text-base md:text-lg leading-relaxed relative z-10">To be the world’s most trusted name in sustainable agriculture, where innovation drives verdant growth for every farmer.</p>
                    </div>
                </AnimatedSection>
            </div>
            
            {/* Values Section */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                 <AnimatedSection className="text-center mb-20">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Values</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cerulean-blue to-blue-400 mx-auto mt-6 rounded-full"></div>
                </AnimatedSection>
                <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ValueCard title="Innovation" description="Leading in nanotechnology and organic inputs." icon={<Lightbulb className="w-full h-full" strokeWidth={1.5} />} />
                    <ValueCard title="Sustainability" description="Improving soil health while protecting ecosystems." icon={<Leaf className="w-full h-full" strokeWidth={1.5} />} />
                    <ValueCard title="Integrity" description="Ethical practices farmers can trust." icon={<ShieldCheck className="w-full h-full" strokeWidth={1.5} />} />
                    <ValueCard title="Community" description="Farmer-first, solution-driven approach." icon={<Users className="w-full h-full" strokeWidth={1.5} />} />
                </AnimatedSection>
             </div>

            {/* Timeline Section */}
            <div className="py-20 mb-24 overflow-hidden relative">
                 {/* Background subtle wash */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50 dark:via-stone-900/50 to-transparent pointer-events-none -z-10"></div>
                <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Our Journey</h2>
                </AnimatedSection>
                <div className="max-w-5xl mx-auto px-4 relative">
                    {/* Mobile Timeline (Swipeable Carousel) */}
                    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide -mx-4 px-4">
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">2010</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Established</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">AgroSymbiont was established with a mission to transform farming practices for the better.</p>
                         </AnimatedSection>
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">2015</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Organic Expansion</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">Expanded into certified organic product lines, cementing our commitment to sustainable agriculture.</p>
                         </AnimatedSection>
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">2020</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Scientific Partnerships</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">Partnered with leading scientists and research labs to accelerate innovation in nanotechnology for agriculture.</p>
                         </AnimatedSection>
                         <AnimatedSection className="relative flex-shrink-0 w-[85%] snap-center bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg border border-stone-100 dark:border-stone-700">
                            <span className="text-cerulean-blue dark:text-blue-400 font-bold text-2xl block mb-2">Today</span>
                            <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">Global Impact</h3>
                            <p className="text-stone-gray dark:text-stone-400 text-base leading-relaxed">Serving clients across India and expanding into global markets, driving a worldwide shift to sustainable farming.</p>
                         </AnimatedSection>
                    </div>

                    {/* Desktop Timeline */}
                    <div className="hidden md:block">
                        <AnimatedSection>
                            <TimelineItem 
                                year="2010"
                                title="Established"
                                description="AgroSymbiont was established with a mission to transform farming practices for the better."
                                align="left"
                            />
                        </AnimatedSection>
                         <AnimatedSection>
                            <TimelineItem 
                                year="2015"
                                title="Organic Expansion"
                                description="Expanded into certified organic product lines, cementing our commitment to sustainable agriculture."
                                align="right"
                            />
                        </AnimatedSection>
                         <AnimatedSection>
                            <TimelineItem 
                                year="2020"
                                title="Scientific Partnerships"
                                description="Partnered with leading scientists and research labs to accelerate innovation in nanotechnology for agriculture."
                                align="left"
                            />
                        </AnimatedSection>
                         <AnimatedSection>
                            <TimelineItem 
                                year="Today"
                                title="Global Impact"
                                description="Serving clients across India and expanding into global markets, driving a worldwide shift to sustainable farming."
                                align="right"
                            />
                        </AnimatedSection>
                    </div>
                </div>
            </div>
            
            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                 <AnimatedSection className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Meet Our Leaders</h2>
                    <p className="mt-4 text-lg text-stone-gray dark:text-stone-400 max-w-3xl mx-auto">
                        Driven by a shared purpose, our leadership team combines deep scientific expertise with a commitment to farmer success.
                    </p>
                </AnimatedSection>
                <AnimatedSection>
                    <TeamCarousel />
                </AnimatedSection>
            </div>
        </div>
    );
}

const TeamCarousel: React.FC = () => {
    const teamMembers = [
        { name: "Dhaatrik Chowdhury", title: "Founder & CEO", imageUrl: "https://picsum.photos/400/600?random=1" },
        { name: "Aarav Patel", title: "Chief Technology Officer", imageUrl: "https://picsum.photos/400/600?random=2" },
        { name: "Priya Sharma", title: "Head of Global Operations", imageUrl: "https://picsum.photos/400/600?random=3" },
        { name: "Rohan Desai", title: "Lead Agronomist", imageUrl: "https://picsum.photos/400/600?random=4" },
        { name: "Ananya Singh", title: "VP of Sustainability", imageUrl: "https://picsum.photos/400/600?random=5" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
            prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
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
                    {teamMembers.map((member, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4 md:w-1/2 lg:w-1/3">
                            <TeamMemberCard name={member.name} title={member.title} imageUrl={member.imageUrl} />
                        </div>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={prevSlide}
                className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 hover:bg-white dark:hover:bg-stone-800 p-3 rounded-full shadow-lg text-cerulean-blue dark:text-blue-400 transition-all duration-300 z-10"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={nextSlide}
                className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 hover:bg-white dark:hover:bg-stone-800 p-3 rounded-full shadow-lg text-cerulean-blue dark:text-blue-400 transition-all duration-300 z-10"
            >
                <ChevronRight size={24} />
            </button>
            
            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
                {teamMembers.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            currentIndex === index ? 'bg-cerulean-blue dark:bg-blue-500 w-6 sm:w-8' : 'bg-stone-300 dark:bg-stone-600'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default AboutPage;
