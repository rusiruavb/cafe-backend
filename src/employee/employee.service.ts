import { Op } from 'sequelize';
import Employee from './employee.model';
import sequelize from '../configs/database.config';
import EmployeeDTO from './employee.dto';
import Cafe from '../cafe/cafe.model';
import { EmployeeAttributes } from './employee.types';

class EmployeeService {
  static async addEmployee(employeeDto: EmployeeDTO): Promise<EmployeeAttributes> {
    const trns = await sequelize.transaction();

    try {
      const existingEmployee = await Employee.findOne({
        where: {
          email: employeeDto.email,
        },
      });

      if (existingEmployee) {
        throw new Error('Employee already assigned to a cafe');
      }

      const cafe = await Cafe.findByPk(employeeDto.cafeId, { attributes: ['employeeCount'] });

      if (!cafe) {
        throw new Error('Cafe not found');
      }

      const employeeInput = {
        empId: this.generateEmpId(employeeDto),
        firstName: employeeDto.firstName,
        lastName: employeeDto.lastName,
        email: employeeDto.email,
        phoneNumber: employeeDto.phoneNumber,
        gender: employeeDto.gender,
        startDate: employeeDto.startDate,
        CafeId: employeeDto.cafeId,
      };

      const employee = await Employee.create(employeeInput, { transaction: trns });

      await Cafe.update(
        { employeeCount: cafe.employeeCount + 1 },
        {
          where: { id: employeeDto.cafeId },
          transaction: trns,
        },
      );

      await trns.commit();

      return employee.dataValues;
    } catch (error: any) {
      await trns.rollback();

      if (error.message) throw error;

      throw new Error('Employee account create failed');
    }
  }

  static async findEmployees(cafeName: string): Promise<Employee[]> {
    try {
      let employess: Employee[];

      if (cafeName) {
        employess = await Employee.findAll({
          attributes: ['id', 'empId', 'firstName', 'lastName', 'email', 'phoneNumber', 'gender', 'startDate', 'createdAt', 'updatedAt'],
          include: {
            model: Cafe,
            where: { name: { [Op.substring]: cafeName } },
          },
        });
      } else {
        employess = await Employee.findAll({
          attributes: ['id', 'empId', 'firstName', 'lastName', 'email', 'phoneNumber', 'gender', 'startDate', 'createdAt', 'updatedAt'],
          include: {
            model: Cafe,
            attributes: ['id', 'name', 'logo', 'location', 'description'],
          },
        });
      }

      if (!(employess.length > 0)) return [];

      const currentDate = new Date();

      employess.forEach((employee) => {
        const timeDiff = Math.abs(new Date(employee.dataValues.startDate).getTime()
        - currentDate.getTime());
        const count = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        employee.dataValues.workDayCount = count;
      });

      employess.sort((a, b) => {
        if (a.dataValues.workDayCount && b.dataValues.workDayCount) {
          return a.dataValues.workDayCount - b.dataValues.workDayCount;
        }
        return a.dataValues.startDate.getDate() - b.dataValues.startDate.getDate();
      });

      return employess;
    } catch (error: any) {
      if (error.message) throw error;

      throw new Error('Employee account create failed');
    }
  }

  static async updateEmployee(empId: number, employeeDto: EmployeeDTO):
  Promise<EmployeeAttributes> {
    const trns = await sequelize.transaction();

    try {
      const existingEmployee = await Employee.findByPk(empId);

      if (!existingEmployee) {
        throw new Error('Employee not found');
      }

      const employeeInput = {
        firstName: employeeDto.firstName,
        lastName: employeeDto.lastName,
        email: employeeDto.email,
        phoneNumber: employeeDto.phoneNumber,
        gender: employeeDto.gender,
        CafeId: employeeDto.cafeId,
      };

      await Employee.update(employeeInput, { where: { id: empId }, transaction: trns });

      const updatedEmployee = await Employee.findByPk(empId, { transaction: trns });

      if (!updatedEmployee) throw new Error('Update employee not found');

      await trns.commit();

      return updatedEmployee.dataValues;
    } catch (error: any) {
      await trns.rollback();

      if (error.message) throw error;

      throw new Error('Employee account create failed');
    }
  }

  static async removeEmployee(empId: number): Promise<any> {
    const trns = await sequelize.transaction();

    try {
      const existingEmployee = await Employee.findByPk(empId);

      if (!existingEmployee) {
        throw new Error('Employee not found');
      }

      await Employee.destroy({ where: { id: empId }, transaction: trns });

      await trns.commit();

      return { cafe: existingEmployee.dataValues.id, status: 'deleted', dateTime: new Date() };
    } catch (error: any) {
      await trns.rollback();

      if (error.message) throw error;

      throw new Error('Employee account create failed');
    }
  }

  static generateEmpId(
    employeeDto: EmployeeDTO,
  ): string {
    return `UI${employeeDto.firstName.charAt(0).toUpperCase()}${employeeDto.lastName.charAt(0).toUpperCase()}${employeeDto.startDate.getFullYear()}${employeeDto.gender.charAt(0).toUpperCase()}`;
  }
}

export default EmployeeService;
