import React from 'react';
import { X, ExternalLink, ArrowRight, Terminal, Network, Server, Activity } from 'lucide-react';
import { InfraCategory, FeaturedShowcase } from '../types';
import { showcaseData } from '../data/showcaseData';
import { GithubIcon } from './Icons';

interface InfraDetailModalProps {
  category: InfraCategory | null;
  onClose: () => void;
  onOpenShowcase: (showcase: FeaturedShowcase) => void;
}

export const InfraDetailModal: React.FC<InfraDetailModalProps> = ({ category, onClose, onOpenShowcase }) => {
  if (!category) return null;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'networking':
        return <Network className="w-8 h-8 text-blue-400" />;
      case 'linux-server':
        return <Server className="w-8 h-8 text-blue-400" />;
      case 'monitoring':
        return <Activity className="w-8 h-8 text-blue-400" />;
      case 'automation':
        return <Terminal className="w-8 h-8 text-blue-400" />;
      default:
        return <Server className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0f172a]/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              {getCategoryIcon(category.id)}
            </div>
            <div>
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-semibold">
                {category.label}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {category.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1">
          {/* Header Summary */}
          <div className="bg-[#0f172a]/50 border border-white/5 rounded-2xl p-6">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {category.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono text-blue-300">
              <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                {category.subtitle}
              </span>
            </div>
          </div>

          {/* Repositories and Guides Grid */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-blue-400" />
              <span>Repositories, Configs & Implementation Templates</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {category.repos.map((repo, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0f172a]/80 border border-white/10 hover:border-blue-500/40 p-6 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-mono font-semibold text-blue-400 tracking-wider uppercase mb-2">
                      {repo.type}
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                      {repo.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                      {repo.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {repo.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-blue-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    {repo.isOpenShowcase && repo.showcaseId && showcaseData[repo.showcaseId] ? (
                      <button
                        onClick={() => {
                          const sc = showcaseData[repo.showcaseId!];
                          onClose();
                          onOpenShowcase(sc);
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        <span>Open Enterprise Showcase</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <a
                        href={repo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>View Repository</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-[#0a0f1d] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>ALWAN.SYSTEM Infrastructure Archive</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
