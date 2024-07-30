import { Room } from "../../entity/Room";

export interface IRoomRepository {
    getRoomById(id: string): Promise<Room|null>, 
    getRoomByName(room_name: string): Promise<Room|null>,
    getRoomByOwnerId(owner_id: string): Promise<Room|null>,
    createRoom(new_room: Room): Promise<void>, 
    updateMembersNum(room_id: string, new_value: string): Promise<void>
    // updateRoom(mod_obj): Promise<Room|null>,
    // deleteRoom(id: string): Promise<void>
}