import { Request, Response } from "express";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase";

export class DeleteExpenseController {
    constructor(
        private createExpenseUseCase: DeleteExpenseUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            
            const expenseId = req.params.id
            const token = req.headers['authorization'] || ''

            await this.createExpenseUseCase.execute(expenseId, token)

            return res.status(201).json({
                statusCode: 201,
                message: "Registro deletado com sucesso!",
                data: []
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