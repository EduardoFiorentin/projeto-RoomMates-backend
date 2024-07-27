import { roomRepository } from "../../../repositories/RoomRepository";
import { UpdateRoomMembersNumUseCase } from "./UpdateRoomMembersNumUseCase";

export const updateRoomMembersNumUseCase = new UpdateRoomMembersNumUseCase(roomRepository)