import { Request, Response } from "express";
import { CreateRoomUseCase } from "./CreateRoomUseCase";
import { ErrorHandler } from "../../../utils/ErrorHandler";

export class CreateRoomController {
    constructor(
        private createRoomUseCase: CreateRoomUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            const token = req.headers['authorization'] || ''

            const { name, members_num, owner_id} = req.body

            const new_room = await this.createRoomUseCase.execute({ token, name, members_num, owner_id})

            return res.status(201).json({
                statusCode: 201,
                message: "Registro criado com sucesso!",
                data: {
                    
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