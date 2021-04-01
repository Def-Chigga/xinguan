module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 强制语句结束添加，分号
    semi: ['error', 'always'],
    // 强制缩进2个空格
    // indent: ['error', 4],
    // 方法名和刮号之间不加空格
    'space-before-function-paren': ['error', 'never'],
    'no-unexpected-multiline': 'off'
  }
};
