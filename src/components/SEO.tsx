import React from 'react';
import { Helmet } from 'react-helmet-async';
import { portfolioData } from '@data/portfolio.ts';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Fakhry Mubarak - Software Engineer',
  description = 'Mobile Apps focused Software Engineer specializing in app development with over 3.5 years professional experience building scalable softwares. Currently building softwares at PT Phincon. Passionate about clean architecture, SOLID principles, and continuous learning. Experienced in both native Android and Multiplatform Development using Flutter, with strong mentoring and leadership abilities. Open for any challenges and opportunities.',
  image = '/avatar.webp',
  url = 'https://fakhrymubarak.github.io/showcase-v2',
  type = 'website',
}) => {
  const { introduction, projects } = portfolioData;

  // Structured Data for Person
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fakhry Mubarak',
    jobTitle: 'Software Engineer - Mobile Apps',
    description: introduction.description,
    url: url,
    image: image,
    sameAs: [
      'https://github.com/fakhrymubarak',
      'https://linkedin.com/in/fakhrymubarak',
      'https://instagram.com/fakhrymubarak',
    ],
    knowsAbout: introduction.techStack.map(tech => tech.name),
    worksFor: {
      '@type': 'Organization',
      name: 'PT Phincon',
    },
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'PT Cakra Radha Mustika',
      },
      {
        '@type': 'Organization',
        name: 'Universitas Islam Negeri Sunan Kalijaga Yogyakarta',
      },
    ],
  };

  // Structured Data for Portfolio
  const portfolioStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: description,
    author: {
      '@type': 'Person',
      name: 'Fakhry Mubarak',
    },
    creator: {
      '@type': 'Person',
      name: 'Fakhry Mubarak',
    },
    dateCreated: '2024',
    dateModified: new Date().toISOString().split('T')[0],
    url: url,
    image: image,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: project.title,
          description: project.description,
          url: project.link,
          applicationCategory: 'MobileApplication',
          operatingSystem: 'Android',
          author: {
            '@type': 'Person',
            name: 'Fakhry Mubarak',
          },
        },
      })),
    },
  };

  // Structured Data for Organization
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fakhry Mubarak Portfolio',
    url: url,
    logo: image,
    founder: {
      '@type': 'Person',
      name: 'Fakhry Mubarak',
    },
    description: description,
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Android Developer, Kotlin, Java, Flutter, Mobile Development, Portfolio, React, TypeScript"
      />
      <meta name="author" content="Fakhry Mubarak" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Fakhry Mubarak - Software Engineer"
      />
      <meta property="og:site_name" content="Fakhry Mubarak Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Fakhry Mubarak - Software Engineer"
      />
      <meta name="twitter:creator" content="@fakhrymubarak" />
      <meta name="twitter:site" content="@fakhrymubarak" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Fakhry Mubarak" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(portfolioStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
    </Helmet>
  );
};

export default SEO;
