import { Router } from "express";
import { SinginController } from "./controllers/signinController";
import { SingupController } from "./controllers/singupController";

const routes = Router()

routes.post("/signup", SingupController.singup)
routes.post("/signin", SinginController.signin)

export default routes