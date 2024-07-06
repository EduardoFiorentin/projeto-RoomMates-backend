import { User } from "../../../entities/User"
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError"
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository"
import { UserRepository } from "../../../repositories/UserRepository/UserRepository"
import { JwtService } from "../../../services/JwtService/JwtService"
import { IAuthResponsePattern } from "./AuthResponsePattern"

export class AuthUserUseCase {
    constructor(
        private userRepository: IUsersRepository
    ){}
    
    async execute(login: string, password: string): Promise<IAuthResponsePattern> {        
        try {
            
            const user = await this.userRepository.findUserByLogin(login)

            if (
                user == null || 
                !user.validatePass(password)
            ) throw new UnauthorizedOperationError("Login ou senha incorretos!")

            const token = JwtService.getInstance().generateToken({
                id: user.getId(),
                name: user.getName() 
            })

            return {
                id: user.getId(),
                name: user.getName(),
                token: token
            }
        }
        catch (err) {
            throw err
        }
    }   
}
