/**
 * @desc 用户表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { Role } from './role';
import { UserRole } from './userRole';

@Table({
  modelName: 'user',
})
export class User extends Model<User> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '用户ID',
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户姓名',
    validate: {
      is: /^[A-Za-z0-9\-]{3,}$/,
    },
  })
  username: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: false,
    comment: '用户密码',
  })
  password: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户邮箱',
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    unique: true,
    comment: '用户手机',
    validate: {
      is: /^1[3456789]\d{9}$/,
    },
  })
  phone: string;

  @Column({
    field: 'user_state',
    type: DataType.BOOLEAN,
    allowNull: true,
    unique: false,
    comment: '用户是否可用',
  })
  userState: boolean;

  @Column({
    field: 'avatar_url',
    type: DataType.STRING,
    allowNull: true,
    unique: false,
    comment: '用户头像',
    // get() {
    //   const rawValue = this.getDataValue(('avatarURL' as any));
    //   return rawValue ? 'http://127.0.0.1:7001' + rawValue : null;
    // },
  })
  avatarURL: string;

  @Column({
    // 虚拟字段
    type: DataType.VIRTUAL,
    get() {
      return 'http://127.0.0.1:7001';
    },
  })
  baseURL: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles:Role[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => User;
