import { DataSource, QueryFailedError, Repository } from "typeorm";
import { Users } from "../../../entity/Users";
import { InternalError } from "../../../exceptions/InternalError";
import { PostgresDatabase } from "../../../infrastructure/PostgresDatabase/PostgresDatabase";
import { IUsersRepository } from "../IUserRepository";
import { NotFoundError } from "../../../exceptions/NotFoundError";
import { IUpdateUserRequestPattern } from "../../../useCases/UserUseCases/UpdateUserUseCase/UpdateUserRequestPattern";
import { UpdateQueryGenerator } from "../../../utils/UpdateQueryGenerator";
import { ErrorHandler } from "../../../utils/ErrorHandler";

// testar tratamentos de erros no escopo do repositório

export class PostgresUserRepository implements IUsersRepository {

    private connection!: DataSource;
    private userRepository!: Repository<Users>;

    constructor() {
        
        try {
            this.establishConnection();
        }
        catch(err) {
            console.log("log de erro no constructor")
        }
    }

    private async establishConnection(): Promise<void> {
        try {
            this.connection = (await PostgresDatabase.getInstance()).getConnection();
            this.userRepository = this.connection.getRepository(Users);

            if (this.connection) console.log(":/ Conexão estabelecida - postgres - Repositorio usuários")
            else {
                throw new InternalError("Falha na conexão com repositório de usuários - contate o suporte técnico!")
            }
        }
        catch (err) {
            console.log(":/ Não foi possível se conectar ao repositório de Usuários - Postgres Database")

            if (err instanceof Error) console.log("Erro: \n\tName:", err.name, "Message: ", err.message)
            process.exit(1)
        }
    }

    async findUserById(id: string): Promise<Users|null> {
        try {
            const user: Users | null = await this.userRepository.findOneBy({id})
            return user
        }
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório users - findUserByLogin")
            }
            else 
                return null
        }
    }

    async createUser(user: Users): Promise<void> {
        try {
            
            await this.userRepository.save(user)

        } 
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório users - findUserByLogin")
            }
            else 
                throw new InternalError("Não foi possível cadastrar usuário! Tente novamente mais tarde")
        }
    }

    async findUserByLogin(login: string): Promise<Users|null> {
        try {
            const user = await this.userRepository.findOneBy({ login })
    
            if (user == null) throw new NotFoundError("Usuário não encontrado!")
    
            return user
        } 
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório users - findUserByLogin")
            }
            else 
                throw err
        }
    }

    async updateUser(props: IUpdateUserRequestPattern): Promise<void> {
        try {

            const query: string | null = UpdateQueryGenerator.updateUserQuery(props)
            console.log(query)

            if (query !== null) {
                await this.userRepository.query(query, [])
            }

        }
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório users - findUserByLogin")
            }
            else 
                throw new InternalError("Não foi possível realizar alterações! Tente novamente mais tarde!")
        }
    }
}

