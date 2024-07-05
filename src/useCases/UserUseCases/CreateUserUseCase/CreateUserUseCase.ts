import { User } from "../../../entities/User"
import { UserRepository } from "../../../repositories/UserRepository/UserRepository"
import { CreateUserDTO } from "./CreateUserDTO"

class CreateUserUseCase {
    constructor(
        private userRepository: UserRepository
    ){}
    
    async execute(props: CreateUserDTO): Promise<void> {        
        try {
            
            const {name, login, password} = props
            
            const newUser = new User(name, login, password)
    
            await this.userRepository.createUser(newUser)
        }
        catch (err) {
            throw err
        }
    }   
}

export { CreateUserUseCase }