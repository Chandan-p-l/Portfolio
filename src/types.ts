export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  category: string;
  summary: string;
  tagline: string;
  heroImage?: string;
  accentColor?: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  deliverables: string[];
  architecture?: {
    nodes: Array<{ name: string; type: string; desc: string }>;
  };
  metricsPlaceholder?: string;
  proofStatus: string;
  liveUrl?: string;
  repositoryUrl?: string;
}

export interface TechItem {
  name: string;
  category: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'INFRASTRUCTURE' | 'PRODUCT' | 'EXPLORING';
  level: string;
  desc: string;
  interactiveSnippet?: string;
  visualType: 'react' | 'nginx' | 'database' | 'git' | 'linux' | 'design' | 'generic';
}

export interface BuildStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  mindset: string;
  keyQuestion: string;
}

export interface TechArticle {
  id: string;
  number: string;
  title: string;
  tag: string;
  summary: string;
  readTime: string;
  keyInsight: string;
  steps: Array<{ label: string; detail: string }>;
}

export interface CursorState {
  text: string;
  variant: 'default' | 'hover' | 'project' | 'open' | 'inspect' | 'copy' | 'drag';
}
