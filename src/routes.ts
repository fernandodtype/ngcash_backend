import { Router } from "express";
import { SingupController } from "./controllers/singupController";

const routes = Router()

routes.post("/singup", SingupController.singup)

export default routes