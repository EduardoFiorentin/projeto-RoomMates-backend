import { Users } from "../../../entity/Users"
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError"
import { ValidationError } from "../../../exceptions/ValidationError"
import { IUsersRepository } from "../../../repositories/UserRepository/IUserRepository"
import { PostgresUserRepository } from "../../../repositories/UserRepository/implementations/PostgresUserRepository"
import { JwtService } from "../../../services/JwtService/JwtService"
import { getRoomByIdUseCase } from "../../RoomUseCases/GetRoomByIdUseCase"
import { getRoomByOwnerIdUseCase } from "../../RoomUseCases/GetRoomByOwnerIdUseCase"
import { GetRoomByOwnerUseCase } from "../../RoomUseCases/GetRoomByOwnerIdUseCase/GetRoomByOwnerUseCase"
import { IAuthResponsePattern } from "./AuthResponsePattern"

export class AuthUserUseCase {
    constructor(
        private userRepository: IUsersRepository
    ){}
    
    async execute(login: string, password: string): Promise<IAuthResponsePattern> {        
        try {

            if (!login || !password) {
                throw new ValidationError("Todas as informações são obrigatorias")
            }
            
            const user = await this.userRepository.findUserByLogin(login)

            if (
                user == null || 
                !user.validatePass(password)
            ) throw new UnauthorizedOperationError("Login ou senha incorretos!")

            const token = JwtService.getInstance().generateToken({
                id: user.id,
                name: user.name,
                room: user.room_id
            })
            
            console.log("room id: ", user.room_id)

            const room = user.room_id ? await getRoomByIdUseCase.execute(user.room_id) : null

            return {  
                id: user.id,
                name: user.name,
                token: token,
                room: room
            }
        }
        catch (err) {
            throw err
        }
    }   
}
 