import Employee from './employee.model';
import sequelize from '../configs/database.config';
import EmployeeDTO from './employee.dto';

class EmployeeService {
  static async addEmployee(employeeDto: EmployeeDTO): Promise<Employee> {
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

      // TODO: update employee count in cafe

      await trns.commit();

      return employee;
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
