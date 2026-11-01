import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StackSection } from './components/StackSection';
import { FeaturedShowcaseSection } from './components/FeaturedShowcaseSection';
import { ProjectsCatalog } from './components/ProjectsCatalog';
import { BlogSection } from './components/BlogSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InfraDetailModal } from './components/InfraDetailModal';
import { ShowcaseDetailModal } from './components/ShowcaseDetailModal';
import { MediaModal } from './components/MediaModal';
import { ArticleModal } from './components/ArticleModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { ContactModal } from './components/ContactModal';
import { infraCategories } from './data/infraData';
import {
  subscribeProjects,
  subscribeCertificates,
  subscribeArticles,
  removeProject,
  removeCertificate,
  removeArticle,
} from './services/dataService';
import {
  InfraCategory,
  FeaturedShowcase,
  ProjectItem,
  CertificateItem,
  ArticleItem,
} from './types';

const PortfolioContent: React.FC = () => {
  const { isAdmin } = useAuth();

  // Dynamic Data States
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  // Modal States
  const [selectedCategory, setSelectedCategory] = useState<InfraCategory | null>(null);
  const [selectedShowcase, setSelectedShowcase] = useState<FeaturedShowcase | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<ProjectItem | CertificateItem | null>(null);
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  // Admin Modal & Editing
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<{
    type: 'project' | 'certificate' | 'article';
    data?: ProjectItem | CertificateItem | ArticleItem;
  } | null>(null);

  // Contact Modal
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>('');

  // Subscribe to real-time collections from Firestore
  useEffect(() => {
    const unsubProjects = subscribeProjects((data) => setProjects(data));
    const unsubCertificates = subscribeCertificates((data) => setCertificates(data));
    const unsubArticles = subscribeArticles((data) => setArticles(data));

    return () => {
      unsubProjects();
      unsubCertificates();
      unsubArticles();
    };
  }, []);

  const handleSelectCategoryId = (catId: 'networking' | 'linux-server' | 'monitoring' | 'automation') => {
    const found = infraCategories.find((c) => c.id === catId);
    if (found) {
      setSelectedCategory(found);
    }
  };

  const handleOpenContact = (subject?: string) => {
    setContactSubject(subject || 'Infrastructure Project Inquiry');
    setIsContactOpen(true);
  };

  // Quick Action Handlers for Admin
  const handleNewProject = () => {
    setEditItem({ type: 'project' });
    setIsAdminPortalOpen(true);
  };

  const handleEditProject = (project: ProjectItem) => {
    setEditItem({ type: 'project', data: project });
    setIsAdminPortalOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await removeProject(id);
    } catch (err) {
      console.error('Delete project failed:', err);
    }
  };

  const handleNewCertificate = () => {
    setEditItem({ type: 'certificate' });
    setIsAdminPortalOpen(true);
  };

  const handleEditCertificate = (cert: CertificateItem) => {
    setEditItem({ type: 'certificate', data: cert });
    setIsAdminPortalOpen(true);
  };

  const handleDeleteCertificate = async (id: string) => {
    try {
      await removeCertificate(id);
    } catch (err) {
      console.error('Delete certificate failed:', err);
    }
  };

  const handleNewArticle = () => {
    setEditItem({ type: 'article' });
    setIsAdminPortalOpen(true);
  };

  const handleEditArticle = (article: ArticleItem) => {
    setReadingArticle(null);
    setEditItem({ type: 'article', data: article });
    setIsAdminPortalOpen(true);
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await removeArticle(id);
    } catch (err) {
      console.error('Delete article failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-600 selection:text-white relative">
      {/* Background Matrix / Grid Pattern */}
      <div className="grid-bg"></div>

      {/* Main Navbar */}
      <Navbar
        onOpenContactModal={() => handleOpenContact()}
        onOpenAdminModal={() => setIsAdminPortalOpen(true)}
      />

      {/* Hero Section */}
      <main>
        <Hero
          onOpenContact={() => handleOpenContact()}
          onSelectCategory={handleSelectCategoryId}
          onOpenAdmin={() => setIsAdminPortalOpen(true)}
        />

        {/* Stack Overview */}
        <StackSection onSelectCategory={handleSelectCategoryId} />

        {/* Featured Enterprise Showcases */}
        <FeaturedShowcaseSection onOpenShowcase={(sc) => setSelectedShowcase(sc)} />

        {/* Comprehensive Project Catalog (Dynamic) */}
        <ProjectsCatalog
          projects={projects}
          isAdmin={isAdmin}
          onOpenMedia={(proj) => setSelectedMedia(proj)}
          onNewProject={handleNewProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />

        {/* Technical Blog & Articles (Dynamic) */}
        <BlogSection
          articles={articles}
          isAdmin={isAdmin}
          onReadArticle={(art) => setReadingArticle(art)}
          onNewArticle={handleNewArticle}
          onEditArticle={handleEditArticle}
          onDeleteArticle={handleDeleteArticle}
        />

        {/* Professional Certifications (Dynamic) */}
        <CertificatesSection
          certificates={certificates}
          isAdmin={isAdmin}
          onZoomCertificate={(cert) => setSelectedMedia(cert)}
          onNewCertificate={handleNewCertificate}
          onEditCertificate={handleEditCertificate}
          onDeleteCertificate={handleDeleteCertificate}
        />

        {/* Infrastructure Services */}
        <ServicesSection onOpenContact={(srv) => handleOpenContact(srv)} />

        {/* Contact Section */}
        <ContactSection onOpenModal={() => handleOpenContact()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <InfraDetailModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onOpenShowcase={(sc) => setSelectedShowcase(sc)}
      />

      <ShowcaseDetailModal
        showcase={selectedShowcase}
        onClose={() => setSelectedShowcase(null)}
      />

      <MediaModal
        item={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />

      <ArticleModal
        article={readingArticle}
        isAdmin={isAdmin}
        onClose={() => setReadingArticle(null)}
        onEdit={(art) => handleEditArticle(art)}
      />

      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => {
          setIsAdminPortalOpen(false);
          setEditItem(null);
        }}
        projects={projects}
        certificates={certificates}
        articles={articles}
        editItem={editItem}
        onClearEditItem={() => setEditItem(null)}
      />

      {isContactOpen && (
        <ContactModal
          initialSubject={contactSubject}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortfolioContent />
    </AuthProvider>
  );
};

export default App;
