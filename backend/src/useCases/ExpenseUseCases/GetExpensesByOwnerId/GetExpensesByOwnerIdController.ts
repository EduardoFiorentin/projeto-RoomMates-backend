import { Request, Response } from "express"
import { ErrorHandler } from "../../../utils/ErrorHandler"
import { JwtService } from "../../../services/JwtService/JwtService"
import { describe } from "node:test"
import { Users } from "../../../entity/Users"
import { GetExpensesByOwnerIdUseCase } from "./GetExpensesByOwnerIdUseCase"

interface IExpenseResponse {
    id: string,
    operation: string,
    owner_id: string,
    date: string,
    value: number,
    description: string,
    participants: IUserResume[]
}

interface IUserResume {
    id: string,
    name: string,
    login: string
}

export class GetExpenseByOwnerIdController {
    constructor(
        private getExpenseByOwnerIdUseCase: GetExpensesByOwnerIdUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            
            const { owner_id } = req.body
            const token = req.headers['authorization'] || ''

            const expenses = await this.getExpenseByOwnerIdUseCase.execute(owner_id, token)

            if (expenses != null) {
                let format_expenses: IExpenseResponse[] = []
                expenses.map((item) => {
                    let participants: IUserResume[] = []
                    item.participants.map(part => participants.push({
                        id: part.id,
                        name: part.name,
                        login: part.login
                    }))

                    format_expenses.push({
                        id: item.id,  
                        owner_id: item.owner_id, 
                        operation: item.operation,
                        date: item.date,
                        value: item.value,
                        description: item.description,
                        participants: participants
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