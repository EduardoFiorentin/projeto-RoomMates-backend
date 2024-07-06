export abstract class CustomError extends Error {
    private statusCode: number

    public getStatusCode(): number {
        return this.statusCode
    }
    public getMessage(): string {
        return this.message
    };

    constructor (message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}