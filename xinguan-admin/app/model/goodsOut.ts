/**
 * @desc 物资领用表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  modelName: 'goods_out',
})
export class goodsOut extends Model<goodsOut> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '物资ID',
  })
  goodsOutId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '物资名称',
  })
  goodsOutName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '规格/型号',
  })
  goodsOutType: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '数量',
  })
  goodsOutTotal: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '单位',
  })
  goodsOutUnit: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '领用人',
  })
  goodsOutUsername: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '所属岗位',
  })
  goodsOutJob: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '领用日期',
  })
  goodsOutDate: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => goodsOut;
