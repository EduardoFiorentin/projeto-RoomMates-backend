import { Request, Response } from "express";
import { GetRoomByIdUseCase } from "./GetRoomByIdUseCase";
import { Room } from "../../../entity/Room";
import { ErrorHandler } from "../../../utils/ErrorHandler";

export class GetRoomByIdController {
    constructor(
        private getRoomByIdUseCase: GetRoomByIdUseCase
    ) {}

    async handle(req: Request, res: Response) {
        try {

            const { room_id } = req.body
            const token = req.headers['authorization'] || ''

            const room = await this.getRoomByIdUseCase.execute(room_id, token)

            return res.status(200).json({
                statusCode: 200,
                message: "",
                data: room ? {
                    id: room.id,
                    name: room.name,
                    members_num: room.members_num,
                    owner_id: room.owner_id
                } 
                : null
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