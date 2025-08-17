// Asset management utilities

export interface AssetConfig {
  src: string;
  alt: string;
  placeholder?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export interface ImageOptimizationConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

/**
 * Generate optimized image URL with parameters
 */
export const getOptimizedImageUrl = (
  originalUrl: string,
  _config: ImageOptimizationConfig = {}
): string => {
  // For now, return the original URL
  // In production, you would integrate with an image optimization service
  // like Cloudinary, ImageKit, or Next.js Image Optimization
  return originalUrl;
};

/**
 * Generate responsive image srcset
 */
export const getResponsiveSrcSet = (
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280]
): string => {
  return widths
    .map(width => `${getOptimizedImageUrl(baseUrl, { width })} ${width}w`)
    .join(', ');
};

/**
 * Get image dimensions from URL or metadata
 */
export const getImageDimensions = async (
  url: string
): Promise<{ width: number; height: number } | null> => {
  try {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = url;
    });
  } catch (error) {
    console.warn('Failed to get image dimensions:', error);
    return null;
  }
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 */
export const preloadImages = async (srcs: string[]): Promise<void> => {
  await Promise.allSettled(srcs.map(preloadImage));
};

/**
 * Generate placeholder for image
 */
export const generatePlaceholder = (
  width: number,
  height: number,
  text?: string
): string => {
  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
        ${text || 'Loading...'}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Asset registry for managing all project assets
 */
export const ASSETS = {
  // Source assets (processed by Vite) - Actual assets in the project
  source: {
    images: {
      avatars: {
        profile: '/src/assets/images/avatars/img_avatar.webp',
      },
      projects: {
        mytelkomsel: '/src/assets/images/projects/img_mytelkomsel.webp',
        alkhairaat: '/src/assets/images/projects/img_alkhairaat.webp',
        chakra: '/src/assets/images/projects/img_chakra_loyalty.webp',
        hress: '/src/assets/images/projects/img_hress.webp',
        lifelog: '/src/assets/images/projects/img_lifelog.webp',
        akuisisi: '/src/assets/images/projects/img_akuisisi_loyalty.webp',
      },
      experience: {
        // Experience-related images if any
      },
      backgrounds: {
        // Background images if any
      },
    },
    icons: {
      tech: {
        android: {
          light: '/src/assets/icons/tech/ic_android_light.svg',
          dark: '/src/assets/icons/tech/ic_android_dark.svg',
        },
        kotlin: {
          light: '/src/assets/icons/tech/ic_kotlin_light.svg',
          dark: '/src/assets/icons/tech/ic_kotlin_dark.svg',
        },
        java: {
          light: '/src/assets/icons/tech/ic_java_light.svg',
          dark: '/src/assets/icons/tech/ic_java_dark.svg',
        },
        flutter: {
          light: '/src/assets/icons/tech/ic_flutter_light.svg',
          dark: '/src/assets/icons/tech/ic_flutter_dark.svg',
        },
      },
      companies: {
        mytelkomsel: '/src/assets/icons/companies/ic_mytelkomsel.webp',
        alkhairaat: '/src/assets/icons/companies/ic_alkhairaat.webp',
        chakra: '/src/assets/icons/companies/ic_chakra_loyalty.webp',
        phincon: '/src/assets/icons/companies/ic_phincon.webp',
        bangkit: '/src/assets/icons/companies/ic_bangkit.webp',
        crm: '/src/assets/icons/companies/ic_crm.webp',
        hress: '/src/assets/icons/companies/ic_hress_crm.webp',
        lifelog: '/src/assets/icons/companies/ic_lifelog.webp',
        akuisisi: '/src/assets/icons/companies/ic_akuisisi_loyalty.webp',
      },
      social: {
        // Social media icons if any
      },
      ui: {
        // UI icons if any
      },
    },
  },
} as const;

/**
 * Get asset URL with type safety
 */
export const getAsset = (path: string): string => {
  // In production, you might want to add CDN prefix or versioning
  return path;
};

/**
 * Check if asset exists
 */
export const assetExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};
