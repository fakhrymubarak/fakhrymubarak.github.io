# GitHub Actions Workflows

This directory contains the CI/CD workflows for the showcase-v2 project.

## Workflows

### 1. CI Pipeline (`ci.yml`)

**Triggers:** Push to `master`/`develop` branches, Pull Requests to `master`/`develop`

**Jobs:**
- **Quality Check**: Runs linting, type checking, formatting, tests, and security audit
- **Build and Analyze**: Builds the application and analyzes bundle size
- **Performance Analysis**: Runs Lighthouse CI performance tests (only on `master` branch)

**Features:**
- ✅ ESLint code quality checks
- ✅ TypeScript type checking
- ✅ Prettier formatting validation
- ✅ Jest test coverage
- ✅ npm security audit
- ✅ Bundle size analysis
- ✅ Lighthouse CI performance testing
- ✅ Accessibility testing
- ✅ SEO testing
- ✅ Best practices validation

### 2. Deploy Pipeline (`deploy.yml`)

**Triggers:** Push to `master` branch, Manual dispatch

**Jobs:**
- **Deploy to GitHub Pages**: Builds and deploys the application to GitHub Pages

**Features:**
- ✅ Automatic deployment on master branch
- ✅ Manual deployment capability
- ✅ Concurrency control to prevent deployment conflicts
- ✅ Proper GitHub Pages permissions

## Performance Analysis

### Lighthouse CI Metrics

The performance analysis checks the following metrics:

- **Performance Score**: Minimum 0.7 (70%)
- **Accessibility Score**: Minimum 0.9 (90%) - **Required**
- **Best Practices Score**: Minimum 0.8 (80%)
- **SEO Score**: Minimum 0.8 (80%)
- **First Contentful Paint**: Maximum 3 seconds
- **Largest Contentful Paint**: Maximum 4 seconds

### Performance Reports

Lighthouse CI generates detailed performance reports that are uploaded to temporary storage. The reports include:

- Performance scores and metrics
- Accessibility audit results
- SEO recommendations
- Best practices suggestions
- Detailed performance timeline

## Best Practices Implemented

### Security
- ✅ Minimal required permissions for each workflow
- ✅ Security audits with moderate level checks
- ✅ No secrets exposed in logs

### Performance
- ✅ npm caching for faster builds
- ✅ Artifact sharing between jobs
- ✅ Parallel job execution where possible
- ✅ Bundle size monitoring
- ✅ Lighthouse CI performance testing

### Reliability
- ✅ Proper error handling with `continue-on-error` where appropriate
- ✅ Job dependencies to ensure proper execution order
- ✅ Concurrency control for deployments

### Maintainability
- ✅ Environment variables for configuration
- ✅ Clear job and step naming
- ✅ Comprehensive documentation

## Required Secrets

- `LHCI_GITHUB_APP_TOKEN`: Lighthouse CI GitHub App token (optional, for performance reporting)

## Local Development

To run the same checks locally:

```bash
# Quality checks
npm run lint
npm run type-check
npm run format:check
npm run test:coverage
npm audit --audit-level=moderate

# Build
npm run build

# Performance (requires @lhci/cli)
npx lhci autorun
```

## Performance Optimization Tips

Based on Lighthouse CI results, consider these optimizations:

1. **Image Optimization**: Use WebP format and proper sizing
2. **Code Splitting**: Implement lazy loading for components
3. **Bundle Analysis**: Monitor and optimize bundle size
4. **Caching**: Implement proper caching strategies
5. **Critical CSS**: Inline critical CSS for faster rendering

## Troubleshooting

### Common Issues

1. **Tests failing**: Ensure all tests pass locally before pushing
2. **Linting errors**: Run `npm run lint` and fix any issues
3. **Type errors**: Run `npm run type-check` to identify type issues
4. **Formatting issues**: Run `npm run format` to auto-format code
5. **Performance warnings**: Review Lighthouse CI reports for optimization opportunities

### Performance Issues

- Check Lighthouse CI results in the workflow logs
- Monitor bundle size trends
- Review performance assertions in `lighthouserc.json`
- Consider image optimization and code splitting

### Lighthouse CI Issues

- Ensure Chrome is available in the CI environment
- Check that the preview server starts correctly
- Verify the URL configuration in `lighthouserc.json`
- Review performance thresholds if tests are too strict 