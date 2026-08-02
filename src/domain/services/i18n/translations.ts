import type { Locale } from '@domain/models/i18n.ts';

export interface UIStrings {
  nav: {
    home: string;
    projects: string;
    experience: string;
    articles: string;
    contact: string;
  };
  a11y: {
    toggleMenu: string;
    navigateTo: (section: string) => string;
    switchToLanguage: string; // aria for the language switch (target language)
    languageSwitchedTo: string; // announced after switch
  };
  intro: {
    experienceLabel: string;
    yearsUnit: string;
    shippedLabel: string;
    projectsUnit: string;
    techStack: string;
  };
  projects: {
    eyebrow: string;
    heading: string;
    body: string;
    filter: string;
    showLess: string;
    seeMore: string;
    all: string;
    viewProject: string;
    modalDescription: string;
    modalTechStack: string;
  };
  articles: {
    eyebrow: string;
    heading: string;
    body: string;
    filter: string;
    filterHeading: string;
    viewAll: string;
    showLess: string;
    seeMore: string;
    all: string;
    unableToLoad: string;
    loading: string;
    summaryUnavailable: string;
    viewOnMedium: string;
    readOnMedium: string;
    readFullArticle: string;
  };
  experience: {
    eyebrow: string;
    heading: string;
    body: string;
    keyAchievements: string;
    types: {
      'full-time': string;
      'part-time': string;
      contract: string;
      freelance: string;
    };
  };
  certificates: {
    eyebrow: string;
    heading: string;
    body: string;
    filter: string;
    showLess: string;
    seeMore: string;
    active: string;
    expired: string;
    viewCertificate: string;
    description: string;
    issueDate: string;
    credentialId: string;
    status: string;
    skills: string;
    filterByStatus: string;
    filterByType: string;
    filterBySkills: string;
    allStatus: string;
    allTypes: string;
    allSkills: string;
  };
  footer: {
    getInTouch: string;
    getInTouchBody: string;
    letsConnect: string;
    letsConnectBody: string;
    followMe: string;
  };
  language: {
    switchLabel: string; // 'ID' | 'EN' label of the TARGET language
    flag: string; // emoji flag of the TARGET language
  };
  seo: {
    languageMeta: string; // <meta name="language">
  };
}

const en: UIStrings = {
  nav: {
    home: 'Home',
    projects: 'Projects',
    experience: 'Experience',
    articles: 'Articles',
    contact: 'Contact',
  },
  a11y: {
    toggleMenu: 'Toggle mobile menu',
    navigateTo: section => `Navigate to ${section} section`,
    switchToLanguage: 'Ganti bahasa ke Indonesia',
    languageSwitchedTo: 'Bahasa diganti ke Indonesia',
  },
  intro: {
    experienceLabel: 'Experience',
    yearsUnit: 'yrs',
    shippedLabel: 'Shipped',
    projectsUnit: 'projects',
    techStack: 'Tech Stack',
  },
  projects: {
    eyebrow: 'Selected work',
    heading: 'Projects',
    body: "Here are some of the projects I've worked on, showcasing my expertise in mobile development and software engineering.",
    filter: 'Filter Projects',
    showLess: 'Show Less',
    seeMore: 'See More',
    all: 'All Projects',
    viewProject: 'View Project',
    modalDescription: 'Description',
    modalTechStack: 'Tech Stack',
  },
  articles: {
    eyebrow: 'Writing',
    heading: 'Articles',
    body: 'My latest thoughts and insights on software development, mobile engineering, and technology trends.',
    filter: 'Filter Articles',
    filterHeading: 'Filter Articles',
    viewAll: 'View All on Medium',
    showLess: 'Show Less',
    seeMore: 'See More Articles',
    all: 'All Articles',
    unableToLoad: 'Unable to load articles at the moment.',
    loading: 'Loading Medium articles',
    summaryUnavailable: 'Summary unavailable',
    viewOnMedium: 'View on Medium',
    readOnMedium: 'Read on Medium',
    readFullArticle: 'Read the full article on Medium',
  },
  experience: {
    eyebrow: 'Career',
    heading: 'Experiences',
    body: 'My professional journey in mobile development and software engineering.',
    keyAchievements: 'Key Achievements:',
    types: {
      'full-time': 'full-time',
      'part-time': 'part-time',
      contract: 'contract',
      freelance: 'freelance',
    },
  },
  certificates: {
    eyebrow: 'Credentials',
    heading: 'Certificates & Awards',
    body: 'Professional certifications and recognition for expertise and contributions in mobile development and software engineering.',
    filter: 'Filter Certificates',
    showLess: 'Show Less',
    seeMore: 'See More',
    active: 'Active',
    expired: 'Expired',
    viewCertificate: 'View Certificate',
    description: 'Description',
    issueDate: 'Issue Date',
    credentialId: 'Credential ID',
    status: 'Status',
    skills: 'Skills & Technologies',
    filterByStatus: 'Filter by Status',
    filterByType: 'Filter by Type',
    filterBySkills: 'Filter by Skills',
    allStatus: 'All Status',
    allTypes: 'All Types',
    allSkills: 'All Skills',
  },
  footer: {
    getInTouch: 'Get in Touch',
    getInTouchBody:
      "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.",
    letsConnect: "Let's Connect",
    letsConnectBody:
      "Feel free to reach out if you'd like to discuss potential collaborations, have questions about my work, or just want to say hello!",
    followMe: 'Follow Me',
  },
  language: {
    switchLabel: 'ID',
    flag: '🇮🇩',
  },
  seo: {
    languageMeta: 'English',
  },
};

const id: UIStrings = {
  nav: {
    home: 'Beranda',
    projects: 'Proyek',
    experience: 'Pengalaman',
    articles: 'Artikel',
    contact: 'Kontak',
  },
  a11y: {
    toggleMenu: 'Buka/tutup menu',
    navigateTo: section => `Menuju bagian ${section}`,
    switchToLanguage: 'Switch language to English',
    languageSwitchedTo: 'Language switched to English',
  },
  intro: {
    experienceLabel: 'Pengalaman',
    yearsUnit: 'thn',
    shippedLabel: 'Dirilis',
    projectsUnit: 'proyek',
    techStack: 'Teknologi',
  },
  projects: {
    eyebrow: 'Karya pilihan',
    heading: 'Proyek',
    body: 'Berikut beberapa proyek yang pernah saya kerjakan, menampilkan keahlian saya di pengembangan mobile dan rekayasa perangkat lunak.',
    filter: 'Filter Proyek',
    showLess: 'Tampilkan Lebih Sedikit',
    seeMore: 'Lihat Lebih Banyak',
    all: 'Semua Proyek',
    viewProject: 'Lihat Proyek',
    modalDescription: 'Deskripsi',
    modalTechStack: 'Teknologi',
  },
  articles: {
    eyebrow: 'Tulisan',
    heading: 'Artikel',
    body: 'Pemikiran dan wawasan terbaru saya seputar pengembangan perangkat lunak, rekayasa mobile, dan tren teknologi.',
    filter: 'Filter Artikel',
    filterHeading: 'Filter Artikel',
    viewAll: 'Lihat Semua di Medium',
    showLess: 'Tampilkan Lebih Sedikit',
    seeMore: 'Lihat Artikel Lainnya',
    all: 'Semua Artikel',
    unableToLoad: 'Tidak dapat memuat artikel saat ini.',
    loading: 'Memuat artikel Medium',
    summaryUnavailable: 'Ringkasan tidak tersedia',
    viewOnMedium: 'Lihat di Medium',
    readOnMedium: 'Baca di Medium',
    readFullArticle: 'Baca artikel lengkap di Medium',
  },
  experience: {
    eyebrow: 'Karier',
    heading: 'Pengalaman',
    body: 'Perjalanan profesional saya di pengembangan mobile dan rekayasa perangkat lunak.',
    keyAchievements: 'Pencapaian Utama:',
    types: {
      'full-time': 'penuh waktu',
      'part-time': 'paruh waktu',
      contract: 'kontrak',
      freelance: 'lepas',
    },
  },
  certificates: {
    eyebrow: 'Kredensial',
    heading: 'Sertifikat & Penghargaan',
    body: 'Sertifikasi profesional dan pengakuan atas keahlian serta kontribusi di pengembangan mobile dan rekayasa perangkat lunak.',
    filter: 'Filter Sertifikat',
    showLess: 'Tampilkan Lebih Sedikit',
    seeMore: 'Lihat Lebih Banyak',
    active: 'Aktif',
    expired: 'Kedaluwarsa',
    viewCertificate: 'Lihat Sertifikat',
    description: 'Deskripsi',
    issueDate: 'Tanggal Terbit',
    credentialId: 'ID Kredensial',
    status: 'Status',
    skills: 'Keterampilan & Teknologi',
    filterByStatus: 'Filter berdasarkan Status',
    filterByType: 'Filter berdasarkan Tipe',
    filterBySkills: 'Filter berdasarkan Keterampilan',
    allStatus: 'Semua Status',
    allTypes: 'Semua Tipe',
    allSkills: 'Semua Keterampilan',
  },
  footer: {
    getInTouch: 'Hubungi Saya',
    getInTouchBody:
      'Saya selalu terbuka untuk mendiskusikan peluang baru, proyek menarik, atau sekadar berbincang tentang teknologi.',
    letsConnect: 'Mari Terhubung',
    letsConnectBody:
      'Jangan ragu untuk menghubungi saya jika ingin mendiskusikan potensi kolaborasi, memiliki pertanyaan tentang pekerjaan saya, atau sekadar menyapa!',
    followMe: 'Ikuti Saya',
  },
  language: {
    switchLabel: 'EN',
    flag: '🇬🇧',
  },
  seo: {
    languageMeta: 'Indonesian',
  },
};

export const translations: Record<Locale, UIStrings> = { id, en };

export const getUIStrings = (locale: Locale): UIStrings => translations[locale];
