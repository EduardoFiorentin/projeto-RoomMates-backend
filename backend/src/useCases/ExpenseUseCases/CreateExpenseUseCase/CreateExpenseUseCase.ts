import { Expenses } from "../../../entity/Expense";
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { ValidationError } from "../../../exceptions/ValidationError";
import { IExpenseRepository } from "../../../repositories/ExpenseRepository/IExpenseRepository";
import { JwtService } from "../../../services/JwtService/JwtService";
import { ICreateExpenseRequertPattern } from "./ICreateExpenseRequertPattern";

export class CreateExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRepository
    ){}

    async execute(props: ICreateExpenseRequertPattern): Promise<Expenses> {
        try {
            const {
                token,
                owner_id,
                operation,
                date,
                value,
                description
            } = props

            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")

            if (!owner_id || !operation || !date || !value || !description ) throw new ValidationError("Todas as informações são obrigatorias!")

            const new_expense = new Expenses(operation, date, value, description, owner_id)

            await this.expenseRepository.createExpense(new_expense)

            return new_expense
        }
        catch(err) {
            throw err
        }
    }
}