import { CustomError } from "./CustomError";

// quando o acesso é negado 
// codigo padrão - 401 - acesso negado - login necessário 
export class UnauthorizedOperationError extends CustomError {
    constructor(message: string) {
        super(message, 401)
    }
}