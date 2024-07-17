import { Room } from "../../../entity/Room";
import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";

export class GetRoomByOwnerUseCase {
    constructor(
        private roomRepository: IRoomRepository
    ){}

    async execute(owner_id: string): Promise<Room|null> {
        try {

            // verificações 

            const room = await this.roomRepository.getRoomByOwnerId(owner_id)
            return room
        }
        catch(err) {
            throw err
        }
    }   
}