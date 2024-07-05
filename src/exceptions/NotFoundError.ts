import { CustomError } from "./CustomError";

// quando elementos pesquisados não são encontrados 
// status padrão: 400 - solicitação inválida / malformada
export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, 404)
    }
}