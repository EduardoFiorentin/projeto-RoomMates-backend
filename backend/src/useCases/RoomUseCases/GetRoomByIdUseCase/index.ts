import { roomRepository } from "../../../repositories/RoomRepository";
import { GetRoomByIdController } from "./GetRoomByIdController";
import { GetRoomByIdUseCase } from "./GetRoomByIdUseCase";

const getRoomByIdUseCase = new GetRoomByIdUseCase(roomRepository)
const getRoomByIdController = new GetRoomByIdController(getRoomByIdUseCase)

export { getRoomByIdController, getRoomByIdUseCase }