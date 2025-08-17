# Dynamic Versioning System

This project uses a dynamic versioning system that automatically updates the service worker version based on your pipeline/release version.

## 🚀 How It Works

The build process automatically injects the version into the service worker, ensuring that:
- Each deployment gets a unique cache name
- Old caches are automatically cleaned up
- Users get the latest version without manual intervention

## 📋 Version Sources

**Environment Variable**: `VITE_APP_VERSION` or `APP_VERSION`

If no environment variable is set, it defaults to `v2.0.0`.

## 🔧 Usage Examples

### 1. Environment Variable (Recommended for CI/CD)

```bash
# Set version in your pipeline
export VITE_APP_VERSION="v2.1.0"
npm run build
```



### 2. GitHub Actions Integration

```yaml
- name: Build with version
  run: npm run build
  env:
    VITE_APP_VERSION: ${{ github.ref_name }}  # Use branch/tag name
```

### 3. Git Tags

```bash
# Create a release tag
git tag v2.1.0
git push origin v2.1.0

# Build will automatically use the tag version
npm run build
```

## 🔄 Auto-Update Behavior

The service worker is configured to:
- ✅ **Automatically update** when a new version is detected
- ✅ **No user notification** - updates happen seamlessly
- ✅ **Clean up old caches** automatically
- ✅ **Reload the page** after update to ensure latest version

## 📁 Generated Files

The build process creates:

1. **`public/sw.js`** - Service worker with injected version
2. **`public/version.json`** - Version information for reference

Example `version.json`:
```json
{
  "version": "v2.1.0",
  "buildTime": "2025-08-17T09:06:52.365Z",
  "buildId": "local"
}
```

## 🛠️ Build Script

The version injection is handled by `scripts/build-with-version.cjs` which:
- Reads version from environment variables
- Injects version into service worker template
- Creates version.json for reference
- Runs before TypeScript compilation and Vite build

## 🚀 Deployment

### Local Development
```bash
npm run build
```

### Production Pipeline
```bash
# Set your version
export VITE_APP_VERSION="v2.1.0"
npm run build
```

### GitHub Actions
```yaml
- name: Build
  run: npm run build
  env:
    VITE_APP_VERSION: ${{ github.ref_name }}
    BUILD_ID: ${{ github.run_id }}
    GITHUB_SHA: ${{ github.sha }}
```

## 🔍 Verification

After building, check:
1. `public/sw.js` - Should contain your version
2. `public/version.json` - Should show build info
3. Browser DevTools → Application → Service Workers - Should show new version

## 🎯 Benefits

- **Automatic Cache Busting**: Each version gets unique cache names
- **Seamless Updates**: Users get latest version without manual refresh
- **Clean Cache Management**: Old versions are automatically removed
- **Pipeline Integration**: Works with any CI/CD system
- **Version Tracking**: Easy to identify which version is deployed
