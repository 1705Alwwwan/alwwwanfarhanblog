import React from 'react';
import { ExternalLink, Calendar, CheckCircle2, ZoomIn, Building, Plus, Edit2, Trash2 } from 'lucide-react';
import { CertificateItem } from '../types';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  isAdmin?: boolean;
  onZoomCertificate: (cert: CertificateItem) => void;
  onNewCertificate?: () => void;
  onEditCertificate?: (cert: CertificateItem) => void;
  onDeleteCertificate?: (id: string, title: string) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  isAdmin,
  onZoomCertificate,
  onNewCertificate,
  onEditCertificate,
  onDeleteCertificate,
}) => {
  return (
    <section id="certificates" className="py-24 sm:py-32 relative bg-black/25">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-blue-500 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
              VERIFIED CREDENTIALS
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Certifications & Licenses
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl text-sm sm:text-base">
              Professional certifications in Linux Systems, MikroTik Network Engineering, Fortinet Security, and Cisco Infrastructure.
            </p>
          </div>

          {isAdmin && onNewCertificate && (
            <button
              onClick={onNewCertificate}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 transform hover:-translate-y-0.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certificate</span>
            </button>
          )}
        </div>

        {/* Certificates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.id || index}
              className="group rounded-2xl bg-[#0f172a]/70 hover:bg-[#0f172a]/95 border border-white/10 hover:border-blue-500/50 overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => onZoomCertificate(cert)}
                className="relative h-44 w-full bg-slate-900 overflow-hidden cursor-pointer"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/media/img/sysadminubuntu.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-950/40 backdrop-blur-[2px]">
                  <div className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono mb-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{cert.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                    <Building className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="text-gray-300 font-medium truncate">{cert.issuer}</span>
                  </div>
                </div>

                {/* Bottom verification link & Admin controls */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified
                  </span>

                  <div className="flex items-center gap-2">
                    {cert.link && cert.link !== '#' ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onZoomCertificate(cert)}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                      >
                        <span>Inspect</span>
                        <ZoomIn className="w-3 h-3" />
                      </button>
                    )}

                    {isAdmin && (
                      <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-white/10">
                        {onEditCertificate && (
                          <button
                            onClick={() => onEditCertificate(cert)}
                            className="p-1 rounded-md bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white transition-colors"
                            title="Edit Certificate"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        )}
                        {onDeleteCertificate && cert.id && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete certificate "${cert.title}"?`)) {
                                onDeleteCertificate(cert.id!, cert.title);
                              }
                            }}
                            className="p-1 rounded-md bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                            title="Delete Certificate"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
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
