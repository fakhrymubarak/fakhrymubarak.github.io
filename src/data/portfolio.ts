import {PortfolioData} from '@/types'

// Import assets from src/assets directory
import avatarImage from '@/assets/images/avatars/img_avatar.webp'
import footerAvatarImage from '@/assets/images/avatars/img_avatar_footer.webp'
import mytelkomselImage from '@/assets/images/projects/img_mytelkomsel.webp'
import alkhairaatImage from '@/assets/images/projects/img_alkhairaat.webp'
import chakraImage from '@/assets/images/projects/img_chakra_loyalty.webp'
import hressImage from '@/assets/images/projects/img_hress.webp'
import lifelogImage from '@/assets/images/projects/img_lifelog.webp'
import akuisisiImage from '@/assets/images/projects/img_akuisisi_loyalty.webp'

// Import company logos
import mytelkomselLogo from '@/assets/icons/companies/ic_mytelkomsel.webp'
import alkhairaatLogo from '@/assets/icons/companies/ic_alkhairaat.webp'
import chakraLogo from '@/assets/icons/companies/ic_chakra_loyalty.webp'
import phinconLogo from '@/assets/icons/companies/ic_phincon.webp'
import bangkitLogo from '@/assets/icons/companies/ic_bangkit.webp'
import crmLogo from '@/assets/icons/companies/ic_crm.webp'

// Import tech stack icons
import androidIcon from '@/assets/icons/tech/ic_android_dark.svg'
import kotlinIcon from '@/assets/icons/tech/ic_kotlin_dark.svg'
import javaIcon from '@/assets/icons/tech/ic_java_dark.svg'
import flutterIcon from '@/assets/icons/tech/ic_flutter_dark.svg'

export const portfolioData: PortfolioData = {
  introduction: {
    title: ['Hi, I am', 'Fakhry Mubarak'],
    subtitle: 'Software Engineer specializing in Android Development',
    description: 'Mobile Apps focused Software Engineer specializing in app development with over 3.5 years professional experience building scalable softwares. Currently building softwares at PT Phincon. Passionate about clean architecture, SOLID principles, and continuous learning. Experienced in both native Android and Flutter development, with strong mentoring and leadership abilities. Open for any challenges and opportunities.',
    imagePath: avatarImage,
    techStack: [
      {
        name: 'Android',
        icon: androidIcon,
        color: '#3DDC84'
      },
      {
        name: 'Kotlin',
        icon: kotlinIcon,
        color: '#7F52FF'
      },
      {
        name: 'Java',
        icon: javaIcon,
        color: '#ED8B00'
      },
      {
        name: 'Flutter',
        icon: flutterIcon,
        color: '#02569B'
      }
    ]
  },
  projects: [
    {
      id: 'mytelkomsel',
      title: 'MyTelkomsel',
      period: 'Jul 2023 — Present',
      logo: mytelkomselLogo,
      image: mytelkomselImage,
      description: 'MyTelkomsel is the official self-care mobile application from Telkomsel, Indonesia\'s largest cellular provider, with over 100 million downloads and ~300 000 daily active users. I planned, developed, and delivered multiple key features using Kotlin and Java within a clean architecture following SOLID principles. I also led and mentored junior developers, ensuring high code quality and team performance.',
      link: 'https://play.google.com/store/apps/details?id=com.telkomsel.telkomselcm',
      stacks: ['Android', 'Kotlin', 'Java'],
      featured: true,
      hasGithub: false,
      githubUrl: ''
    },
    {
      id: 'alkhairaat',
      title: 'Alkhairaat',
      period: 'Mar 2023 — Jun 2023',
      logo: alkhairaatLogo,
      image: alkhairaatImage,
      description: 'Alkhairaat is a membership app for the Alkhairaat Islamic organization in Indonesia. Built with Flutter & Bloc, I implemented core features, maintained performance consistency, and delivered a user-friendly interface for both Android and iOS.',
      link: 'https://apkpure.com/alkhairaat-app/com.alkhairaat.membership',
      stacks: ['Android', 'Flutter'],
      featured: true,
      hasGithub: false,
      githubUrl: ''
    },
    {
      id: 'chakra-app',
      title: 'Chakra App',
      period: 'Jan 2022 — Jun 2023',
      logo: chakraLogo,
      image: chakraImage,
      description: 'Chakra App is a loyalty membership application for Kalbe Nutritionals users. I migrated 97% of the codebase from Java to Kotlin, refactored from MVP to MVVM, and built a white-label Flutter variant to streamline multi-brand deployments.',
      link: 'https://apkpure.com/chakra-rewards/com.kalbe.cakraloyalty',
      stacks: ['Android', 'Kotlin'],
      featured: true,
      hasGithub: false,
      githubUrl: ''
    },
    {
      id: 'hress',
      title: 'HRESS',
      period: 'Jan 2022 — Jun 2023',
      logo: crmLogo,
      image: hressImage,
      description: 'HRESS is an HR management system for Kalbe Group. I developed and maintained the mobile application using Kotlin and Java, implementing features for employee management, attendance tracking, and HR processes.',
      link: '#',
      stacks: ['Android', 'Kotlin', 'Java'],
      featured: false,
      hasGithub: false,
      githubUrl: ''
    },
    {
      id: 'lifelog',
      title: 'LifeLog',
      period: 'Jan 2022 — Jun 2023',
      logo: crmLogo,
      image: lifelogImage,
      description: 'LifeLog is a not simple notes app to write a daily note and track your daily mood. Built with MVVM architecture, Room database, and Material Design UI. Features include daily note writing, mood tracking, note tagging, date-based search, and favorite notes.',
      link: 'https://github.com/fakhrymubarak/LifeLog',
      stacks: ['Android', 'Kotlin'],
      featured: false,
      hasGithub: true,
      githubUrl: 'https://github.com/fakhrymubarak/LifeLog'
    },
    {
      id: 'akuisisi-loyalty',
      title: 'Akuisisi Loyalty',
      period: 'Jan 2022 — Jun 2023',
      logo: crmLogo,
      image: akuisisiImage,
      description: 'Akuisisi Loyalty is a customer acquisition and loyalty management system. I developed mobile features for customer onboarding, loyalty programs, and engagement tracking.',
      link: '#',
      stacks: ['Android', 'Kotlin'],
      featured: false,
      hasGithub: false,
      githubUrl: ''
    }
  ],
  experience: [
    {
      id: 'mytelkomsel-exp',
      title: 'Android Developer for MyTelkomsel',
      company: 'PHINCON',
      period: 'Jul 2023 — Present',
      duration: '2 yrs',
      logo: phinconLogo,
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
      ]
    },
    {
      id: 'bangkit',
      title: 'Mobile Development Instructor',
      company: 'Bangkit Academy (Google · Tokopedia · Gojek · Traveloka)',
      period: 'Feb 2024 — Dec 2024',
      duration: '11 mos',
      logo: bangkitLogo,
      type: 'part-time',
      highlights: [
        'Led ILT sessions on Android development for the Bangkit cohort'
      ]
    },
    {
      id: 'crm',
      title: 'Software Engineer (Mobile | Kotlin & Flutter)',
      company: 'PT Cakra Radha Mustika (Kalbe Group)',
      period: 'Jan 2022 — Jun 2023',
      duration: '1 yr 6 mos',
      logo: crmLogo,
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
      ]
    }
  ],
  footer: {
    socialMedia: [
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/fakhrymubarak',
        icon: 'instagram'
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/fakhrymubarak',
        icon: 'linkedin'
      },
      {
        name: 'GitHub',
        url: 'https://github.com/fakhrymubarak',
        icon: 'github'
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/@fakhry.mubarakk',
        icon: 'youtube'
      }
    ],
    contacts: [
      {
        type: 'resume',
        label: 'Download Resume',
        url: 'https://drive.google.com/file/d/1p6Z4PxUOCo3ijZ9D5ZAsbQWjRqeIt6CX/view',
        icon: 'download'
      },
      {
        type: 'email',
        label: 'Write Email',
        url: 'mailto:fakhrymubarak@gmail.com?subject=Work%20Opportunity&body=Hi%20Fakhry,',
        icon: 'mail'
      },
      {
        type: 'whatsapp',
        label: 'WhatsApp',
        url: 'https://api.whatsapp.com/send/?phone=6285155305499&text=Hi%20Fakhry',
        icon: 'message-circle'
      }
    ],
    signature: '© Prompted using Cursor in 2025',
    contactImage: footerAvatarImage
  }
} 