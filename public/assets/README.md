# Public Assets Directory

This directory contains static assets that are served directly by the web server.

## Structure

```
public/
├── assets/
│   ├── images/           # Static images (logos, icons, etc.)
│   │   ├── logos/        # Company and project logos
│   │   ├── icons/        # SVG and PNG icons
│   │   └── backgrounds/  # Background images
│   ├── fonts/            # Custom fonts (if not using Google Fonts)
│   ├── favicon/          # Favicon files
│   └── documents/        # PDFs, resumes, etc.
├── sw.js                 # Service worker
└── site.webmanifest      # PWA manifest
```

## Best Practices

### Images
- Use **WebP** format for better compression
- Provide **fallback formats** (PNG/JPG) for older browsers
- Optimize images before adding them
- Use descriptive filenames

### Icons
- Prefer **SVG** for scalability
- Use consistent naming convention
- Group related icons in subdirectories

### File Naming
- Use kebab-case: `my-telkomsel-logo.webp`
- Include size in filename if multiple versions: `avatar-300x300.webp`
- Use descriptive names: `hero-background.webp`

### Optimization
- Compress images using tools like TinyPNG, ImageOptim
- Use appropriate formats:
  - WebP for photos and complex images
  - SVG for icons and simple graphics
  - PNG for images requiring transparency 