import { Application, Request, Response } from "express";
import { CreateUserController } from "../useCases/UserUseCases/CreateUserUseCase/CreateUserController";
import { createUserController } from "../useCases/UserUseCases/CreateUserUseCase";
import { authUserController } from "../useCases/UserUseCases/AuthUserUseCase";
import { updateUserController } from "../useCases/UserUseCases/UpdateUserUseCase";
import { expensesRepository } from "../repositories/ExpenseRepository";
import { getExpenseByUserController } from "../useCases/ExpenseUseCases/GetExpensesByUserUseCase";

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

    static declareExpenseRoutes(app: Application) {
        app.get("/expense", (req: Request, res: Response) => {
            getExpenseByUserController.handle(req, res)
        })
    }
}

async function teste(req: Request, res: Response) {
    const response = await expensesRepository.findExpenseById("550e8400-e29b-41d4-a716-446655440000")
    console.log(response)

    if (response) res.status(200).json({res: response})
    else res.status(400)
}