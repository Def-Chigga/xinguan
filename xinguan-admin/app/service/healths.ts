import { Service } from 'egg';
const { Op } = require('sequelize');

export default class healths extends Service {
  public async getHealthsList(obj) {
    const currentPage = parseInt(obj.currentPage) || 1;
    const pageSize = parseInt(obj.pageSize) || 5;
    const { key } = obj;
    if (key) { // 搜索
      const conditionList:any[] = [];
      conditionList.push({ healthsName: { [Op.substring]: key } });
      const healths = await this.ctx.model.Healths.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          [Op.and]: conditionList,
        },
      });
      const totalCount = await this.ctx.model.Healths.findAndCountAll({
        where: {
          [Op.and]: conditionList,
        },
      });
      return { healths, totalCount: totalCount.count };
    }
    // 分页查询
    const healths = await this.ctx.model.Healths.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ],
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await this.ctx.model.Healths.findAndCountAll();
    return { healths, totalCount: totalCount.count };
  }
  public async createHealths(obj) {
    try {
      const data = await this.ctx.model.Healths.create(obj);
      const healthsData = data.dataValues;
      return healthsData;
    } catch (e) {
      console.log(e);
      throw new Error('健康上报失败');
    }
  }
  public async destroyHealths(id) {
    const role = await this.ctx.model.Healths.findByPk(id);
    if (role) {
      const data = await this.ctx.model.Healths.destroy({
        where: { id },
      });
      if (data > 0) {
        return role;
      }
      throw new Error('删除角色失败');

    } else {
      throw new Error('删除的角色不存在');
    }
  }
  public async updateHealths(id, obj) {
    const role = await this.ctx.model.Healths.findByPk(id);
    if (role) {
      const data = await this.ctx.model.Healths.update(obj, {
        where: {
          id,
        },
      });
      if (data.length > 0) {
        return role;
      }
      throw new Error('更新权限失败');

    } else {
      throw new Error('更新的权限不存在');
    }
  }
}
