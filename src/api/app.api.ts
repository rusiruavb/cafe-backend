import { Express } from 'express';
import multer, { Multer } from 'multer';
import EmployeeController from '../employee/employee.controller';
import CafeController from '../cafe/cafe.controller';

class AppAPI {
  app: Express;

  upload: Multer;

  constructor(app: Express) {
    this.app = app;
    this.upload = multer();
  }

  getAPIRoutes(): Express {
    this.app.post('/cafe', this.upload.single('logo'), (req, res) => CafeController.createCafe(req, res));
    this.app.get('/cafes', (req, res) => CafeController.findCafes(req, res));
    this.app.put('/cafe', this.upload.single('logo'), (req, res) => CafeController.updateCafe(req, res));
    this.app.delete('/cafe', (req, res) => CafeController.removeCafe(req, res));
    this.app.get('/cafe/logo/:key', (req, res) => CafeController.getCafeLogo(req, res));

    this.app.post('/employee', (req, res) => EmployeeController.createEmployee(req, res));
    return this.app;
  }
}

export default AppAPI;
