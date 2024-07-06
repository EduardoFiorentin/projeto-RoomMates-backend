import { Users } from "../../entity/Users";

export interface IUsersRepository {
    //getUser(): Promise<User>,
    //getUsersById(id: string): Promise<>,
    createUser(user: Users): Promise<void>,
    findUserByLogin(login: string): Promise<Users|null>
    //updateUser(modObj: IUpdateUserRequestDTO): Promise<boolean>,
    //deleteUser(id: string): Promise<boolean>,
    //auth(login: string, password: string): Promise<User>
}