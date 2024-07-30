import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";
import { SetUserRoomUseCase } from "../../UserUseCases/SetUserRoomUseCase/SetUserRoomUseCase";

// responsável por atribuir um room já existente a usuários SEM um room
// usuário que quer entrar acessa esta rota
// recebe o nome do room que o usuário quer entrar
export class GetRoomByNameUseCase {
    constructor (
        private roomRepository: IRoomRepository
    ){} 

    async execute(room_name: string) {
        try {
            
            const room = await this.roomRepository.getRoomByName(room_name)
            return room
        }
        catch(err) {
            throw err
        }
    }
}