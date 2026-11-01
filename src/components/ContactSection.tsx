import React from 'react';
import { Mail, MessageSquare, Send, MapPin, Clock, CheckCircle, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  onOpenModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenModal }) => {
  const whatsappUrl = `https://wa.me/6285156641214?text=${encodeURIComponent(
    'Hello Alwan, I saw your portfolio and would like to discuss an infrastructure / networking project.'
  )}`;
  const emailUrl = 'mailto:alwwwan.farhan@gmail.com?subject=Infrastructure%20Project%20Inquiry';

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-black/30 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <p className="text-blue-500 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-4">
          CONTACT & COLLABORATION
        </p>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8">
          Let's Build Modern Infrastructure
        </h2>

        {/* Text */}
        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
          Available for enterprise infrastructure deployment, Linux server setup, monitoring systems,
          MikroTik network architecture, and automation projects. Open for remote contracts and on-site consultations.
        </p>

        {/* Status badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-12 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Indonesia / Remote Worldwide</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Rapid Response (&lt; 24h)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>Freelance & Full-Time Open</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all transform hover:-translate-y-1 shadow-xl shadow-emerald-600/25"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={emailUrl}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/25"
          >
            <Mail className="w-5 h-5" />
            <span>Email Directly</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all transform hover:-translate-y-1"
          >
            <Send className="w-4 h-4 text-blue-400" />
            <span>Quick Message Form</span>
          </button>
        </div>
      </div>
    </section>
  );
};
