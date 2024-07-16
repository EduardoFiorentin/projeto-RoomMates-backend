import { Expenses } from "../../../entity/Expense"
import { NotFoundError } from "../../../exceptions/NotFoundError"
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError"
import { IExpenseRepository } from "../../../repositories/ExpenseRepository/IExpenseRepository"
import { JwtService } from "../../../services/JwtService/JwtService"

export class DeleteExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRepository
    ){}

    async execute(expenseId: string, token: string): Promise<void> {
        try {
            
            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")
            const userId = JwtService.getInstance().getTokenInfo(token).id

            const expense = await this.expenseRepository.findExpenseById(expenseId)

            if (expense == null) throw new NotFoundError(`Registro com id = ${expenseId} não existe!`)

            await this.expenseRepository.deleteExpense(expenseId, userId)

        }
        catch(err) {
            throw err
        }
    }
}