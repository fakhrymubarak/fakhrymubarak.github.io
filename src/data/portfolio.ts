import { PortfolioData } from '../types';
import { calculateDuration } from '../utils/dateUtils';

// Import assets from the src / assets directory
import avatarImage from '@/assets/images/avatars/img_avatar.webp';
import footerAvatarImage from '@/assets/images/avatars/img_avatar_footer.webp';
import mytelkomselImage from '@/assets/images/projects/img_mytelkomsel.webp';
import alkhairaatImage from '@/assets/images/projects/img_alkhairaat.webp';
import chakraImage from '@/assets/images/projects/img_chakra_loyalty.webp';
import hressImage from '@/assets/images/projects/img_hress.webp';
import lifelogImage from '@/assets/images/projects/img_lifelog.webp';
import akuisisiImage from '@/assets/images/projects/img_akuisisi_loyalty.webp';
import shafaWebImage from '@/assets/images/projects/img_shafa_web.webp';
import showcaseV1Image from '@/assets/images/projects/img_showcase_v1.webp';

// Import company logos
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
import androidIconDark from '@/assets/icons/tech/ic_android_dark.svg';
import androidIconLight from '@/assets/icons/tech/ic_android_light.svg';
import kotlinIconDark from '@/assets/icons/tech/ic_kotlin_dark.svg';
import kotlinIconLight from '@/assets/icons/tech/ic_kotlin_light.svg';
import javaIconDark from '@/assets/icons/tech/ic_java_dark.svg';
import javaIconLight from '@/assets/icons/tech/ic_java_light.svg';
import flutterIconDark from '@/assets/icons/tech/ic_flutter_dark.svg';
import flutterIconLight from '@/assets/icons/tech/ic_flutter_light.svg';

export const portfolioData: PortfolioData = {
  introduction: {
    title: ['Hi, I am', 'Fakhry Mubarak'],
    subtitle: 'Software Engineer specializing in Android Development',
    description:
      'Mobile Apps focused Software Engineer specializing in app development with over 3.5 years professional experience building scalable softwares. Currently building softwares at PT Phincon. Passionate about clean architecture, SOLID principles, and continuous learning. Experienced in both native Android and Multiplatform Development using Flutter, with strong mentoring and leadership abilities. Open for any challenges and opportunities.',
    imagePath: avatarImage,
    techStack: [
      {
        name: 'Android',
        icon: {
          light: androidIconLight,
          dark: androidIconDark,
        },
        color: '#3DDC84',
      },
      {
        name: 'Kotlin',
        icon: {
          light: kotlinIconLight,
          dark: kotlinIconDark,
        },
        color: '#7F52FF',
      },
      {
        name: 'Java',
        icon: {
          light: javaIconLight,
          dark: javaIconDark,
        },
        color: '#ED8B00',
      },
      {
        name: 'Flutter',
        icon: {
          light: flutterIconLight,
          dark: flutterIconDark,
        },
        color: '#02569B',
      },
    ],
  },
  projects: [
    {
      id: 'mytelkomsel',
      title: 'MyTelkomsel',
      period: 'Jul 2023 — Jun 2025',
      logo: mytelkomselLogo,
      image: mytelkomselImage,
      description:
        "MyTelkomsel is the official self-care mobile application from Telkomsel, Indonesia's largest cellular provider, with over 100M downloads and ~300K daily active users. I planned, developed, and delivered multiple key features using Kotlin and Java within a clean architecture following SOLID principles. I also led and mentored junior developers, ensuring high code quality and team performance.",
      link: 'https://play.google.com/store/apps/details?id=com.telkomsel.telkomselcm',
      stacks: ['Android', 'Kotlin', 'Java'],
      featured: true,
      hasGithub: false,
      githubUrl: '',
    },
    {
      id: 'lifelog',
      title: 'LifeLog',
      period: 'Jan 2022 — Present',
      logo: lifelogLogo,
      image: lifelogImage,
      description:
        'LifeLog is a not simple notes app to write a daily note and track your daily mood. Built with MVVM architecture, Room database, and Material Design UI. Features include daily note writing, mood tracking, note tagging, date-based search, and favorite notes.',
      link: 'https://play.google.com/store/apps/details?id=com.fakhry.lifelog',
      stacks: ['Android', 'Kotlin'],
      featured: false,
      hasGithub: true,
      githubUrl: 'https://github.com/fakhrymubarak/LifeLog',
    },
    {
      id: 'alkhairaat',
      title: 'Alkhairaat',
      period: 'Mar 2023 — Jun 2023',
      logo: alkhairaatLogo,
      image: alkhairaatImage,
      description:
        'Alkhairaat is a membership app for the Alkhairaat Islamic organization in Indonesia. Built with Flutter & Bloc, I implemented core features, maintained performance consistency, and delivered a user-friendly interface for both Android and iOS.',
      link: 'https://apkpure.com/alkhairaat-app/com.alkhairaat.membership',
      stacks: ['Android', 'Flutter'],
      featured: true,
      hasGithub: false,
      githubUrl: '',
    },
    {
      id: 'chakra-app',
      title: 'Chakra App',
      period: 'Jan 2022 — Jun 2023',
      logo: chakraLogo,
      image: chakraImage,
      description:
        'Chakra App is a loyalty membership application for Kalbe Nutritionals users. I migrated 97% of the codebase from Java to Kotlin, refactored from MVP to MVVM, and built a white-label Flutter variant to streamline multi-brand deployments.',
      link: 'https://apkpure.com/chakra-rewards/com.kalbe.cakraloyalty',
      stacks: ['Android', 'Kotlin'],
      featured: true,
      hasGithub: false,
      githubUrl: '',
    },
    {
      id: 'hress',
      title: 'HRESS',
      period: 'Jan 2022 — Jun 2023',
      logo: hressLogo,
      image: hressImage,
      description:
        'HRESS is an HR management system for Kalbe Group. I developed and maintained the mobile application using Kotlin and Java, implementing features for employee management, attendance tracking, and HR processes.',
      link: 'https://github.com/fakhrymubarak/shafa-25-birthday',
      stacks: ['Android', 'Kotlin', 'Java'],
      featured: false,
      hasGithub: false,
      githubUrl: '',
    },
    {
      id: 'akuisisi-loyalty',
      title: 'Akuisisi Loyalty',
      period: 'Jan 2022 — Jun 2023',
      logo: akuisisiLogo,
      image: akuisisiImage,
      description:
        'Akuisisi Loyalty is a customer acquisition and loyalty management system. I developed mobile features for customer onboarding, loyalty programs, and engagement tracking.',
      link: 'https://play.google.com/store/apps/details?id=com.kalbe.crm.dmqi',
      stacks: ['Android', 'Kotlin'],
      featured: false,
      hasGithub: false,
      githubUrl: '',
    },
    {
      id: 'showcase-v1',
      title: 'V1 of This Site',
      period: 'Apr 2025',
      logo: showcaseV1Logo,
      image: showcaseV1Image,
      description:
        "My V1 portfolio showcase is a Flutter Web chosen after KMP's alpha web support proved unreliable, with Flutter delivering stable, seamless cross-platform performance.",
      link: 'https://fakhrymubarak.github.io/showcase-v1/',
      stacks: ['Flutter', 'Web'],
      featured: false,
      hasGithub: true,
      githubUrl: 'https://github.com/fakhrymubarak/showcase-v1',
    },
    {
      id: 'shafa-birthday-25th',
      title: 'Shafa Birthday Web',
      period: 'Jan 2025',
      logo: shafaLogo,
      image: shafaWebImage,
      description:
        "Shafa's 25th Birthday Web is a heartfelt Flutter Web app built using Dart with Provider + Firebase with featuring interactive, responsive birthday animations and personalized greetings, crafted with 100% love as a surprise gift.",
      link: 'https://fakhrymubarak.github.io/shafa-25-birthday/',
      stacks: ['Flutter', 'Web'],
      featured: false,
      hasGithub: true,
      githubUrl: 'https://github.com/fakhrymubarak/shafa-25-birthday',
    },
  ],
  companies: [
    {
      id: 'phincon',
      name: 'PHINCON',
      logo: phinconLogo,
      experiences: [
        {
          id: 'byu-exp',
          title: 'Software Engineer - Backend',
          period: 'Jul 2025 — Present',
          duration: calculateDuration('Jul 2025 — Present'),
          type: 'full-time',
          highlights: [
            'Maintaining Backend App that using Go Fiber to facilitate API bridging for migrating ByU users.',
            'Enhancing Software Engineering skills by learning Backend using Go Programming Language.',
          ],
        },
        {
          id: 'mytelkomsel-exp',
          title: 'Software Engineer - Android',
          period: 'Jul 2023 — Jun 2025',
          duration: calculateDuration('Jul 2023 — Jun 2025'),
          type: 'full-time',
          highlights: [
            'Crafting Android Application with +100M downloads and ~6M daily active users.',
            'Plan, develop, and build features with SOLID principles with a modular clean architecture using MVVM.',
            'Defined story point estimations in Agile sprint planning and collaborated with Scrum Master, PM, QA and backend teams.',
            'Conducting code reviews, mentoring juniors, and leading feature development.',
            'Collaborating with cross-functional teams in Agile environment.',
            'Proactively initiated improvements in legacy code and resolved technical debt across multiple modules.',
            'Handle SDK integrations (Firebase SDK, AyoLari SDK, etc.)',
            'Performed Unit Testing using Junit.',
          ],
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
          duration: calculateDuration('Feb 2024 — Dec 2024'),
          type: 'part-time',
          highlights: [
            'Led ILT sessions on Android development for the Bangkit cohort',
          ],
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
          duration: calculateDuration('Jan 2022 — Jun 2023'),
          type: 'contract',
          highlights: [
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
      ],
    },
  ],
  certificateCategories: [
    {
      type: 'course',
      certificates: [
        {
          id: 'dicoding-android-expert',
          title: 'Course: Android Expert',
          description:
            'Advanced Android development course covering Clean Architecture, Reactive Programming with RxJava & Coroutines, Dependency Injection (Dagger/Koin), Modularization, CI/CD, Performance optimization, Security, and industry-standard libraries. Completed 90-hour comprehensive program with capstone project submission.',
          certificateUrl: 'https://www.dicoding.com/certificates/0LZ03JMENZ65',
          credentialId: '0LZ03JMENZ65',
          issueDate: '2021-11-24',
          status: 'expired',
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
          description:
            'Object-Oriented Programming fundamentals course covering OOP pillars (Inheritance, Encapsulation, Abstraction, Polymorphism), object relationships, software design principles, and SOLID principles (Single Responsibility, Open Closed, Liskov Substitution, Interface Segregation, Dependency Inversion). Completed 15-hour program with final exam.',
          certificateUrl: 'https://www.dicoding.com/certificates/1RXY44NG1PVM',
          credentialId: '1RXY44NG1PVM',
          issueDate: '2021-11-24',
          status: 'active',
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
        {
          id: 'dicoding-flutter-expert',
          title: 'Course: Flutter Expert',
          description:
            'Advanced Flutter development course covering Clean Architecture, TDD, Advanced UI, Modularization, Reactive Programming with BLoC, CI/CD, Performance optimization, Security, and Post-Development practices. Completed 70-hour comprehensive program with final project submission.',
          certificateUrl: 'https://www.dicoding.com/certificates/72ZDOWVJ9XYW',
          credentialId: '72ZDOWVJ9XYW',
          issueDate: '2022-08-30',
          status: 'active',
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
      ],
    },
    {
      type: 'award',
      certificates: [
        {
          id: 'dicoding-expert-session-speaker',
          title: 'Dicoding Expert Session Speaker',
          description:
            'Recognized as a speaker at Dicoding Expert Session 2025, presenting "From Learner to Leader: Navigating Your Tech Career Path" to ~200 participants from Dicoding Bootcamp Batch 8 and BEKUP Create 2025. Shared insights on tech career mapping, skill development beyond bootcamp, personal branding, and job hunting strategies.',
          certificateUrl:
            'https://drive.google.com/file/d/14k72at1VwOkw9IQfkNleB6UzeGpuFYL-/view?usp=sharing',
          credentialId: 'DCD/DES/XXV-08/DCD25-GS13',
          issueDate: '2025-08-05',
          status: 'active',
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
          id: 'bangkit-contributor-2024-batch1',
          title: 'Bangkit 2024 Batch 1 Instructor',
          description:
            'Awarded for outstanding dedication and commitment as a Contributor at Bangkit 2024 Batch 1, sharing expertise and skills with students. Bangkit is designed to prepare students with in-demand skills and tech certifications, offering 3 interdisciplinary learning paths - machine learning, mobile development, and cloud computing. Led by Google, GoTo, Tokopedia, and Traveloka, supported by the Ministry of Education, Culture, Research, and Technology of Indonesia.',
          certificateUrl:
            'https://drive.google.com/file/d/19_wojNOQ-XnAj-B-QcAFoYsSYQ3Pi0w1/view?usp=sharing',
          credentialId: 'BA24/CTRB/XXIV-07/MD24-0267',
          issueDate: '2024-07-24',
          status: 'active',
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
          id: 'bangkit-contributor-2024-batch2',
          title: 'Bangkit 2024 Batch 1 Instructor',
          description:
            'Awarded for outstanding dedication and commitment as a Contributor at Bangkit 2024 Batch 2, sharing expertise and skills with students. Bangkit is designed to prepare students with in-demand skills and tech certifications, offering 3 interdisciplinary learning paths - machine learning, mobile development, and cloud computing. Led by Google, GoTo, Tokopedia, and Traveloka, supported by the Ministry of Education, Culture, Research, and Technology of Indonesia.',
          certificateUrl:
            'https://drive.google.com/file/d/1i5ZEnaFEtRwLx3tI3wGzKpFIckmlDO3T/view?usp=sharing',
          credentialId: 'BA24/CTRB/XXV-02/MD24-0267',
          issueDate: '2025-02-11',
          status: 'active',
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
  ],
  footer: {
    socialMedia: [
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
      {
        name: 'GitHub',
        url: 'https://github.com/fakhrymubarak',
        icon: 'github',
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/@fakhry.mubarakk',
        icon: 'youtube',
      },
    ],
    contacts: [
      {
        type: 'resume',
        label: 'Download Resume',
        url: 'https://drive.google.com/file/d/1LFIuiSSoWhdtBmMSRTr3hnLYXM5MgjkX/view',
        icon: 'download',
      },
      {
        type: 'email',
        label: 'Write Email',
        url: 'mailto:fakhrymubarak@gmail.com?subject=Work%20Opportunity&body=Hi%20Fakhry,',
        icon: 'mail',
      },
      {
        type: 'whatsapp',
        label: 'WhatsApp',
        url: 'https://api.whatsapp.com/send/?phone=6285155305499&text=Hi%20Fakhry',
        icon: 'message-circle',
      },
    ],
    signature: '© Prompted using Cursor in 2025',
    contactImage: footerAvatarImage,
  },
};
