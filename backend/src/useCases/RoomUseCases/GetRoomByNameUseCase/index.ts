import { roomRepository } from "../../../repositories/RoomRepository";
import { GetRoomByNameUseCase } from "./GetRoomByNameUseCase";

export const getRoomByNameUseCase = new GetRoomByNameUseCase(roomRepository)