import { Room } from "../../../entity/Room";
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { ValidationError } from "../../../exceptions/ValidationError";
import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";
import { JwtService } from "../../../services/JwtService/JwtService";
import { ICreateRoomRequestPattern } from "./ICreateRoomRequestPattern";

export class CreateRoomUseCase {
    constructor(
        private roomRepository: IRoomRepository
    ){}

    async execute(props: ICreateRoomRequestPattern): Promise<Room> {
        try {
            const {token, name, members_num, owner_id} = props

            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")
            
            if (!name || !members_num || !owner_id) throw new ValidationError("Todas as informações são obrigatorias!")

            const new_room = new Room(name, members_num, owner_id)

            await this.roomRepository.createRoom(new_room)
            return new_room
        }
        catch(err) {
            throw err
        }
    }
}