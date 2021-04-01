import { Controller } from 'egg';

export default class UtilController extends Controller {
  public async imageCode() {
    const { ctx } = this;
    // 告诉前端,当前返回的是一张图片
    ctx.response.type = 'image/svg+xml';
    ctx.body = ctx.helper.createImageCode();
  }
}
