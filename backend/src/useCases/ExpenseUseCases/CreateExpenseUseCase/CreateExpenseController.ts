import { Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase";
import { ErrorHandler } from "../../../utils/ErrorHandler";

export class CreateExpenseController {
    constructor(
        private createExpenseUseCase: CreateExpenseUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            const {
                owner_id,
                operation,
                date,
                value,
                description,
                participants
            } = req.body
            const token = req.headers['authorization'] || ''

            const new_expense = await this.createExpenseUseCase.execute({
                token,
                owner_id,
                operation,
                date,
                value,
                description,
                participants
            })

            return res.status(201).json({
                statusCode: 201,
                message: "Registro criado com sucesso!",
                data: {
                    id: new_expense.id,
                    owner_id: new_expense.owner_id,
                    operation: new_expense.operation,
                    date: new_expense.date,
                    value: new_expense.value,
                    description: new_expense.description,
                    participants: new_expense.participants
                }
            })
        }
        catch (err) {
            const errorHandle = ErrorHandler.validationHandleError(err)

            return res.status(errorHandle.statusCode).json({
                statusCode: errorHandle.statusCode,
                message: errorHandle.message,
                data: []
            })
        }
    }
}