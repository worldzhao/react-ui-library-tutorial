const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  plugins: [
    require.resolve('prettier-plugin-packagejson'),
    require.resolve('prettier-plugin-organize-imports'),
  ],
};
