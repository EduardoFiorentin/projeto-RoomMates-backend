import { Response } from "express";
import { InternalError } from "../exceptions/InternalError";
import { NotFoundError } from "../exceptions/NotFoundError";
import { UnauthorizedOperationError } from "../exceptions/UnauthorizedOperationError";
import { ValidationError } from "../exceptions/ValidationError";

interface IResponseData {
    message: string, 
    statusCode: number
}

export class ErrorHandler {
    static handleError(error: any): IResponseData {
        
        if (
            error instanceof InternalError ||
            error instanceof NotFoundError ||
            error instanceof UnauthorizedOperationError ||
            error instanceof ValidationError
        ) {
            return {
                message: error.getMessage(),
                statusCode: error.getStatusCode() 
            } 
        }

        else {
            console.log(error)
            return {
                message: "Um erro inesperado ocorreu! Tente novamente mais tarde!",
                statusCode: 500
            }
        }

    }
}