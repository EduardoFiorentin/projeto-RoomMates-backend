import { expensesRepository } from "../../../repositories/ExpenseRepository";
import { GetExpenseByOwnerIdController } from "./GetExpensesByOwnerIdController";
import { GetExpensesByOwnerIdUseCase } from "./GetExpensesByOwnerIdUseCase";

const getExpenseByOwnerIdUseCase = new GetExpensesByOwnerIdUseCase(expensesRepository)
export const getExpensesByOwnerIdController = new GetExpenseByOwnerIdController(getExpenseByOwnerIdUseCase)