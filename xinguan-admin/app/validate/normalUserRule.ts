export default {
  /*
      username:{
          type:'string',
          trim: true,
          min: 6,
          message: '用户名至少是6位'
      }
       */
  /*
      username:{
          type:'myUserName',
          trim: true,
      }
       */
  username: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9]{3,}$/,
    message: '用户名至少是3位',
  },
  password: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9]{3,}$/,
    message: '密码至少是3位',
  },
  captcha: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9]{4,}$/,
    message: '验证码长度为4位',
  },
};
