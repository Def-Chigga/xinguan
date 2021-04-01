import { Controller } from 'egg';
// import addGoodsRule from '../validate/addGoodsRule';
const fs = require('fs');
const xlsx = require('node-xlsx');

export default class GoodsController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const goods = await ctx.service.goods.getGoodsList(ctx.query);
      ctx.success(goods);
    } catch (e) {
      ctx.error(500, e.message);
    }
  }
  /* public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    console.log(data);
    try {
      ctx.validate(addGoodsRule, data);
      const goods = await ctx.service.goods.createGoods(data);
      ctx.success(goods);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }*/
  public async importGoods() {
    const { ctx } = this;
    let transaction;
    try {
      const file = ctx.request.files[0];
      // 1.读取Excel文件
      const workSheets = xlsx.parse(fs.readFileSync(file.filepath));
      // 2.获取到需要操作的那一页的对象
      const sheet1 = workSheets.length ? workSheets[0] : null;
      const sheet1Data = sheet1 ? sheet1.data : [];
      const goods:any[] = [];
      // 开启事物 要么全部导入要么全部回滚
      transaction = await ctx.model.transaction();
      for (let i = 1; i < sheet1Data.length; i++) {
        // 获取到所有的key
        const columnTitles = sheet1Data[0];
        // 获取到当前行的数据
        const columnValues = sheet1Data[i];
        const good = {};
        for (let j = 0; j < columnTitles.length; j++) {
          good[columnTitles[j]] = columnValues[j];
        }
        // 添加用户
        await ctx.service.goods.createGoods(good);
        goods.push(good);
      }
      // 执行事物
      await transaction.commit();
      ctx.success(goods, 200, '添加物资成功');
    } catch (e) {
      // 出错回滚事物
      await transaction.rollback();
      ctx.error(500, e.message);
    }
  }
}
