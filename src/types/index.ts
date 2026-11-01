export interface ProjectItem {
  id?: string;
  title: string;
  during?: string;
  description: string;
  skill_set?: string;
  type: 'image' | 'video';
  media_url: string;
  project_for: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  isInitial?: boolean;
}

export interface CertificateItem {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  isInitial?: boolean;
}

export interface ArticleItem {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: string;
  readTime?: string;
  coverImage?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  isInitial?: boolean;
}

export interface RepoItem {
  type: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  isOpenShowcase?: boolean;
  showcaseId?: string;
}

export interface InfraCategory {
  id: 'networking' | 'linux-server' | 'monitoring' | 'automation';
  name: string;
  label: string;
  subtitle: string;
  description: string;
  icon: string;
  repos: RepoItem[];
}

export interface FeaturedShowcase {
  id: 'enterprise-vlan' | 'docker-infrastructure' | 'monitoring-dashboard';
  title: string;
  label: string;
  description: string;
  tags: string[];
  challenges: string[];
  solutions: string[];
  highlights: { title: string; desc: string; value?: string }[];
  githubUrl: string;
  iconName: string;
}
