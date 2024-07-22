import express, { Application } from 'express';
import { Routes } from './Routes/Routes';
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from "./docs/swagger.json"

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
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
    }

    private declareRoutes(): void {
        Routes.declareUserRoutes(this.app)
        Routes.declareExpenseRoutes(this.app)
        Routes.declareRoomRoutes(this.app)
    }    

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}  