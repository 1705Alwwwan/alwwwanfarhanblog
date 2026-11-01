import React, { useState, useEffect } from 'react';
import { Download, Menu, X, Shield, Lock, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onOpenContactModal?: () => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal, onOpenAdminModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#stack' },
    { label: 'Enterprise', href: '#enterprise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '#blog' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/90 border-b border-white/10 backdrop-blur-xl shadow-lg shadow-black/50 py-3.5'
          : 'bg-black/35 border-b border-white/5 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#about" className="group flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:border-blue-400 transition-colors">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            ALWAN<span className="text-blue-500">.SYSTEM</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}

          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdminModal}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
              isAdmin
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-300 hover:bg-blue-600 hover:text-white'
                : user
                ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-blue-500/30'
            }`}
            title={isAdmin ? 'Administrator CMS' : 'Admin Sign In'}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin CMS</span>
              </>
            ) : user ? (
              <>
                <UserIcon className="w-3.5 h-3.5" />
                <span>Account</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>Portal Login</span>
              </>
            )}
          </button>

          <a
            href="/CV.pdf"
            download="Alwan_Farhan_Aziz_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-600/25 active:translate-y-0"
          >
            <Download className="w-4 h-4" />
            <span>CV</span>
          </a>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button
            onClick={onOpenAdminModal}
            className={`p-2 rounded-xl text-xs flex items-center gap-1 border ${
              isAdmin
                ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
            aria-label="Admin Portal"
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4" />}
          </button>

          <a
            href="/CV.pdf"
            download="Alwan_Farhan_Aziz_CV.pdf"
            className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d] border-b border-white/10 px-6 py-6 transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-blue-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Open Admin CMS' : 'Admin Portal Login'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContactModal?.();
                }}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm text-center"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
