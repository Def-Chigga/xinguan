import { Controller } from 'egg';
import addGoodsOutRule from '../validate/addGoodsOutRule';

export default class GoodsOutController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const goods = await ctx.service.goodsOut.getGoods(ctx.query);
      ctx.success(goods);
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
      ctx.validate(addGoodsOutRule, data);
      // 2.将校验通过的数据保存到数据库中
      const goods = await ctx.service.goodsOut.createGoods(data);
      ctx.success(goods, 200, '物资领用成功');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
