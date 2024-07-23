import { Request, Response } from "express"
import { ErrorHandler } from "../../../utils/ErrorHandler"
import { GetExpenseByUserUseCase } from "./GetExpenseByUserUseCase"
import { JwtService } from "../../../services/JwtService/JwtService"
import { describe } from "node:test"

interface IExpenseResponse {
    id: string,
    operation: string,
    owner_id: string,
    date: Date,
    value: number,
    description: string
}

export class GetExpenseByUserController {
    constructor(
        private getExpenseByUserUseCase: GetExpenseByUserUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            
            const token = req.headers['authorization'] || ''

            const expenses = await this.getExpenseByUserUseCase.execute(token)

            if (expenses != null) {
                let format_expenses: IExpenseResponse[] = []
                expenses.map((item) => {
                    format_expenses.push({
                        id: item.id,  
                        owner_id: item.owner_id, 
                        operation: item.operation,
                        date: item.date,
                        value: item.value,
                        description: item.description
                    })

                })
                return res.status(201).json({
                    statusCode: 201,
                    message: "Operação realizada com sucesso!",
                    data: format_expenses
                })
            }

            return res.status(201).json({
                statusCode: 201,
                message: "Não há registros cadastrados!",
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