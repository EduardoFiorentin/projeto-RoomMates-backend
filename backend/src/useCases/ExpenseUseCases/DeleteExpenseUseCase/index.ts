import { expensesRepository } from "../../../repositories/ExpenseRepository";
import { DeleteExpenseController } from "./DeleteExpenseController";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase";

const deleteExpenseUseCase = new DeleteExpenseUseCase(expensesRepository)
export const deleteExpenseController = new DeleteExpenseController(deleteExpenseUseCase)