import { uuid } from "uuidv4"
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity() 
export class Users {
    
    @PrimaryColumn("uuid")
    readonly id: string;
     
    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    password: string;

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

    public getId(): string {
        return this.id
    }

    public getLogin(): string {
        return this.login
    }

    // validar senha do usuário
    public validatePass(password: string): boolean {
        return password === this.password
    }
}