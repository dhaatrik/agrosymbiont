import React, { useState, memo, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface ProjectLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  innovation: string;
  impact: string;
  description: string;
}

const projects: ProjectLocation[] = [
  {
    id: "india",
    name: "Assam, India",
    coordinates: [92.9376, 26.2006],
    innovation: "Nano-Fertilizers in Tea Plantations",
    impact: "+25% Yield, Reduced Input Costs",
    description: "Implemented advanced nano-inputs and bio-nutrients to restore soil health in declining tea plantations, leading to significant yield increases and improved soil carbon levels."
  },
  {
    id: "brazil",
    name: "Mato Grosso, Brazil",
    coordinates: [-55.9056, -12.6819],
    innovation: "Regenerative Soy Farming",
    impact: "30% Reduction in Chemical Runoff",
    description: "Transitioned large-scale soy farms to regenerative practices using bio-stimulants, significantly reducing chemical dependency and improving local water quality."
  },
  {
    id: "kenya",
    name: "Rift Valley, Kenya",
    coordinates: [36.0800, -0.0236],
    innovation: "Drought-Resistant Corn",
    impact: "Secured Harvests During Droughts",
    description: "Deployed nano-hydrogels and stress-alleviating bio-activators to help smallholder farmers maintain corn yields despite severe seasonal droughts."
  },
  {
    id: "netherlands",
    name: "Westland, Netherlands",
    coordinates: [4.2187, 51.9944],
    innovation: "Smart Greenhouse Automation",
    impact: "Zero-Waste Closed-Loop System",
    description: "Integrated IoT sensors and AI-driven climate control in high-tech greenhouses, optimizing resource use and eliminating agricultural waste."
  },
  {
    id: "usa",
    name: "California, USA",
    coordinates: [-119.4179, 36.7783],
    innovation: "Precision Irrigation in Orchards",
    impact: "40% Water Savings",
    description: "Utilized predictive yield modeling and precision drip irrigation to maximize almond and walnut production while drastically cutting water consumption."
  }
];


const InteractiveMarker = memo(({ project, onClick }: { project: ProjectLocation; onClick: (project: ProjectLocation) => void }) => {
  return (
    <Marker
      coordinates={project.coordinates}
      onClick={() => onClick(project)}
      onKeyDown={(e: React.KeyboardEvent<SVGGElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      tabIndex={0}
      role="button"
      className="cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cerulean-blue rounded-full"
      aria-label={`View details for ${project.name}`}
    >
      <g
        fill="none"
        stroke="#2A52BE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-12, -24)"
        className="hover:scale-125 transition-transform duration-300 dark:stroke-blue-400"
      >
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
      </g>
      <circle r={12} fill="transparent" /> {/* Larger hit area */}
    </Marker>
  );
});

const MemoizedGeographies = memo(({ geographies }: { geographies: any[] }) => {
  return (
    <>
      {geographies.map((geo) => (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          fill="#E5E7EB"
          stroke="#D1D5DB"
          strokeWidth={0.5}
          className="dark:fill-stone-800 dark:stroke-stone-700 outline-none"
          style={{
            default: { outline: "none" },
            hover: { fill: "#D1D5DB", outline: "none" },
            pressed: { outline: "none" },
          }}
        />
      ))}
    </>
  );
});

const InteractiveMap: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectLocation | null>(null);

  const handleProjectSelect = useCallback((project: ProjectLocation) => {
    setSelectedProject(project);
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-blue-50/50 dark:bg-stone-900/50 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-inner">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 20]
        }}
        className="w-full h-full"
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <MemoizedGeographies geographies={geographies} />
            )}
          </Geographies>
          {projects.map((project) => (
            <InteractiveMarker
              key={project.id}
              project={project}
              onClick={handleProjectSelect}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 z-10"
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cerulean-blue dark:focus-visible:ring-offset-stone-900"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-cerulean-blue dark:text-blue-400 mb-2">
              <MapPin className="w-5 h-5" />
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">{selectedProject.name}</h3>
            </div>
            <div className="space-y-3 mt-4">
              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Innovation</p>
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{selectedProject.innovation}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Impact</p>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{selectedProject.impact}</p>
              </div>
              <div>
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMap;
