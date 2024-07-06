import { Char } from "../utils/types"
import { uuid } from "uuidv4"
import { Entity, Column, PrimaryColumn } from "typeorm"

export class Expense {
    private readonly id: string
    private operation : Char
    private day : number
    private month : number
    private year : number
    private value : number // valor do gasto
    private description: string
    
    setOperation(operation: Char): void { this.operation = operation }
    getOperation(): Char {return this.operation}

    setDay(day: number): void { this.day = day }
    getDay(): number {return this.day}

    setMonth(month: number): void { this.month = month }
    getMonth(): number {return this.month}

    setYear(year: number): void { this.year = year }
    getYear(): number {return this.year}

    setValue(value: number): void { this.value = value }
    getValue(): number {return this.value}

    setDescription(description: string): void { this.description = description }
    getDescription(): string {return this.description}

    constructor (operation: Char, day: number, month: number, year: number, value: number, description: string, id?: string) {
        
        if (!id) {
            this.id = uuid()
        }
        else {
            this.id = id
        }

        this.operation = operation
        this.day = day
        this.month = month, 
        this.year = year
        this.value = value
        this.description = description
    }
}