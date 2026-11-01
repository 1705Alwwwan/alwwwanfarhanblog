import React, { useState, useMemo } from 'react';
import { Search, Play, Image as ImageIcon, Briefcase, Calendar, Tag, ExternalLink, Plus, Edit2, Trash2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsCatalogProps {
  projects: ProjectItem[];
  isAdmin?: boolean;
  onOpenMedia: (project: ProjectItem) => void;
  onNewProject?: () => void;
  onEditProject?: (project: ProjectItem) => void;
  onDeleteProject?: (id: string, title: string) => void;
}

export const ProjectsCatalog: React.FC<ProjectsCatalogProps> = ({
  projects,
  isAdmin,
  onOpenMedia,
  onNewProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Automation', 'Networking', 'Industrial & Hardware', 'Linux & Server', 'Web & Scraping'];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchCat = selectedCategory === 'All' || proj.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        (proj.skill_set && proj.skill_set.toLowerCase().includes(q)) ||
        proj.project_for.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-blue-500 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
              PRODUCTION CATALOG
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              All Completed Works
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-xl">
              Industrial engineering, automated toolkits, network segmentation, and system administration projects.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && onNewProject && (
              <button
                onClick={onNewProject}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}

            {/* Search bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, skills, tools..."
                className="w-full bg-[#0f172a] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-2 overflow-x-auto">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
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

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-[#0f172a]/40 rounded-3xl border border-white/10">
            <p className="text-gray-400 text-lg">No projects found matching your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 bg-blue-600 rounded-xl text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="group rounded-2xl bg-[#0f172a]/70 hover:bg-[#0f172a]/95 border border-white/10 hover:border-blue-500/50 overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                {/* Media Preview Box */}
                <div
                  onClick={() => onOpenMedia(proj)}
                  className="relative h-48 sm:h-52 w-full bg-[#030712] overflow-hidden border-b border-white/10 cursor-pointer"
                >
                  {proj.type === 'video' ? (
                    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">
                      <video
                        src={proj.media_url}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-blue-300 flex items-center gap-1.5 border border-white/10">
                        <Play className="w-3 h-3 fill-blue-400 text-blue-400" />
                        <span>Video Demo</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative overflow-hidden bg-slate-900">
                      <img
                        src={proj.media_url}
                        alt={proj.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/media/img/sysadminubuntu.jpeg';
                        }}
                      />
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono text-gray-300 flex items-center gap-1 border border-white/10">
                        <ImageIcon className="w-3 h-3 text-blue-400" />
                        <span>Inspect Image</span>
                      </div>
                    </div>
                  )}

                  {/* Organization Tag (Top Left) */}
                  <div className="absolute top-3 left-3 max-w-[85%]">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-gray-200 border border-white/10 truncate">
                      <Briefcase className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="truncate">{proj.project_for}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date */}
                    {proj.during && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono mb-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                        <span>{proj.during}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      onClick={() => onOpenMedia(proj)}
                      className="text-lg font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer"
                    >
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  {/* Skills / Tech & Admin Controls */}
                  <div className="pt-3 border-t border-white/5">
                    {proj.skill_set && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                        <Tag className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="text-gray-300 font-mono text-[11px] line-clamp-1">
                          {proj.skill_set}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300 mt-2">
                      <button
                        onClick={() => onOpenMedia(proj)}
                        className="flex items-center gap-1 hover:underline"
                      >
                        <span>View details & media</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      {isAdmin && (
                        <div className="flex items-center gap-2">
                          {onEditProject && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditProject(proj);
                              }}
                              className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white transition-colors border border-blue-500/20"
                              title="Edit Project"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {onDeleteProject && proj.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Delete project "${proj.title}"?`)) {
                                  onDeleteProject(proj.id!, proj.title);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors border border-red-500/20"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        )}
      </div>
    </section>
  );
};
