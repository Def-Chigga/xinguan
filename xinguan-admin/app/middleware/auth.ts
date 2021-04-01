/*
const jwt = require('jsonwebtoken');

const isRequest = (actionRights:any, path:string, method:string) => {
  const reg = new RegExp(`^${actionRights.rightsPath}(/[0-9]*)?$`, 'i');
  if (reg.test(path) && actionRights.rightsMethod === method) return true;
  if (actionRights.children) {
    for (let i = 0; i < actionRights.children.length; i++) {
      const item = actionRights.children[i];
      if (isRequest(item, path, method)) return true;
    }
  }
  return false;
};
const getActionRights = ctx => {
  const userInfo = ctx.session.user;
  if (!userInfo) return null;
  const actionRights = userInfo.rightsTree.filter((rights:any) => {
    if (rights.rightsType === 'action') return rights;
  });
  return actionRights[0];
};
let actionRights;
module.exports = (_options, app) => {
  return async function(ctx, next) {
    // /api/vi/users
    // /api/vi/users?page=1&pageSize=5;
    let curPath = ctx.url.toLowerCase();
    const curMethod = ctx.request.method.toLowerCase();
    if (!curPath.startsWith('/api/v1')) {
      // 不需要权限控制
      await next();
      return;
    }
    if (!actionRights) {
      actionRights = getActionRights(ctx);
    }
    if (!actionRights) {
      ctx.error(400, '没有权限');
      console.log(222222222);
      return;
    }
    const idx = curPath.indexOf('?');
    if (idx !== -1) {
      // /api/vi/users?page=1&pageSize=5; -> /api/vi/users
      curPath = curPath.substr(0, idx);
    }
    const flag = isRequest(actionRights, curPath, curMethod);
    if (flag) {
      // cookie
      // 3.获取客户端传递过来的JWT令牌
      // const token = ctx.cookies.get('token', {
      //   signed: false,
      // });
      // sessionStorage
      // 3.获取客户端传递过来的JWT令牌
      const token = ctx.get('authorization');
      console.log(token);
      // 4.判断客户端有没有传递JWT令牌
      if (token) {
        try {
          await jwt.verify(token, app.config.keys);
          await next();
        } catch (e) {
          ctx.error(400, '没有权限');
          console.log(3333333333);
        }
      } else {
        ctx.error(400, '没有权限');
        console.log(444444444444);
      }
    } else {
      ctx.error(400, '没有权限');
      console.log(5555555555);
    }
  };
};
*/
const jwt = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function(ctx, next) {
    // 1.获取需要权限控制的路由地址
    const authUrls = options.authUrls;
    // 2.判断当前请求的路由地址是否需要权限控制
    if (authUrls.includes(ctx.url)) {
      // 需要权限控制
      // 3.获取客户端传递过来的JWT令牌
      const token = ctx.get('authorization');
      // 4.判断客户端有没有传递JWT令牌
      if (token) {
        try {
          await jwt.verify(token, app.config.keys);
          await next();
        } catch (e) {
          ctx.error(400, '没有权限');
        }
      } else {
        ctx.error(400, '没有权限');
      }
    } else {
      // 不需要权限控制
      await next();
    }
  };
};
