import { Expenses } from "../../entity/Expense";

export interface IExpenseRepository {
    createExpense(expense: Expenses): Promise<void>
}