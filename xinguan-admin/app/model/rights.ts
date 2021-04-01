/**
 * @desc 权限表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
/*
常见权限:
菜单权限:能否使用某个菜单
权限名称/权限描述/权限是否可用/菜单对应的界面地址/层级关系
rights_name/rights_desc/rights_state/rights_path/rights_pid/rights_type
1 菜单权限 是否可以使用菜单 true null 0
2 用户管理 是否可以使用用户管理菜单 true null 1

路由权限:能否跳转到某个界面
权限名称/权限描述/权限是否可用/当前权限对应的路由地址/层级关系
rights_name/rights_desc/rights_state/rights_path/rights_pid/rights_type

请求权限:能否发送某个请求
权限名称/权限描述/权限是否可用/当前权限对应的请求地址/当前权限对应的请求类型/层级关系
rights_name/rights_desc/rights_state/rights_path/rights_method/rights_pid/rights_type

* */
@Table
export class Rights extends Model<Rights> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '权限ID',
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    field: 'rights_name',
    allowNull: false,
    comment: '权限名称',
  })
  rightsName: string;

  @Column({
    type: DataType.STRING(255),
    field: 'rights_desc',
    allowNull: false,
    comment: '权限描述',
  })
  rightsDesc: string;

  @Column({
    field: 'rights_state',
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
    comment: '权限是否可用',
  })
  rightsState: boolean;

  @Column({
    type: DataType.STRING(255),
    field: 'rights_type',
    allowNull: false,
    comment: '权限类型',
  })
  rightsType: string;

  @Column({
    type: DataType.STRING(255),
    field: 'rights_method',
    allowNull: true,
    comment: '请求方式',
  })
  rightsMethod: string;

  @Column({
    type: DataType.STRING(255),
    field: 'rights_icon',
    allowNull: true,
    comment: '菜单图标',
  })
  rightsIcon: string;

  @Column({
    type: DataType.STRING(255),
    field: 'rights_path',
    allowNull: true,
    comment: '权限地址',
  })
  rightsPath:string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '权限的父级编号',
    defaultValue: 0,
  })
  pid:number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '权限的等级',
    defaultValue: 0,
  })
  level:number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => Rights;
