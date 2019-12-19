module.exports = {
  plugins: [
    'gatsby-theme-docz',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-plugin-import',
      options: {
        libraryName: 'antd',
        style: 'css',
      },
    },
  ],
};
