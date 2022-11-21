import { Router } from "express";
import { SinginController } from "./controllers/signinController";
import { SingupController } from "./controllers/singupController";
import { UserController } from "./controllers/userController";
import verifyJWT from "./middlewares/login";

const routes = Router()

routes.post("/signup", SingupController.singup)
routes.post("/signin", SinginController.signin)
routes.post("/user/balance", verifyJWT, UserController.balance)

export default routes