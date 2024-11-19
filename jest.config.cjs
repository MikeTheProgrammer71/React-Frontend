module.exports = {
  moduleFileExtensions: ['js', 'json', 'tsx', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testMatch: [
    '**/tests/**/*.spec.(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
 moduleNameMapper: {
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
 },
 reporters: [
  "default", 
  ["jest-html-reporter", {
    pageTitle: "Test Report",
    outputPath: "test-report.html",
    includeFailureMsg: true,
    }]
  ]
};