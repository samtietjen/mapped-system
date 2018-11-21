module.exports = function (wallaby) {
  return {
    files: [
      'packages/*/src/**/*',
      '!packages/*/src/test.js'
    ],
    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },
    tests: [
      'packages/*/test.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest',
    setup(w2) {
      const { jest: jestConfig } = require('./package.json')
      w2.testFramework.configure(jestConfig)
    }
  };
};