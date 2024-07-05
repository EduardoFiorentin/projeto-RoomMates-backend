// dados faltando ou incorretos

import { CustomError } from "./CustomError";

// codigo padrão - 401 - acesso negado - login necessário 
export class ValidationError extends CustomError {
    constructor(message: string) {
        super(message, 400)
    }
}