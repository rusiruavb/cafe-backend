export interface EmployeeAttributes {
  id?: number;
  empId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: any;
  startDate: Date;
  workDayCount?: number;
  CafeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date
}
