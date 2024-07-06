import { uuid } from "uuidv4"
import { Expense } from "./Expense"

class User {
    private readonly id: string
    private name: string
    private login: string
    private password: string

    constructor(name: string, login: string, password: string, id?: string) {
        this.name = name
        this.login = login
        this.password = password
            
        if (!id) {
            this.id = uuid() 
        } else this.id = id
    }

    public getName(): string {
        return this.name
    }

    // validar senha do usuário
    public validatePass(password: string): boolean {
        return true
    }
}
export { User }