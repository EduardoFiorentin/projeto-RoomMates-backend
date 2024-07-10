import { DataSource, Repository } from "typeorm";
import { Users } from "../../../entity/Users";
import { InternalError } from "../../../exceptions/InternalError";
import { PostgresDatabase } from "../../../infrastructure/PostgresDatabase/PostgresDatabase";
import { IUsersRepository } from "../IUserRepository";
import { NotFoundError } from "../../../exceptions/NotFoundError";
import { IUpdateUserRequestPattern } from "../../../useCases/UserUseCases/UpdateUserUseCase/UpdateUserRequestPattern";
import { UpdateQueryGenerator } from "../../../utils/UpdateQueryGenerator";
import { threadId } from "worker_threads";
import { ValidationError } from "../../../exceptions/ValidationError";

export class UserRepository implements IUsersRepository {

    private connection!: DataSource;
    private userRepository!: Repository<Users>;

    constructor() {
        this.establishConnection();
    }

    private async establishConnection(): Promise<void> {
        this.connection = (await PostgresDatabase.getInstance()).getConnection();
        this.userRepository = this.connection.getRepository(Users);

        if (this.connection) console.log(":/ Conexão estabelecida - postgres - Repositorio usuários")
        else {
            console.log(":/ Falha na conexão - postgres - Repositorio usuários")
            throw new InternalError("Falha na conexão com repositório de usuários - contate o suporte técnico!")
        }
    }

    async findUserById(id: string): Promise<Users|null> {
        try {
            const user: Users | null = await this.userRepository.findOneBy({id})
            return user
        }
        catch(err) {
            console.log("Erro: ", err)
            return null
        }
    }

    async createUser(user: Users): Promise<void> {
        try {
            
            await this.userRepository.save(user)

        } 
        catch(err) {
            throw err
        }
    }

    async findUserByLogin(login: string): Promise<Users|null> {
        try {
            const user = await this.userRepository.findOneBy({ login })
    
            if (user == null) throw new NotFoundError("Usuário não encontrado!")
    
            return user
        } 
        catch(err) {
            throw err
        }
    }

    async updateUser(props: IUpdateUserRequestPattern): Promise<void> {
        try {

            // verifica se o usuário existe 


            const query: string | null = UpdateQueryGenerator.updateUserQuery(props)
            console.log(query)

            if (query !== null) {
                await this.userRepository.query(query, [])
            }

        }
        catch(err) {
            throw err
        }
    }
}
