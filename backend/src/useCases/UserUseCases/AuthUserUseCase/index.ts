import { userRepository } from "../../../repositories/UserRepository";
import { AuthUserController } from "./AuthUserController";
import { AuthUserUseCase } from "./AuthUserUseCase";

const authUserUseCase = new AuthUserUseCase(userRepository)
const authUserController = new AuthUserController(authUserUseCase)

export { authUserController }