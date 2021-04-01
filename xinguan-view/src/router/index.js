import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  /* 路由懒加载 */
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import(/* webpackChunkName: "error" */ '../views/Error')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin'),
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'Main',
        component: () => import(/* webpackChunkName: "main" */ '../components/Main')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "users" */ '../components/Users')
      },
      {
        path: '/roles',
        name: 'Roles',
        component: () => import(/* webpackChunkName: "roles" */ '../components/Roles')
      },
      {
        path: '/rights',
        name: 'Rights',
        component: () => import(/* webpackChunkName: "rights" */ '../components/Rights')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "goods" */ '../components/Goods')
      },
      {
        path: '/goodsIn',
        name: 'GoodsIn',
        component: () => import(/* webpackChunkName: "goods_in" */ '../components/GoodsIn')
      },
      {
        path: '/goodsOut',
        name: 'GoodsOut',
        component: () => import(/* webpackChunkName: "goods_out" */ '../components/GoodsOut')
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// 添加路由守卫, 实现权限控制
router.beforeEach((to, from, next) => {
  // 1.如果访问的是注册或者登录, 那么就放行
  if (to.path === '/login' || to.path === '/register' || to.path === '/error') {
    return next();
  }
  // 2.获取当前的登录状态
  const token = sessionStorage.getItem('token');
  // 3.如果访问的是其它路由地址, 那么就需要判断是否已经登录
  //   如果已经登录, 那么就放行, 如果没有登录, 那么就强制跳转到登录界面
  if (!token) {
    return next('/login');
  }
  const routerRights = getRouterRights();
  const flag = isNext(routerRights, to.path);
  if (flag) {
    next();
  } else {
    next('/error');
  }
});
const isNext = (routerRights, path) => {
  if (routerRights.rightsPath === path) return true;
  if (routerRights.children) {
    for (let i = 0; i < routerRights.children.length; i++) {
      const item = routerRights.children[i];
      if (isNext(item, path)) return true;
    }
  }
  return false;
};
const getRouterRights = () => {
  const data = sessionStorage.getItem('userInfo');
  if (!data) return null;
  const userInfo = JSON.parse(data);
  const routerRights = userInfo.rightsTree.filter((rights) => {
    if (rights.rightsType === 'router') return rights;
  });
  return routerRights[0];
};

export default router;
