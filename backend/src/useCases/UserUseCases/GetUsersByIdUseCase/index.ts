import { userRepository } from "../../../repositories/UserRepository";
import { GetUsersByIdUseCase } from "./GetUsersByIdUseCase";

export const getUsersByIdUseCase = new GetUsersByIdUseCase(userRepository)