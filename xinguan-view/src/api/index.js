// 导入封装好的网络请求类工具
import Network from './network';

// 封装各种接口请求(使用例子)
// 用户注册登录相关结构
export const registerUser = (data) => Network.post('/register', data);
export const loginUser = (data) => Network.post('/login', data);
export const isLogin = () => Network.get('/islogin');
// 用户管理相关接口
// export const getUsers = () => Network.get('/api/v1/users');
export const getUsers = (data) => Network.get('/api/v1/users', data);
export const addUsers = (data) => Network.post('/api/v1/users', data);
export const destroyUsers = (id) => Network.delete(`/api/v1/users/${id}`);
export const updateUsers = (id, data) => Network.put(`/api/v1/users/${id}`, data);

// 角色管理相关
export const getRoles = (data) => Network.get('/api/v1/roles', data);
export const createRoles = (data) => Network.post('/api/v1/roles', data);
export const destroyRoles = (id) => Network.delete(`/api/v1/roles/${id}`);
export const updateRoles = (id, data) => Network.put(`/api/v1/roles/${id}`, data);
export const createUserRole = (data) => Network.post('/api/v1/userrole', data);
export const destroyUserRole = (userId, data) => Network.delete(`/api/v1/userrole/${userId}`, data);

// 权限管理相关
export const getRights = (data) => Network.get('/api/v1/rights', data);
// export const getRightsCategory = (type:string,data:{})=>Network.get(`/api/v1/rights/${type}`, data);
export const createRights = (data) => Network.post('/api/v1/rights', data);
export const destroyRights = (id) => Network.delete(`/api/v1/rights/${id}`);
export const updateRights = (id, data) => Network.put(`/api/v1/rights/${id}`, data);

// 分配角色相关
export const createRoleRights = (data) => Network.post('/api/v1/roleRights', data);
export const destroyRoleRights = (roleId, data) => Network.delete(`/api/v1/roleRights/${roleId}`, data);

// 健康管理相关
export const getHealths = (data) => Network.get('/api/v1/healths', data);
export const createHealths = (data) => Network.post('/api/v1/healths', data);
// export const destroyHealths = (id) => Network.delete(`/api/v1/healths/${id}`);
// export const updateHealths = (id, data) => Network.put(`/api/v1/healths/${id}`, data);

// 物资管理相关
export const getGoods = (data) => Network.get('/api/v1/goods', data);
export const getGoodsIn = (data) => Network.get('/api/v1/goods_in', data);
export const createGoodsIn = (data) => Network.post('/api/v1/goods_in', data);
export const getGoodsOut = (data) => Network.get('/api/v1/goods_out', data);
export const createGoodsOut = (data) => Network.post('/api/v1/goods_out', data);
