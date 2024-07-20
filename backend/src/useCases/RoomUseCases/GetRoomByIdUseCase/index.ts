import { roomRepository } from "../../../repositories/RoomRepository";
import { GetRoomByIdUseCase } from "./GetRoomByIdUseCase";

export const getRoomByIdUseCase = new GetRoomByIdUseCase(roomRepository)