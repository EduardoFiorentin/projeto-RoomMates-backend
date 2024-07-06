import { Application, Request, Response } from "express";
import { CreateUserController } from "../useCases/UserUseCases/CreateUserUseCase/CreateUserController";
import { createUserController } from "../useCases/UserUseCases/CreateUserUseCase";
import { authUserController } from "../useCases/UserUseCases/AuthUserUseCase";

export class Routes {
    static declareUserRoutes(app: Application) {

        // autenticação 
        app.post("/user/auth", (req: Request, res: Response) => {
            authUserController.handle(req, res)
        })

        // rotas de user 
        app.post("/user", (req: Request, res: Response) => {
            createUserController.handle(req, res)
        })
        app.get("/user", (req: Request, res: Response) => {
            res.status(200).json({tudo: "Ok"})
        })
    }
}