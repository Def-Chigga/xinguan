// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGoods from '../../../app/controller/goods';
import ExportGoodsIn from '../../../app/controller/goodsIn';
import ExportGoodsOut from '../../../app/controller/goodsOut';
import ExportHealths from '../../../app/controller/healths';
import ExportHome from '../../../app/controller/home';
import ExportRights from '../../../app/controller/rights';
import ExportRoleRights from '../../../app/controller/roleRights';
import ExportRoles from '../../../app/controller/roles';
import ExportUser from '../../../app/controller/user';
import ExportUserRole from '../../../app/controller/userRole';
import ExportUsers from '../../../app/controller/users';
import ExportUtil from '../../../app/controller/util';

declare module 'egg' {
  interface IController {
    goods: ExportGoods;
    goodsIn: ExportGoodsIn;
    goodsOut: ExportGoodsOut;
    healths: ExportHealths;
    home: ExportHome;
    rights: ExportRights;
    roleRights: ExportRoleRights;
    roles: ExportRoles;
    user: ExportUser;
    userRole: ExportUserRole;
    users: ExportUsers;
    util: ExportUtil;
  }
}
