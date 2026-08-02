import React, { useState, useEffect, useRef } from 'react';
import { useTheme, useLanguage, useTranslations } from '@/presentation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import avatarImage from '../../assets/images/avatars/img_avatar.webp';
import { useAnalytics } from '@/presentation';
import { accessibilityUtils } from '@/presentation';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleLanguage } = useLanguage();
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeToggling, setIsThemeToggling] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<
    'idle' | 'exiting' | 'transitioning' | 'entering'
  >('idle');
  const { trackButtonClick } = useAnalytics();

  // Refs to store timeout IDs for cleanup
  const animationTimeoutsRef = useRef<{
    exiting?: NodeJS.Timeout;
    entering?: NodeJS.Timeout;
  }>({});

  // Clean-up timeouts on unmounting
  useEffect(() => {
    const timeouts = animationTimeoutsRef.current;
    return () => {
      if (timeouts.exiting) {
        clearTimeout(timeouts.exiting);
      }
      if (timeouts.entering) {
        clearTimeout(timeouts.entering);
      }
    };
  }, []);

  // Reset animation state if component unmounts during animation
  useEffect(() => {
    return () => {
      setIsThemeToggling(false);
      setAnimationPhase('idle');
    };
  }, []);

  const navItems = [
    { key: 'home', name: t.nav.home, href: '#home' },
    { key: 'projects', name: t.nav.projects, href: '#projects' },
    { key: 'experience', name: t.nav.experience, href: '#experience' },
    { key: 'articles', name: t.nav.articles, href: '#articles' },
    { key: 'contact', name: t.nav.contact, href: '#contact' },
  ];

  const scrollToSection = (href: string, navKey: string, navName: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      accessibilityUtils.announce(`Navigated to ${navName} section`);
    }
    trackButtonClick(`nav_${navKey}`, 'header');
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    // Prevent multiple rapid clicks
    if (isThemeToggling) return;

    setIsThemeToggling(true);
    setAnimationPhase('exiting');

    // Track analytics
    trackButtonClick('theme_toggle', 'header');

    // Start the animation sequence
    animationTimeoutsRef.current.exiting = setTimeout(() => {
      setAnimationPhase('transitioning');

      // Toggle theme and announce the change
      toggleTheme();

      // Announce theme change after the actual theme change
      const newTheme = theme === 'light' ? 'dark' : 'light';
      accessibilityUtils.announce(`Switched to ${newTheme} mode`);

      animationTimeoutsRef.current.entering = setTimeout(() => {
        setAnimationPhase('entering');

        setTimeout(() => {
          setAnimationPhase('idle');
          setIsThemeToggling(false);
        }, 250); // Entering animation duration (matches CSS)
      }, 150); // Brief transition phase
    }, 250); // Exiting animation duration (matches CSS)
  };

  const handleLanguageToggle = () => {
    trackButtonClick('language_toggle', 'header');
    toggleLanguage();
    accessibilityUtils.announce(t.a11y.languageSwitchedTo);
  };

  const handleMenuToggle = () => {
    trackButtonClick('mobile_menu_toggle', 'header');
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    accessibilityUtils.announce(
      `Mobile menu ${newMenuState ? 'opened' : 'closed'}`
    );
  };

  // Get the appropriate animation classes based on current state
  const getIconClasses = (isActive: boolean) => {
    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return isActive
        ? 'opacity-100 scale-100 rotate-0'
        : 'opacity-0 scale-0 rotate-180';
    }

    if (animationPhase === 'idle') {
      return isActive
        ? 'opacity-100 scale-100 rotate-0'
        : 'opacity-0 scale-0 rotate-180';
    }

    if (animationPhase === 'exiting') {
      return isActive ? 'theme-icon-exit' : 'opacity-0 scale-0 rotate-180';
    }

    if (animationPhase === 'transitioning') {
      return 'opacity-0 scale-0 rotate-180';
    }

    if (animationPhase === 'entering') {
      return isActive ? 'theme-icon-enter' : 'opacity-0 scale-0 rotate-180';
    }

    return 'opacity-0 scale-0 rotate-180';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 'bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-lg'`}
      role="banner"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-w-0">
          {/* Logo */}
          <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img
                src={avatarImage}
                alt="Fakhry Mubarak"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-semibold text-lg truncate">
              Fakhry Mubarak
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href, item.key, item.name)}
                className="text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 rounded px-2 py-1"
                aria-label={t.a11y.navigateTo(item.name)}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Language Toggle */}
            <button
              data-testid="language-toggle"
              onClick={handleLanguageToggle}
              className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-all duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 hover:scale-105"
              aria-label={t.a11y.switchToLanguage}
            >
              <span aria-hidden="true" className="text-base leading-none">
                {t.language.flag}
              </span>
              <span className="text-xs font-semibold text-light-muted dark:text-dark-muted">
                {t.language.switchLabel}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              disabled={isThemeToggling}
              className={`p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-all duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 ${
                isThemeToggling ? 'cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <div className="relative w-5 h-5">
                {/* Moon Icon */}
                <Moon
                  className={`absolute inset-0 w-5 h-5 text-light-muted dark:text-dark-muted transition-all duration-300 ${getIconClasses(theme === 'light')}`}
                  aria-hidden="true"
                />

                {/* Sun Icon */}
                <Sun
                  className={`absolute inset-0 w-5 h-5 text-light-muted dark:text-dark-muted transition-all duration-300 ${getIconClasses(theme === 'dark')}`}
                  aria-hidden="true"
                />
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2"
              aria-label={t.a11y.toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X
                  className="w-5 h-5 text-light-muted dark:text-dark-muted"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="w-5 h-5 text-light-muted dark:text-dark-muted"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-light-muted/20 dark:border-dark-muted/20"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() =>
                    scrollToSection(item.href, item.key, item.name)
                  }
                  className="text-left text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-coral focus-visible:ring-offset-2 rounded px-2"
                  aria-label={t.a11y.navigateTo(item.name)}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
