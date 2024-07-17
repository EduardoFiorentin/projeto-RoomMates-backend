import { uuid } from "uuidv4";
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Room {
    private _id: string
    private _name: string
    private _members_num: number
    private _owner_id: string

    constructor (name: string, members_num: number, owner_id: string, id?: string) {
            
        if (!id) {
            this._id = uuid()
        }
        else { 
            this._id = id
        }

        this._name = name 
        this._members_num = members_num
        this._owner_id = owner_id
    }

    @PrimaryColumn('uuid')
    public get id(): string     { return this._id }
    public set id(id: string)   {this._id = id }
    
    @Column()
    public get name(): string   { return this._name }
    public set name(name: string) { this._name = name }

    @Column()
    public get members_num(): number { return this._members_num }
    public set members_num(members_num: number) { this._members_num = members_num }

    @Column()
    public get owner_id(): string { return this._owner_id }
    public set owner_id(owner_id: string) { this._owner_id = owner_id }
}