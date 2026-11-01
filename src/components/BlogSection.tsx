import React, { useState, useMemo } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Plus, Edit2, Trash2, Search } from 'lucide-react';
import { ArticleItem } from '../types';

interface BlogSectionProps {
  articles: ArticleItem[];
  isAdmin: boolean;
  onReadArticle: (article: ArticleItem) => void;
  onNewArticle: () => void;
  onEditArticle: (article: ArticleItem) => void;
  onDeleteArticle: (id: string, title: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  articles,
  isAdmin,
  onReadArticle,
  onNewArticle,
  onEditArticle,
  onDeleteArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Networking', 'Linux & Server', 'Monitoring', 'Automation'];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.content.toLowerCase().includes(q) ||
        (art.tags && art.tags.some((t) => t.toLowerCase().includes(q)));
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recent';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="blog" className="py-24 sm:py-32 relative bg-black/15">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-blue-500 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
              KNOWLEDGE BASE & GUIDES
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Engineering Journal
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-xl">
              Technical articles, implementation playbooks, router configs, and infrastructure post-mortems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={onNewArticle}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Write Article</span>
              </button>
            )}

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-[#0f172a] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? articles.length
                : articles.filter((a) => a.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-[#0f172a]/70 text-gray-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                    active ? 'bg-blue-800 text-blue-200' : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Article Cards Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-[#0f172a]/40 rounded-3xl border border-white/10">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 text-lg">No articles found matching this topic.</p>
            {isAdmin && (
              <button
                onClick={onNewArticle}
                className="mt-4 px-5 py-2.5 bg-blue-600 rounded-xl text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
              >
                Write First Article in this Category
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article, idx) => (
              <div
                key={article.id || idx}
                className="group rounded-3xl bg-[#0f172a]/70 hover:bg-[#0f172a]/95 border border-white/10 hover:border-blue-500/50 overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                {/* Article Header Image */}
                <div
                  onClick={() => onReadArticle(article)}
                  className="relative h-56 w-full bg-[#030712] overflow-hidden cursor-pointer"
                >
                  <img
                    src={article.coverImage || '/media/img/labself.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/media/img/sysadminubuntu.jpeg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-semibold shadow-lg">
                      {article.category}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-gray-300 font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{article.readTime || '5 min read'}</span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>

                    <h3
                      onClick={() => onReadArticle(article)}
                      className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Bottom Footer & Admin Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => onReadArticle(article)}
                      className="text-sm font-semibold text-blue-400 group-hover:text-blue-300 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>

                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEditArticle(article)}
                          className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white transition-colors border border-blue-500/20"
                          title="Edit Article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete article "${article.title}"?`)) {
                              onDeleteArticle(article.id!, article.title);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors border border-red-500/20"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
