import { Expenses } from "../../entity/Expense";

export interface IExpenseRepository {
    findExpenseById(id: string): Promise<Expenses|null>,
    createExpense(expense: Expenses): Promise<void>,
    getExpensesByUser(userId: string): Promise<Expenses[]|null>,
    deleteExpense(expenseId: string, userId: string): Promise<void>,
    getExpensesByOwnerId(owner_id: string): Promise<Expenses[]> 
}