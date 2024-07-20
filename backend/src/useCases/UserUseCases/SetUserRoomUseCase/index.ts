import { roomRepository } from "../../../repositories/RoomRepository";
import { userRepository } from "../../../repositories/UserRepository";
import { SetUserRoomUseCase } from "./SetUserRoomUseCase";

export const setUserRoomUseCase = new SetUserRoomUseCase(userRepository, roomRepository)
