import { expensesRepository } from "../../../repositories/ExpenseRepository";
import { GetExpensesByOwnerIdUseCase } from "./GetExpensesByOwnerIdUseCase";

export const getExpenseByOwnerIdUseCase = new GetExpensesByOwnerIdUseCase(expensesRepository)