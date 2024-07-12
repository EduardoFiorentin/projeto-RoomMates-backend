import { DataSource, Repository } from "typeorm";
import { Expenses } from "../../../entity/Expense";
import { IExpenseRepository } from "../IExpenseRepository";
import { InternalError } from "../../../exceptions/InternalError";
import { PostgresDatabase } from "../../../infrastructure/PostgresDatabase/PostgresDatabase";

export class PostgresExpenseRepository implements IExpenseRepository {
    private connection!: DataSource;
    private expenseRepository!: Repository<Expenses>;

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
            this.expenseRepository = this.connection.getRepository(Expenses);

            if (this.connection) console.log(":/ Conexão estabelecida - postgres - Repositorio Expenses")
            else {
                throw new InternalError("Falha na conexão com repositório de Expenses - contate o suporte técnico!")
            }
        }
        catch (err) {
            console.log(":/ Não foi possível se conectar ao repositório de Expenses - Postgres Database")

            if (err instanceof Error) console.log("Erro: \n\tName:", err.name, "Message: ", err.message)
            process.exit(1)
        }
    }

    public async findExpenseById(id: string): Promise<Expenses|null> {
        try {
            const expense: Expenses | null = await this.expenseRepository.findOneBy({id})
            return expense
        }
        catch(err) {
            console.log("Erro no expense:::::\n"+err)
            return null
        }
    }
    
    async createExpense(expense: Expenses): Promise<void> {
        
    }
}