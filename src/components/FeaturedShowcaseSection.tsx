import React from 'react';
import { Network, Server, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { showcaseData } from '../data/showcaseData';
import { FeaturedShowcase } from '../types';

interface FeaturedShowcaseSectionProps {
  onOpenShowcase: (showcase: FeaturedShowcase) => void;
}

export const FeaturedShowcaseSection: React.FC<FeaturedShowcaseSectionProps> = ({ onOpenShowcase }) => {
  const showcases = Object.values(showcaseData);

  const getShowcaseIcon = (id: string) => {
    switch (id) {
      case 'enterprise-vlan':
        return <Network className="w-14 h-14 text-blue-400" />;
      case 'docker-infrastructure':
        return <Server className="w-14 h-14 text-blue-400" />;
      case 'monitoring-dashboard':
        return <Activity className="w-14 h-14 text-blue-400" />;
      default:
        return <Server className="w-14 h-14 text-blue-400" />;
    }
  };

  return (
    <section id="enterprise" className="py-24 sm:py-32 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-blue-500 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
            SHOWCASE
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Enterprise Projects
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Mission-critical production deployments, network isolations, and automated monitoring solutions.
          </p>
        </div>

        {/* Project Showcase Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {showcases.map((showcase) => (
            <div
              key={showcase.id}
              onClick={() => onOpenShowcase(showcase)}
              className="group cursor-pointer rounded-3xl bg-[#0f172a]/75 hover:bg-[#0f172a]/95 border border-white/10 hover:border-blue-500/60 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 flex flex-col justify-between"
            >
              {/* Header Visual */}
              <div className="h-44 sm:h-48 bg-gradient-to-br from-blue-600/20 via-blue-800/10 to-transparent flex items-center justify-center border-b border-white/5 relative group-hover:from-blue-600/30 transition-all">
                <div className="p-5 rounded-2xl bg-[#030712]/50 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  {getShowcaseIcon(showcase.id)}
                </div>
                <div className="absolute top-4 right-4 text-xs font-mono px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Deep Dive
                </div>
              </div>

              {/* Content */}
              <div className="p-7 sm:p-9 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold mb-2">
                    {showcase.label}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {showcase.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {showcase.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {showcase.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {showcase.tags.length > 4 && (
                      <span className="text-xs font-medium px-2.5 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                        +{showcase.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      View Architecture & Specs
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
