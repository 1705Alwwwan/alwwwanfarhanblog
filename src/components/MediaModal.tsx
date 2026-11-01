import React from 'react';
import { X, Calendar, Briefcase, Tag, ExternalLink } from 'lucide-react';
import { ProjectItem, CertificateItem } from '../types';

interface MediaModalProps {
  item: ProjectItem | CertificateItem | null;
  onClose: () => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isProject = 'during' in item;
  const project = isProject ? (item as ProjectItem) : null;
  const cert = !isProject ? (item as CertificateItem) : null;

  const mediaUrl = project ? project.media_url : cert?.image || '';
  const isVideo = project?.type === 'video';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f172a]/90">
          <div className="truncate pr-4">
            <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-semibold block">
              {project ? (isVideo ? 'Video Recording' : 'Project Media') : 'Verified Credential'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white truncate">
              {item.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Content Display */}
        <div className="relative bg-[#020617] max-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
          {isVideo ? (
            <video
              src={mediaUrl}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[60vh] object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={mediaUrl}
              alt={item.title}
              className="w-full max-h-[60vh] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/media/img/sysadminubuntu.jpeg';
              }}
            />
          )}
        </div>

        {/* Modal Info Footer */}
        <div className="p-6 bg-[#0a0f1d] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
            {project && (
              <>
                <div className="flex items-center gap-1.5 font-mono text-blue-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.during}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-medium">{project.project_for}</span>
                </div>
              </>
            )}

            {cert && (
              <>
                <div className="flex items-center gap-1.5 font-mono text-blue-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cert.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <span className="font-medium text-emerald-400">Issuer:</span>
                  <span>{cert.issuer}</span>
                </div>
                {cert.link && cert.link !== '#' && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </>
            )}
          </div>

          {project && (
            <>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs text-gray-400">
                <Tag className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-mono text-blue-300">{project.skill_set}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
