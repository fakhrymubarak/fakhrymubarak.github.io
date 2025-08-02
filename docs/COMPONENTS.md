# Component Library Documentation

This document provides an overview of all reusable components in the portfolio project.

## Table of Contents

- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Section Components](#section-components)
- [Usage Examples](#usage-examples)

## UI Components

### Button Component

A flexible button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui/Button'

// Primary button
<Button variant="primary" size="md">
  Click me
</Button>

// Outline button
<Button variant="outline" size="lg">
  Download Resume
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `onClick`: function
- `children`: ReactNode

### LoadingSpinner Component

Animated loading spinner with customizable size and color.

```tsx
import LoadingSpinner from '@/components/ui/LoadingSpinner'

// Default spinner
<LoadingSpinner />

// Custom size and color
<LoadingSpinner size="lg" color="white" />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `color`: 'primary' | 'white' | 'gray'
- `className`: string

### ErrorMessage Component

Error, warning, and info message display component.

```tsx
import ErrorMessage from '@/components/ui/ErrorMessage'

// Error message
<ErrorMessage 
  message="Failed to load projects" 
  type="error" 
  onRetry={handleRetry} 
/>

// Info message
<ErrorMessage 
  message="Loading projects..." 
  type="info" 
/>
```

**Props:**
- `message`: string
- `type`: 'error' | 'warning' | 'info'
- `onRetry`: function (optional)
- `className`: string

## Layout Components

### Layout Component

Main layout wrapper that includes header and footer.

```tsx
import Layout from '@/components/Layout'

<Layout>
  <YourPageContent />
</Layout>
```

### Header Component

Navigation header with theme toggle and mobile menu.

**Features:**
- Responsive navigation
- Dark/light theme toggle
- Mobile hamburger menu
- Smooth scrolling to sections

### Footer Component

Simple footer with copyright information.

## Section Components

### IntroSection Component

Hero section with personal introduction and tech stack.

**Features:**
- Animated title with gradient text
- Tech stack badges
- Call-to-action buttons
- Floating statistics elements

### ProjectsSection Component

Portfolio projects showcase with interactive cards.

**Features:**
- Project cards with images
- Tech stack tags
- External links
- Modal for detailed view (planned)

### ExperienceSection Component

Professional experience timeline.

**Features:**
- Timeline layout
- Company logos
- Employment type indicators
- Key achievements list

### FooterSection Component

Contact information and social media links.

**Features:**
- Contact methods (email, WhatsApp, resume)
- Social media links
- Contact image
- Quick message functionality

## Usage Examples

### Creating a New Section

```tsx
import React from 'react'
import { motion } from 'framer-motion'

const NewSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="heading-2">Section Title</h2>
          <p className="body-text">Section content...</p>
        </motion.div>
      </div>
    </section>
  )
}

export default NewSection
```

### Using Theme Context

```tsx
import { useTheme } from '@/contexts/ThemeContext'

const MyComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Adding Animations

```tsx
import { motion } from 'framer-motion'

const AnimatedComponent: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div variants={itemVariants}>
        Content
      </motion.div>
    </motion.div>
  )
}
```

## Styling Guidelines

### CSS Classes

The project uses Tailwind CSS with custom utility classes:

- `.container`: Max-width container with responsive padding
- `.section`: Standard section padding
- `.btn`: Base button styles
- `.btn-primary`: Primary button variant
- `.btn-secondary`: Secondary button variant
- `.btn-outline`: Outline button variant
- `.card`: Card container with shadow and padding
- `.heading-1`: Large heading (4xl-6xl)
- `.heading-2`: Medium heading (3xl-4xl)
- `.heading-3`: Small heading (2xl-3xl)
- `.body-text`: Body text with proper sizing and color
- `.text-gradient`: Gradient text effect
- `.bg-gradient`: Gradient background

### Color Palette

- **Primary Colors:**
  - Coral: `#FF6F61`
  - Lavender: `#6B5B95`
  - Rose: `#F7CAC9`
  - Olive: `#88B04B`

- **Theme Colors:**
  - Light: White backgrounds, dark text
  - Dark: Dark backgrounds, light text

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Container max-width: 7xl (1280px)

## Best Practices

1. **Component Structure:**
   - Use TypeScript interfaces for props
   - Export components as default exports
   - Use functional components with hooks

2. **Styling:**
   - Use Tailwind utility classes
   - Create custom components for repeated patterns
   - Follow the established color palette

3. **Animations:**
   - Use Framer Motion for complex animations
   - Implement scroll-triggered animations
   - Keep animations subtle and purposeful

4. **Accessibility:**
   - Include proper ARIA labels
   - Ensure keyboard navigation
   - Maintain color contrast ratios

5. **Performance:**
   - Use React.memo for expensive components
   - Implement lazy loading where appropriate
   - Optimize images and assets 