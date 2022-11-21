import { Request, Response } from "express";

export class UserController{
    static async balance(req: Request, res: Response){
      
        
        
        return res.status(201).json({saldo: `R$:100,00`})

    }
}