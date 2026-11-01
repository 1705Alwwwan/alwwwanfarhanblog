import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#030712] py-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Shield className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-white tracking-wide">
            ALWAN<span className="text-blue-500">.SYSTEM</span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-xs text-gray-400">
            © 2026 ALWAN.SYSTEM — Infrastructure Engineer
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <a
            href="https://github.com/1705Alwwwan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/alwan-farhan-aziz-5289aa194?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/alwan.system?igsh=MTdhcjhvY3U0MmZkdw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
