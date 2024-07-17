import { IExpenseRepository } from "../../../repositories/ExpenseRepository/IExpenseRepository";

export class GetExpensesByOwnerIdUseCase {
    constructor(
        private expensesRepository: IExpenseRepository
    ){}

    async execute(owner_id: string) {
        try {
            const expense = await this.expensesRepository.getExpensesByOwnerId(owner_id)
            return expense
        }
        catch(err) {
            console.log(err)
            return null
        }
    }
}