import { Room } from "../../../entity/Room";
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";
import { JwtService } from "../../../services/JwtService/JwtService";

export class GetRoomByIdUseCase {
    constructor(
        private roomRepository: IRoomRepository
    ){}

    async execute(id: string, token?: string): Promise<Room|null> {
        try {

            // verificações 
            if (token && (token == '' || !JwtService.getInstance().validateToken(token))) throw new UnauthorizedOperationError("Token JWT inválido")

            const room = await this.roomRepository.getRoomById(id)
            return room
        }
        catch(err) {
            throw err
        }
    }   
}