import { User } from "../../entities/User";

export interface IUsersRepository {
    //getUser(): Promise<User>,
    //getUsersById(id: string): Promise<>,
    createUser(user: User): Promise<void>
    //updateUser(modObj: IUpdateUserRequestDTO): Promise<boolean>,
    //deleteUser(id: string): Promise<boolean>,
    //auth(login: string, password: string): Promise<User>
}