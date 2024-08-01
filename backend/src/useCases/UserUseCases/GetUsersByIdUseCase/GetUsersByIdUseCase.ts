import { Users } from "../../../entity/Users";
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository";

export class GetUsersByIdUseCase {
    constructor (
        private userRepository: IUsersRepository
    ){}

    async execute(usersId: string[]): Promise<Users[]> {
        try {

            const user = await this.userRepository.findUsersById(usersId)
            return user

        }
        catch (err) {
            throw err
        }
    }
}