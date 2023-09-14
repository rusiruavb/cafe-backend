import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../configs/database.config';
import { EmployeeAttributes } from './employee.types';

interface EmployeeModelAttributes extends Optional<EmployeeAttributes, 'id'> {}

class Employee extends Model<EmployeeAttributes, EmployeeModelAttributes>
  implements EmployeeAttributes {
  public id?: number | undefined;

  public empId!: string;

  public firstName!: string;

  public lastName!: string;

  public email!: string;

  public phoneNumber!: string;

  public gender!: any;

  public startDate!: Date;

  public cafeId!: number;

  public readonly createdAt?: Date | undefined;

  public readonly updatedAt?: Date | undefined;

  public readonly deletedAt?: Date | undefined;
}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  empId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { is: /^[89]\d{7}$/i },
  },
  gender: {
    type: DataTypes.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  sequelize,
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
});

export default Employee;
