# Fakhry Mubarak – Showcase V2

A modern, responsive portfolio website built with **React JS** showcasing Fakhry Mubarak's professional experience, projects, and skills as an Android Developer.

---

## Table of Contents

- [Fakhry Mubarak – Showcase V2](#fakhry-mubarak--showcase-v2)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
  - [Sections](#sections)
    - [1. Introduction Section](#1-introduction-section)
    - [2. Projects Section](#2-projects-section)
    - [3. Experience Section](#3-experience-section)
    - [4. Footer Section](#4-footer-section)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development](#development)
    - [Build](#build)
    - [Deployment](#deployment)
    - [GitHub Pages Deployment](#github-pages-deployment)
  - [Project Todo](#project-todo)
    - [Phase 1: Project Setup \& Foundation ✅](#phase-1-project-setup--foundation-)
    - [Phase 2: Core Components Development ✅](#phase-2-core-components-development-)
    - [Phase 3: Page Structure \& Routing 📄](#phase-3-page-structure--routing-)
    - [Phase 4: Content \& Data Management ✅](#phase-4-content--data-management-)
    - [Phase 5: Interactive Features ✅](#phase-5-interactive-features-)
    - [Phase 6: Performance \& Optimization ✅](#phase-6-performance--optimization-)
    - [Phase 7: SEO \& Accessibility ✅](#phase-7-seo--accessibility-)
    - [Phase 8: Testing \& Quality Assurance ✅](#phase-8-testing--quality-assurance-)
    - [Phase 9: Deployment \& Monitoring 🚀](#phase-9-deployment--monitoring-)
    - [Phase 10: Enhancement \& Polish ✨](#phase-10-enhancement--polish-)
    - [Phase 11: Documentation \& Maintenance 📚](#phase-11-documentation--maintenance-)
  - [Contributing](#contributing)
  - [Contact](#contact)

---

## About

* **Title:** Fakhry Mubarak – Showcase Site
* **Description:** A modern, responsive portfolio website built with React JS showcasing Fakhry Mubarak's professional experience, projects, and skills as an Mobile Apps Developer.
* **Version:** 2.0.0
* **Last Updated:** 2025-09-27
* **Live Demo:** [Portfolio Website](https://fakhrymubarak.github.io)

---

## Features

- 🎨 **Modern Design** - Clean and professional UI with smooth animations
- 📱 **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with React and optimized for speed
- 🌙 **Dark/Light Mode** - Toggle between themes (planned feature)
- 📊 **SEO Optimized** - Meta tags and structured data for better search visibility
- 🔍 **Accessibility** - WCAG compliant with keyboard navigation support
- 📈 **Analytics** - Google Analytics integration for visitor tracking

---

## Tech Stack

* **Framework:** React JS 18+
* **Language:** TypeScript
* **Routing:** React Router v6
* **State Management:** React Context API / Zustand
* **Styling:** Tailwind CSS / Styled-Components
* **Animation:** Framer Motion
* **Icons:** React Icons / Lucide React
* **Testing:** Jest + React Testing Library
* **Build Tools:** Vite
* **Linting:** ESLint + Prettier
* **Deployment:** GitHub Pages / Netlify / Vercel

---

## Getting Started

### Prerequisites

* Node.js (v18 or above)
* npm or Yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/fakhrymubarak/fakhrymubarak.github.io.git
cd fakhrymubarak.github.io

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

```bash
# Build for production
npm run build
# or
yarn build
# or
pnpm build
```

### Deployment

```bash
# Deploy to GitHub Pages
npm run deploy
# or
yarn deploy
# or
pnpm deploy
```

### GitHub Pages Deployment

This project is configured for GitHub Pages deployment with the correct base path. The 404 errors you were experiencing have been resolved by:

#### What Was Fixed

1. **Base Path Configuration**: Added `base: `/` to `vite.config.ts` for production builds
2. **Service Worker Paths**: Updated service worker registration to use the correct base path
3. **Asset Paths**: All static assets (icons, manifest, etc.) now use the correct base path
4. **HTML Paths**: Updated all hardcoded paths in `index.html` and `manifest.json`

#### Key Changes Made

- **Vite Config**: Added dynamic base path configuration
- **Service Worker**: Updated to handle subdirectory deployment
- **Static Assets**: All paths now correctly prefixed with `/`
- **TypeScript**: Added proper environment type definitions

#### Deployment Process

1. **Automatic**: The project uses GitHub Actions for CI/CD deployment
2. **Manual**: Use the provided deployment script:
   ```bash
   ./deploy.sh
   ```

#### Troubleshooting

If you encounter 404 errors after deployment:

1. **Clear Browser Cache**: Hard refresh (Ctrl+F5 / Cmd+Shift+R)
2. **Check Service Worker**: Clear service worker cache in browser dev tools
3. **Verify Base Path**: Ensure `vite.config.ts` has the correct base path
4. **Check Asset Paths**: Verify all static assets use the correct base path

---

## Project Todo

### Phase 1: Project Setup & Foundation ✅
- [x] Initialize React project with Vite
- [x] Set up TypeScript configuration
- [x] Configure ESLint and Prettier
- [x] Set up Git repository and initial commit
- [x] Create basic project structure
- [x] Install essential dependencies (React Router, Tailwind CSS, etc.)

### Phase 2: Core Components Development ✅
- [x] Create reusable UI components
  - [x] Button component with variants
  - [x] Card component for projects
  - [x] Navigation component
  - [x] Footer component
  - [x] Loading and error states
- [x] Implement responsive layout system
- [x] Set up global styles and theme configuration
- [x] Create component library documentation

### Phase 3: Page Structure & Routing 📄
- [x] Set up React Router configuration
- [x] Create main page layouts
  - [x] Home/Introduction page
  - [x] Projects page
  - [x] Experience page
  - [x] Contact page
- [x] Implement navigation between pages
- [x] Add page transitions and animations

### Phase 4: Content & Data Management ✅
- [x] Create data structure for projects
- [x] Create data structure for experience
- [x] Implement content management system
- [x] Add image optimization and lazy loading
- [x] Set up asset management (icons, images, etc.)

### Phase 5: Interactive Features ✅
- [x] Implement dark/light theme toggle
- [x] Add smooth scrolling navigation
- [x] Create project filtering system
- [x] Implement contact form functionality
- [x] Add social media integration
- [x] Create download resume functionality

### Phase 6: Performance & Optimization ✅
- [x] Implement code splitting and lazy loading
- [x] Optimize images and assets
- [x] Add service worker for offline support
- [x] Implement caching strategies
- [x] Optimize bundle size
- [x] Add performance monitoring

### Phase 7: SEO & Accessibility ✅
- [x] Add meta tags and Open Graph data
- [x] Implement structured data (JSON-LD)
- [x] Ensure WCAG compliance
- [x] Add keyboard navigation support
- [x] Implement screen reader support
- [x] Add sitemap and robots.txt

### Phase 8: Testing & Quality Assurance 🧪
- [x] Write unit tests for components
- [x] Write integration tests for pages
- [x] Add end-to-end testing
- [x] Implement accessibility testing
- [x] Add performance testing
- [x] Set up CI/CD pipeline

### Phase 9: Deployment & Monitoring 🚀
- [ ] Configure deployment to GitHub Pages
- [ ] Add Google Analytics
- [ ] Implement error tracking
- [ ] Set up monitoring and alerts
- [ ] Create deployment documentation

### Phase 10: Enhancement & Polish ✨
- [ ] Add advanced animations with Framer Motion
- [ ] Implement progressive web app features
- [ ] Add blog section (optional)
- [ ] Create admin panel for content management
- [ ] Add multi-language support
- [ ] Implement A/B testing framework

### Phase 11: Documentation & Maintenance 📚
- [ ] Complete README documentation
- [ ] Create component documentation
- [ ] Add contribution guidelines
- [ ] Set up issue templates
- [ ] Create maintenance schedule
- [ ] Plan future feature roadmap

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Contact

Fakhry Mubarak - [fakhrymubarak@gmail.com](mailto:fakhrymubarak@gmail.com)

Project Link: [https://github.com/fakhrymubarak/fakhrymubarak.github.io](https://github.com/fakhrymubarak/fakhrymubarak.github.io)
