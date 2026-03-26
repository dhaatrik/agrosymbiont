import React from 'react';
import TiltCard from './TiltCard';

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

export default TeamMemberCard;