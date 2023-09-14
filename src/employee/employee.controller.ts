import { Request, Response } from 'express';
import EmployeeDTO from './employee.dto';
import EmployeeService from './employee.service';

class EmployeeController {
  static async createEmployee(req: Request, res: Response): Promise<Response> {
    const {
      firstName, lastName, email, phoneNumber, gender, startDate, cafeId,
    } = req.body;

    try {
      const employeeDto = new EmployeeDTO(
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        startDate,
        cafeId,
      );

      const employee = await EmployeeService.addEmployee(employeeDto);

      return res.status(201).json({ employee });
    } catch (error: any) {
      return res.status(500).json({ message: error.message, reason: JSON.stringify(error) });
    }
  }
}

export default EmployeeController;
