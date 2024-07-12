import { uuid } from "uuidv4"
import { Entity, Column, PrimaryColumn } from "typeorm"
import { ExOperation } from "../utils/Types/Operation"

// iniciar implementação dos use cases 

@Entity()
export class Expenses {
    private _id: string
    private _owner_id: string
    private _operation : ExOperation // i - entrada / o - saida
    private _date: Date
    private _value : number // valor do gasto
    private _description: string

    constructor (operation: ExOperation, date: Date, value: number, description: string, owner_id: string, id?: string) {
        
        if (!id) {
            this._id = uuid()
        }
        else { 
            this._id = id
        }

        this._operation = operation
        this._value = value
        this._date = date
        this._owner_id = owner_id
        this._description = description
    }
    
    @PrimaryColumn("uuid")
    public get id() { return this._id }
    public set id(id: string) {this._id = id}

    @Column()
    public get operation(): ExOperation {return this._operation}
    public set operation(operation: ExOperation) { this._operation = operation }

    @Column()
    public get owner_id(): string { return this._owner_id }
    public set owner_id(owner_id: string) { this._owner_id = owner_id }

    @Column()
    public get date(): Date { return this._date }
    public set date(date: Date) { this._date = date }
 
    @Column()
    public get value(): number {return this._value}
    public set value(value: number) { this._value = value }

    @Column()
    public get description(): string {return this._description}
    public set description(description: string) { this._description = description }
}