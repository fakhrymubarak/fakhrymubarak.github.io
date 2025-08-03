export interface TechStack {
  name: string;
  icon: {
    light: string;
    dark: string;
  };
  color?: string; // Made optional since we're using icons
}

export interface Project {
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

export interface Experience {
  id: string;
  title: string;
  period: string;
  duration: string;
  highlights: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  experiences: Experience[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactLink {
  type: 'email' | 'whatsapp' | 'resume';
  label: string;
  url: string;
  icon: string;
}

export interface Introduction {
  title: string[];
  subtitle: string;
  description: string;
  imagePath: string;
  techStack: TechStack[];
}

export interface Footer {
  socialMedia: SocialLink[];
  contacts: ContactLink[];
  signature: string;
  contactImage: string;
}

export interface PortfolioData {
  introduction: Introduction;
  projects: Project[];
  companies: Company[];
  footer: Footer;
}
