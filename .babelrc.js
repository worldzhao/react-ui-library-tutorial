module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  plugins: [
    '@babel/proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        helpers: true,
      },
    ],
  ],
};
