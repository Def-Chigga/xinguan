import { Service } from 'egg';
const { Op } = require('sequelize');

export default class goodsOut extends Service {
  public async getGoods(obj) {
    const currentPage = parseInt(obj.currentPage) || 1;
    const pageSize = parseInt(obj.pageSize) || 5;
    console.log(obj);
    const { goodsOutName, goodsOutUsername, goodsOutDate } = obj;
    if (goodsOutName || goodsOutUsername || goodsOutDate) { // 搜索
      const conditionList:any[] = [];
      conditionList.push({ goodsOutName: { [Op.substring]: goodsOutName } });
      conditionList.push({ goodsOutUsername: { [Op.substring]: goodsOutUsername } });
      conditionList.push({ goodsOutDate: { [Op.substring]: goodsOutDate } });
      const goodsOut = await this.ctx.model.GoodsOut.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          [Op.and]: conditionList,
        },
      });
      const totalCount = await this.ctx.model.GoodsOut.findAndCountAll({
        where: {
          [Op.and]: conditionList,
        },
      });
      return { goodsOut, totalCount: totalCount.count };
    }
    // 分页查询
    const goodsOut = await this.ctx.model.GoodsOut.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ],
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await this.ctx.model.GoodsOut.findAndCountAll();
    return { goodsOut, totalCount: totalCount.count };
  }
  public async createGoods(obj) {
    try {
      const { goodsOutName, goodsOutType, goodsOutTotal, goodsOutUnit } = (obj as any);
      const goodsAll = await this.ctx.model.Goods.findOne({ where: { goodsName: goodsOutName, goodsType: goodsOutType, goodsUnit: goodsOutUnit } });
      if (goodsAll !== null) {
        // 有
        const { goodsReverse } = goodsAll!.dataValues;
        if ((goodsReverse as any) > goodsOutTotal) {
          const goodsNowTotal = goodsReverse! - goodsOutTotal;
          await this.ctx.model.Goods.update({ goodsReverse: goodsNowTotal }, { where: { goodsName: goodsOutName, goodsType: goodsOutType, goodsUnit: goodsOutUnit } });
          const data = await this.ctx.model.GoodsOut.create(obj);
          return data.dataValues;
        }
        throw new Error('物资库存不足');

      } else {
        throw new Error('没有该类型物资，请检查规格再试');
      }
    } catch (e) {
      throw new Error('物资入库失败  ' + e);
    }
  }
}
