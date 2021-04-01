import { Controller } from 'egg';
export default class RoleRightsController extends Controller {
  public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const { roleId, rightsIds } = data;
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      for (let i = 0; i < rightsIds.length; i++) {
        const obj = { roleId, rightsId: rightsIds[i] };
        await ctx.service.roleRights.createRoleRights(obj);
      }
      await transaction.commit();
      ctx.success();
    } catch (e) {
      await transaction.rollback();
      ctx.error(400, e.message);
    }
  }
  public async destroy() {
    const { ctx } = this;
    const { roleId } = ctx.params;
    const { rightsIds } = ctx.request.body;
    console.log(rightsIds);
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      if (rightsIds !== null) {
        for (let i = 0; i < rightsIds.length; i++) {
          await ctx.service.roleRights.destroyRoleRights(roleId, rightsIds[i]);
        }
      } else {
        await ctx.service.roleRights.destroyAllRoleRights(roleId);
      }
      await transaction.commit();
      ctx.success();
    } catch (e) {
      await transaction.rollback();
      ctx.error(400, e.message);
    }
  }
}
