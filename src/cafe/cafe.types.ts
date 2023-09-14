export interface CafeAttributes {
  id: number;
  name: string;
  logo: string | null;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date
}
