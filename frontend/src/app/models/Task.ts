
export enum PriorityType {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface ShoppingList {
  id?: number;
  title: string;
  is_complete: boolean,
  priority: PriorityType
}

export interface TaskList {
  id?: number;
  title: string;
  is_complete: boolean,
}
