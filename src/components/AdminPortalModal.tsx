import React, { useState } from 'react';
import {
  X,
  Lock,
  LogOut,
  Shield,
  FileText,
  FolderGit2,
  Award,
  Database,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ProjectItem, CertificateItem, ArticleItem } from '../types';
import {
  saveProject,
  removeProject,
  saveCertificate,
  removeCertificate,
  saveArticle,
  removeArticle,
  seedDefaultDataToFirestore,
} from '../services/dataService';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  certificates: CertificateItem[];
  articles: ArticleItem[];
  editItem?: {
    type: 'project' | 'certificate' | 'article';
    data?: ProjectItem | CertificateItem | ArticleItem;
  } | null;
  onClearEditItem?: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  projects,
  certificates,
  articles,
  editItem,
  onClearEditItem,
}) => {
  const { user, isAdmin, loginWithGoogle, logout, authError, clearAuthError } = useAuth();

  const [activeTab, setActiveTab] = useState<'articles' | 'projects' | 'certificates' | 'seed'>('articles');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form states
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingTarget, setEditingTarget] = useState<'project' | 'certificate' | 'article' | null>(null);

  // Article Form State
  const [articleForm, setArticleForm] = useState<Partial<ArticleItem>>({
    title: '',
    category: 'Networking',
    excerpt: '',
    content: '',
    readTime: '5 min read',
    coverImage: '/media/img/labself.jpg',
    tags: ['Infrastructure'],
  });

  // Project Form State
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({
    title: '',
    during: '2026',
    description: '',
    skill_set: 'Linux, MikroTik, Automation',
    type: 'image',
    media_url: '/media/img/labself.jpg',
    project_for: 'Enterprise Client',
    category: 'Networking',
  });

  // Certificate Form State
  const [certForm, setCertForm] = useState<Partial<CertificateItem>>({
    title: '',
    issuer: 'ID-Networkers',
    date: '2026',
    image: '/media/img/mtcna.jpg',
    link: '',
  });

  // Handle passed-in edit items from cards
  React.useEffect(() => {
    if (editItem) {
      if (editItem.type === 'article' && editItem.data) {
        setEditingTarget('article');
        setFormMode('edit');
        setArticleForm(editItem.data as ArticleItem);
        setActiveTab('articles');
      } else if (editItem.type === 'project' && editItem.data) {
        setEditingTarget('project');
        setFormMode('edit');
        setProjectForm(editItem.data as ProjectItem);
        setActiveTab('projects');
      } else if (editItem.type === 'certificate' && editItem.data) {
        setEditingTarget('certificate');
        setFormMode('edit');
        setCertForm(editItem.data as CertificateItem);
        setActiveTab('certificates');
      }
    }
  }, [editItem]);

  if (!isOpen) return null;

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Article handlers
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.excerpt || !articleForm.content) {
      showNotification('Please fill all required article fields', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await saveArticle({
        ...articleForm,
        title: articleForm.title!,
        excerpt: articleForm.excerpt!,
        content: articleForm.content!,
        category: articleForm.category || 'Networking',
      } as ArticleItem);
      showNotification(formMode === 'create' ? 'Article published successfully!' : 'Article updated successfully!');
      setEditingTarget(null);
      setArticleForm({
        title: '',
        category: 'Networking',
        excerpt: '',
        content: '',
        readTime: '5 min read',
        coverImage: '/media/img/labself.jpg',
      });
      onClearEditItem?.();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Failed to save article', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Project handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description || !projectForm.project_for) {
      showNotification('Please fill all required project fields', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await saveProject({
        ...projectForm,
        title: projectForm.title!,
        description: projectForm.description!,
        project_for: projectForm.project_for!,
        type: projectForm.type || 'image',
        media_url: projectForm.media_url || '/media/img/labself.jpg',
      } as ProjectItem);
      showNotification(formMode === 'create' ? 'Project added to portfolio!' : 'Project updated!');
      setEditingTarget(null);
      setProjectForm({
        title: '',
        during: '2026',
        description: '',
        skill_set: '',
        type: 'image',
        media_url: '/media/img/labself.jpg',
        project_for: '',
        category: 'Networking',
      });
      onClearEditItem?.();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Failed to save project', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Certificate handlers
  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer || !certForm.image) {
      showNotification('Please fill all required certificate fields', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await saveCertificate({
        ...certForm,
        title: certForm.title!,
        issuer: certForm.issuer!,
        date: certForm.date || '2026',
        image: certForm.image!,
      } as CertificateItem);
      showNotification(formMode === 'create' ? 'Certificate recorded!' : 'Certificate updated!');
      setEditingTarget(null);
      setCertForm({
        title: '',
        issuer: '',
        date: '2026',
        image: '/media/img/mtcna.jpg',
        link: '',
      });
      onClearEditItem?.();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Failed to save certificate', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Seed handler
  const handleSeedData = async () => {
    setSubmitting(true);
    try {
      const res = await seedDefaultDataToFirestore();
      showNotification(`Synced data to Firestore: ${res.projects} projects, ${res.certs} certificates, ${res.articles} articles.`);
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Sync failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0f172a]/95">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-semibold block">
                ADMINISTRATION PORTAL
              </span>
              <h3 className="text-xl font-bold text-white">
                Content & Infrastructure CMS
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <button
                onClick={logout}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`px-6 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-300 border-b border-emerald-500/30'
                : 'bg-red-500/20 text-red-300 border-b border-red-500/30'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {!user ? (
            /* Unauthenticated / Sign-In Screen */
            <div className="text-center py-12 max-w-md mx-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                <Shield className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Admin Sign In</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Sign in with your administrator Google account (<span className="text-blue-400 font-mono">alwwwan.farhan@gmail.com</span>) to write blog posts, manage portfolio projects, and update certifications.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">Authentication Error</p>
                    <p className="mt-0.5 opacity-90">{authError}</p>
                  </div>
                  <button onClick={clearAuthError} className="text-red-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                onClick={loginWithGoogle}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <div className="pt-4 border-t border-white/5 text-xs text-gray-500">
                Visitors have read-only access. Full modification permissions are locked to the site administrator.
              </div>
            </div>
          ) : !isAdmin ? (
            /* Logged in as non-admin user */
            <div className="text-center py-12 max-w-md mx-auto space-y-5">
              <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto text-yellow-400">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white">View-Only Access</h4>
              <p className="text-sm text-gray-400">
                Signed in as <span className="text-white font-mono">{user.email}</span>. You can view all content, but editing and publishing permissions are restricted to the primary administrator (<span className="text-blue-400 font-mono">alwwwan.farhan@gmail.com</span>).
              </p>
              <button
                onClick={logout}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Sign In with Different Account
              </button>
            </div>
          ) : (
            /* Admin Dashboard Screen */
            <div className="space-y-6">
              {/* Admin status pill */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <div>
                    <p className="text-xs font-bold text-white">Administrator Session Active</p>
                    <p className="text-[11px] font-mono text-blue-300">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
                  <span>{articles.length} Articles</span>
                  <span>•</span>
                  <span>{projects.length} Projects</span>
                  <span>•</span>
                  <span>{certificates.length} Certs</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
                <button
                  onClick={() => {
                    setActiveTab('articles');
                    setEditingTarget(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'articles'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Blog Articles ({articles.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('projects');
                    setEditingTarget(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'projects'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>Projects ({projects.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('certificates');
                    setEditingTarget(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'certificates'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Certificates ({certificates.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('seed')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    activeTab === 'seed'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <Database className="w-4 h-4" />
                  <span>Database Sync</span>
                </button>
              </div>

              {/* TAB 1: ARTICLES */}
              {activeTab === 'articles' && (
                <div className="space-y-6">
                  {editingTarget === 'article' ? (
                    /* Article Form */
                    <form onSubmit={handleSaveArticle} className="space-y-4 bg-[#0f172a] p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <Edit2 className="w-4 h-4 text-blue-400" />
                          <span>{formMode === 'create' ? 'Write New Technical Article' : 'Edit Article'}</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingTarget(null)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={articleForm.title || ''}
                            onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                            placeholder="e.g. Enterprise VLAN Configuration"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Category</label>
                          <select
                            value={articleForm.category || 'Networking'}
                            onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="Networking">Networking</option>
                            <option value="Linux & Server">Linux & Server</option>
                            <option value="Monitoring">Monitoring</option>
                            <option value="Automation">Automation</option>
                            <option value="Security">Security</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Reading Time</label>
                          <input
                            type="text"
                            value={articleForm.readTime || '5 min read'}
                            onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                            placeholder="e.g. 5 min read"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Cover Image URL</label>
                          <input
                            type="text"
                            value={articleForm.coverImage || '/media/img/labself.jpg'}
                            onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
                            placeholder="/media/img/labself.jpg"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Short Excerpt</label>
                        <textarea
                          rows={2}
                          required
                          value={articleForm.excerpt || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                          placeholder="Brief 1-2 sentence overview for the card summary..."
                          className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                          Article Content (Markdown supported)
                        </label>
                        <textarea
                          rows={8}
                          required
                          value={articleForm.content || ''}
                          onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                          placeholder="Write full article guide, code snippets, and explanations..."
                          className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-blue-500 resize-y"
                        />
                      </div>

                      <div className="flex gap-3 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingTarget(null)}
                          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{submitting ? 'Saving...' : 'Save & Publish'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Articles List */
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-gray-300">Published Articles ({articles.length})</h4>
                        <button
                          onClick={() => {
                            setFormMode('create');
                            setEditingTarget('article');
                            setArticleForm({
                              title: '',
                              category: 'Networking',
                              excerpt: '',
                              content: '',
                              readTime: '5 min read',
                              coverImage: '/media/img/labself.jpg',
                            });
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>New Article</span>
                        </button>
                      </div>

                      <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden bg-[#0f172a]/50">
                        {articles.map((art) => (
                          <div key={art.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 mr-2">
                                {art.category}
                              </span>
                              <span className="text-sm font-bold text-white truncate inline-block align-middle max-w-[80%]">
                                {art.title}
                              </span>
                              <p className="text-xs text-gray-400 truncate mt-0.5">{art.excerpt}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setFormMode('edit');
                                  setArticleForm(art);
                                  setEditingTarget('article');
                                }}
                                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm(`Delete article "${art.title}"?`)) {
                                    try {
                                      await removeArticle(art.id!);
                                      showNotification('Article removed');
                                    } catch (err: unknown) {
                                      showNotification(err instanceof Error ? err.message : 'Delete failed', 'error');
                                    }
                                  }
                                }}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {editingTarget === 'project' ? (
                    /* Project Form */
                    <form onSubmit={handleSaveProject} className="space-y-4 bg-[#0f172a] p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <Edit2 className="w-4 h-4 text-blue-400" />
                          <span>{formMode === 'create' ? 'Add New Portfolio Project' : 'Edit Project'}</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingTarget(null)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. Automated Machine Maintenance"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Project For / Client</label>
                          <input
                            type="text"
                            required
                            value={projectForm.project_for || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, project_for: e.target.value })}
                            placeholder="e.g. EssilorLuxottica Group"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Category</label>
                          <select
                            value={projectForm.category || 'Networking'}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="Networking">Networking</option>
                            <option value="Automation">Automation</option>
                            <option value="Linux & Server">Linux & Server</option>
                            <option value="Industrial & Hardware">Industrial & Hardware</option>
                            <option value="Web & Scraping">Web & Scraping</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Media Type</label>
                          <select
                            value={projectForm.type || 'image'}
                            onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value as 'image' | 'video' })}
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Duration / Date</label>
                          <input
                            type="text"
                            value={projectForm.during || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, during: e.target.value })}
                            placeholder="e.g. December 2025"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Media URL (Path or Image link)</label>
                        <input
                          type="text"
                          required
                          value={projectForm.media_url || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, media_url: e.target.value })}
                          placeholder="/media/img/labself.jpg"
                          className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Skill Set / Technologies</label>
                        <input
                          type="text"
                          value={projectForm.skill_set || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, skill_set: e.target.value })}
                          placeholder="e.g. MikroTik, VLAN, WireGuard, Routing"
                          className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Project Description</label>
                        <textarea
                          rows={4}
                          required
                          value={projectForm.description || ''}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="Comprehensive details on the problem, architecture, deployment, and results..."
                          className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>

                      <div className="flex gap-3 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingTarget(null)}
                          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{submitting ? 'Saving...' : 'Save Project'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Project List */
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-gray-300">Catalog Projects ({projects.length})</h4>
                        <button
                          onClick={() => {
                            setFormMode('create');
                            setEditingTarget('project');
                            setProjectForm({
                              title: '',
                              during: '2026',
                              description: '',
                              skill_set: '',
                              type: 'image',
                              media_url: '/media/img/labself.jpg',
                              project_for: '',
                              category: 'Networking',
                            });
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Project</span>
                        </button>
                      </div>

                      <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden bg-[#0f172a]/50 max-h-96 overflow-y-auto">
                        {projects.map((proj) => (
                          <div key={proj.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                            <div className="min-w-0 flex-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 mr-2">
                                {proj.category || 'General'}
                              </span>
                              <span className="text-sm font-bold text-white truncate inline-block align-middle max-w-[70%]">
                                {proj.title}
                              </span>
                              <p className="text-xs text-gray-400 truncate mt-0.5">{proj.project_for} • {proj.during}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setFormMode('edit');
                                  setProjectForm(proj);
                                  setEditingTarget('project');
                                }}
                                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm(`Delete project "${proj.title}"?`)) {
                                    try {
                                      await removeProject(proj.id!);
                                      showNotification('Project removed');
                                    } catch (err: unknown) {
                                      showNotification(err instanceof Error ? err.message : 'Delete failed', 'error');
                                    }
                                  }
                                }}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CERTIFICATES */}
              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  {editingTarget === 'certificate' ? (
                    /* Certificate Form */
                    <form onSubmit={handleSaveCertificate} className="space-y-4 bg-[#0f172a] p-6 rounded-2xl border border-white/10">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <Edit2 className="w-4 h-4 text-blue-400" />
                          <span>{formMode === 'create' ? 'Record New Certificate' : 'Edit Certificate'}</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingTarget(null)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Title / Credential</label>
                          <input
                            type="text"
                            required
                            value={certForm.title || ''}
                            onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                            placeholder="e.g. MTCNA (MikroTik)"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Issuing Body</label>
                          <input
                            type="text"
                            required
                            value={certForm.issuer || ''}
                            onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                            placeholder="e.g. MikroTik / Cisco / Linux Foundation"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Issue Date</label>
                          <input
                            type="text"
                            value={certForm.date || ''}
                            onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                            placeholder="e.g. October 2025"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Certificate Image URL</label>
                          <input
                            type="text"
                            required
                            value={certForm.image || ''}
                            onChange={(e) => setCertForm({ ...certForm, image: e.target.value })}
                            placeholder="/media/img/mtcna.jpg"
                            className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">Verification URL</label>
                        <input
                          type="text"
                          value={certForm.link || ''}
                          onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-[#090d16] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="flex gap-3 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingTarget(null)}
                          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{submitting ? 'Saving...' : 'Save Certificate'}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Certificates List */
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-gray-300">Certificates & Licenses ({certificates.length})</h4>
                        <button
                          onClick={() => {
                            setFormMode('create');
                            setEditingTarget('certificate');
                            setCertForm({
                              title: '',
                              issuer: '',
                              date: '2026',
                              image: '/media/img/mtcna.jpg',
                              link: '',
                            });
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Certificate</span>
                        </button>
                      </div>

                      <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden bg-[#0f172a]/50 max-h-96 overflow-y-auto">
                        {certificates.map((cert) => (
                          <div key={cert.id} className="p-4 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                            <div className="min-w-0 flex-1">
                              <span className="text-sm font-bold text-white truncate inline-block align-middle max-w-[70%]">
                                {cert.title}
                              </span>
                              <p className="text-xs text-gray-400 truncate mt-0.5">{cert.issuer} • {cert.date}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setFormMode('edit');
                                  setCertForm(cert);
                                  setEditingTarget('certificate');
                                }}
                                className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (window.confirm(`Delete certificate "${cert.title}"?`)) {
                                    try {
                                      await removeCertificate(cert.id!);
                                      showNotification('Certificate removed');
                                    } catch (err: unknown) {
                                      showNotification(err instanceof Error ? err.message : 'Delete failed', 'error');
                                    }
                                  }
                                }}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: DATABASE SYNC */}
              {activeTab === 'seed' && (
                <div className="space-y-4 p-6 rounded-2xl bg-[#0f172a] border border-white/10">
                  <div className="flex items-center gap-3">
                    <Database className="w-6 h-6 text-blue-400" />
                    <div>
                      <h4 className="text-base font-bold text-white">Firestore Cloud Database Sync</h4>
                      <p className="text-xs text-gray-400">
                        Populate cloud Firestore with the initial 25+ projects, 14 verified certificates, and technical blog posts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-gray-300 leading-relaxed">
                    By clicking "Sync Initial Data", the system will verify whether documents exist in your provisioned Firestore collections (`projects`, `certificates`, `articles`) and copy the repository data into Firestore so that your additions and edits persist permanently across devices.
                  </div>

                  <button
                    onClick={handleSeedData}
                    disabled={submitting}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <Database className="w-4 h-4" />
                    <span>{submitting ? 'Syncing to Cloud...' : 'Sync Initial Data to Firestore'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-4 bg-[#0a0f1d] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>ALWAN.SYSTEM Infrastructure CMS</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
