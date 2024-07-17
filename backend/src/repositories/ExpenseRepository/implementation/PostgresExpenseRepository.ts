import { DataSource, QueryFailedError, Repository } from "typeorm";
import { Expenses } from "../../../entity/Expense";
import { IExpenseRepository } from "../IExpenseRepository";
import { InternalError } from "../../../exceptions/InternalError";
import { PostgresDatabase } from "../../../infrastructure/PostgresDatabase/PostgresDatabase";
import { NotFoundError } from "../../../exceptions/NotFoundError";
import { UnauthorizedOperationError } from "../../../exceptions/UnauthorizedOperationError";
import { ErrorHandler } from "../../../utils/ErrorHandler";

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
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório expenses - updateUser")
            }
            else 
                throw new InternalError("Não foi possível realizar alterações! Tente novamente mais tarde!")
        }
    }
    
    async createExpense(expense: Expenses): Promise<void> {
        try {

            await this.expenseRepository.save(expense)

        }
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório expenses - create")
            }
            else 
                throw new InternalError("Não foi possível realizar alterações! Tente novamente mais tarde!")
        }
    }

    async getExpensesByUser(userId: string): Promise<Expenses[]|null> {
        try {
            const expenses = await this.expenseRepository.find({where: {owner_id: userId}})
            return expenses
        }
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório expenses - getByUser")
            }
            else 
                throw new InternalError("Não foi possível realizar alterações! Tente novamente mais tarde!")
        }
    }

    async deleteExpense(expenseId: string, userId: string): Promise<void> {
        try {
            const deleted = await this.expenseRepository.query("DELETE FROM expenses WHERE id = $1 AND owner_id = $2", [expenseId, userId])
            if (deleted[1] == 0) throw new UnauthorizedOperationError("Usuário não tem permissão para efetuar esta operação!")
        }
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório expenses - delete")
            }
            else 
                throw new InternalError("Não foi possível realizar alterações! Tente novamente mais tarde!")
        }
    }

    async getExpensesByOwnerId(owner_id: string): Promise<Expenses[]> {
        try {
            const expenses = this.expenseRepository.find({where: {owner_id}})
            return expenses
        }
        catch(err) {
            if (err instanceof QueryFailedError) {
                throw ErrorHandler.queryHandleError(err, "Repositório expenses - getExpensesByOwnerId")
            }
            else 
                throw new InternalError("Não foi possível realizar alterações! Tente novamente mais tarde!")
        }
    }
}