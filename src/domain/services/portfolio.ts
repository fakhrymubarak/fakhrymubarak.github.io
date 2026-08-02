import { PortfolioData } from '@/domain';
import type { Locale } from '@domain/models/i18n.ts';
import {
  calculateDuration,
  getYearsOfExperience,
} from '../valueObjects/dateUtils';

// Import assets from the src / assets directory
import avatarImage from '@/assets/images/avatars/img_avatar.webp';
import footerAvatarImage from '@/assets/images/avatars/img_avatar_footer.webp';
import transjakartaImage from '@/assets/images/projects/img_transjakarta_obu.webp';
import byuImage from '@/assets/images/projects/img_byu_landing_page.webp';
import mytelkomselImage from '@/assets/images/projects/img_mytelkomsel.webp';
import alkhairaatImage from '@/assets/images/projects/img_alkhairaat.webp';
import chakraImage from '@/assets/images/projects/img_chakra_loyalty.webp';
import hressImage from '@/assets/images/projects/img_hress.webp';
import lifelogImage from '@/assets/images/projects/img_lifelog.webp';
import akuisisiImage from '@/assets/images/projects/img_akuisisi_loyalty.webp';
import shafaWebImage from '@/assets/images/projects/img_shafa_web.webp';
import showcaseV1Image from '@/assets/images/projects/img_showcase_v1.webp';

// Import company logos
import transjakartaLogo from '@/assets/icons/companies/ic_transjakarta.webp';
import byuLogo from '@/assets/icons/companies/ic_byu.webp';
import mytelkomselLogo from '@/assets/icons/companies/ic_mytelkomsel.webp';
import alkhairaatLogo from '@/assets/icons/companies/ic_alkhairaat.webp';
import chakraLogo from '@/assets/icons/companies/ic_chakra_loyalty.webp';
import phinconLogo from '@/assets/icons/companies/ic_phincon.webp';
import bangkitLogo from '@/assets/icons/companies/ic_bangkit.webp';
import crmLogo from '@/assets/icons/companies/ic_crm.webp';
import lifelogLogo from '@/assets/icons/companies/ic_lifelog.webp';
import shafaLogo from '@/assets/icons/companies/ic_shafa_25.webp';
import akuisisiLogo from '@/assets/icons/companies/ic_akuisisi_loyalty.webp';
import hressLogo from '@/assets/icons/companies/ic_hress_crm.webp';
import showcaseV1Logo from '@/assets/icons/companies/ic_showcase_v1.webp';

// Import tech stack icons
import { SiAndroid, SiKotlin, SiFlutter, SiGo, SiReact } from 'react-icons/si';
import { DiJava } from 'react-icons/di';

// ── Shared, locale-independent structure ──────────────────────────────

const techStack = [
  {
    name: 'Android',
    icon: SiAndroid,
    color: '#3DDC84',
  },
  {
    name: 'Kotlin',
    icon: SiKotlin,
    color: '#7F52FF',
  },
  {
    name: 'Java',
    icon: DiJava,
    color: '#ED8B00',
  },
  {
    name: 'Flutter',
    icon: SiFlutter,
    color: '#02569B',
  },
  {
    name: 'Go',
    icon: SiGo,
    color: '#00ADD8',
  },
  {
    name: 'React',
    icon: SiReact,
    color: '#61DAFB',
  },
  {
    name: 'React Native',
    icon: SiReact,
    color: '#61DAFB',
  },
];

// Structural project metadata (no translatable text except via content maps).
const projectMeta = [
  {
    id: 'transjakarta-obu',
    period: 'Feb 2026 — Present',
    logo: transjakartaLogo,
    image: transjakartaImage,
    link: '',
    stacks: ['Android', 'Kotlin'],
    featured: true,
    hasGithub: false,
    githubUrl: '',
  },
  {
    id: 'byu-bridging',
    period: 'Jul 2025 — Jan 2026',
    logo: byuLogo,
    image: byuImage,
    link: 'https://byu.id',
    stacks: ['Go', 'Fiber', 'Redis', 'Docker', 'Kubernetes'],
    featured: true,
    hasGithub: false,
    githubUrl: '',
  },
  {
    id: 'mytelkomsel',
    period: 'Jul 2023 — Jun 2025',
    logo: mytelkomselLogo,
    image: mytelkomselImage,
    link: 'https://play.google.com/store/apps/details?id=com.telkomsel.telkomselcm',
    stacks: ['Android', 'Kotlin', 'Java'],
    featured: true,
    hasGithub: false,
    githubUrl: '',
  },
  {
    id: 'lifelog',
    period: 'Jan 2022 — Present',
    logo: lifelogLogo,
    image: lifelogImage,
    link: 'https://play.google.com/store/apps/details?id=com.fakhry.lifelog',
    stacks: ['Android', 'Kotlin'],
    featured: false,
    hasGithub: true,
    githubUrl: 'https://github.com/fakhrymubarak/LifeLog',
  },
  {
    id: 'alkhairaat',
    period: 'Mar 2023 — Jun 2023',
    logo: alkhairaatLogo,
    image: alkhairaatImage,
    link: 'https://apkpure.com/alkhairaat-app/com.alkhairaat.membership',
    stacks: ['Android', 'Flutter'],
    featured: true,
    hasGithub: false,
    githubUrl: '',
  },
  {
    id: 'chakra-app',
    period: 'Jan 2022 — Jun 2023',
    logo: chakraLogo,
    image: chakraImage,
    link: 'https://apkpure.com/chakra-rewards/com.kalbe.cakraloyalty',
    stacks: ['Android', 'Kotlin'],
    featured: true,
    hasGithub: false,
    githubUrl: '',
  },
  {
    id: 'hress',
    period: 'Jan 2022 — Jun 2023',
    logo: hressLogo,
    image: hressImage,
    link: 'https://github.com/fakhrymubarak/shafa-25-birthday',
    stacks: ['Android', 'Kotlin', 'Java'],
    featured: false,
    hasGithub: false,
    githubUrl: '',
  },
  {
    id: 'akuisisi-loyalty',
    period: 'Jan 2022 — Jun 2023',
    logo: akuisisiLogo,
    image: akuisisiImage,
    link: 'https://play.google.com/store/apps/details?id=com.kalbe.crm.dmqi',
    stacks: ['Android', 'Kotlin'],
    featured: false,
    hasGithub: false,
    githubUrl: '',
  },
  {
    id: 'showcase-v1',
    period: 'Apr 2025',
    logo: showcaseV1Logo,
    image: showcaseV1Image,
    link: 'https://fakhrymubarak.github.io/showcase-v1/',
    stacks: ['Flutter', 'Web'],
    featured: false,
    hasGithub: true,
    githubUrl: 'https://github.com/fakhrymubarak/showcase-v1',
  },
  {
    id: 'shafa-birthday-25th',
    period: 'Jan 2025',
    logo: shafaLogo,
    image: shafaWebImage,
    link: 'https://fakhrymubarak.github.io/shafa-25-birthday/',
    stacks: ['Flutter', 'Web'],
    featured: false,
    hasGithub: true,
    githubUrl: 'https://github.com/fakhrymubarak/shafa-25-birthday',
  },
];

// Project display titles (proper nouns — English in both locales, see Global Constraints).
// Declared above getPortfolioData to avoid any temporal-dead-zone confusion.
const PROJECT_TITLES: Record<string, string> = {
  'transjakarta-obu': 'OBU - On-Board Unit Transjakarta',
  'byu-bridging': 'Byu Bridging',
  mytelkomsel: 'MyTelkomsel',
  lifelog: 'LifeLog',
  alkhairaat: 'Alkhairaat',
  'chakra-app': 'Chakra App',
  hress: 'HRESS',
  'akuisisi-loyalty': 'Akuisisi Loyalty',
  'showcase-v1': 'V1 of This Site',
  'shafa-birthday-25th': 'Shafa Birthday Web',
};

// Company/experience structural metadata. Titles stay English (see Global Constraints).
// `highlightsKey` links to the localized highlight arrays in the content maps.
const companyMeta = [
  {
    id: 'transjakarta',
    name: 'PT Transportasi Jakarta (Transjakarta)',
    logo: transjakartaLogo,
    experiences: [
      {
        id: 'tj-engineer',
        title: 'Senior Software Engineer',
        period: 'Feb 2026 — Present',
        type: 'contract' as const,
      },
    ],
  },
  {
    id: 'phincon',
    name: 'PHINCON',
    logo: phinconLogo,
    experiences: [
      {
        id: 'byu-exp',
        title: 'Software Engineer - Backend',
        period: 'Jul 2025 — Jan 2026',
        type: 'full-time' as const,
      },
      {
        id: 'mytelkomsel-exp',
        title: 'Software Engineer - Android',
        period: 'Jul 2023 — Jun 2025',
        type: 'full-time' as const,
      },
    ],
  },
  {
    id: 'bangkit',
    name: 'Bangkit Academy (Google · Tokopedia · Gojek · Traveloka)',
    logo: bangkitLogo,
    experiences: [
      {
        id: 'bangkit-instructor',
        title: 'Mobile Development Instructor',
        period: 'Feb 2024 — Dec 2024',
        type: 'part-time' as const,
      },
    ],
  },
  {
    id: 'crm',
    name: 'PT Cakra Radha Mustika (Kalbe Group)',
    logo: crmLogo,
    experiences: [
      {
        id: 'crm-engineer',
        title: 'Software Engineer - Mobile Apps (Android & iOS)',
        period: 'Jan 2022 — Jun 2023',
        type: 'contract' as const,
      },
    ],
  },
];

// Certificate structural metadata. Titles stay English (see Global Constraints).
const certificateMeta = [
  {
    type: 'award' as const,
    certificates: [
      {
        id: 'tempa-instructor-2026',
        title: 'Tempa led by Dicoding Instructor',
        certificateUrl:
          'https://drive.google.com/file/d/1D7ccnZBw1xfMwnf4ROZc3u0uz24jGGKD/view?usp=drive_link',
        credentialId: 'Tempa26/LS/XXVI-7/TP26-MD017',
        issueDate: '2026-07-17',
        status: 'active' as const,
        skills: [
          'Mentorship',
          'Technical Training',
          'Mobile Development',
          'Flutter',
          'Student Guidance',
          'Educational Leadership',
        ],
      },
      {
        id: 'dicoding-expert-session-speaker',
        title: 'Dicoding Expert Session Speaker',
        certificateUrl:
          'https://drive.google.com/file/d/14k72at1VwOkw9IQfkNleB6UzeGpuFYL-/view?usp=sharing',
        credentialId: 'DCD/DES/XXV-08/DCD25-GS13',
        issueDate: '2025-08-05',
        status: 'active' as const,
        skills: [
          'Public Speaking',
          'Career Mentoring',
          'Tech Leadership',
          'Personal Branding',
          'Career Development',
          'Professional Networking',
        ],
      },
      {
        id: 'bangkit-contributor-2024-batch2',
        title: 'Bangkit 2024 Batch 2 Instructor',
        certificateUrl:
          'https://drive.google.com/file/d/1i5ZEnaFEtRwLx3tI3wGzKpFIckmlDO3T/view?usp=sharing',
        credentialId: 'BA24/CTRB/XXV-02/MD24-0267',
        issueDate: '2025-02-11',
        status: 'active' as const,
        skills: [
          'Mentorship',
          'Technical Training',
          'Mobile Development',
          'Curriculum Development',
          'Student Guidance',
          'Educational Leadership',
        ],
      },
      {
        id: 'bangkit-contributor-2024-batch1',
        title: 'Bangkit 2024 Batch 1 Instructor',
        certificateUrl:
          'https://drive.google.com/file/d/19_wojNOQ-XnAj-B-QcAFoYsSYQ3Pi0w1/view?usp=sharing',
        credentialId: 'BA24/CTRB/XXIV-07/MD24-0267',
        issueDate: '2024-07-24',
        status: 'active' as const,
        skills: [
          'Mentorship',
          'Technical Training',
          'Mobile Development',
          'Curriculum Development',
          'Student Guidance',
          'Educational Leadership',
        ],
      },
    ],
  },
  {
    type: 'course' as const,
    certificates: [
      {
        id: 'dicoding-flutter-expert',
        title: 'Course: Flutter Expert',
        certificateUrl: 'https://www.dicoding.com/certificates/72ZDOWVJ9XYW',
        credentialId: '72ZDOWVJ9XYW',
        issueDate: '2022-08-30',
        status: 'active' as const,
        skills: [
          'Flutter',
          'Dart',
          'Clean Architecture',
          'TDD',
          'BLoC',
          'CI/CD',
          'Performance',
          'Security',
        ],
      },
      {
        id: 'dicoding-android-expert',
        title: 'Course: Android Expert',
        certificateUrl: 'https://www.dicoding.com/certificates/0LZ03JMENZ65',
        credentialId: '0LZ03JMENZ65',
        issueDate: '2021-11-24',
        status: 'expired' as const,
        skills: [
          'Android',
          'Kotlin',
          'Clean Architecture',
          'RxJava',
          'Coroutines',
          'Dagger',
          'Koin',
          'Modularization',
          'CI/CD',
          'Performance',
          'Security',
        ],
      },
      {
        id: 'dicoding-solid-principles',
        title: 'Course: Solid Principles',
        certificateUrl: 'https://www.dicoding.com/certificates/1RXY44NG1PVM',
        credentialId: '1RXY44NG1PVM',
        issueDate: '2021-11-24',
        status: 'active' as const,
        skills: [
          'OOP',
          'SOLID Principles',
          'Software Design',
          'Inheritance',
          'Encapsulation',
          'Abstraction',
          'Polymorphism',
        ],
      },
    ],
  },
];

const socialMedia = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/fakhrymubarak',
    icon: 'instagram',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/fakhrymubarak',
    icon: 'linkedin',
  },
  { name: 'GitHub', url: 'https://github.com/fakhrymubarak', icon: 'github' },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@fakhry.mubarakk',
    icon: 'youtube',
  },
];

const contactMeta = [
  {
    type: 'resume' as const,
    url: 'https://drive.google.com/file/d/1LFIuiSSoWhdtBmMSRTr3hnLYXM5MgjkX/view',
    icon: 'download',
  },
  {
    type: 'email' as const,
    url: 'mailto:fakhrymubarak@gmail.com?subject=Work%20Opportunity&body=Hi%20Fakhry,',
    icon: 'mail',
  },
  {
    type: 'whatsapp' as const,
    url: 'https://api.whatsapp.com/send/?phone=6285155305499&text=Hi%20Fakhry',
    icon: 'message-circle',
  },
];

// ── Locale-dependent text ─────────────────────────────────────────────

interface PortfolioContent {
  present: string;
  introTitle: [string, string];
  introSubtitle: string;
  introDescription: string;
  projectDescriptions: Record<string, string>; // keyed by project id
  experienceHighlights: Record<string, string[]>; // keyed by experience id
  certificateDescriptions: Record<string, string>; // keyed by certificate id
  contactLabels: Record<'resume' | 'email' | 'whatsapp', string>;
  footerSignature: string;
}

const enContent: PortfolioContent = {
  present: 'Present',
  introTitle: ['Hi, I am', 'Fakhry Mubarak'],
  introSubtitle: 'Software Engineer specializing in Android Development',
  introDescription: `Senior Software Engineer at Transjakarta with ${getYearsOfExperience()} years of experience building large-scale systems for millions of users. Currently passionate about mobile apps. Proficient in developing cross-platform mobile applications using KMP, React Native, and Flutter.`,
  projectDescriptions: {
    'transjakarta-obu':
      'The On-Board Unit (OBU) is an Android application deployed on Transjakarta buses. I developed features including real-time GPS tracking via MQTT to display live bus locations on the Transjakarta App and Google Maps, automated voice announcements triggered by stopping proximity to inform passengers of current and upcoming stops, and integration with the LED units to display the route on the front, back and inside of the bus.',
    'byu-bridging':
      'ByU Bridging is a middleware service built with Go Fiber to facilitate API bridging for migrating millions of ByU users. I developed and maintained the application, ensuring seamless data flow between systems during the migration process. I also provided critical on-call support during post-release phases, diagnosing and resolving production incidents to maintain system uptime during user migrations.',
    mytelkomsel:
      "MyTelkomsel is the official self-care mobile application from Telkomsel, Indonesia's largest cellular provider, with over 100M downloads and ~300K daily active users. I planned, developed, and delivered multiple key features using Kotlin and Java within a clean architecture following SOLID principles. I also led and mentored junior developers, ensuring high code quality and team performance.",
    lifelog:
      'LifeLog is a not simple notes app to write a daily note and track your daily mood. Built with MVVM architecture, Room database, and Material Design UI. Features include daily note writing, mood tracking, note tagging, date-based search, and favorite notes.',
    alkhairaat:
      'Alkhairaat is a membership app for the Alkhairaat Islamic organization in Indonesia. Built with Flutter & Bloc, I implemented core features, maintained performance consistency, and delivered a user-friendly interface for both Android and iOS.',
    'chakra-app':
      'Chakra App is a loyalty membership application for Kalbe Nutritionals users. I migrated 97% of the codebase from Java to Kotlin, refactored from MVP to MVVM, and built a white-label Flutter variant to streamline multi-brand deployments.',
    hress:
      'HRESS is an HR management system for Kalbe Group. I developed and maintained the mobile application using Kotlin and Java, implementing features for employee management, attendance tracking, and HR processes.',
    'akuisisi-loyalty':
      'Akuisisi Loyalty is a customer acquisition and loyalty management system. I developed mobile features for customer onboarding, loyalty programs, and engagement tracking.',
    'showcase-v1':
      "My V1 portfolio showcase is a Flutter Web chosen after KMP's alpha web support proved unreliable, with Flutter delivering stable, seamless cross-platform performance.",
    'shafa-birthday-25th':
      "Shafa's 25th Birthday Web is a heartfelt Flutter Web app built using Dart with Provider + Firebase with featuring interactive, responsive birthday animations and personalized greetings, crafted with 100% love as a surprise gift.",
  },
  experienceHighlights: {
    'tj-engineer': [
      'Developing features for the On-Board Unit (OBU) Android application deployed on Transjakarta buses.',
      'Implementing real-time GPS tracking via MQTT for live bus monitoring.',
      'Creating automated voice announcement systems based on geolocation stop proximity.',
      'Integrating with LED destination signs across the bus fleet.',
    ],
    'byu-exp': [
      'Maintaining Backend App that using Go Fiber to facilitate API bridging for migrating ByU users.',
      'Enhancing Software Engineering skills by learning Backend using Go Programming Language.',
    ],
    'mytelkomsel-exp': [
      'Crafting Android Application with +100M downloads and ~6M daily active users.',
      'Plan, develop, and build features with SOLID principles with a modular clean architecture using MVVM.',
      'Defined story point estimations in Agile sprint planning and collaborated with Scrum Master, PM, QA and backend teams.',
      'Conducting code reviews, mentoring juniors, and leading feature development.',
      'Collaborating with cross-functional teams in Agile environment.',
      'Proactively initiated improvements in legacy code and resolved technical debt across multiple modules.',
      'Handle SDK integrations (Firebase SDK, AyoLari SDK, etc.)',
      'Performed Unit Testing using Junit.',
    ],
    'bangkit-instructor': [
      'Led ILT sessions on Android development for the Bangkit cohort',
    ],
    'crm-engineer': [
      'Migrating Chakra android app data source from vendor server to CRM server (~80 API endpoint)',
      'Migrating app architecture pattern from MVP to MVVM.',
      'Migrating source code language from 100% Java to 97% Kotlin.',
      'Crafting Flutter variant of Chakra Rewards to be Released on Apple App Store',
      'Delivered full-stack Android features (UI to data layers) for multiple loyalty and HR apps',
      'Built and maintained robust mobile architectures supporting long-term scalability.',
      'Integrated REST APIs, sockets, push notifications, and handled multi-threading workflows.',
      'Developed Chakra Rewards and HRESS app with high uptime and responsive UI.',
      'Used design patterns (MVVM, Repository, DI) and maintained excellent code hygiene.',
    ],
  },
  certificateDescriptions: {
    'tempa-instructor-2026':
      "Awarded for outstanding dedication and commitment as an Instructor at Tempa led by Dicoding, sharing insights and expertise with program participants. Tempa is Dicoding's intensive bootcamp that strengthens fundamental tech skills for Indonesian university students across three learning paths - Artificial Intelligence, Web Development, and Mobile Development - through 900+ hours of expert-led sessions, code reviews, and capstone projects. Through the collective effort of all contributors, the program achieved a 92% graduation rate.",
    'dicoding-expert-session-speaker':
      'Recognized as a speaker at Dicoding Expert Session 2025, presenting "From Learner to Leader: Navigating Your Tech Career Path" to ~200 participants from Dicoding Bootcamp Batch 8 and BEKUP Create 2025. Shared insights on tech career mapping, skill development beyond bootcamp, personal branding, and job hunting strategies.',
    'bangkit-contributor-2024-batch2':
      'Awarded for outstanding dedication and commitment as a Contributor at Bangkit 2024 Batch 2, sharing expertise and skills with students. Bangkit is designed to prepare students with in-demand skills and tech certifications, offering 3 interdisciplinary learning paths - machine learning, mobile development, and cloud computing. Led by Google, GoTo, Tokopedia, and Traveloka, supported by the Ministry of Education, Culture, Research, and Technology of Indonesia.',
    'bangkit-contributor-2024-batch1':
      'Awarded for outstanding dedication and commitment as a Contributor at Bangkit 2024 Batch 1, sharing expertise and skills with students. Bangkit is designed to prepare students with in-demand skills and tech certifications, offering 3 interdisciplinary learning paths - machine learning, mobile development, and cloud computing. Led by Google, GoTo, Tokopedia, and Traveloka, supported by the Ministry of Education, Culture, Research, and Technology of Indonesia.',
    'dicoding-flutter-expert':
      'Advanced Flutter development course covering Clean Architecture, TDD, Advanced UI, Modularization, Reactive Programming with BLoC, CI/CD, Performance optimization, Security, and Post-Development practices. Completed 70-hour comprehensive program with final project submission.',
    'dicoding-android-expert':
      'Advanced Android development course covering Clean Architecture, Reactive Programming with RxJava & Coroutines, Dependency Injection (Dagger/Koin), Modularization, CI/CD, Performance optimization, Security, and industry-standard libraries. Completed 90-hour comprehensive program with capstone project submission.',
    'dicoding-solid-principles':
      'Object-Oriented Programming fundamentals course covering OOP pillars (Inheritance, Encapsulation, Abstraction, Polymorphism), object relationships, software design principles, and SOLID principles (Single Responsibility, Open Closed, Liskov Substitution, Interface Segregation, Dependency Inversion). Completed 15-hour program with final exam.',
  },
  contactLabels: {
    resume: 'Download Resume',
    email: 'Write Email',
    whatsapp: 'WhatsApp',
  },
  footerSignature: '© Crafted by Fakhry Mubarak in 2025',
};

const idContent: PortfolioContent = {
  present: 'Sekarang',
  introTitle: ['Hai, saya', 'Fakhry Mubarak'],
  introSubtitle: 'Software Engineer yang berfokus pada Pengembangan Android',
  introDescription: `Senior Software Engineer di Transjakarta dengan ${getYearsOfExperience()} tahun pengalaman membangun sistem berskala besar untuk jutaan pengguna. Saat ini sedang passionate dengan mobile apps. Mampu mengembangkan aplikasi multiplatform mobile menggunakan KMP, React Native, Flutter.`,
  projectDescriptions: {
    'transjakarta-obu':
      'On-Board Unit (OBU) adalah aplikasi Android yang terpasang di bus Transjakarta. Saya mengembangkan berbagai fitur, termasuk pelacakan GPS real-time melalui MQTT untuk menampilkan lokasi bus secara langsung di Aplikasi Transjakarta dan Google Maps, pengumuman suara otomatis yang terpicu oleh kedekatan dengan halte untuk memberi tahu penumpang tentang halte saat ini dan berikutnya, serta integrasi dengan unit LED untuk menampilkan rute di bagian depan, belakang, dan dalam bus.',
    'byu-bridging':
      'ByU Bridging adalah layanan middleware yang dibangun dengan Go Fiber untuk memfasilitasi bridging API dalam migrasi jutaan pengguna ByU. Saya mengembangkan dan memelihara aplikasi ini, memastikan aliran data yang mulus antar sistem selama proses migrasi. Saya juga memberikan dukungan on-call yang krusial pada fase pasca-rilis, mendiagnosis dan menyelesaikan insiden produksi untuk menjaga ketersediaan sistem selama migrasi pengguna.',
    mytelkomsel:
      'MyTelkomsel adalah aplikasi self-care resmi dari Telkomsel, penyedia seluler terbesar di Indonesia, dengan lebih dari 100 juta unduhan dan ~300 ribu pengguna aktif harian. Saya merencanakan, mengembangkan, dan merilis beberapa fitur utama menggunakan Kotlin dan Java dalam clean architecture yang mengikuti prinsip SOLID. Saya juga memimpin dan membimbing developer junior, memastikan kualitas kode dan performa tim yang tinggi.',
    lifelog:
      'LifeLog adalah aplikasi catatan yang tidak sederhana untuk menulis catatan harian dan melacak suasana hati harian Anda. Dibangun dengan arsitektur MVVM, database Room, dan UI Material Design. Fiturnya mencakup penulisan catatan harian, pelacakan suasana hati, pemberian tag catatan, pencarian berdasarkan tanggal, dan catatan favorit.',
    alkhairaat:
      'Alkhairaat adalah aplikasi keanggotaan untuk organisasi Islam Alkhairaat di Indonesia. Dibangun dengan Flutter & Bloc, saya mengimplementasikan fitur inti, menjaga konsistensi performa, dan menghadirkan antarmuka yang ramah pengguna untuk Android maupun iOS.',
    'chakra-app':
      'Chakra App adalah aplikasi keanggotaan loyalitas untuk pengguna Kalbe Nutritionals. Saya memigrasikan 97% basis kode dari Java ke Kotlin, melakukan refactor dari MVP ke MVVM, dan membangun varian white-label berbasis Flutter untuk menyederhanakan deployment multi-merek.',
    hress:
      'HRESS adalah sistem manajemen SDM untuk Kalbe Group. Saya mengembangkan dan memelihara aplikasi mobile menggunakan Kotlin dan Java, mengimplementasikan fitur untuk manajemen karyawan, pelacakan kehadiran, dan proses SDM.',
    'akuisisi-loyalty':
      'Akuisisi Loyalty adalah sistem akuisisi pelanggan dan manajemen loyalitas. Saya mengembangkan fitur mobile untuk onboarding pelanggan, program loyalitas, dan pelacakan keterlibatan.',
    'showcase-v1':
      'Portofolio V1 saya dibangun dengan Flutter Web, dipilih setelah dukungan web alpha KMP terbukti kurang stabil, sementara Flutter memberikan performa lintas platform yang stabil dan mulus.',
    'shafa-birthday-25th':
      'Web Ulang Tahun ke-25 Shafa adalah aplikasi Flutter Web yang penuh makna, dibangun dengan Dart menggunakan Provider + Firebase, menampilkan animasi ulang tahun yang interaktif dan responsif serta ucapan yang dipersonalisasi, dibuat dengan sepenuh hati sebagai hadiah kejutan.',
  },
  experienceHighlights: {
    'tj-engineer': [
      'Mengembangkan fitur untuk aplikasi Android On-Board Unit (OBU) yang terpasang di bus Transjakarta.',
      'Mengimplementasikan pelacakan GPS real-time melalui MQTT untuk pemantauan bus secara langsung.',
      'Membangun sistem pengumuman suara otomatis berdasarkan kedekatan lokasi dengan halte.',
      'Mengintegrasikan papan tujuan LED di seluruh armada bus.',
    ],
    'byu-exp': [
      'Memelihara aplikasi Backend yang menggunakan Go Fiber untuk memfasilitasi bridging API dalam migrasi pengguna ByU.',
      'Meningkatkan keterampilan Software Engineering dengan mempelajari Backend menggunakan bahasa pemrograman Go.',
    ],
    'mytelkomsel-exp': [
      'Membangun aplikasi Android dengan +100 juta unduhan dan ~6 juta pengguna aktif harian.',
      'Merencanakan, mengembangkan, dan membangun fitur dengan prinsip SOLID serta clean architecture modular menggunakan MVVM.',
      'Menentukan estimasi story point dalam perencanaan sprint Agile dan berkolaborasi dengan Scrum Master, PM, QA, dan tim backend.',
      'Melakukan code review, membimbing junior, dan memimpin pengembangan fitur.',
      'Berkolaborasi dengan tim lintas fungsi dalam lingkungan Agile.',
      'Secara proaktif menginisiasi perbaikan pada kode lama dan menyelesaikan technical debt di berbagai modul.',
      'Menangani integrasi SDK (Firebase SDK, AyoLari SDK, dll.)',
      'Melakukan Unit Testing menggunakan JUnit.',
    ],
    'bangkit-instructor': [
      'Memimpin sesi ILT tentang pengembangan Android untuk angkatan Bangkit',
    ],
    'crm-engineer': [
      'Memigrasikan sumber data aplikasi Android Chakra dari server vendor ke server CRM (~80 endpoint API)',
      'Memigrasikan pola arsitektur aplikasi dari MVP ke MVVM.',
      'Memigrasikan bahasa kode sumber dari 100% Java menjadi 97% Kotlin.',
      'Membangun varian Flutter dari Chakra Rewards untuk dirilis di Apple App Store',
      'Menghadirkan fitur Android full-stack (dari lapisan UI hingga data) untuk beberapa aplikasi loyalitas dan SDM',
      'Membangun dan memelihara arsitektur mobile yang tangguh untuk skalabilitas jangka panjang.',
      'Mengintegrasikan REST API, socket, push notification, dan menangani alur multi-threading.',
      'Mengembangkan aplikasi Chakra Rewards dan HRESS dengan ketersediaan tinggi serta UI yang responsif.',
      'Menggunakan design pattern (MVVM, Repository, DI) dan menjaga kebersihan kode dengan baik.',
    ],
  },
  certificateDescriptions: {
    'tempa-instructor-2026':
      'Penghargaan atas dedikasi dan komitmen luar biasa sebagai Instruktur di Tempa yang dipimpin oleh Dicoding, berbagi wawasan dan keahlian dengan peserta program. Tempa adalah bootcamp intensif Dicoding yang memperkuat keterampilan teknologi fundamental bagi mahasiswa Indonesia melalui tiga jalur pembelajaran - Artificial Intelligence, Web Development, dan Mobile Development - lewat 900+ jam sesi bersama pakar, code review, dan proyek capstone. Berkat upaya bersama seluruh kontributor, program ini mencapai tingkat kelulusan 92%.',
    'dicoding-expert-session-speaker':
      'Diakui sebagai pembicara di Dicoding Expert Session 2025, membawakan "From Learner to Leader: Navigating Your Tech Career Path" kepada ~200 peserta dari Dicoding Bootcamp Batch 8 dan BEKUP Create 2025. Berbagi wawasan tentang pemetaan karier teknologi, pengembangan keterampilan setelah bootcamp, personal branding, dan strategi mencari kerja.',
    'bangkit-contributor-2024-batch2':
      'Penghargaan atas dedikasi dan komitmen luar biasa sebagai Kontributor di Bangkit 2024 Batch 2, berbagi keahlian dan keterampilan dengan para peserta. Bangkit dirancang untuk membekali peserta dengan keterampilan yang dibutuhkan industri dan sertifikasi teknologi, menawarkan 3 jalur pembelajaran lintas disiplin - machine learning, mobile development, dan cloud computing. Dipimpin oleh Google, GoTo, Tokopedia, dan Traveloka, didukung oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.',
    'bangkit-contributor-2024-batch1':
      'Penghargaan atas dedikasi dan komitmen luar biasa sebagai Kontributor di Bangkit 2024 Batch 1, berbagi keahlian dan keterampilan dengan para peserta. Bangkit dirancang untuk membekali peserta dengan keterampilan yang dibutuhkan industri dan sertifikasi teknologi, menawarkan 3 jalur pembelajaran lintas disiplin - machine learning, mobile development, dan cloud computing. Dipimpin oleh Google, GoTo, Tokopedia, dan Traveloka, didukung oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia.',
    'dicoding-flutter-expert':
      'Kursus pengembangan Flutter tingkat lanjut yang mencakup Clean Architecture, TDD, Advanced UI, Modularisasi, Reactive Programming dengan BLoC, CI/CD, optimasi Performa, Keamanan, dan praktik Post-Development. Menyelesaikan program komprehensif 70 jam dengan pengumpulan proyek akhir.',
    'dicoding-android-expert':
      'Kursus pengembangan Android tingkat lanjut yang mencakup Clean Architecture, Reactive Programming dengan RxJava & Coroutines, Dependency Injection (Dagger/Koin), Modularisasi, CI/CD, optimasi Performa, Keamanan, dan pustaka standar industri. Menyelesaikan program komprehensif 90 jam dengan pengumpulan proyek capstone.',
    'dicoding-solid-principles':
      'Kursus dasar Object-Oriented Programming yang mencakup pilar OOP (Inheritance, Encapsulation, Abstraction, Polymorphism), relasi antar objek, prinsip desain perangkat lunak, dan prinsip SOLID (Single Responsibility, Open Closed, Liskov Substitution, Interface Segregation, Dependency Inversion). Menyelesaikan program 15 jam dengan ujian akhir.',
  },
  contactLabels: {
    resume: 'Unduh Resume',
    email: 'Tulis Email',
    whatsapp: 'WhatsApp',
  },
  footerSignature: '© Dibuat oleh Fakhry Mubarak pada 2025',
};

const content: Record<Locale, PortfolioContent> = {
  id: idContent,
  en: enContent,
};

// ── Builder ───────────────────────────────────────────────────────────

export const getPortfolioData = (locale: Locale): PortfolioData => {
  const c = content[locale];
  const localizePeriod = (period: string): string =>
    period.replace('Present', c.present);

  return {
    introduction: {
      title: c.introTitle,
      subtitle: c.introSubtitle,
      description: c.introDescription,
      imagePath: avatarImage,
      techStack,
    },
    projects: projectMeta.map(p => ({
      id: p.id,
      title: PROJECT_TITLES[p.id],
      period: localizePeriod(p.period),
      logo: p.logo,
      image: p.image,
      description: c.projectDescriptions[p.id],
      link: p.link,
      stacks: p.stacks,
      featured: p.featured,
      hasGithub: p.hasGithub,
      githubUrl: p.githubUrl,
    })),
    companies: companyMeta.map(company => ({
      id: company.id,
      name: company.name,
      logo: company.logo,
      experiences: company.experiences.map(exp => ({
        id: exp.id,
        title: exp.title,
        period: localizePeriod(exp.period),
        duration: calculateDuration(exp.period),
        type: exp.type,
        highlights: c.experienceHighlights[exp.id],
      })),
    })),
    certificateCategories: certificateMeta.map(cat => ({
      type: cat.type,
      certificates: cat.certificates.map(cert => ({
        id: cert.id,
        title: cert.title,
        description: c.certificateDescriptions[cert.id],
        certificateUrl: cert.certificateUrl,
        credentialId: cert.credentialId,
        issueDate: cert.issueDate,
        status: cert.status,
        skills: cert.skills,
      })),
    })),
    footer: {
      socialMedia,
      contacts: contactMeta.map(contact => ({
        type: contact.type,
        label: c.contactLabels[contact.type],
        url: contact.url,
        icon: contact.icon,
      })),
      signature: c.footerSignature,
      contactImage: footerAvatarImage,
    },
  };
};
