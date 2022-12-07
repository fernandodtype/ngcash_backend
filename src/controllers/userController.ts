import { Request, Response } from "express";
import accountRepository from "../repositories/accountRepository";
import { userRepository } from "../repositories/userRepository";


export class UserController{
    static async balance(req: Request, res: Response){

        const user_id = Number(req.token)

        const user = await userRepository.findOne({relations: {accountId: true}, where: {id: user_id}})
        
        return res.status(201).json({success: true, user})

    }
}