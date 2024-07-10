import { userRepository } from "../../../repositories/UserRepository";
import { UpdateUserController } from "./UpdateUserController";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
const updateUserUseCase = new UpdateUserUseCase(userRepository)
const updateUserController = new UpdateUserController(updateUserUseCase)

export { updateUserController }