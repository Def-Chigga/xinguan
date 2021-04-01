module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
};
