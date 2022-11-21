import { Request, Response } from "express"

export class SingupController{
    static async singup(req: Request, res: Response){
        const {username, password} = req.body

        if (username.length < 3){
            return res.status(400).json({erro: "Tamanho mínimo de usuário é de 3 caracteres"})
        } else if (password.length < 8) {
            return res.status(400).json({erro: "Tamanho mínimo de senha é de 8 caracteres"}) 
        }
    
        

        res.json({"data": "OK", "u": username, "p": password})
    }
}