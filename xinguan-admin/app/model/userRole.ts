/**
 * @desc 角色用户关系表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { User } from './user';
import { Role } from './role';

@Table
export class UserRole extends Model<UserRole> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '用户ID',
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @ForeignKey(() => Role)
  @Column({
    field: 'role_id',
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  roleId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => UserRole;
