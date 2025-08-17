// UI Models for Presentation Layer

export interface UITechStack {
  name: string;
  icon: {
    light: string;
    dark: string;
  };
  color?: string;
}

export interface UIProject {
  id: string;
  title: string;
  period: string;
  logo: string;
  image: string;
  description: string;
  link: string;
  stacks: string[];
  featured?: boolean;
  hasGithub?: boolean;
  githubUrl?: string;
}

export interface UIExperience {
  id: string;
  title: string;
  period: string;
  duration: string;
  highlights: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
}

export interface UICompany {
  id: string;
  name: string;
  logo: string;
  experiences: UIExperience[];
}

export type UICertType = 'professional' | 'course' | 'academic' | 'award';
export type UICertStatus = 'active' | 'expired';

export interface UICertificateCategory {
  type: UICertType;
  certificates: UICertificate[];
}

export interface UICertificate {
  id: string;
  title: string;
  description: string;
  certificateUrl: string;
  credentialId: string;
  issueDate: string;
  status: UICertStatus;
  skills: string[];
}

export interface UISocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface UIContactLink {
  type: 'email' | 'whatsapp' | 'resume';
  label: string;
  url: string;
  icon: string;
}

export interface UIIntroduction {
  title: string[];
  subtitle: string;
  description: string;
  imagePath: string;
  techStack: UITechStack[];
}

export interface UIFooter {
  socialMedia: UISocialLink[];
  contacts: UIContactLink[];
  signature: string;
  contactImage: string;
}

export interface UIPortfolioData {
  introduction: UIIntroduction;
  projects: UIProject[];
  companies: UICompany[];
  certificateCategories: UICertificateCategory[];
  footer: UIFooter;
}

// UI State Models
export interface UIProjectState {
  projects: UIProject[];
  selectedProject: UIProject | null;
  activeFilter: string;
  showFilters: boolean;
  showAllProjects: boolean;
  availableFilters: string[];
  filteredProjects: UIProject[];
  displayedProjects: UIProject[];
  hasMoreProjects: boolean;
}

export interface UICertificateState {
  certificates: (UICertificate & { categoryType: string })[];
  selectedCertificate: (UICertificate & { categoryType: string }) | null;
  activeSkillFilter: string;
  activeStatusFilter: string;
  activeTypeFilter: string;
  showFilters: boolean;
  showAllCertificates: boolean;
  availableSkillFilters: string[];
  availableStatusFilters: string[];
  availableTypeFilters: string[];
  filteredCertificates: (UICertificate & { categoryType: string })[];
  displayedCertificates: (UICertificate & { categoryType: string })[];
  hasMoreCertificates: boolean;
}

export interface UIExperienceState {
  companies: UICompany[];
}

export interface UIIntroState {
  introduction: UIIntroduction;
}

export interface UIFooterState {
  footer: UIFooter;
}
