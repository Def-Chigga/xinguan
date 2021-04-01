import { Service } from 'egg';
const { Op } = require('sequelize');

export default class Goods extends Service {
  public async getGoodsList(obj) {
    const currentPage = parseInt(obj.currentPage) || 1;
    const pageSize = parseInt(obj.pageSize) || 10;
    const { goodsName, goodsType } = obj;
    if (goodsName || goodsType) { // 搜索
      const conditionList:any[] = [];
      conditionList.push({ goodsName: { [Op.substring]: goodsName } });
      conditionList.push({ goodsType: { [Op.substring]: goodsType } });
      const goods = await this.ctx.model.Goods.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          [Op.and]: conditionList,
        },
      });
      const totalCount = await this.ctx.model.Goods.findAndCountAll({
        where: {
          [Op.and]: conditionList,
        },
      });
      return { goods, totalCount: totalCount.count };
    }
    // 分页查询
    const goods = await this.ctx.model.Goods.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ],
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await this.ctx.model.Goods.findAndCountAll();
    return { goods, totalCount: totalCount.count };
  }
  public async createGoods(obj) {
    const { goodsName } = obj;
    if (goodsName) {
      const good = await this.ctx.model.Goods.findOne({ where: { goodsName } });
      if (good) {
        throw new Error('该物资已存在');
      }
    }
    const data = await this.ctx.model.Goods.create(obj);
    const goodsData = (data as any).dataValues;
    return goodsData;
  }
}
