module.exports = {
  env: {
    mocha: true,
  },
  plugins: [
    "chai-friendly"
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'prefer-destructuring': 'off',
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  }
};
