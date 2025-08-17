export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'import.meta': {
      env: {
        VITE_FIREBASE_API_KEY: 'test-api-key',
        VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
        VITE_FIREBASE_PROJECT_ID: 'test-project-id',
        VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
        VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-sender-id',
        VITE_FIREBASE_APP_ID: 'test-app-id',
        VITE_FIREBASE_MEASUREMENT_ID: 'test-measurement-id',
      },
    },
  },
  moduleNameMapper: {
    '^@assets/(.*)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/assets/(.*)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@infrastructure/adapters/firebase$': '<rootDir>/__mocks__/firebaseMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  testMatch: [
    '**/__tests__/**/*.(ts|tsx)',
    '**/?(*.)+(spec|test).(ts|tsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/**/*.stories.(ts|tsx)',
    '!src/**/*.test.(ts|tsx)',
    '!src/**/*.spec.(ts|tsx)',
    '!src/domain/valueObjects/sw.ts',
    '!src/shared/test-utils/test-utils.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/e2e/',
    'e2e/',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  // Performance optimizations
  maxWorkers: '50%',
  workerIdleMemoryLimit: '512MB',
  testTimeout: 10000,
  // Faster test execution
  bail: false,
  verbose: false,
  // Cache optimizations
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  // Transform optimizations
  transformIgnorePatterns: [
    'node_modules/(?!(framer-motion|@framer)/)',
  ],
} 