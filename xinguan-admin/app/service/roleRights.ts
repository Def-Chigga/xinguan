import { Service } from 'egg';

export default class RoleRights extends Service {

  public async createRoleRights(obj) {
    try {
      const roleRights = await this.ctx.model.RoleRights.findOne({
        where: {
          roleId: obj.roleId,
          rightsId: obj.rightsId,
        },
      });
      if (roleRights) return;
      const data = await this.ctx.model.RoleRights.create(obj);
      const userRoleData = data.dataValues;
      return userRoleData;
    } catch (e) {
      throw new Error('分配权限失败');
    }
  }

  public async destroyRoleRights(roleId, rightsId) {
    const data = await this.ctx.model.RoleRights.destroy({
      where: {
        roleId,
        rightsId,
      },
    });
    if (data <= 0) {
      throw new Error('移出权限失败');
    }
  }
  public async destroyAllRoleRights(roleId) {
    const data = await this.ctx.model.RoleRights.destroy({
      where: {
        roleId,
      },
    });
    if (data <= 0) {
      throw new Error('移出权限失败');
    }
  }
}
