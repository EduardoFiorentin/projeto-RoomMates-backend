// erros no backend 
import { CustomError } from "./CustomError";

// codigo padrão - 401 - acesso negado - login necessário 
export class InternalError extends CustomError {
    constructor(message: string = "Um erro inesperado ocorreu! Tente novamente mais tarde") {
        super(message, 500)
    }
}
