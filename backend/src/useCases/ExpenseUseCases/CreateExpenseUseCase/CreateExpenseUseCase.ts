import moment from "moment";
import { Expenses } from "../../../entity/Expense";
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { ValidationError } from "../../../exceptions/ValidationError";
import { IExpenseRepository } from "../../../repositories/ExpenseRepository/IExpenseRepository";
import { JwtService } from "../../../services/JwtService/JwtService";
import { ICreateExpenseRequertPattern } from "./ICreateExpenseRequertPattern";
import { GetUsersByIdUseCase } from "../../UserUseCases/GetUsersByIdUseCase/GetUsersByIdUseCase";

export class CreateExpenseUseCase {
    constructor(
        private expenseRepository: IExpenseRepository,
        private getUsersByIdUseCase: GetUsersByIdUseCase
    ){}

    async execute(props: ICreateExpenseRequertPattern): Promise<Expenses> {
        try {
            const {
                token,
                owner_id,
                operation,
                value,
                description,
                participants
            } = props

            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")

            if (!owner_id || !operation || !value || !description ) throw new ValidationError("Todas as informações são obrigatorias!")

            if (participants == null || participants.length == 0) throw new ValidationError("Pelo menos um participante deve ser cadastrado!")

            const formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');

            const participants_list = await this.getUsersByIdUseCase.execute(participants)

            if (participants_list.length == 0) throw new ValidationError("Nenhum participante foi encontrado!")

            const new_expense = new Expenses(operation, formattedDate, value, description, owner_id, participants_list)

            await this.expenseRepository.createExpense(new_expense)

            return new_expense
        }
        catch(err) {
            throw err
        }
    }
}