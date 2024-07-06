import { NextFunction, Request, Response } from "express"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { ValidationError } from "../../../exceptions/ValidationError"
import { ErrorHandler } from "../../../utils/ErrorHandler"

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ){}

    async handle(req: Request, res: Response) {
        const { name, login, password } = req.body
        try {
            // verificar informações 
            if (!name || !login || !password) {
                throw new ValidationError("Todas as informações são obrigatorias")
            }

            await this.createUserUseCase.execute({name, login, password})

            return res.status(201).json({
                statusCode: 201,
                message: "Usuário criado com sucesso!",
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