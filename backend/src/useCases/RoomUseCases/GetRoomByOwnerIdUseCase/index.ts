import { roomRepository } from "../../../repositories/RoomRepository";
import { GetRoomByOwnerIdController } from "./GetRoomByOwnerIdController";
import { GetRoomByOwnerUseCase } from "./GetRoomByOwnerUseCase";

const getRoomByOwnerIdUseCase = new GetRoomByOwnerUseCase(roomRepository)
export const getRoomByOwnerIdController = new GetRoomByOwnerIdController(getRoomByOwnerIdUseCase)