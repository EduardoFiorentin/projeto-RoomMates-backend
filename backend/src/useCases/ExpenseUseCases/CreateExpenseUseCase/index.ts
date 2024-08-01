import { expensesRepository } from "../../../repositories/ExpenseRepository";
import { getUsersByIdUseCase } from "../../UserUseCases/GetUsersByIdUseCase";
import { CreateExpenseController } from "./CreateExpenseController";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";

const createExpenseUseCase = new CreateExpenseUseCase(expensesRepository, getUsersByIdUseCase)
export const createExpenseController = new CreateExpenseController(createExpenseUseCase)