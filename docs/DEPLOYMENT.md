# Deployment Guide

This document explains how to use the new release pipeline and rollback functionality.

## Overview

The project now uses a two-workflow approach:
1. **CI Pipeline** (`ci.yml`) - Runs tests and quality checks on all branches
2. **Release Pipeline** (`release.yml`) - Handles deployments and rollbacks

## Release Process

### 1. Creating a Release

To deploy a new version, create a release branch following this naming convention:

```bash
git checkout -b release/v1.0.0
git push origin release/v1.0.0
```

The release pipeline will automatically:
- Run all tests and quality checks
- Build the application
- Create a Git tag (e.g., `v1.0.0`)
- Deploy to GitHub Pages
- Create a GitHub Release

### 2. Branch Naming Convention

Release branches must follow the pattern: `release/vX.Y.Z`

Examples:
- `release/v1.0.0`
- `release/v1.2.3`
- `release/v2.0.0-beta.1`

### 3. What Happens During Release

1. **Testing Phase**: Runs all tests (unit, accessibility, performance)
2. **Security Check**: Runs security audits and dependency checks
3. **Quality Check**: Runs linting, formatting, and bundle analysis
4. **Build Phase**: Builds the application and runs Lighthouse CI
5. **Deploy Phase**: 
   - Extracts version from branch name
   - Creates Git tag
   - Deploys to GitHub Pages
   - Creates GitHub Release

## Rollback Process

### Manual Rollback

If issues are discovered after deployment, you can rollback to a previous version:

1. Go to the **Actions** tab in GitHub
2. Select the **Release Pipeline** workflow
3. Click **Run workflow**
4. Fill in the parameters:
   - **Version to rollback to**: Enter the version (e.g., `1.0.0` without the `v`)
   - **Reason for rollback**: Describe why the rollback is needed
5. Click **Run workflow**

### What Happens During Rollback

1. **Checkout**: Checks out the specified version tag
2. **Build**: Builds the application from that version
3. **Deploy**: Deploys the rollback version to GitHub Pages
4. **Notification**: Creates a rollback release with details

### Rollback Release Format

Rollback releases are marked as pre-releases and follow this naming:
- Tag: `rollback-v1.0.0-123` (where 123 is the workflow run number)
- Release name: `Rollback to v1.0.0`

## Workflow Comparison

| Feature  | CI Pipeline  | Release Pipeline      |
| -------- | ------------ | --------------------- |
| Triggers | All branches | Release branches only |
| Tests    | ✅            | ✅                     |
| Security | ✅            | ✅                     |
| Quality  | ✅            | ✅                     |
| Build    | ❌            | ✅                     |
| Deploy   | ❌            | ✅                     |
| Rollback | ❌            | ✅                     |

## Best Practices

### Before Creating a Release

1. Ensure all tests pass on the `develop` branch
2. Update version numbers in `package.json` if needed
3. Update changelog or release notes
4. Create a release branch from `master`

### After Deployment

1. Monitor the application for any issues
2. Check GitHub Pages deployment status
3. Verify the release was created correctly
4. Test the deployed application

### Rollback Considerations

1. Only rollback when there are critical issues
2. Document the reason for rollback
3. Investigate the root cause of the issue
4. Plan the fix for the next release

## Troubleshooting

### Common Issues

1. **Release branch not deploying**
   - Ensure branch name follows `release/vX.Y.Z` pattern
   - Check that all tests pass

2. **Rollback fails**
   - Verify the version tag exists
   - Check that the version format is correct (without `v` prefix)

3. **Deployment fails**
   - Check GitHub Pages settings
   - Verify repository secrets are configured
   - Check build logs for errors

### Getting Help

If you encounter issues:
1. Check the Actions tab for detailed logs
2. Review the workflow files in `.github/workflows/`
3. Contact the development team

## Security Notes

- All deployments use GitHub secrets for sensitive data
- Rollback requires manual approval
- All releases are tagged and tracked
- Security audits run on every release
