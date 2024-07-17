import { Request, Response } from "express";
import { ErrorHandler } from "../../../utils/ErrorHandler";
import { GetRoomByOwnerUseCase } from "./GetRoomByOwnerUseCase";

export class GetRoomByOwnerIdController {
    constructor (
        private getRoomByOwnerIdUseCase: GetRoomByOwnerUseCase
    ){}

    async handle(req: Request, res: Response) {
        try {

            const room = await this.getRoomByOwnerIdUseCase.execute("1234")

            res.status(200).json(room)

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