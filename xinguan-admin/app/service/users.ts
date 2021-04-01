import { Service } from 'egg';
import { Role } from '../model/role';
const { Op } = require('sequelize');

export default class Users extends Service {
  public async getAll() {
    return this.ctx.model.User.findAll({
      attributes: {
        exclude: [ 'password', 'created_at', 'updated_at' ],
      },
    });
  }
  public async getUserList(obj) {
    const currentPage = parseInt(obj.currentPage) || 1;
    const pageSize = parseInt(obj.pageSize) || 5;
    const { role, type, key } = obj;
    const defaultCondition = {
      [Op.or]: [
        { username: { [Op.substring]: key } },
        { email: { [Op.substring]: key } },
        { phone: { [Op.substring]: key } },
      ],
    };
    if (key || role || type) {
      // 如果有附加条件, 那么就必须同时满足多个条件
      const conditionList:any[] = [];
      if (key) {
        conditionList.push(defaultCondition);
      }
      if (role) {}
      if (type) {
        // {username: {[Op.substring]: 123}}
        // {email: {[Op.substring]: 123}}
        // {phone: {[Op.substring]: 123}}
        conditionList.push({ [type]: { [Op.substring]: key } });
      }
      const users = await this.ctx.model.User.findAll({
        attributes: {
          exclude: [ 'password', 'created_at', 'updated_at' ],
        },
        include: [
          { model: Role },
        ],
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        where: {
          [Op.and]: conditionList,
        },
      });
      console.log(users);
      const totalCount = await this.ctx.model.User.findAndCountAll({
        where: {
          [Op.and]: conditionList,
        },
      });
      return { users, totalCount: totalCount.count };
    }

    // 条件不成立 完全查询
    const users = await this.ctx.model.User.findAll({
      attributes: {
        exclude: [ 'password', 'created_at', 'updated_at' ],
      },
      include: [
        { model: Role },
      ],
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    });
    console.log(users);
    const totalCount = await this.ctx.model.User.findAndCountAll();
    return { users, totalCount: totalCount.count };

  }
  /*  public async getUserList(obj) {
    const currentPage = parseInt(obj.currentPage) || 1;
    const pageSize = parseInt(obj.pageSize) || 5;
    const users = await this.ctx.model.User.findAll({
      attributes: {
        exclude: [ 'password', 'created_at', 'updated_at' ],
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      //      (1 - 1) * 5 = 0
      //      (2 - 1) * 5 = 5
    });
    const totalCount = await this.ctx.model.User.findAndCountAll();
    return { users, totalCount: totalCount.count };
  }*/
  public async createUser(obj) {
    const { username, email, phone, password } = obj;
    obj.password = this.ctx.helper.encryptText(password);
    if (username) {
      const user = await this.ctx.model.User.findOne({ where: { username } });
      if (user) {
        throw new Error('用户名已存在');
      }
    } else {
      delete obj.username;
    }
    if (email) {
      const user = await this.ctx.model.User.findOne({ where: { email } });
      if (user) {
        throw new Error('邮箱已存在');
      }
    } else {
      delete obj.email;
    }
    if (phone) {
      const user = await this.ctx.model.User.findOne({ where: { phone } });
      if (user) {
        throw new Error('电话已存在');
      }
    } else {
      delete obj.phone;
    }
    const data = await this.ctx.model.User.create(obj);
    const userData = (data as any).dataValues;
    delete userData.password;
    return userData;
  }
  public async destroyUser(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (user) {
      const data = await this.ctx.model.User.destroy({
        where: { id },
      });
      if (data > 0) {
        return user;
      }
      throw new Error('删除用户失败');
    } else {
      throw new Error('删除的用户不存在');
    }
  }
  public async updateUser(id, obj) {
    if (obj.password !== '') {
      obj.password = this.ctx.helper.encryptText(obj.password);
    }
    const user = await this.ctx.model.User.findByPk(id);
    if (user) {
      const { username, password, email, phone } = obj;
      if (!username) {
        delete obj.username;
      }
      if (!password) {
        delete obj.password;
      }
      if (!email) {
        delete obj.email;
      }
      if (!phone) {
        delete obj.phone;
      }
      // obj.username ? '' : delete obj.username;
      // obj.password ? '' : delete obj.password;
      // obj.email ? '' : delete obj.email;
      // obj.phone ? '' : delete obj.phone;
      const data = await this.ctx.model.User.update(obj, {
        where: {
          id,
        },
      });
      console.log('更新返回的结果', data);
      if (data.length > 0) {
        return user;
      }
      throw new Error('更新用户失败');

    } else {
      throw new Error('更新的用户不存在');
    }
  }
}
