/**
 * @desc 物资入库表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  modelName: 'goods_in',
})
export class GoodsIn extends Model<GoodsIn> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '物资ID',
  })
  goodsInId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '物资名称',
  })
  goodsInName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '规格/型号',
  })
  goodsInType: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '数量',
  })
  goodsInTotal: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '单位',
  })
  goodsInUnit: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    comment: '入库人',
  })
  goodsInUsername: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '所属岗位',
  })
  goodsInJob: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '入库日期',
  })
  goodsInDate: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
export default () => GoodsIn;
