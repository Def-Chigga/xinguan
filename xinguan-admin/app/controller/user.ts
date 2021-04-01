import { Controller } from 'egg';
const jwt = require('jsonwebtoken');
import normalUserRule from '../validate/normalUserRule';

export default class UserController extends Controller {
  public async isLogin() {
    const { ctx } = this;
    // 从请求头中获取jwt登录状态
    const token = ctx.get('authorization');
    try {
      // 第一个参数: 需要校验的token
      // 第二个参数: 当初加密的密钥
      const user = jwt.verify(token, this.config.keys);
      ctx.success(user, 200, '已登录');
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
  public async login() {
    const { ctx } = this;
    try {
      const data = ctx.request.body;
      // 校验数据的格式是否正确
      ctx.validate(normalUserRule, data);
      // 校验当前的验证码是否正确
      ctx.helper.verifyImageCode(data.captcha);
      // 2.将校验通过的数据保存到数据库中
      const user = await ctx.service.user.getUser(data);
      delete user.password;
      // 检查用户状态
      if (!user.userState) {
        return ctx.error(400, '用户已经注销');
      }
      // 3.生成JWT令牌
      const obj:any = {};
      obj.username = user.username;
      obj.email = user.email;
      obj.phone = user.phone;
      const token = jwt.sign(obj, this.config.keys, { expiresIn: '7 days' });
      console.log(token);
      console.log(user);
      user.dataValues.token = token;
      // 存用户信息 便于拿到请求权限列表
      ctx.session.user = user;
      ctx.success(user, 200, '登录成功');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async register() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      // 校验数据的格式是否正确
      ctx.validate(normalUserRule, data);
      // 校验当前的验证码是否正确
      ctx.helper.verifyImageCode(data.captcha);
      // 将校验通过的数据保存到数据库中
      const res = await ctx.service.user.createUser(ctx.request.body);
      ctx.success(res, 200, '注册成功 ');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
