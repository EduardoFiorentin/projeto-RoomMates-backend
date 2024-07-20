import { roomRepository } from "../../../repositories/RoomRepository";
import { CreateRoomController } from "./CreateRoomController";
import { CreateRoomUseCase } from "./CreateRoomUseCase";

const createRoomUseCase = new CreateRoomUseCase(roomRepository)
const createRoomController = new CreateRoomController(createRoomUseCase)

export {createRoomController}