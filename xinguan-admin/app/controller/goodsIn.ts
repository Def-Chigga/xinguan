import { Controller } from 'egg';
import addGoodsInRule from '../validate/addGoodsInRule';

export default class GoodsInController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const goods = await ctx.service.goodsIn.getGoods(ctx.query);
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
      ctx.validate(addGoodsInRule, data);
      // 2.将校验通过的数据保存到数据库中
      const goods = await ctx.service.goodsIn.createGoods(data);
      ctx.success(goods, 200, '物资入库成功');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
}
