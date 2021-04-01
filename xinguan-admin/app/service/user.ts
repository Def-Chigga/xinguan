import { Service } from 'egg';
import { Role } from '../model/role';
import { Rights } from '../model/rights';

export default class User extends Service {
  public async getUser({ username, password }) {
    // const { username, email, phone, password, type } = obj;
    // 数据库存的密码是加密的 所以得先加密再去查询
    password = this.ctx.helper.encryptText(password);
    let res;
    try {
      if (username) {
      // 普通登录
        res = await this.findUser({ username, password });
      }
      // 注意点: 在sequelize中, 如果想返回虚拟字段的值, 那么就不能从dataValues中获取
      //          dataValues中保存的都是从数据库中查询到的数据
      return res;
    } catch (e) {
      throw new Error('用户名或者密码不正确');
    }
  }
  public async createUser(obj) {
    const { username, password } = obj;
    obj.password = this.ctx.helper.encryptText(password);
    if (username) {
      // 普通注册
      return await this.createUserByUserName(username, obj);
    }
  }
  private async createUserByUserName(username, obj) {
    // 1.查询当前用户是否存在
    const user = await this.findUser({ username });
    if (user) {
      throw new Error('当前用户已存在');
    }
    // 2.如果不存在才保存
    const data = await this.ctx.model.User.create(obj as any);
    console.log('插入成功', data);
    const userData = (data as any).dataValues;
    delete userData.password;
    return userData;
  }
  private async findUser(options) {
    const user:any = await this.ctx.model.User.findOne({
      where: options,
      include: [
        {
          model: Role,
          include: [
            { model: Rights },
          ],
        },
      ],
    });
    // 1.获取当前登录用户拥有的所有权限
    let allRights:any[] = [];
    user.roles.forEach(role => {
      role.rights.forEach(item => {
        allRights.push(item);
      });
    });
    // 2.剔除重复的权限
    /*
    {id: 1, rightsName: '权限管理', rightsType:'menu'},
    {id: 2, rightsName: '角色列表', rightsType:'menu'},
    {id: 3, rightsName: '权限列表', rightsType:'menu'},
    {id: 4, rightsName: '权限管理', rightsType:'router'},
    {id: 5, rightsName: '角色列表', rightsType:'router'},
    {id: 6, rightsName: '权限列表', rightsType:'router'},
    {id: 7, rightsName: '权限管理', rightsType:'menu'},

     const temp = {
        权限管理:true
     };
    * */
    const temp = {};
    allRights = allRights.reduce((arr, item) => {
      if (!temp[item.dataValues.id]) {
        arr.push(item);
        temp[item.dataValues.id] = true;
      }
      return arr;
    }, []);
    // 3.生成权限树
    allRights = allRights.filter(outItem => {
      allRights.forEach(inItem => {
        if (outItem.dataValues.id === inItem.dataValues.pid) {
          outItem.dataValues.children ? '' : outItem.dataValues.children = [];
          outItem.dataValues.children.push(inItem);
        }
      });
      if (outItem.dataValues.level === 0) return true;
    });
    user.dataValues.rightsTree = allRights;
    return user;
  }
}
