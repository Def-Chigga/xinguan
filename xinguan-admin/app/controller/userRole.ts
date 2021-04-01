import { Controller } from 'egg';

export default class UserRoleController extends Controller {
  public async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    try {
      const user = await ctx.service.userRole.createUserRole(data);
      ctx.success(user);
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
  public async destroy() {
    const { ctx } = this;
    const { userId } = ctx.params;
    const { roleId } = ctx.request.body;
    try {
      await ctx.service.userRole.destroyUser(userId, roleId);
      ctx.success();
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
}
