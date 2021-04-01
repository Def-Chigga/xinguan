/**
 * @desc 物资表
 */
import { Column, DataType, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  modelName: 'goods',
})
export class Goods extends Model<Goods> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    comment: '物资ID',
  })
  goodsId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '物资名称',
  })
  goodsName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '规格/型号',
  })
  goodsType: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: '单位',
  })
  goodsUnit: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '库存',
  })
  goodsReverse: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
  length: number;
}
export default () => Goods;
