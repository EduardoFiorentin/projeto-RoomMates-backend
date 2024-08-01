import { ExOperation } from "../../../Types/Operation";

export interface ICreateExpenseRequertPattern {
    token: string,
    owner_id: string,
    operation: ExOperation,
    date: Date,
    value: number,
    description: string,
    participants: string[]
}