import { Service } from 'egg';
const { Op } = require('sequelize');

export default class Rights extends Service {
  public async getAllRights() {
    const rights = await this.ctx.model.Rights.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ],
      },
      raw: true,
    });
    return rights;
  }
  public async getRightsList(obj) {
    const currentPage = parseInt(obj.currentPage) || 1;
    const pageSize = parseInt(obj.pageSize) || 5;
    const { key, type } = obj;
    const { rightsType, level } = obj;
    if (key || type) { // 搜索
      const conditionList:any[] = [];
      if (key) {
        conditionList.push({ rightsName: { [Op.substring]: key } });
      }
      if (type) {
        conditionList.push({ rights_type: type });
      }
      const rights = await this.ctx.model.Rights.findAll({
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          [Op.and]: conditionList,
        },
      });
      const totalCount = await this.ctx.model.Rights.findAndCountAll({
        where: {
          [Op.and]: conditionList,
        },
      });
      return { rights, totalCount: totalCount.count };
    } else if (rightsType || level) { // 获取上级分类
      const conditionList:any[] = [];
      if (rightsType) {
        conditionList.push({ rightsType });
      }
      if (level) {
        conditionList.push({ level });
      }
      const rights = await this.ctx.model.Rights.findAll({
        where: {
          [Op.and]: conditionList,
        },
        attributes: {
          exclude: [ 'createdAt', 'updatedAt' ],
        },
      });
      return rights;
    }
    // 分页查询
    const rights = await this.ctx.model.Rights.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ],
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    const totalCount = await this.ctx.model.Rights.findAndCountAll();
    return { rights, totalCount: totalCount.count };

  }
  public async createRights(obj) {
    try {
      const data = await this.ctx.model.Rights.create(obj);
      const roleData = data.dataValues;
      return roleData;
    } catch (e) {
      console.log(e);
      throw new Error('创建权限失败');
    }
  }
  public async destroyRights(id) {
    const role = await this.ctx.model.Rights.findByPk(id);
    if (role) {
      const data = await this.ctx.model.Rights.destroy({
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
  public async updateRights(id, obj) {
    const role = await this.ctx.model.Rights.findByPk(id);
    if (role) {
      const data = await this.ctx.model.Rights.update(obj, {
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
