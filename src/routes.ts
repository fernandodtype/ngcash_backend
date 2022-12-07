import { Router } from "express";
import { SinginController } from "./controllers/signinController";
import { SignupController } from "./controllers/signupController";
import { TransactionController } from "./controllers/transactionController";
import { UserController } from "./controllers/userController";
import verifyJWT from "./middlewares/login";

const routes = Router()

routes.post("/signup", SignupController.signup)
routes.post("/signin", SinginController.signin)
routes.get("/user/balance", verifyJWT, UserController.balance)
routes.post("/user/transaction/create", verifyJWT, TransactionController.create)
routes.post("/user/transactions", verifyJWT, TransactionController.myTransactions)

export default routes