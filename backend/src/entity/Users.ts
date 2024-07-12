import { uuid } from "uuidv4"
import { Entity, Column, PrimaryColumn } from "typeorm";

// @Entity() 
// export class Users {

//     @PrimaryColumn("uuid")
//     readonly id: string;
     
//     @Column()
//     name: string;

//     @Column()
//     login: string;

//     @Column()
//     password: string;

//     constructor(name: string, login: string, password: string, id?: string) {
//         this.name = name
//         this.login = login
//         this.password = password
            
//         if (!id) {
//             this.id = uuid() 
//         } else this.id = id
//     }

//     public getName(): string {
//         return this.name
//     }

//     public getId(): string {
//         return this.id
//     }

//     public getLogin(): string {
//         return this.login
//     }

//     // validar senha do usuário
//     public validatePass(password: string): boolean {
//         return password === this.password
//     }
// }

@Entity() 
export class Users {
    
    private _id: string;
     
    private _name: string;

    private _login: string;

    private _password: string;

    constructor(name: string, login: string, password: string, id?: string) {
        this._name = name
        this._login = login
        this._password = password
            
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

    // validar senha do usuário
    public validatePass(password: string): boolean {
        return password === this._password
    }
}