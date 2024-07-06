import { Users } from "../../../entity/Users"
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository"
import { UserRepository } from "../../../repositories/UserRepository/implementations/UserRepository"
import { CreateUserDTO } from "./CreateUserDTO"

class CreateUserUseCase {
    constructor(
        private userRepository: IUsersRepository
    ){}
    
    async execute(props: CreateUserDTO): Promise<void> {        
        try {
            
            const {name, login, password} = props
            
            const newUser = new Users(name, login, password)
    
            await this.userRepository.createUser(newUser)
        }
        catch (err) {
            throw err
        }
    }   
}

export { CreateUserUseCase }