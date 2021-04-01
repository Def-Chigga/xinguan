/**
 * @desc 健康表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Healths extends Model<Healths> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '健康ID',
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    field: 'healths_name',
    allowNull: false,
    comment: '用户名',
  })
  healthsName: string;

  @Column({
    field: 'healths_sex',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '性别',
  })
  healthsSex: boolean;

  @Column({
    type: DataType.STRING(255),
    field: 'healths_job',
    allowNull: false,
    comment: '所在部门',
  })
  healthsJob: string;

  @Column({
    type: DataType.STRING(255),
    field: 'healths_heat',
    allowNull: false,
    comment: '当日体温',
  })
  healthsHeat: string;

  @Column({
    field: 'healths_state',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否健康',
  })
  healthsState: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => Healths;
