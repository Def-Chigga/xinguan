module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 36, // 根元素字体大小
      propList: ['*'], // 那些需要转化为rem *表示所有元素
      selectorBlackList: ['html'] // 那些不需要转化为rem
    }
  }
};
