module.exports = {
  presets: ['@babel/typescript', '@babel/react'],
  plugins: ['@babel/proposal-class-properties'],
  env: {
    CJS: {
      presets: [['@babel/env']],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: true,
          },
        ],
      ],
    },
    ESM: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: true,
            useESModules: true,
          },
        ],
      ],
    },
  },
};
