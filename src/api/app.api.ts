import { Express } from 'express';
import EmployeeController from '../employee/employee.controller';

class AppAPI {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  getAPIRoutes(): Express {
    this.app.post('/employee', (req, res) => EmployeeController.createEmployee(req, res));
    return this.app;
  }
}

export default AppAPI;
