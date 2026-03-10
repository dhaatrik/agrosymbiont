
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import TiltCard from '../components/TiltCard';
import InteractiveMap from '../components/InteractiveMap';
import { TrendingUp } from 'lucide-react';

const CaseStudyCard: React.FC<{ title: string, category: string, challenge: string, solution: string, result: string, testimonial?: string }> = ({ title, category, challenge, solution, result, testimonial }) => (
    <TiltCard className="h-full">
        <div className="bg-white dark:bg-stone-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-stone-100 dark:border-stone-700 flex flex-col h-full group hover:-translate-y-1 relative overflow-hidden preserve-3d">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-cerulean-blue/20 dark:bg-blue-900/40 group-hover:bg-cerulean-blue dark:group-hover:bg-blue-500 transition-colors duration-300 translate-z-0"></div>
            <div className="flex justify-between items-start mb-6 pl-4 translate-z-4">
                 <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-cerulean-blue dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800 shadow-sm">{category}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pl-4 group-hover:text-cerulean-blue dark:group-hover:text-blue-400 transition-colors translate-z-10">{title}</h3>
            
            <div className="space-y-5 flex-grow pl-4 translate-z-2">
                <div>
                    <h4 className="font-bold text-stone-400 dark:text-stone-500 text-xs uppercase mb-2 tracking-widest">Challenge</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{challenge}</p>
                </div>
                <div>
                    <h4 className="font-bold text-stone-400 dark:text-stone-500 text-xs uppercase mb-2 tracking-widest">Solution</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{solution}</p>
                </div>
                <div className="bg-green-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-green-100 dark:border-emerald-800 mt-4 translate-z-4 shadow-sm">
                    <h4 className="font-bold text-green-700 dark:text-emerald-400 text-xs uppercase mb-2 tracking-widest flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" strokeWidth={2} />
                        Results
                    </h4>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm">{result}</p>
                </div>
            </div>
            
            {testimonial && (
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-stone-700 pl-4 translate-z-2">
                    <p className="text-stone-500 dark:text-stone-400 italic text-sm leading-relaxed">"{testimonial}"</p>
                </div>
            )}
        </div>
    </TiltCard>
);

const UseCasesPage: React.FC = () => {
  return (
    <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-20">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Proven Impact</h1>
                <p className="text-xl text-stone-gray dark:text-stone-400 max-w-3xl mx-auto font-light">
                    Success stories from the field. See how AgroSymbiont's nanotech-driven solutions are transforming farms worldwide.
                </p>
            </AnimatedSection>

            <AnimatedSection className="mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Global Reach, Local Impact</h2>
                    <p className="text-lg text-stone-gray dark:text-stone-400 max-w-2xl mx-auto">
                        Explore our projects across the globe and discover the innovative solutions we're implementing in diverse agricultural environments.
                    </p>
                </div>
                <InteractiveMap />
            </AnimatedSection>

            <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CaseStudyCard 
                    title="Tea Growers in Assam"
                    category="Tea Plantations"
                    challenge="Soil fertility decline, falling yields, and high input costs."
                    solution="Applied nano-inputs, bio-nutrients, and provided expert agronomist guidance to restore soil health."
                    result="+25% yield, reduced input costs, and significantly improved soil carbon levels."
                    testimonial="AgroSymbiont changed our farm’s future—profits up, soil alive again."
                />
                <CaseStudyCard 
                    title="Export-Grade Spice"
                    category="Spice Farms"
                    challenge="Meeting stringent international quality standards for spice exports while maintaining organic certification."
                    solution="Implementation of our certified organic nanotech solutions to improve plant health and produce quality."
                    result="Consistent achievement of export-grade quality, opening up new premium markets for farmers."
                    testimonial="Our spices have never been better. We are now a preferred supplier for European markets."
                />
                <CaseStudyCard 
                    title="Eco-Friendly Coffee"
                    category="Coffee Estates"
                    challenge="High incidence of pest attacks, leading to crop loss and dependency on chemical pesticides."
                    solution="Adopting eco-friendly crop protection using our bio-pesticides and beneficial microorganisms."
                    result="Drastic reduction in pest-related losses and complete elimination of chemical residues."
                    testimonial="We're producing high-quality coffee beans sustainably, and our ecosystem is thriving."
                />
                <CaseStudyCard 
                    title="Precision Irrigation in Arid Regions"
                    category="Water Management"
                    challenge="Severe water scarcity leading to stunted crop growth and massive yield losses."
                    solution="Integrated our nano-hydrogels to improve soil water retention and optimize irrigation schedules."
                    result="40% reduction in water usage while maintaining optimal crop hydration and yield."
                    testimonial="We can now grow crops in conditions we previously thought were impossible."
                />
                <CaseStudyCard 
                    title="Reviving Degraded Wheat Fields"
                    category="Cereals"
                    challenge="Years of chemical fertilizer use left the soil barren and wheat yields stagnating."
                    solution="Applied our bio-stimulants and nano-fertilizers to rebuild soil microbiome and deliver targeted nutrients."
                    result="Soil organic matter increased by 15%, and wheat yields rebounded by 30% in two seasons."
                    testimonial="The soil feels alive again, and our harvests are heavier than they have been in a decade."
                />
                <CaseStudyCard 
                    title="High-Yield Organic Tomatoes"
                    category="Horticulture"
                    challenge="Struggling to control blight and pests without using synthetic chemical sprays."
                    solution="Implemented a comprehensive organic protection plan using our advanced bio-fungicides and nano-copper solutions."
                    result="Zero chemical residue, 95% reduction in blight incidence, and a 20% increase in marketable fruit."
                    testimonial="Our tomatoes are healthier, last longer on the shelf, and command a premium price."
                />
                <CaseStudyCard 
                    title="Sustainable Apple Orchards"
                    category="Fruit Farming"
                    challenge="Poor nutrient uptake leading to small fruit size and inconsistent coloring."
                    solution="Foliar application of our specialized nano-calcium and potassium formulations during critical growth stages."
                    result="Significant improvement in fruit size, firmness, and color uniformity, increasing export-grade yield."
                    testimonial="The quality of our apples has never been better. The color and crunch are exceptional."
                />
                <CaseStudyCard 
                    title="Enhancing Soil Carbon in Cotton Farms"
                    category="Cash Crops"
                    challenge="Depleted soil carbon levels and high dependency on synthetic nitrogen fertilizers."
                    solution="Transitioned to our carbon-enriched bio-fertilizers and implemented regenerative farming practices."
                    result="Reduced synthetic nitrogen use by 50% while increasing soil carbon sequestration and maintaining yields."
                    testimonial="We are saving money on fertilizers and doing our part to combat climate change."
                />
                <CaseStudyCard 
                    title="Boosting Resilience in Sugarcane"
                    category="Commercial Crops"
                    challenge="Frequent droughts causing severe stress and reducing sugar recovery rates."
                    solution="Treated crops with our stress-alleviating nano-silica and bio-activators to enhance drought tolerance."
                    result="Improved plant vigor during dry spells and a 1.5% increase in overall sugar recovery."
                    testimonial="Even during the dry season, our cane stayed green and healthy. The mill results speak for themselves."
                />
            </AnimatedSection>
            
            <AnimatedSection className="mt-32 text-center">
                <div className="bg-gradient-to-br from-cerulean-blue to-blue-900 dark:from-blue-900 dark:to-stone-900 rounded-[3rem] p-12 md:p-20 shadow-2xl text-white max-w-5xl mx-auto relative overflow-hidden border border-blue-800/50 dark:border-stone-700/50">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to write your success story?</h2>
                        <p className="text-blue-100 dark:text-blue-200 mb-10 text-lg font-light">
                            Every farm has a story, and AgroSymbiont is here to help write the next chapter of sustainable growth.
                        </p>
                        <Link to="/contact" className="inline-block bg-mustard-yellow dark:bg-yellow-500 text-cerulean-blue dark:text-blue-900 font-bold py-4 px-10 rounded-full hover:bg-white dark:hover:bg-stone-100 transition duration-300 shadow-[0_6px_0_#b3993d] dark:shadow-[0_6px_0_#a18836] hover:shadow-[0_8px_0_#b3993d] dark:hover:shadow-[0_8px_0_#a18836] active:shadow-[0_0px_0_#b3993d] dark:active:shadow-[0_0px_0_#a18836] transform hover:-translate-y-1 active:translate-y-1">
                            Share Your Story
                        </Link>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </div>
  );
};

export default UseCasesPage;
