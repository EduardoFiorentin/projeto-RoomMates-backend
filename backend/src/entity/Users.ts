import { uuid } from "uuidv4"
import { Entity, Column, PrimaryColumn, ManyToMany } from "typeorm";
import { Expenses } from "./Expense";


@Entity() 
export class Users {
    
    private _id: string;
    private _name: string;
    private _login: string;
    private _password: string;
    private _room_id: string|null;
    private _expenses!: Expenses[];

    constructor(name: string, login: string, password: string, room_id: string|null, id?: string) {
        this._name = name
        this._login = login
        this._password = password
        this._room_id = room_id
            
        if (!id) {
            this._id = uuid() 
        } else this._id = id
    }
    
    @Column()
    public get name(): string {
        return this._name
    }

    public set name(name: string) {
        this._name = name
    }

    @PrimaryColumn("uuid")
    public get id(): string {
        return this._id
    }

    public set id(id: string) {
        this._id = id
    }

    @Column()
    public get login(): string {
        return this._login
    }

    public set login(login: string) {
        this._login = login
    }

    @Column()
    public get password() :string {
        return this._password
    }

    public set password(password: string) {
        this._password = password
    }

    @Column({type: "varchar", nullable: true})
    public get room_id(): string|null {
        return this._room_id
    }

    public set room_id(room_id: string|null) {
        this._room_id = room_id
    }

    @ManyToMany(() => Expenses, expense => expense.participants)
    public get expenses(): Expenses[] {return this._expenses};
    public set expenses(expenses: Expenses[]) {this._expenses = expenses}

    // validar senha do usuário
    public validatePass(password: string): boolean {
        return password === this._password
    }
}