import { Request, Response } from "express";
import { RegisterUserToRoomUseCase } from "./RegisterUserToRoomUseCase";
import { ErrorHandler } from "../../../utils/ErrorHandler";

export class RegisterUserToRoomController {
    constructor (
        private registerUserToRoomUseCase: RegisterUserToRoomUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {

            const token = req.headers['authorization'] || ''
            const { room_name } = req.body

            await this.registerUserToRoomUseCase.execute({room_name, token})

            return res.status(201).json({
                statusCode: 201,
                message: "Usuário registrado com sucesso!",
                data: null 
            })

        }
        catch(err) {
            const errorHandle = ErrorHandler.validationHandleError(err)

            return res.status(errorHandle.statusCode).json({
                statusCode: errorHandle.statusCode,
                message: errorHandle.message, 
                data: [] 
            })
        } 
    }
}