import { userRepository } from "../../../repositories/UserRepository";
import { GetUserByIdUseCase } from "./GetUserByIdUseCase";

export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)