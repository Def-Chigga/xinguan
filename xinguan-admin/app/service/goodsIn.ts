import { Service } from 'egg';
const { Op } = require('sequelize');

export default class goodsIn extends Service {
  public async getGoods(obj) {
    const currentPage = parseInt(obj.currentPage) || 1;
    const pageSize = parseInt(obj.pageSize) || 5;
    console.log(obj);
    const { goodsInName, goodsInUsername, goodsInDate } = obj;
    if (goodsInName || goodsInUsername || goodsInDate) { // 搜索
      const conditionList:any[] = [];
      conditionList.push({ goodsInName: { [Op.substring]: goodsInName } });
      conditionList.push({ goodsInUsername: { [Op.substring]: goodsInUsername } });
      conditionList.push({ goodsInDate: { [Op.substring]: goodsInDate } });
      const goodsIn = await this.ctx.model.GoodsIn.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          [Op.and]: conditionList,
        },
      });
      const totalCount = await this.ctx.model.GoodsIn.findAndCountAll({
        where: {
          [Op.and]: conditionList,
        },
      });
      return { goodsIn, totalCount: totalCount.count };
    }
    // 分页查询
    const goodsIn = await this.ctx.model.GoodsIn.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ],
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await this.ctx.model.GoodsIn.findAndCountAll();
    return { goodsIn, totalCount: totalCount.count };
  }
  public async createGoods(obj) {
    try {
      const data = await this.ctx.model.GoodsIn.create(obj);
      const goodsInData = data.dataValues;
      console.log('goodsInData+++++++++++', goodsInData);
      const { goodsInName, goodsInType, goodsInTotal, goodsInUnit } = (goodsInData as any);
      const goodsAll = await this.ctx.model.Goods.findOne({ where: { goodsName: goodsInName, goodsType: goodsInType, goodsUnit: goodsInUnit } });
      console.log('goodsAll+++++++++', goodsAll);
      if (goodsAll !== null) {
        // 有
        const { goodsReverse } = goodsAll!.dataValues;
        const goodsNowTotal = goodsReverse + goodsInTotal;
        await this.ctx.model.Goods.update({ goodsReverse: goodsNowTotal }, { where: { goodsName: goodsInName, goodsType: goodsInType, goodsUnit: goodsInUnit } });
      } else {
        console.log('goodsAllData为空++++++++++');
        const newObj = {
          goodsName: goodsInName,
          goodsType: goodsInType,
          goodsUnit: goodsInUnit,
          goodsReverse: goodsInTotal,
        };
        await this.ctx.model.Goods.create(newObj);
      }
      return goodsInData;
    } catch (e) {
      console.log(e);
      throw new Error('物资入库失败');
    }
  }
}
