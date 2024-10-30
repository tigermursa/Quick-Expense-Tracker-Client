export interface IExpenseData {
  date: string | number | Date;
  _id?: number;
  name: string;
  category: string;
  amount: number;
  createdAt: string;
}
