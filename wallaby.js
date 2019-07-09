module.exports = function (wallaby) {
  return {
    files: [
      'packages/*/src/**/*',
      '!packages/*/test.js',
      '!packages/*/tests/*'

    ],
    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },
    tests: [
      'packages/*/test.js',
      'packages/*/tests/*'
    ],
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest'
  };
};