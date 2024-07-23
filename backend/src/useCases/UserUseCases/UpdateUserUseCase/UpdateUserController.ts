import { NextFunction, Request, Response } from "express"
import { ValidationError } from "../../../exceptions/ValidationError"
import { ErrorHandler } from "../../../utils/ErrorHandler"
import { UpdateUserUseCase } from "./UpdateUserUseCase"
import { JwtService } from "../../../services/JwtService/JwtService"
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError"

export class UpdateUserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase
    ){}

    async handle(req: Request, res: Response) {
        const { name, login, password } = req.body
        const { id } = req.params
        const token = req.headers['authorization'] || ''
        try {

            await this.updateUserUseCase.execute({id, token, name, login, password})

            return res.status(201).json({
                statusCode: 201,
                message: "Usuário modificado com sucesso!",
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