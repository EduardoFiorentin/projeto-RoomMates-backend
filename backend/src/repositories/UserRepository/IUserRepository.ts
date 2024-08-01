import { Users } from "../../entity/Users";
import { IUpdateUserRequestPattern } from "../../useCases/UserUseCases/UpdateUserUseCase/UpdateUserRequestPattern";

export interface IUsersRepository {
    //getUser(): Promise<User>,
    //getUsersById(id: string): Promise<>,
    createUser(user: Users): Promise<void>,
    findUserByLogin(login: string): Promise<Users|null>
    findUserById(id: string): Promise<Users|null>
    findUsersById(ids: string[]): Promise<Users[]>
    updateUser(props: IUpdateUserRequestPattern): Promise<void>,
    setRoom(user_id: string, room_id: string): Promise<void>
    //updateUser(modObj: IUpdateUserRequestDTO): Promise<boolean>,
    //deleteUser(id: string): Promise<boolean>,
    //auth(login: string, password: string): Promise<User>
}