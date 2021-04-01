/**
 * @desc 角色表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { User } from './user';
import { UserRole } from './userRole';
import { Rights } from './rights';
import { RoleRights } from './roleRights';

@Table
export class Role extends Model<Role> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '角色ID',
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    field: 'role_name',
    allowNull: false,
    unique: true,
    comment: '角色姓名',
  })
  roleName: string;

  @Column({
    type: DataType.STRING(255),
    field: 'role_desc',
    allowNull: false,
    unique: true,
    comment: '角色描述',
  })
  roleDesc: string;

  @Column({
    field: 'role_state',
    type: DataType.BOOLEAN,
    allowNull: true,
    unique: false,
    comment: '角色是否可用',
  })
  roleState: boolean;

  @BelongsToMany(() => User, () => UserRole)
  users:User[];

  @BelongsToMany(() => Rights, () => RoleRights)
  rights:Rights[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => Role;
