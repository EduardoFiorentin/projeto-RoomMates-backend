import { Request, Response } from "express"
import { ErrorHandler } from "../../../utils/ErrorHandler"
import { GetExpenseByUserUseCase } from "./GetExpenseByUserUseCase"
import { JwtService } from "../../../services/JwtService/JwtService"
import { describe } from "node:test"
import { Users } from "../../../entity/Users"
import { Expenses } from "../../../entity/Expense"

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

export class GetExpenseByUserController {
    constructor(
        private getExpenseByUserUseCase: GetExpenseByUserUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            
            const token = req.headers['authorization'] || ''    

            const expenses = await this.getExpenseByUserUseCase.execute(token) 
            // console.log("Token: ", token)
            
            // const expenses: Expenses[] = [] 

            if (expenses != null) {
                let format_expenses: IExpenseResponse[] = []
                console.log("Expenses: ", expenses)
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