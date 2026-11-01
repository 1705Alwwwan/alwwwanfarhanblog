import React from 'react';
import { Network, Server, Activity, Terminal, ArrowRight, Layers } from 'lucide-react';
import { infraCategories } from '../data/infraData';

interface StackSectionProps {
  onSelectCategory: (catId: 'networking' | 'linux-server' | 'monitoring' | 'automation') => void;
}

export const StackSection: React.FC<StackSectionProps> = ({ onSelectCategory }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'networking':
        return <Network className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />;
      case 'linux-server':
        return <Server className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />;
      case 'monitoring':
        return <Activity className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />;
      case 'automation':
        return <Terminal className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Layers className="w-10 h-10 text-blue-400" />;
    }
  };

  return (
    <section id="stack" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-blue-500 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
            CURRENT STACK
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Infrastructure & Tools
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Core domains of hands-on expertise across enterprise networking, container orchestrations, and automated monitoring.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {infraCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group text-left p-8 sm:p-9 rounded-3xl bg-[#0f172a]/70 hover:bg-[#0f172a]/95 border border-white/10 hover:border-blue-500/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/15 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 w-fit">
                  {getIcon(cat.id)}
                </div>

                <div className="text-xs font-mono text-blue-400 font-semibold tracking-wider uppercase mb-2">
                  {cat.label}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>{cat.repos.length} Repositories & Guides</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
