import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.index);

  // 用户注册登录相关接口
  router.get('/captcha', controller.util.imageCode);
  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login);

  router.get('/islogin', controller.user.isLogin);

  // 用户管理相关接口
  router.get('/api/v1/users', controller.users.index);
  router.post('/api/v1/users', controller.users.create);
  router.delete('/api/v1/users/:id', controller.users.destroy);
  router.put('/api/v1/users/:id', controller.users.update);
  router.post('/api/v1/posts', controller.users.posts);
  router.post('/api/v1/importUser', controller.users.importUser);
  router.get('/api/v1/exportUser', controller.users.exportUser);

  // 角色管理相关接口
  // router.get('/api/v1/roles', controller.roles.index);
  // router.post('/api/v1/roles', controller.roles.create);
  // router.delete('/api/v1/roles/:id', controller.roles.destroy);
  // router.put('/api/v1/roles/:id', controller.roles.update);
  router.resources('roles', '/api/v1/roles/', controller.roles);
  router.post('/api/v1/userrole', controller.userRole.create);
  router.delete('/api/v1/userrole/:userId', controller.userRole.destroy);

  // 权限管理相关接口
  router.resources('rights', '/api/v1/rights/', controller.rights);

  // 分配权限相关接口
  router.post('/api/v1/roleRights', controller.roleRights.create);
  router.delete('/api/v1/roleRights/:roleId', controller.roleRights.destroy);

  // 健康情况相关接口
  router.resources('healths', '/api/v1/healths/', controller.healths);

  // 物资列表相关接口
  router.post('/api/v1/importGoods', controller.goods.importGoods);
  router.get('/api/v1/goods', controller.goods.index);

  // 物资入库相关接口
  router.get('/api/v1/goods_in', controller.goodsIn.index);
  router.post('/api/v1/goods_in', controller.goodsIn.create);

  // 物资领用相关接口
  router.get('/api/v1/goods_out', controller.goodsOut.index);
  router.post('/api/v1/goods_out', controller.goodsOut.create);
};
