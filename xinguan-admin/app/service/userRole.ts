import { Service } from 'egg';

export default class UserRole extends Service {
  public async createUserRole(obj) {
    try {
      const data = await this.ctx.model.UserRole.create(obj);
      const userRoleData = data.dataValues;
      return userRoleData;
    } catch (e) {
      throw new Error('分配角色失败');
    }
  }
  public async destroyUser(userId, roleId) {
    try {
      const data = await this.ctx.model.UserRole.destroy({
        where: { userId, roleId },
      });
      if (data <= 0) {
        throw new Error('删除角色失败');
      }
    } catch (e) {
      throw new Error('删除角色失败');
    }
  }
}
