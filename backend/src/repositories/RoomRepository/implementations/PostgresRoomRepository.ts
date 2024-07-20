import { DataSource, Repository } from "typeorm";
import { IRoomRepository } from "../IRoomRepository";
import { Room } from "../../../entity/Room";
import { PostgresDatabase } from "../../../infrastructure/PostgresDatabase/PostgresDatabase";
import { InternalError } from "../../../exceptions/InternalError";
import { GetExpenseByUserController } from "../../../useCases/ExpenseUseCases/GetExpensesByUserUseCase/GetExpenseByUserController";
import { GetExpenseByUserUseCase } from "../../../useCases/ExpenseUseCases/GetExpensesByUserUseCase/GetExpenseByUserUseCase";
import { expensesRepository } from "../../ExpenseRepository";

export class PostgresRoomRepository implements IRoomRepository {
    private connection!: DataSource
    private roomRepository!: Repository<Room> 

    constructor() {
        try {
            this.establishConnection()
        }
        catch(err) {
            console.log(":/ Erro de construção - repostório Room")
        }
    }

    private async establishConnection(): Promise<void> {
        try {
            this.connection = (await PostgresDatabase.getInstance()).getConnection()
            this.roomRepository = this.connection.getRepository(Room)

            if (this.connection) console.log(":/ Conexão estabelecida - postgres - Repositorio Room")
            else {
                throw new InternalError("Falha na conexão com repositório Room - contate o suporte técnico!")
            }
        }
        catch(err) {
            console.log(":/ Não foi possível se conectar ao repositório Room - Postgres Database")

            if (err instanceof Error) console.log("Erro: \n\tName:", err.name, "Message: ", err.message)
            process.exit(1)
        }
    }

    async createRoom(new_room: Room): Promise<void> {
        try {
            await this.roomRepository.save(new_room)
        } catch (err) {
            throw err
        }
    }

    async getRoomById(id: string): Promise<Room | null> {
        try {
            const room = await this.roomRepository.findOneBy({id})
            console.log(room)
            return room
        }
        catch(err) {
            return null
        }
    }

    async getRoomByOwnerId(owner_id: string): Promise<Room | null> {
        
        // dá o id do usuário
        // retorna o quarto ao qual o usuário pertence 
        
        try {
            const room = await this.roomRepository.findOneBy({owner_id})
            return room
        }
        catch(err) { 
            return null
        }
    }
}