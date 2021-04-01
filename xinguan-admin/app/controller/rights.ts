import { Controller } from 'egg';
import AddRightsRule from '../validate/addRightsRule';

export default class RightsController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      if (JSON.stringify(ctx.query) !== '{}') {
        const rights = await ctx.service.rights.getRightsList(ctx.query);
        ctx.success(rights);
      } else {
        let rights = await ctx.service.rights.getAllRights();
        rights = rights.filter((outItem:any) => {
          rights.forEach((inItem:any) => {
            if (outItem.id === inItem.pid) {
              outItem.children ? '' : outItem.children = [];
              outItem.children.push(inItem);
            }
          });
          return outItem.level === 0;
        });
        ctx.success(rights);
      }
    } catch (e) {
      ctx.error(500, e.message);
    }
  }
  public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(AddRightsRule, data);
      // 2.将校验通过的数据保存到数据库中
      const rights = await ctx.service.rights.createRights(data);
      ctx.success(rights);
    } catch (e) {
      if (e.errors) {
        ctx.error(400, e.errors);
      } else {
        ctx.error(400, e.message);
      }
    }
  }
  public async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const data = ctx.request.body;
    try {
      // 1.校验数据和验证码
      ctx.validate(AddRightsRule, data);
      // 2.将校验通过的数据保存到数据库中
      const rights = await ctx.service.rights.updateRights(id, data);
      ctx.success(rights);
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
      const rights = await ctx.service.rights.destroyRights(id);
      ctx.success(rights);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
}
