import { Controller } from 'egg';
import addHealthsRule from '../validate/addHealthsRule';

export default class HealthsController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const healths = await ctx.service.healths.getHealthsList(ctx.query);
      ctx.success(healths);
    } catch (e) {
      ctx.error(500, e.message);
    }
  }
  public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    console.log(data);
    try {
      // 1.校验数据和验证码
      ctx.validate(addHealthsRule, data);
      // 2.将校验通过的数据保存到数据库中
      const healths = await ctx.service.healths.createHealths(data);
      ctx.success(healths, 200, '健康上报成功');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(addHealthsRule, data);
      // 2.将校验通过的数据保存到数据库中
      const healths = await ctx.service.healths.updateHealths(id, data);
      ctx.success(healths);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const healths = await ctx.service.healths.destroyHealths(id);
      ctx.success(healths);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
}
