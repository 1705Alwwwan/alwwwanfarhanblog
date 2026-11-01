import React from 'react';
import { X, Calendar, Clock, Tag, Shield } from 'lucide-react';
import { ArticleItem } from '../types';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  onEdit?: (article: ArticleItem) => void;
  isAdmin?: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onEdit, isAdmin }) => {
  if (!article) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recent';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const renderContent = (content: string) => {
    // Process simple markdown headers and code blocks
    const lines = content.split('\n');
    return (
      <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-lg sm:text-xl font-bold text-white mt-6 mb-2">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-bold text-blue-400 mt-8 mb-3 pb-2 border-b border-white/10">
                {line.replace('## ', '')}
              </h3>
            );
          }
          if (line.startsWith('# ')) {
            return (
              <h2 key={idx} className="text-2xl sm:text-3xl font-black text-white mt-8 mb-4">
                {line.replace('# ', '')}
              </h2>
            );
          }
          if (line.startsWith('- ')) {
            return (
              <li key={idx} className="ml-5 list-disc text-gray-300">
                {line.replace('- ', '')}
              </li>
            );
          }
          if (line.startsWith('```')) {
            return null; // Handle code block start/end or keep monospace container
          }
          if (line.trim().length === 0) {
            return <div key={idx} className="h-2"></div>;
          }
          return <p key={idx}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f172a]/95">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime || '5 min read'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && onEdit && (
              <button
                onClick={() => onEdit(article)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all"
              >
                Edit Post
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6">
          {/* Cover Image */}
          {article.coverImage && (
            <div className="w-full h-56 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/media/img/sysadminubuntu.jpeg';
                }}
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
                  A
                </div>
                <span className="text-white font-medium">Alwan Farhan Aziz</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <Shield className="w-3.5 h-3.5" />
                <span>Technical Notes & Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Excerpt Lead */}
          <div className="p-4 rounded-xl bg-blue-500/5 border-l-4 border-blue-500 text-gray-200 text-sm sm:text-base italic">
            {article.excerpt}
          </div>

          {/* Article Main Text */}
          <div className="prose prose-invert max-w-none pt-2">
            {renderContent(article.content)}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-blue-400 mr-1" />
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 text-blue-300 text-xs border border-white/5 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0a0f1d] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>ALWAN.SYSTEM Infrastructure Journal</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
