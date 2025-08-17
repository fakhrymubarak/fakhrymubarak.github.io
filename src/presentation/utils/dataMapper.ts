import type {
  TechStack,
  Project,
  Experience,
  Company,
  CertificateCategory,
  Certificate,
  SocialLink,
  ContactLink,
  Introduction,
  Footer,
  PortfolioData,
} from '@domain/models';
import type {
  UITechStack,
  UIProject,
  UIExperience,
  UICompany,
  UICertificateCategory,
  UICertificate,
  UISocialLink,
  UIContactLink,
  UIIntroduction,
  UIFooter,
  UIPortfolioData,
} from '@presentation/models';

/**
 * Format date to "Mmm yyyy" format (e.g., "Jan 2023", "Dec 2024")
 * @param dateStr - Date string in any format
 * @returns Formatted date string in "Mmm yyyy" format
 */
function formatDateToMmmYyyy(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr; // Return original if invalid date
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

// Mapping functions from domain to UI models
export const mapTechStack = (techStack: TechStack): UITechStack => ({
  name: techStack.name,
  icon: techStack.icon,
  color: techStack.color,
});

export const mapProject = (project: Project): UIProject => ({
  id: project.id,
  title: project.title,
  period: project.period,
  logo: project.logo,
  image: project.image,
  description: project.description,
  link: project.link,
  stacks: project.stacks,
  featured: project.featured,
  hasGithub: project.hasGithub,
  githubUrl: project.githubUrl,
});

export const mapExperience = (experience: Experience): UIExperience => ({
  id: experience.id,
  title: experience.title,
  period: experience.period,
  duration: experience.duration,
  highlights: experience.highlights,
  type: experience.type,
});

export const mapCompany = (company: Company): UICompany => ({
  id: company.id,
  name: company.name,
  logo: company.logo,
  experiences: company.experiences.map(mapExperience),
});

export const mapCertificate = (certificate: Certificate): UICertificate => ({
  id: certificate.id,
  title: certificate.title,
  description: certificate.description,
  certificateUrl: certificate.certificateUrl,
  credentialId: certificate.credentialId,
  issueDate: formatDateToMmmYyyy(certificate.issueDate),
  status: certificate.status,
  skills: certificate.skills,
});

export const mapCertificateCategory = (
  category: CertificateCategory
): UICertificateCategory => ({
  type: category.type,
  certificates: category.certificates.map(mapCertificate),
});

export const mapSocialLink = (socialLink: SocialLink): UISocialLink => ({
  name: socialLink.name,
  url: socialLink.url,
  icon: socialLink.icon,
});

export const mapContactLink = (contactLink: ContactLink): UIContactLink => ({
  type: contactLink.type,
  label: contactLink.label,
  url: contactLink.url,
  icon: contactLink.icon,
});

export const mapIntroduction = (
  introduction: Introduction
): UIIntroduction => ({
  title: introduction?.title || [],
  subtitle: introduction?.subtitle || '',
  description: introduction?.description || '',
  imagePath: introduction?.imagePath || '',
  techStack: introduction?.techStack?.map(mapTechStack) || [],
});

export const mapFooter = (footer: Footer | undefined): UIFooter => ({
  socialMedia: footer?.socialMedia?.map(mapSocialLink) || [],
  contacts: footer?.contacts?.map(mapContactLink) || [],
  signature: footer?.signature || '',
  contactImage: footer?.contactImage || '',
});

export const mapPortfolioData = (
  portfolioData: PortfolioData
): UIPortfolioData => ({
  introduction: mapIntroduction(portfolioData.introduction),
  projects: portfolioData.projects?.map(mapProject) || [],
  companies: portfolioData.companies?.map(mapCompany) || [],
  certificateCategories:
    portfolioData.certificateCategories?.map(mapCertificateCategory) || [],
  footer: mapFooter(portfolioData.footer),
});
