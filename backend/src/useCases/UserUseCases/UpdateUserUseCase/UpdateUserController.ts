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
        const token = req.headers['authorization']
        try {

            console.log(token)

            // verificar autorização 
            if (token == undefined || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")

            // verificar informações 
            if (!id) {
                throw new ValidationError("Id do usuário é obrigatório")
            }

            if (!name && !login && !password) {
                throw new ValidationError("Pelo menos uma modificação é necessária para esta operação")
            }

            await this.updateUserUseCase.execute({id, name, login, password})

            return res.status(201).json({
                statusCode: 201,
                message: "Usuário modificado com sucesso!",
                data: []
            })
        }
        catch (err) {
            const errorHandle = ErrorHandler.handleError(err)

            return res.status(errorHandle.statusCode).json({
                statusCode: errorHandle.statusCode,
                message: errorHandle.message,
                data: []
            })
        }       
    }
}