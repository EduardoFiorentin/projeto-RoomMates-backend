import { expensesRepository } from "../../../repositories/ExpenseRepository";
import { GetExpenseByUserController } from "./GetExpenseByUserController";
import { GetExpenseByUserUseCase } from "./GetExpenseByUserUseCase";

const getExpenseByUserUseCase = new GetExpenseByUserUseCase(expensesRepository)
export const getExpenseByUserController = new GetExpenseByUserController(getExpenseByUserUseCase)
