import { Users } from "../../../entity/Users"
import { ValidationError } from "../../../exceptions/ValidationError"
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository"
import { IUpdateUserRequestPattern } from "./UpdateUserRequestPattern"

export class UpdateUserUseCase {
    constructor(
        private userRepository: IUsersRepository
    ){}
    
    async execute(props: IUpdateUserRequestPattern): Promise<void> {        
        try {

            const user = await this.userRepository.findUserById(props.id)
            if (user === null) throw new ValidationError("Usuário com id não existe") 
            
            this.userRepository.updateUser(props)   
        }
        catch (err) {
            throw err
        }

    }   
}