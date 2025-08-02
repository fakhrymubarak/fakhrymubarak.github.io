// Asset management utilities

export interface AssetConfig {
  src: string
  alt: string
  placeholder?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
}

export interface ImageOptimizationConfig {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
}

/**
 * Generate optimized image URL with parameters
 */
export const getOptimizedImageUrl = (
  originalUrl: string,
  config: ImageOptimizationConfig = {}
): string => {
  const { width, height, quality = 80, format = 'webp' } = config

  // For now, return the original URL
  // In production, you would integrate with an image optimization service
  // like Cloudinary, ImageKit, or Next.js Image Optimization
  return originalUrl
}

/**
 * Generate responsive image srcset
 */
export const getResponsiveSrcSet = (
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280]
): string => {
  return widths
    .map(width => `${getOptimizedImageUrl(baseUrl, { width })} ${width}w`)
    .join(', ')
}

/**
 * Get image dimensions from URL or metadata
 */
export const getImageDimensions = async (url: string): Promise<{ width: number; height: number } | null> => {
  try {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.onerror = () => {
        resolve(null)
      }
      img.src = url
    })
  } catch (error) {
    console.warn('Failed to get image dimensions:', error)
    return null
  }
}

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Preload multiple images
 */
export const preloadImages = async (srcs: string[]): Promise<void> => {
  await Promise.allSettled(srcs.map(preloadImage))
}

/**
 * Generate placeholder for image
 */
export const generatePlaceholder = (width: number, height: number, text?: string): string => {
  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
        ${text || 'Loading...'}
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Asset registry for managing all project assets
 */
export const ASSETS = {
  images: {
    avatar: '/assets/images/img_avatar.webp',
    mytelkomsel: '/assets/images/img_mytelkomsel.webp',
    alkhairaat: '/assets/images/img_alkhairaat.webp',
    chakra: '/assets/images/img_chakra_loyalty.webp',
    contact: '/assets/images/img_contact_me.webp',
  },
  icons: {
    mytelkomsel: '/assets/images/ic_mytelkomsel.webp',
    alkhairaat: '/assets/images/ic_alkhairaat.webp',
    chakra: '/assets/images/ic_chakra_loyalty.webp',
    phincon: '/assets/images/ic_phincon.webp',
    bangkit: '/assets/images/ic_bangkit.webp',
    crm: '/assets/images/ic_crm.webp',
    android: '/assets/icons/dark/ic_android_dark.svg',
    kotlin: '/assets/icons/dark/ic_kotlin_dark.svg',
    java: '/assets/icons/dark/ic_java_dark.svg',
    flutter: '/assets/icons/dark/ic_flutter_dark.svg',
  },
} as const

/**
 * Get asset URL with type safety
 */
export const getAsset = (path: string): string => {
  // In production, you might want to add CDN prefix or versioning
  return path
}

/**
 * Check if asset exists
 */
export const assetExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
} 