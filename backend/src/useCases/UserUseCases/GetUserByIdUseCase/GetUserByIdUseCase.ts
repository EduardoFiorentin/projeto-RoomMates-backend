import { Users } from "../../../entity/Users";
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository";

export class GetUserByIdUseCase {
    constructor (
        private userRepository: IUsersRepository
    ){}

    async execute(userId: string): Promise<Users|null> {
        try {

            const user = await this.userRepository.findUserById(userId)
            return user

        }
        catch (err) {
            throw err
        }
    }
}