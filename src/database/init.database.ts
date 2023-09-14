import Employee from '../employee/employee.model';
import Cafe from '../cafe/cafe.model';

const databaseInit = async () => {
  Cafe.hasMany(Employee);
  Employee.belongsTo(Cafe);

  Employee.sync({ alter: true });
  Cafe.sync({ alter: true });
};

export default databaseInit;
