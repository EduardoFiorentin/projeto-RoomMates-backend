import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { IExpenseRepository } from "../../../repositories/ExpenseRepository/IExpenseRepository";
import { JwtService } from "../../../services/JwtService/JwtService";

export class GetExpensesByOwnerIdUseCase {
    constructor(
        private expensesRepository: IExpenseRepository
    ){}

    async execute(owner_id: string, token: string) {
        try {

            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")

            const expense = await this.expensesRepository.getExpensesByOwnerId(owner_id)
            return expense
        }
        catch(err) {
            console.log(err)
            return null
        }
    }
}