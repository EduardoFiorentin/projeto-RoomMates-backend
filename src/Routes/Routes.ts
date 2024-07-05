import { Application, Request, Response } from "express";

export class Routes {
    static declareRoutes(app: Application) {
        
        // rotas de gerenciamento de finanças 
        app.get('/', (req: Request, res: Response) => {
            res.status(200).json({all: "ok"})
        });

        app.get('/expense', (req: Request, res: Response) => {
            res.status(200).json({expenses: "ok"})
        });
    
    }
}