import { PortfolioData } from '@/types'

export const portfolioData: PortfolioData = {
  introduction: {
    title: ['Hi, I am', 'Fakhry Mubarak'],
    subtitle: 'Android Developer',
    description: 'Software engineer with 3 years of experience in mobile app development, including several published Android apps on the Play Store. Actively expanding my expertise in software engineering and driven by a passion for learning and problem-solving.',
    imagePath: '/assets/images/img_avatar.webp',
    techStack: [
      {
        name: 'Android',
        icon: '/assets/icons/dark/ic_android_dark.svg',
        color: '#3DDC84'
      },
      {
        name: 'Kotlin',
        icon: '/assets/icons/dark/ic_kotlin_dark.svg',
        color: '#7F52FF'
      },
      {
        name: 'Java',
        icon: '/assets/icons/dark/ic_java_dark.svg',
        color: '#ED8B00'
      },
      {
        name: 'Flutter',
        icon: '/assets/icons/dark/ic_flutter_dark.svg',
        color: '#02569B'
      }
    ]
  },
  projects: [
    {
      id: 'mytelkomsel',
      title: 'MyTelkomsel',
      period: 'Jul 2023 — Present',
      logo: '/assets/images/ic_mytelkomsel.webp',
      image: '/assets/images/img_mytelkomsel.webp',
      description: 'MyTelkomsel is the official self-care mobile application from Telkomsel, Indonesia\'s largest cellular provider, with over 100 million downloads and ~300 000 daily active users. I planned, developed, and delivered multiple key features using Kotlin and Java within a clean architecture following SOLID principles. I also led and mentored junior developers, ensuring high code quality and team performance.',
      link: 'https://play.google.com/store/apps/details?id=com.telkomsel.telkomselcm',
      stacks: ['Android', 'Kotlin', 'Java'],
      featured: true
    },
    {
      id: 'alkhairaat',
      title: 'Alkhairaat',
      period: 'Mar 2023 — Jun 2023',
      logo: '/assets/images/ic_alkhairaat.webp',
      image: '/assets/images/img_alkhairaat.webp',
      description: 'Alkhairaat is a membership app for the Alkhairaat Islamic organization in Indonesia. Built with Flutter & Bloc, I implemented core features, maintained performance consistency, and delivered a user-friendly interface for both Android and iOS.',
      link: 'https://apkpure.com/alkhairaat-app/com.alkhairaat.membership',
      stacks: ['Android', 'Flutter'],
      featured: true
    },
    {
      id: 'chakra-app',
      title: 'Chakra App',
      period: 'Jan 2022 — Jun 2023',
      logo: '/assets/images/ic_chakra_loyalty.webp',
      image: '/assets/images/img_chakra_loyalty.webp',
      description: 'Chakra App is a loyalty membership application for Kalbe Nutritionals users. I migrated 97% of the codebase from Java to Kotlin, refactored from MVP to MVVM, and built a white-label Flutter variant to streamline multi-brand deployments.',
      link: 'https://apkpure.com/chakra-rewards/com.kalbe.cakraloyalty',
      stacks: ['Android', 'Kotlin'],
      featured: true
    }
  ],
  experience: [
    {
      id: 'mytelkomsel-exp',
      title: 'Android Developer for MyTelkomsel',
      company: 'PHINCON',
      period: 'Jul 2023 — Present',
      duration: '2 yrs',
      logo: '/assets/images/ic_phincon.webp',
      type: 'full-time',
      highlights: [
        'Crafted an Android app with 100 M+ downloads and ~6 M daily active users',
        'Developed Help Center, Veronika Chat, and InApp Chat features',
        'Assisted Engagement Squad on Commerce features',
        'Followed SOLID principles & clean architecture'
      ]
    },
    {
      id: 'bangkit',
      title: 'Mobile Development Instructor',
      company: 'Bangkit Academy (Google · Tokopedia · Gojek · Traveloka)',
      period: 'Feb 2024 — Dec 2024',
      duration: '11 mos',
      logo: '/assets/images/ic_bangkit.webp',
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
      logo: '/assets/images/ic_crm.webp',
      type: 'contract',
      highlights: [
        'Migrated data sources for Chakra app (80 APIs)',
        'Refactored MVP → MVVM & Java → Kotlin (97%)',
        'Designed & implemented repository pattern',
        'Maintained HRESS & loyalty apps; mentored interns'
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
        url: 'https://drive.google.com/file/d/1p6Z4PxUOCo3ijZ9D5ZAsbQWqRqeIt6CX/view?usp=sharing',
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
    signature: '© Crafted with React JS in 2025',
    contactImage: '/assets/images/img_contact_me.webp'
  }
} 