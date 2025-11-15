import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), 'posts/projects');

export interface ProjectMetadata {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  slug: string;
}

export interface Project extends ProjectMetadata {
  content: string;
}

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        tags: data.tags || [],
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        featured: data.featured || false,
      };
    });

  return allProjectsData.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    description: data.description,
    tags: data.tags || [],
    githubUrl: data.githubUrl,
    liveUrl: data.liveUrl,
    featured: data.featured || false,
    content: contentHtml,
  };
}
