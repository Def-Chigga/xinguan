// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportGoods from '../../../app/model/goods';
import ExportGoodsIn from '../../../app/model/goodsIn';
import ExportGoodsOut from '../../../app/model/goodsOut';
import ExportHealths from '../../../app/model/healths';
import ExportRights from '../../../app/model/rights';
import ExportRole from '../../../app/model/role';
import ExportRoleRights from '../../../app/model/roleRights';
import ExportUser from '../../../app/model/user';
import ExportUserRole from '../../../app/model/userRole';

declare module 'egg' {
  interface IModel {
    Goods: ReturnType<typeof ExportGoods>;
    GoodsIn: ReturnType<typeof ExportGoodsIn>;
    GoodsOut: ReturnType<typeof ExportGoodsOut>;
    Healths: ReturnType<typeof ExportHealths>;
    Rights: ReturnType<typeof ExportRights>;
    Role: ReturnType<typeof ExportRole>;
    RoleRights: ReturnType<typeof ExportRoleRights>;
    User: ReturnType<typeof ExportUser>;
    UserRole: ReturnType<typeof ExportUserRole>;
  }
}
