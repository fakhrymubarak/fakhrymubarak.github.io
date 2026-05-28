# GitHub Actions

This directory contains the GitHub Actions automation for pull request validation,
release deployment, and manual rollback.

## Workflows

| Workflow | File | Trigger | Purpose |
| --- | --- | --- | --- |
| CI/CD Pipeline | [`workflows/ci.yml`](workflows/ci.yml) | Pull requests targeting `master` or `develop` | Validates code quality, tests, security, and production build readiness. |
| Release Pipeline | [`workflows/release.yml`](workflows/release.yml) | Pushes to `v*` tags, or manual `workflow_dispatch` | Builds, deploys, creates GitHub Releases, and supports manual rollback. |

## CI/CD Pipeline

The CI workflow runs on pull requests into `master` and `develop`.

Jobs:

- `test`: installs dependencies with `npm ci`, then runs linting, type checking,
  coverage tests, accessibility tests, and performance tests across Node.js
  `18.x` and `20.x`.
- `security`: runs `npm audit --audit-level=high` and `audit-ci` using
  [`audit-ci.json`](../audit-ci.json).
- `quality`: checks formatting, runs the bundle analysis build, and runs
  Lighthouse CI. Lighthouse failures are currently non-blocking.

Local equivalents:

```sh
npm ci
npm run lint
npm run type-check
npm run test:coverage
npm run test:accessibility
npm run test:performance
npm run format:check
npm run build:analyze
npm audit --audit-level=high
npx audit-ci --config audit-ci.json
```

## Release Pipeline

The release workflow has two paths.

### Tag-Based Deployment

Push a version tag matching `v*` to trigger build and deployment.

Example:

```sh
git checkout master
git pull origin master
git tag -a v2.0.1 -m "Release v2.0.1"
git push origin v2.0.1
```

Jobs:

- `build`: installs dependencies, runs `npm run build`, and uploads `dist/` as a
  workflow artifact.
- `deploy`: downloads the build artifact, resolves the release tag from
  `github.ref_name`, deploys `dist/` to GitHub Pages, and creates a GitHub
  Release for the pushed tag.

The deployed site uses:

- `vars.SITE_URL`, falling back to `https://fakhrymubarak.my.id`.
- `vars.CUSTOM_DOMAIN`, falling back to `fakhrymubarak.github.io`.

### Manual Rollback

Use the `Release Pipeline` workflow's manual dispatch form in GitHub Actions.

Inputs:

- `rollback_version`: the full release tag to rebuild and redeploy, for example
  `v2.0.1`.
- `rollback_reason`: the reason recorded in the rollback release notes.

For a tag named `v2.0.1`, enter `v2.0.1` as the rollback version.

Rollback steps:

- Checks out the requested tag.
- Rebuilds the application.
- Deploys the rebuilt `dist/` directory to GitHub Pages.
- Creates a prerelease rollback notification.

## Required Repository Configuration

Secrets:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`
- `FIREBASE_MEASUREMENT_ID`
- `LHCI_GITHUB_APP_TOKEN` for Lighthouse CI reporting.

Variables:

- `SITE_URL`: canonical site URL used during release builds.
- `CUSTOM_DOMAIN`: custom domain written to the GitHub Pages deployment.

Built-in GitHub token usage:

- `GITHUB_TOKEN` is used to create tags, publish GitHub Pages, and create GitHub
  Releases.

## Maintenance Notes

- Keep workflow Node.js versions aligned with the supported project runtime in
  [`package.json`](../package.json).
- Add new required secrets or variables to this README when workflows start using
  them.
- Keep local parity commands updated when package scripts change.
- Release tags should use the `v*` format expected by the deployment workflow,
  for example `v2.0.1`.
