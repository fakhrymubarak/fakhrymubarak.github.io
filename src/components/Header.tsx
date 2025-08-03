import React, { useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Moon, Sun, Menu, X } from 'lucide-react'
import avatarImage from '../assets/images/avatars/img_avatar.webp'

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 'bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md shadow-lg'`}>
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
            <span className="font-display font-semibold text-lg truncate">Fakhry Mubarak</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors flex-shrink-0"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              ) : (
                <Sun className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg bg-light-surface dark:bg-dark-surface hover:bg-light-surface/80 dark:hover:bg-dark-surface/80 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              ) : (
                <Menu className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-light-muted/20 dark:border-dark-muted/20">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-light-muted dark:text-dark-muted hover:text-primary-coral dark:hover:text-primary-coral transition-colors font-medium py-2"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 