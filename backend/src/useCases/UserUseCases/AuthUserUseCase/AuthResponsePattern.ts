import { Room } from "../../../entity/Room";

export interface IAuthResponsePattern {
    id: string, 
    name: string,
    token: string,
    room_id: string | null
}