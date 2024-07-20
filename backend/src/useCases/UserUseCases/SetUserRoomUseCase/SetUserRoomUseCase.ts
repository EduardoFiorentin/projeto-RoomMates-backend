import { NotFoundError } from "../../../exceptions/NotFoundError";
import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository";

export class SetUserRoomUseCase {
    constructor(
        private userRepository: IUsersRepository,
        private roomRepository: IRoomRepository
    ) {}

    async execute(user_id: string, room_id: string) {
        try {

            const room = await this.roomRepository.getRoomById(room_id)
            if (!room) throw new NotFoundError(`Room não existe!`)

            this.userRepository.setRoom(user_id, room_id)

        } 
        catch (err) {
            throw err
        }
    }
}