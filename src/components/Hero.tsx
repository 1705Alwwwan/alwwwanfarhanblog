import React from 'react';
import { Server, FolderGit2, MessageSquare, BookOpen } from 'lucide-react';
import { Terminal } from './Terminal';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

interface HeroProps {
  onOpenContact: () => void;
  onSelectCategory: (catId: 'networking' | 'linux-server' | 'monitoring' | 'automation') => void;
  onOpenAdmin?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onSelectCategory, onOpenAdmin }) => {
  return (
    <section id="about" className="hero-section relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden">
      {/* Background Glow */}
      <div className="hero-glow"></div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 relative z-10 pt-4">
            {/* Mini Brand Badge */}
            <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-8 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 pulse-badge"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-blue-300 uppercase">
                Infrastructure • Linux • Networking • Automation
              </span>
            </div>

            {/* Title */}
            <h1 className="flex flex-col tracking-tight mb-6 leading-none select-none">
              <span className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white">
                ALWAN
              </span>
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-blue-500 mt-1">
                FARHAN AZIZ
              </span>
            </h1>

            {/* Role */}
            <p className="text-blue-400 font-semibold text-base sm:text-lg tracking-widest uppercase mb-4 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-400" />
              <span>Infrastructure Engineer • Linux Specialist</span>
            </p>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-normal leading-relaxed max-w-2xl mb-2">
              Building Enterprise-Grade Infrastructure For Modern Business Environments.
            </p>

            {/* Interactive Terminal */}
            <Terminal
              onSelectCategory={onSelectCategory}
              onOpenContact={onOpenContact}
              onOpenAdmin={onOpenAdmin}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/30"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              <a
                href="#blog"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 text-white font-semibold text-sm transition-all transform hover:-translate-y-1"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Read Articles</span>
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 text-white font-semibold text-sm transition-all transform hover:-translate-y-1"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Hire Me</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 mt-8">
              <a
                href="https://github.com/1705Alwwwan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-500/40 hover:-translate-y-1 transition-all shadow-md"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/alwan-farhan-aziz-5289aa194?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-500/40 hover:-translate-y-1 transition-all shadow-md"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/alwan.system?igsh=MTdhcjhvY3U0MmZkdw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-500/40 hover:-translate-y-1 transition-all shadow-md"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Ready for new challenges</span>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Image & Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Ambient Profile Glow */}
            <div className="profile-glow"></div>

            {/* Profile Avatar Container */}
            <div className="relative">
              <div className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 md:w-[410px] md:h-[410px] rounded-full overflow-hidden border-4 sm:border-[6px] border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.35),0_0_100px_rgba(59,130,246,0.2)] floating">
                <img
                  src="/assets/profile.jpeg"
                  alt="Alwan Farhan Aziz"
                  className="w-full h-full object-cover object-top scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/media/img/sysadminubuntu.jpeg';
                  }}
                />
              </div>

              {/* Status Card: Top-Left */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-8 z-20 bg-[#0f172a]/90 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3 backdrop-blur-xl shadow-xl shadow-black/50">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Infrastructure Online</h4>
                  <p className="text-[11px] sm:text-xs text-emerald-400/90 font-mono">Monitoring Active</p>
                </div>
              </div>

              {/* Experience Card: Bottom-Right */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-8 z-20 bg-[#0f172a]/90 border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center gap-3 backdrop-blur-xl shadow-xl shadow-black/50">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Server className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">3+ Years</h4>
                  <p className="text-[11px] sm:text-xs text-gray-400">Enterprise Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
