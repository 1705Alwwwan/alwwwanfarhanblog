import React from 'react';
import { X, ExternalLink, Check, AlertTriangle, Layers, Cpu, Activity, Network, Server } from 'lucide-react';
import { FeaturedShowcase } from '../types';
import { GithubIcon } from './Icons';

interface ShowcaseDetailModalProps {
  showcase: FeaturedShowcase | null;
  onClose: () => void;
}

export const ShowcaseDetailModal: React.FC<ShowcaseDetailModalProps> = ({ showcase, onClose }) => {
  if (!showcase) return null;

  const getIcon = (id: string) => {
    switch (id) {
      case 'enterprise-vlan':
        return <Network className="w-8 h-8 text-blue-400" />;
      case 'docker-infrastructure':
        return <Server className="w-8 h-8 text-blue-400" />;
      case 'monitoring-dashboard':
        return <Activity className="w-8 h-8 text-blue-400" />;
      default:
        return <Layers className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0f172a]/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              {getIcon(showcase.id)}
            </div>
            <div>
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-semibold">
                {showcase.label}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {showcase.title}
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

        {/* Modal Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10 flex-1">
          {/* Overview */}
          <div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
              {showcase.description}
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {showcase.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights / Architecture Breakdown */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>
                {showcase.id === 'enterprise-vlan'
                  ? 'Network Segmentation (Layer 2 / Layer 3)'
                  : showcase.id === 'monitoring-dashboard'
                  ? 'Monitoring Metrics & Observability SLA'
                  : 'Infrastructure Architecture Layers'}
              </span>
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {showcase.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0f172a]/80 border border-white/10 p-5 text-center flex flex-col justify-center items-center"
                >
                  {item.value ? (
                    <div className="text-3xl sm:text-4xl font-black text-blue-500 mb-2 font-mono">
                      {item.value}
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 mb-3">
                      <Cpu className="w-6 h-6" />
                    </div>
                  )}
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-400 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Challenges */}
            <div className="rounded-2xl bg-[#0f172a]/60 border border-red-500/20 p-6">
              <h4 className="text-base font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span>Operational Challenges</span>
              </h4>
              <ul className="space-y-3">
                {showcase.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0"></span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="rounded-2xl bg-[#0f172a]/60 border border-emerald-500/20 p-6">
              <h4 className="text-base font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Implemented Engineering Solutions</span>
              </h4>
              <ul className="space-y-3">
                {showcase.solutions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* GitHub CTA */}
          <div className="text-center pt-2">
            <a
              href={showcase.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-600/30 transform hover:-translate-y-0.5"
            >
              <GithubIcon className="w-5 h-5" />
              <span>View Source Configs & Scripts on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-[#0a0f1d] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>ALWAN.SYSTEM Infrastructure Deep-Dive</span>
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
