export interface CafeAttributes {
  id: number;
  name: string;
  logo: string | null;
  location: string;
  description: string;
  employeeCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date
}
