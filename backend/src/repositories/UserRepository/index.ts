import { PostgresUserRepository } from "./implementations/PostgresUserRepository";

const userRepository = new PostgresUserRepository()

export { userRepository }