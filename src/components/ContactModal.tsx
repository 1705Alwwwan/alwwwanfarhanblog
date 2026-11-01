import React, { useState } from 'react';
import { X, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  initialSubject?: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ initialSubject, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialSubject || 'Network Infrastructure');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Inquiry: ${projectType}] From ${name || 'Potential Client'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:alwwwan.farhan@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Alwan! My name is ${name || 'Visitor'}. I am reaching out regarding ${projectType}.\n\nMessage: ${message || 'I would like to discuss infrastructure consulting.'}`
    );
    window.open(`https://wa.me/6285156641214?text=${text}`, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0f172a]/90">
          <div>
            <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-semibold block">
              START A PROJECT
            </span>
            <h3 className="text-xl font-bold text-white">
              Get in Touch with Alwan
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <div className="p-6 sm:p-8 space-y-5">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Inquiry Initialized!</h4>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Your default email client has been opened with your inquiry draft addressed to alwwwan.farhan@gmail.com.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500"
                >
                  Done
                </button>
                <button
                  onClick={handleSendWhatsApp}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Also Send on WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Project Domain
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Network Infrastructure">Network Infrastructure (MikroTik / VLAN / VPN)</option>
                  <option value="Linux Server Deployment">Linux Server Hardening & Deployment</option>
                  <option value="Docker & Container Orchestration">Docker & Container Orchestration</option>
                  <option value="Monitoring & Observability">Monitoring & Observability (Grafana / Prometheus)</option>
                  <option value="Automation & Scripting">Automation & Scripting (Python / PowerShell)</option>
                  <option value="General Consultation">General Consultation / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Message / Project Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current setup, goals, timeline, or requirements..."
                  className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Instead</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
