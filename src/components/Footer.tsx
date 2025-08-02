import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-muted/20 dark:border-dark-muted/20">
      <div className="container py-8">
        <div className="text-center">
          <p className="text-sm text-light-muted dark:text-dark-muted">
            © 2025 Fakhry Mubarak. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 