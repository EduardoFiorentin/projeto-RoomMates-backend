import express, { Application } from 'express';
import { Routes } from './Routes/Routes';

export class Server {
    private app: Application;
    private port: string | number;

    constructor(port: string | number) {
        this.app = express();
        this.port = port;

        this.config();
        this.declareRoutes();
    }

    private config(): void {
        this.app.use(express.json());
        // Adicione aqui outras configurações do middleware
    }

    private declareRoutes(): void {
        Routes.declareRoutes(this.app)
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

}