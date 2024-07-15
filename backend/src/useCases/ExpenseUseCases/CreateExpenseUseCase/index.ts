import { expensesRepository } from "../../../repositories/ExpenseRepository";
import { CreateExpenseController } from "./CreateExpenseController";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

const createExpenseUseCase = new CreateExpenseUseCase(expensesRepository)
export const createExpenseController = new CreateExpenseController(createExpenseUseCase)