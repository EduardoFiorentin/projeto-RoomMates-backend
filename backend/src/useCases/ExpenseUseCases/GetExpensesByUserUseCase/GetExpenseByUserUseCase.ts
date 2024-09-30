import { Expenses } from "../../../entity/Expense"
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError"
import { IExpenseRepository } from "../../../repositories/ExpenseRepository/IExpenseRepository"
import { JwtService } from "../../../services/JwtService/JwtService"


export class GetExpenseByUserUseCase {
    constructor(
        private expenseRepository: IExpenseRepository
    ){}
    
    async execute(token: string): Promise<Expenses[]|null> {       
        try {

            console.log("Token: ", token)
            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")
            
            const jwtPayload = JwtService.getInstance().getTokenInfo(token)
            const userId = jwtPayload.id

            // const userId = JSON.parse(jwtPayload).id ? 

            // console.log("JWT payload: ", jwtPayload.id)

            return (await this.expenseRepository.getExpensesByUser(userId))
        }
        catch (err) {
            throw err
        }
    }   
}   
