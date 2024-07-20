import { Room } from "../../../entity/Room";
import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";

export class GetRoomByIdUseCase {
    constructor(
        private roomRepository: IRoomRepository
    ){}

    async execute(id: string): Promise<Room|null> {
        try {

            // verificações 

            const room = await this.roomRepository.getRoomById(id)
            return room
        }
        catch(err) {
            throw err
        }
    }   
}