/**
 * @desc 角色权限关系表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { Rights } from './rights';
import { Role } from './role';

@Table
export class RoleRights extends Model<RoleRights> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '主键ID',
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    field: 'role_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId: number;

  @ForeignKey(() => Rights)
  @Column({
    field: 'rights_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  rightsId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => RoleRights;
