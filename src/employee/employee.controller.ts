import { Request, Response } from 'express';
import EmployeeDTO from './employee.dto';
import EmployeeService from './employee.service';

class EmployeeController {
  static async createEmployee(req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const {
      firstName, lastName, email, phoneNumber, gender, startDate, cafeId,
    } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !gender || !startDate || !cafeId) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      const employeeDto = new EmployeeDTO(
        firstName,
        lastName,
        email,
        phoneNumber,
        gender,
        new Date(startDate),
        cafeId,
      );

      const employee = await EmployeeService.addEmployee(employeeDto);

      return res.status(201).json({ employee });
    } catch (error: any) {
      return res.status(500).json({ message: error.message, reason: JSON.stringify(error) });
    }
  }

  static async findEmployees(req: Request, res: Response): Promise<Response> {
    try {
      const cafe = req.query.cafe as string;

      const employess = await EmployeeService.findEmployees(cafe);

      return res.status(200).json(employess);
    } catch (error: any) {
      return res.status(500).json({ message: error.message, reason: JSON.stringify(error) });
    }
  }

  static async updateEmployee(req: Request, res: Response): Promise<Response> {
    const {
      firstName, lastName, email, phoneNumber, gender, startDate, cafeId, empId,
    } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber
      || !gender || !startDate || !cafeId || !empId) {
      return res.status(400).json({ message: 'Bad request' });
    }

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

      const employee = await EmployeeService.updateEmployee(parseInt(empId), employeeDto);

      return res.status(200).json({ employee });
    } catch (error: any) {
      return res.status(500).json({ message: error.message, reason: JSON.stringify(error) });
    }
  }

  static async removeEmployee(req: Request, res: Response): Promise<Response> {
    if (!req.body.empId) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      const empId = parseInt(req.body.empId);

      const deletedData = await EmployeeService.removeEmployee(empId);

      return res.status(200).json({ deletedData });
    } catch (error: any) {
      return res.status(500).json({ message: error.message, reason: JSON.stringify(error) });
    }
  }
}

export default EmployeeController;
