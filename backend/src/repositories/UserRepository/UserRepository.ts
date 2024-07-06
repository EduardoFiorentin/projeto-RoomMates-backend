import { User } from "../../entities/User";
import { InternalError } from "../../exceptions/InternalError";
import { IUsersRepository } from "./IUserRepository";

export class UserRepository implements IUsersRepository {
    async createUser(user: User): Promise<void> {
        const errorTest = false
        try {
            
            // logica de criação no banco de dados 
            
            if (errorTest) throw new InternalError("Operação falhou!")

        } 
        catch(err) {
            throw err
        }
    }

    async findUserByLogin(login: string): Promise<User|null> {
        if (login == "testelogin") return new User("Teste de login", "testelogin", "senha")
        else return new User("erro", "erro", "erro")
    }
}
