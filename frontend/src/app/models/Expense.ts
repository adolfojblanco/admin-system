import { Supplier } from "./Supplier";
import { User } from "./User";


export enum MovemetType {
  IN = "IN",
  OUT = "OUT",
}

export enum StatusType {
  PAID = "PAID",
  PENDING = "PENDING",
}

export interface Expense {
  id?: number;
  name: string;
  type: MovemetType;
  status: StatusType;
  amount: number;
  date: Date;
  comment: string;
  supplier: Supplier
  user: User
}
