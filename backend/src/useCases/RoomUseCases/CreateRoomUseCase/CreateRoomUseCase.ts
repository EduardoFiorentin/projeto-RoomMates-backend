import { Room } from "../../../entity/Room";
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { ValidationError } from "../../../exceptions/ValidationError";
import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";
import { JwtService } from "../../../services/JwtService/JwtService";
import { setUserRoomUseCase } from "../../UserUseCases/SetUserRoomUseCase";
import { ICreateRoomRequestPattern } from "./ICreateRoomRequestPattern";

export class CreateRoomUseCase {
    constructor(
        private roomRepository: IRoomRepository
    ){}

    async execute(props: ICreateRoomRequestPattern): Promise<Room> {
        try {
            const {token, name } = props

            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")

                
            if (!name) throw new ValidationError("Todas as informações são obrigatorias!")
                    
            // verificar se o usuário já não pertence a um room

            const {id, room} = JwtService.getInstance().getTokenInfo(token)

            if (room) throw new UnauthorizedOperationError("Usuário já possui ou participa de um quarto")
            
            // a info do token (room) não é atualizada ao criar um room

            const members_num = 1

            // definir o usuário que criou como pertencente ao room
            
            const new_room = new Room(name, members_num, id)

            
            await this.roomRepository.createRoom(new_room)
            await setUserRoomUseCase.execute(id, new_room.id)

            return new_room
        }
        catch(err) {
            throw err
        }
    }
}