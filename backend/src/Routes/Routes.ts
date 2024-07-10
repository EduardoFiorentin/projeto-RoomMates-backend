import { Application, Request, Response } from "express";
import { CreateUserController } from "../useCases/UserUseCases/CreateUserUseCase/CreateUserController";
import { createUserController } from "../useCases/UserUseCases/CreateUserUseCase";
import { authUserController } from "../useCases/UserUseCases/AuthUserUseCase";
import { updateUserController } from "../useCases/UserUseCases/UpdateUserUseCase";

export class Routes {
    static declareUserRoutes(app: Application) {

        
        // rotas de user 
        app.post("/user", (req: Request, res: Response) => {
            createUserController.handle(req, res)
        })
        app.get("/user", (req: Request, res: Response) => {
            res.status(200).json({tudo: "Ok"})
        })
        app.put("/user/:id", (req: Request, res: Response) => {
            updateUserController.handle(req, res)
        })


        // autenticação 
        app.post("/user/auth", (req: Request, res: Response) => {
            authUserController.handle(req, res)
        })
    }
}