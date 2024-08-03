import { stringify } from "querystring";
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { ValidationError } from "../../../exceptions/ValidationError";
import { IRoomRepository } from "../../../repositories/RoomRepository/IRoomRepository";
import { JwtService } from "../../../services/JwtService/JwtService";
import { GetUserByIdUseCase } from "../../UserUseCases/GetUserByIdUseCase/GetUserByIdUseCase";
import { SetUserRoomUseCase } from "../../UserUseCases/SetUserRoomUseCase/SetUserRoomUseCase";
import { GetRoomByNameUseCase } from "../GetRoomByNameUseCase/GetRoomByNameUseCase";
import { UpdateRoomMembersNumUseCase } from "../UpdateRoomMembersNumUseCase/UpdateRoomMembersNumUseCase";
import { IRegisterUserToRoomRequestPattern } from "./IRegisterUserToRoomRequestPattern";

// responsável por atribuir um room já existente a usuários SEM um room
// usuário que quer entrar acessa esta rota
// recebe o nome do room que o usuário quer entrar
export class RegisterUserToRoomUseCase {
    constructor (
        private getUserByIdUseCase: GetUserByIdUseCase, 
        private setUserRoomUseCase: SetUserRoomUseCase,
        private getRoomByNameUseCase: GetRoomByNameUseCase,
        private updateRoomMembersNumUseCase: UpdateRoomMembersNumUseCase
    ){} 

    async execute(props: IRegisterUserToRoomRequestPattern) {
        try {

            // verificações da requisição 
            const {token, room_name } = props

            if (token == '' || !JwtService.getInstance().validateToken(token)) throw new UnauthorizedOperationError("Token JWT inválido")

                
            if (!room_name) throw new ValidationError("Todas as informações são obrigatorias!")
                    
            // verificar se o usuário já não pertence a um room

            const user_id = JwtService.getInstance().getTokenInfo(token).id
            const user = await this.getUserByIdUseCase.execute(user_id)

            if (user == null) throw new UnauthorizedOperationError("Usuário não encontrado!")

            if (user.room_id) throw new UnauthorizedOperationError("Usuário já possui ou participa de um quarto")


            // encontrar o room 
            const room = await this.getRoomByNameUseCase.execute(room_name)
            if (room == null) throw new UnauthorizedOperationError(`Room com nome '${room_name}' não encontrado!`)
            
            // setar o room para o usuário que pediu 
            await this.setUserRoomUseCase.execute(user_id, room.id) 

            // atualizar numero de membros 
            await this.updateRoomMembersNumUseCase.execute(room.id, (room.members_num + 1).toString())
        }
        catch(err) {
            throw err
        }
    }
}