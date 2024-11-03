export interface IExpenseData {
  date: string | number | Date;
  _id?: number;
  name: string;
  category: string;
  amount: number;
  createdAt: string;
}

// expense.interface.ts

export interface IExpense {
  _id: string;
  name: string;
  category: string;
  amount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
