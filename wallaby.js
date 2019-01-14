module.exports = function (wallaby) {
  return {
    files: [
      'packages/*/src/**/*',
      '!packages/*/test.js',
      'src/**/**/**/*',
      '!src/**/**/*/test.js'
    ],
    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },
    tests: [
      'packages/*/test.js',
      'src/**/*/test.js',
      'test.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest'
  };
};