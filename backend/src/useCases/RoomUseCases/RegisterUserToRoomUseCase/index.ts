import { getUserByIdUseCase } from "../../UserUseCases/GetUserByIdUseCase";
import { setUserRoomUseCase } from "../../UserUseCases/SetUserRoomUseCase";
import { getRoomByNameUseCase } from "../GetRoomByNameUseCase";
import { updateRoomMembersNumUseCase } from "../UpdateRoomMembersNumUseCase";
import { RegisterUserToRoomController } from "./RegisterUserToRoomController";
import { RegisterUserToRoomUseCase } from "./RegisterUserToRoomUseCase";

const registerUserToRoomUseCase = new RegisterUserToRoomUseCase(getUserByIdUseCase, setUserRoomUseCase, getRoomByNameUseCase, updateRoomMembersNumUseCase)
export const registerUserToRoomController = new RegisterUserToRoomController(registerUserToRoomUseCase)