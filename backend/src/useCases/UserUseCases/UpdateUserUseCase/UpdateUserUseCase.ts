import { Users } from "../../../entity/Users"
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError"
import { ValidationError } from "../../../exceptions/ValidationError"
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository"
import { JwtService } from "../../../services/JwtService/JwtService"
import { IUpdateUserRequestPattern } from "./UpdateUserRequestPattern"

export class UpdateUserUseCase {
    constructor(
        private userRepository: IUsersRepository
    ){}
    
    async execute(props: IUpdateUserRequestPattern): Promise<void> {        
        try {

            const { id, token, name, login, password } = props

            // verificar autorização 
            if (token == undefined || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")

            // verificar informações 
            if (!id) {
                throw new ValidationError("Id do usuário é obrigatório")
            }

            if (!name && !login && !password) {
                throw new ValidationError("Pelo menos uma modificação é necessária para esta operação")
            }
    
            
            const user = await this.userRepository.findUserById(props.id)
            if (user === null) throw new ValidationError("Usuário com id não existe") 
            
            this.userRepository.updateUser(props)   
        }
        catch (err) {
            throw err
        }

    }   
}