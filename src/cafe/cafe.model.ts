import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../configs/database.config';
import { CafeAttributes } from './cafe.types';

interface CafeModeAttributes extends Optional<CafeAttributes, 'id'> {}

class Cafe extends Model<CafeAttributes, CafeModeAttributes> implements CafeAttributes {
  public id!: number;

  public name!: string;

  public logo!: string | null;

  public location!: string;

  public description!: string;

  public employeeCount!: number;

  public readonly createdAt?: Date | undefined;

  public readonly updatedAt?: Date | undefined;

  public readonly deletedAt?: Date | undefined;
}

Cafe.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  sequelize,
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
});

export default Cafe;
