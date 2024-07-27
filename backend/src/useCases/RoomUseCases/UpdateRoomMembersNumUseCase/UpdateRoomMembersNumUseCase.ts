import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";

export class UpdateRoomMembersNumUseCase {
    constructor(
        private roomRepository: IRoomRepository
    ){}

    async execute(room_id: string, new_value: string) {
        try {

            await this.roomRepository.updateMembersNum(room_id, new_value)

        }
        catch(err) {
            throw err
        }
    }
}