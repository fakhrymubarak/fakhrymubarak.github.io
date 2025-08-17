import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntro } from '@/presentation';

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
  url = 'https://fakhrymubarak.github.io/',
  type = 'website',
}) => {
  const { introduction } = useIntro();

  const seoTitle =
    title || `${introduction.title.join(' ')} - ${introduction.subtitle}`;
  const seoDescription = description || introduction.description;

  return (
    <Helmet>
      {/* Preload hero (LCP) image at runtime to help LCP */}
      <link rel="preload" as="image" href={introduction.imagePath} />
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Fakhry Mubarak Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Fakhry Mubarak" />
      <meta
        name="keywords"
        content="Software Engineer, Android Developer, Flutter Developer, Mobile Development, Kotlin, Java, React, TypeScript"
      />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Fakhry Mubarak',
          jobTitle: 'Software Engineer',
          description: seoDescription,
          url: url,
          image: image,
          sameAs: [
            'https://linkedin.com/in/fakhrymubarak',
            'https://github.com/fakhrymubarak',
            'https://www.instagram.com/fakhrymubarak',
            'https://www.youtube.com/@fakhry.mubarakk',
          ],
          knowsAbout: [
            'Android Development',
            'Flutter Development',
            'Mobile Development',
            'Kotlin',
            'Java',
            'Software Engineering',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'PT Phincon',
          },
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
