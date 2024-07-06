import { NextFunction, Request, Response } from "express"
import { ValidationError } from "../../../exceptions/ValidationError"
import { ErrorHandler } from "../../../utils/ErrorHandler"
import { AuthUserUseCase } from "./AuthUserUseCase"
import { IAuthResponsePattern } from "./AuthResponsePattern"

export class AuthUserController {
    constructor(
        private authUserUseCase: AuthUserUseCase
    ){}

    async handle(req: Request, res: Response) {
        const { login, password } = req.body
        try {
            // verificar informações 
            if (!login || !password) {
                throw new ValidationError("Todas as informações são obrigatorias")
            }

            const response: IAuthResponsePattern = await this.authUserUseCase.execute(login, password)

            return res.status(201).json({
                statusCode: 201,
                message: "Login efetuado com sucesso!",
                data: response
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