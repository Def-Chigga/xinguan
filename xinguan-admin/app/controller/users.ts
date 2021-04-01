import { Controller } from 'egg';
import AddUserRule from '../validate/addUserRule';
import EditUserRule from '../validate/editUserRule';
const path = require('path');
const fs = require('fs');
const xlsx = require('node-xlsx');

export default class UserController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      // const users = await ctx.service.users.getAll();
      const users = await ctx.service.users.getUserList(ctx.query);
      ctx.success(users);
    } catch (e) {
      ctx.error(500, e.message);
    }
  }
  public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(AddUserRule, data);
      // 2.将校验通过的数据保存到数据库中
      const user = await ctx.service.users.createUser(ctx.request.body);
      ctx.success(user, 200, '新增用户成功');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    try {
      const user = await ctx.service.users.destroyUser(id);
      ctx.success(user, 200, '删除用户成功');
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(EditUserRule, data);
      // 2.将校验通过的数据保存到数据库中
      const user = await ctx.service.users.updateUser(id, data);
      ctx.success(user, 200, '更新用户成功');
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async posts() {
    const { ctx } = this;
    // 1.拿到上传过来的文件
    const file = ctx.request.files[0];
    // 2.生成一个独一无二的文件名称
    const fileName = ctx.helper.encryptText(file.filename + Date.now()) + path.extname(file.filename);
    // 3.生成存储文件的路径
    let filePath = path.join('/public/upload', fileName);
    const absFilePath = path.join(this.config.baseDir, 'app', filePath);
    // 4.写入文件
    const readStream = fs.readFileSync(file.filepath);
    fs.writeFileSync(absFilePath, readStream);
    // 5.返回存储图片的路径
    filePath = filePath.replace(/\\/g, '/');
    ctx.success(filePath, 200, '头像上传成功');
  }
  public async importUser() {
    const { ctx } = this;
    let transaction;
    try {
      const file = ctx.request.files[0];
      // 1.读取Excel文件
      const workSheets = xlsx.parse(fs.readFileSync(file.filepath));
      // 2.获取到需要操作的那一页的对象
      const sheet1 = workSheets.length ? workSheets[0] : null;
      const sheet1Data = sheet1 ? sheet1.data : [];
      const users:any[] = [];
      // 开启事物 要么全部导入要么全部回滚
      transaction = await ctx.model.transaction();
      for (let i = 1; i < sheet1Data.length; i++) {
        // 获取到所有的key
        const columnTitles = sheet1Data[0];
        // 获取到当前行的数据
        const columnValues = sheet1Data[i];
        const user = {};
        for (let j = 0; j < columnTitles.length; j++) {
          user[columnTitles[j]] = columnValues[j];
        }
        // 添加用户
        await ctx.service.users.createUser(user);
        users.push(user);
      }
      // 执行事物
      await transaction.commit();
      ctx.success(users, 200, '添加用户成功');
    } catch (e) {
      // 出错回滚事物
      await transaction.rollback();
      ctx.error(500, e.message);
    }
  }
  public async exportUser() {
    const { ctx } = this;
    const users = await ctx.service.users.getAll();
    const user = users.length ? users[0].dataValues : null;
    const data:any[] = [];
    if (user) {
      const cloumnTitles = Object.keys(user);
      data.push(cloumnTitles);
      users.forEach(user => {
        const temp:any[] = [];
        cloumnTitles.forEach(key => {
          temp.push(user[key]);
        });
        data.push(temp);
      });
      const buffer = xlsx.build([{ name: 'mySheetName', data }]);
      ctx.set('Content-Type', 'application/vnd.ms-excel');
      // ctx.set('Content-disposition', 'attachment; filename=user.xls');
      ctx.attachment('user.xls');
      ctx.body = buffer;
    }
  }
}
