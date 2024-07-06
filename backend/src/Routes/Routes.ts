import { Application, Request, Response } from "express";
import { CreateUserController } from "../useCases/UserUseCases/CreateUserUseCase/CreateUserController";
import { createUserController } from "../useCases/UserUseCases/CreateUserUseCase";

export class Routes {
    // static declareRoutes(app: Application) {
        
    //     // rotas de gerenciamento de finanças 
    //     app.get('/', (req: Request, res: Response) => {
    //         res.status(200).json({all: "ok"})
    //     });

    //     app.get('/expense', (req: Request, res: Response) => {
    //         res.status(200).json({expenses: "ok"})
    //     });
    
    // }

    static declareUserRoutes(app: Application) {
        app.post("/user", (req: Request, res: Response) => {
            createUserController.handle(req, res)
        })
        app.get("/user", (req: Request, res: Response) => {
            res.status(200).json({tudo: "Ok"})
        })
    }
}