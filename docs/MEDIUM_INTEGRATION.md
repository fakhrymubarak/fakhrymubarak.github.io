# Medium Integration Documentation

This document explains the automated Medium integration implemented in the portfolio.

## Overview

The Medium integration fetches pre-transformed article JSON from a small Go service
(`https://medium-api.fakhrymubarak.my.id`) and displays them in a dedicated section on your
portfolio. The Go service pulls Medium's RSS server-side, caches it, and exposes a stable
JSON API so the browser never talks to Medium or a CORS proxy.

## Features

- **Go backend API**: `GET /api/medium` returns `MediumData` JSON
- **Caching**: 30-minute client cache (server refreshes on boot + daily at 03:00 Asia/Jakarta)
- **Error Handling**: Graceful fallbacks if the API is unavailable
- **Filtering**: Filter articles by tags/categories
- **Modal View**: Detailed article view with content preview
- **Responsive Design**: Mobile-friendly layout
- **Performance**: Lazy loading and optimized rendering

## Architecture

### Data Flow

```
Medium RSS → Go medium-api (cache) → MediumService → useMedium → MediumSection
```

### Components Structure

```
src/
├── domain/
│   ├── models/index.ts          # MediumArticle, MediumData interfaces
│   └── services/medium.ts       # Fetches JSON from medium-api
├── presentation/
│   ├── hooks/useMedium.ts       # State management hook
│   └── components/sections/
│       ├── MediumSection.tsx    # Main section component
│       └── medium/
│           ├── MediumCard.tsx   # Article card component
│           ├── MediumFilter.tsx  # Filter component
│           └── MediumModal.tsx   # Article modal component
```

## Implementation Details

### 1. API Integration

The `MediumService` class fetches from the Go backend:

```typescript
const mediumData = await MediumService.fetchArticles();
// → GET ${VITE_MEDIUM_API_URL}/api/medium
```

**Features:**

- Configurable via `VITE_MEDIUM_API_URL` (default `https://medium-api.fakhrymubarak.my.id`)
- 30-minute client-side caching
- Error handling with fallback sample article
- Server owns RSS parsing, summaries, images, and snippets

### 2. Data Models

```typescript
interface MediumArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  imageUrl?: string;
  contentSnippet?: string;
}
```

### 3. State Management

The `useMedium` hook provides:

- Article fetching and caching
- Filter state management
- Modal state management
- Pagination controls
- Error handling

### 4. UI Components

**MediumSection**: Main section with header, controls, and article grid
**MediumCard**: Individual article cards with hover effects
**MediumFilter**: Tag-based filtering system
**MediumModal**: Detailed article view with full content

## Configuration

### API URL

```bash
VITE_MEDIUM_API_URL=https://medium-api.fakhrymubarak.my.id
```

### Caching

Articles are cached for 30 minutes to improve performance:

```typescript
private static readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
```

## Usage

### Automatic Integration

The Medium section is automatically included in your portfolio:

```typescript
// HomePage.tsx
<Suspense fallback={null}>
  <MediumSection />
</Suspense>
```

### Manual Refresh

Users can manually refresh articles using the refresh button in the section header.

### Filtering

Users can filter articles by tags using the filter button.

## Error Handling

The integration includes comprehensive error handling:

1. **Network Errors**: Falls back to cached data or empty state
2. **RSS Parsing Errors**: Logs errors and shows fallback UI
3. **CORS Issues**: Uses proxy service for cross-origin requests
4. **Missing Data**: Graceful handling of missing article data

## Performance Optimizations

1. **Lazy Loading**: MediumSection is lazy-loaded
2. **Caching**: 30-minute cache reduces API calls
3. **Pagination**: Shows limited articles initially
4. **Image Optimization**: Responsive images with lazy loading
5. **Animation**: Smooth transitions with Framer Motion

## Testing

To test the RSS feed integration:

```bash
# Run the test script
node test-medium.js
```

This will:

- Fetch your Medium RSS feed
- Parse the articles
- Display article information
- Verify the integration works

## Customization

### Change Username

Update the username in `useMedium.ts`:

```typescript
export const useMedium = (username: string = 'fakhrymubarak') => {
  // ...
};
```

### Modify Cache Duration

Update the cache duration in `MediumService`:

```typescript
private static readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour
```

### Custom Styling

The components use your existing design system:

- CSS classes: `section`, `container`, `heading-2`, etc.
- Theme support: Light/dark mode
- Responsive design: Mobile-first approach

## Troubleshooting

### Common Issues

1. **CORS Errors**: The integration uses a CORS proxy to handle cross-origin requests
2. **Empty Articles**: Check if your Medium RSS feed is accessible
3. **Slow Loading**: Articles are cached for 30 minutes to improve performance
4. **Missing Images**: Images are extracted from article content or media fields

### Debug Mode

Enable debug logging by adding console logs in `MediumService.fetchArticles()`.

## Future Enhancements

Potential improvements:

1. **Server-side Rendering**: Move RSS fetching to build time
2. **Search Functionality**: Add full-text search through articles
3. **Analytics**: Track article clicks and engagement
4. **Custom Styling**: More customization options
5. **Multiple Sources**: Support for multiple Medium accounts

## Dependencies

- `rss-parser`: RSS feed parsing
- `framer-motion`: Animations
- `lucide-react`: Icons
- `axios`: HTTP requests (already installed)

## Security Considerations

- RSS feeds are public and don't require authentication
- CORS proxy service is used for cross-origin requests
- No sensitive data is stored or transmitted
- All external links open in new tabs with `rel="noopener noreferrer"`
