# CI/CD Pipeline Documentation

This repository uses GitHub Actions for continuous integration and deployment.

## Workflows

### 1. CI/CD Pipeline (`ci-cd.yml`)
Main pipeline that runs on push to `main` and `develop` branches, and on pull requests.

**Jobs:**
- **Lint and Type Check**: ESLint, TypeScript type checking, and Prettier formatting
- **Build and Test**: Unit tests, build process, and artifact upload
- **Deploy**: Automatic deployment to GitHub Pages (main branch only)
- **Security Audit**: npm audit for vulnerability scanning
- **Performance Check**: Lighthouse CI for performance monitoring

### 2. Deploy to GitHub Pages (`deploy.yml`)
Dedicated deployment workflow for GitHub Pages.

**Features:**
- Runs on push to `main` branch
- Manual trigger support (`workflow_dispatch`)
- Proper permissions and concurrency control
- Environment-specific deployment

### 3. Pull Request Check (`pr-check.yml`)
Quality assurance workflow for pull requests.

**Jobs:**
- **Quality Check**: Linting, type checking, formatting, tests, and security audit
- **Bundle Size Check**: Monitors build size for performance

## Setup Requirements

### GitHub Repository Settings

1. **Enable GitHub Pages:**
   - Go to Settings > Pages
   - Source: "GitHub Actions"
   - Branch: `main`

2. **Required Secrets:**
   - `LHCI_GITHUB_APP_TOKEN` (optional): For Lighthouse CI performance reports

### Local Development

Ensure these npm scripts are available:
```json
{
  "scripts": {
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "test": "jest",
    "build": "tsc && vite build",
    "audit": "npm audit"
  }
}
```

## Performance Monitoring

The pipeline includes Lighthouse CI for performance monitoring with these thresholds:
- Performance: ≥ 80%
- Accessibility: ≥ 90%
- Best Practices: ≥ 80%
- SEO: ≥ 80%

## Deployment

The portfolio is automatically deployed to GitHub Pages when:
- Code is pushed to the `main` branch
- All CI checks pass successfully

**Deployment URL**: `https://[username].github.io/showcase-v2/`

## Troubleshooting

### Common Issues

1. **Build Failures**: Check TypeScript errors and ESLint warnings
2. **Test Failures**: Ensure all tests pass locally before pushing
3. **Performance Issues**: Review Lighthouse CI reports for optimization opportunities
4. **Security Vulnerabilities**: Run `npm audit fix` to resolve security issues

### Manual Deployment

To manually trigger deployment:
1. Go to Actions tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select branch and click "Run workflow" 