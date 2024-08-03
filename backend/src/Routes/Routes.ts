import { Application, Request, Response } from "express";
import { CreateUserController } from "../useCases/UserUseCases/CreateUserUseCase/CreateUserController";
import { createUserController } from "../useCases/UserUseCases/CreateUserUseCase";
import { authUserController } from "../useCases/UserUseCases/AuthUserUseCase";
import { updateUserController } from "../useCases/UserUseCases/UpdateUserUseCase";
import { expensesRepository } from "../repositories/ExpenseRepository";
import { getExpenseByUserController } from "../useCases/ExpenseUseCases/GetExpensesByUserUseCase";
import { createExpenseController } from "../useCases/ExpenseUseCases/CreateExpenseUseCase";
import { deleteExpenseController } from "../useCases/ExpenseUseCases/DeleteExpenseUseCase";
import { getRoomByOwnerIdController } from "../useCases/RoomUseCases/GetRoomByOwnerIdUseCase";
import { createRoomController } from "../useCases/RoomUseCases/CreateRoomUseCase";
import { registerUserToRoomController } from "../useCases/RoomUseCases/RegisterUserToRoomUseCase";
import { getUsersByIdUseCase } from "../useCases/UserUseCases/GetUsersByIdUseCase";
import { getExpensesByOwnerIdController } from "../useCases/ExpenseUseCases/GetExpensesByOwnerId";

// 500 - internal error
// 404 - not found
// 401 - não autorizado
// 400 - validationError


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

       // testes 
       app.get("/test", async (req: Request, res: Response) => {

            // const expense = await expensesRepository.findExpenseById("e9cd8f6e-b1d7-419a-a39c-f96d86dd45e9")
            // console.log(expense)

            const users = await getUsersByIdUseCase.execute([
                "2a879889-38f8-457f-a254-d962dcdb1c20",
                "3be56118-651c-4d00-9da7-b0f347f55330"
            ])

            console.log(users)
    
            return res.status(200).json(users)
       })
    }

    static declareExpenseRoutes(app: Application) {
        app.get("/expense", (req: Request, res: Response) => {
            getExpenseByUserController.handle(req, res)
        })
        app.post("/expense", (req: Request, res: Response) => {
            createExpenseController.handle(req, res)
        })
        app.delete("/expense/:id", (req: Request, res: Response) => {
            deleteExpenseController.handle(req, res)
        })
        app.get("/expense/ownerId", (req: Request, res: Response) => {
            getExpensesByOwnerIdController.handle(req, res)
        }) 

        // app.get("/room", (req: Request, res: Response) => {
        //     getRoomByOwnerIdController.handle(req, res)
        // })  
    }

    static declareRoomRoutes(app: Application) {
        app.post("/room", (req: Request, res: Response) => {
            createRoomController.handle(req, res)
        })

        app.post("/room/registre", (req: Request, res: Response) => {
            registerUserToRoomController.handle(req, res)
        }) 
    }
}
  