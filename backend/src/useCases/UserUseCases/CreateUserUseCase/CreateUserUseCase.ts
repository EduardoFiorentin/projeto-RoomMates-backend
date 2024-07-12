import { Users } from "../../../entity/Users"
import { ValidationError } from "../../../exceptions/ValidationError"
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository"
import { PostgresUserRepository } from "../../../repositories/UserRepository/implementations/PostgresUserRepository"
import { CreateUserRequestPattern } from "./CreateUserRequestPattern"

class CreateUserUseCase {
    constructor(
        private userRepository: IUsersRepository
    ){}
    
    async execute(props: CreateUserRequestPattern): Promise<void> {        
        try {
            
            const {name, login, password} = props
            
            // verificar informações 
            if (!name || !login || !password) {
                throw new ValidationError("Todas as informações são obrigatorias")
            }

            const newUser = new Users(name, login, password)
    
            await this.userRepository.createUser(newUser)
        }
        catch (err) {
            throw err
        }
    }   
}

export { CreateUserUseCase }