import { Room } from "../../entity/Room";

export interface IRoomRepository {
    getRoomById(id: string): Promise<Room|null>, 
    getRoomByOwnerId(owner_id: string): Promise<Room|null>,
    createRoom(new_room: Room): Promise<void>, 
    // updateRoom(mod_obj): Promise<Room|null>,
    // deleteRoom(id: string): Promise<void>
}