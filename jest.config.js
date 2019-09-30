
module.exports = {
  verbose: true,
  rootDir: __dirname,
  setupFiles: [
    'raf/polyfill',
    './tests/setup.js'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'TS'
  ],
  testMatch: ['<rootDir>/src/components/**/*.test.js','<rootDir>/src/components/**/test.js'],
  transform: {
    '^.+\\.js?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/_site',
    '<rootDir>/site'
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  reporters: [
    'default',
    'jest-spec-reporter'
  ],
  moduleNameMapper: {
    react: 'nervjs',
    'react-addons-test-utils': 'nerv-test-utils',
    'react-dom': 'nervjs'
  },
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/**/*.native.{ts,tsx}',
    '!components/*/style/*.{ts,tsx}',
  ]
}
