import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errorHandler';
import { ProjectItem, CertificateItem, ArticleItem } from '../types';
import { projectsData } from '../data/projectsData';
import { certificatesData } from '../data/certificatesData';
import { initialArticles } from '../data/articlesData';

// Generate safe document IDs conforming to isValidId
export function generateCleanId(prefix: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 40);
  return `${prefix}-${slug || 'item'}-${Date.now().toString().slice(-6)}`;
}

// ==========================================
// PROJECTS SERVICE
// ==========================================
export const subscribeProjects = (
  onData: (projects: ProjectItem[]) => void,
  onError?: (err: Error) => void
) => {
  const colRef = collection(db, 'projects');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        // Return default projects with synthetic IDs
        const defaults = projectsData.map((p, idx) => ({
          ...p,
          id: p.id || `default-proj-${idx}`,
          isInitial: true,
        }));
        onData(defaults);
      } else {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ProjectItem, 'id'>),
        }));
        onData(items);
      }
    },
    (error) => {
      console.error('Projects subscription error:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, 'projects');
    }
  );
};

export const saveProject = async (project: ProjectItem): Promise<string> => {
  const docId = project.id && !project.id.startsWith('default-')
    ? project.id
    : generateCleanId('proj', project.title);

  const path = `projects/${docId}`;
  try {
    const payload = {
      title: project.title.slice(0, 200),
      during: (project.during || '').slice(0, 100),
      description: project.description.slice(0, 2000),
      skill_set: (project.skill_set || '').slice(0, 500),
      type: project.type,
      media_url: project.media_url.slice(0, 500),
      project_for: project.project_for.slice(0, 200),
      category: (project.category || 'General').slice(0, 100),
      updatedAt: new Date().toISOString(),
      ...(project.createdAt ? { createdAt: project.createdAt } : { createdAt: new Date().toISOString() }),
    };

    await setDoc(doc(db, 'projects', docId), payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const removeProject = async (id: string): Promise<void> => {
  const path = `projects/${id}`;
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// ==========================================
// CERTIFICATES SERVICE
// ==========================================
export const subscribeCertificates = (
  onData: (certs: CertificateItem[]) => void,
  onError?: (err: Error) => void
) => {
  const colRef = collection(db, 'certificates');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        const defaults = certificatesData.map((c, idx) => ({
          ...c,
          id: c.id || `default-cert-${idx}`,
          isInitial: true,
        }));
        onData(defaults);
      } else {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<CertificateItem, 'id'>),
        }));
        onData(items);
      }
    },
    (error) => {
      console.error('Certificates subscription error:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, 'certificates');
    }
  );
};

export const saveCertificate = async (cert: CertificateItem): Promise<string> => {
  const docId = cert.id && !cert.id.startsWith('default-')
    ? cert.id
    : generateCleanId('cert', cert.title);

  const path = `certificates/${docId}`;
  try {
    const payload = {
      title: cert.title.slice(0, 200),
      issuer: cert.issuer.slice(0, 200),
      date: cert.date.slice(0, 100),
      image: cert.image.slice(0, 500),
      link: (cert.link || '').slice(0, 500),
      updatedAt: new Date().toISOString(),
      ...(cert.createdAt ? { createdAt: cert.createdAt } : { createdAt: new Date().toISOString() }),
    };

    await setDoc(doc(db, 'certificates', docId), payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const removeCertificate = async (id: string): Promise<void> => {
  const path = `certificates/${id}`;
  try {
    await deleteDoc(doc(db, 'certificates', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// ==========================================
// ARTICLES / BLOG SERVICE
// ==========================================
export const subscribeArticles = (
  onData: (articles: ArticleItem[]) => void,
  onError?: (err: Error) => void
) => {
  const colRef = collection(db, 'articles');
  return onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        onData(initialArticles);
      } else {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ArticleItem, 'id'>),
        }));
        onData(items);
      }
    },
    (error) => {
      console.error('Articles subscription error:', error);
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, 'articles');
    }
  );
};

export const saveArticle = async (article: ArticleItem): Promise<string> => {
  const docId = article.id && !article.id.startsWith('default-')
    ? article.id
    : generateCleanId('article', article.title);

  const path = `articles/${docId}`;
  try {
    const payload = {
      title: article.title.slice(0, 300),
      slug: (article.slug || docId).slice(0, 200),
      excerpt: article.excerpt.slice(0, 1000),
      content: article.content.slice(0, 25000),
      category: (article.category || 'Technology').slice(0, 100),
      readTime: (article.readTime || '5 min read').slice(0, 50),
      coverImage: (article.coverImage || '/media/img/labself.jpg').slice(0, 500),
      updatedAt: new Date().toISOString(),
      ...(article.createdAt ? { createdAt: article.createdAt } : { createdAt: new Date().toISOString() }),
    };

    await setDoc(doc(db, 'articles', docId), payload);
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const removeArticle = async (id: string): Promise<void> => {
  const path = `articles/${id}`;
  try {
    await deleteDoc(doc(db, 'articles', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// ==========================================
// SEED DEFAULT DATA TO FIRESTORE
// ==========================================
export const seedDefaultDataToFirestore = async (): Promise<{ projects: number; certs: number; articles: number }> => {
  let pCount = 0;
  let cCount = 0;
  let aCount = 0;

  // Check and seed projects
  const projSnap = await getDocs(collection(db, 'projects'));
  if (projSnap.empty) {
    for (let i = 0; i < projectsData.length; i++) {
      const p = projectsData[i];
      const pId = `proj-${i + 1}-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 25)}`;
      await setDoc(doc(db, 'projects', pId), {
        title: p.title,
        during: p.during,
        description: p.description,
        skill_set: p.skill_set,
        type: p.type,
        media_url: p.media_url,
        project_for: p.project_for,
        category: p.category || 'General',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      pCount++;
    }
  }

  // Check and seed certs
  const certSnap = await getDocs(collection(db, 'certificates'));
  if (certSnap.empty) {
    for (let i = 0; i < certificatesData.length; i++) {
      const c = certificatesData[i];
      const cId = `cert-${i + 1}-${c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 25)}`;
      await setDoc(doc(db, 'certificates', cId), {
        title: c.title,
        issuer: c.issuer,
        date: c.date,
        image: c.image,
        link: c.link || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      cCount++;
    }
  }

  // Check and seed articles
  const artSnap = await getDocs(collection(db, 'articles'));
  if (artSnap.empty) {
    for (const a of initialArticles) {
      await setDoc(doc(db, 'articles', a.id!), {
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: a.content,
        category: a.category,
        readTime: a.readTime,
        coverImage: a.coverImage,
        createdAt: a.createdAt,
        updatedAt: new Date().toISOString(),
      });
      aCount++;
    }
  }

  return { projects: pCount, certs: cCount, articles: aCount };
};
