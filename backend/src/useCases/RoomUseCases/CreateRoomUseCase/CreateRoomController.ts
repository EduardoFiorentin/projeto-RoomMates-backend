import { Request, Response } from "express";
import { CreateRoomUseCase } from "./CreateRoomUseCase";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { Room } from "../../../entity/Room";

export class CreateRoomController {
    constructor(
        private createRoomUseCase: CreateRoomUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {
            const token = req.headers['authorization'] || ''

            const { name } = req.body

            const new_room = await this.createRoomUseCase.execute({ token, name})

            const response_room = new_room ? {
                id: new_room.id, 
                owner_id: new_room.owner_id,
                name: new_room.name,
                members_num: new_room.members_num
            } as Room : null

            return res.status(201).json({
                statusCode: 201,
                message: "Registro criado com sucesso!",
                data: response_room
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