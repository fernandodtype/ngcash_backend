import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const jwt_hash = process.env.JWT_HASH as string | undefined

export class SinginController{
    static async signin(req: Request, res: Response){
        // verificar se tem um usuário já cadastrado
        const {username, password} = req.body

        const user_exist = await userRepository.find({relations : {accountId: true}, where: {username: username}, select: ["id", "username" ,'password', "accountId"] })

        if (user_exist.length <= 0) {
            return res.status(404).json({success: false, msg: "Erro para validação de usuário e/ou senha"})
        }

        // Verificar se a senha está correta
        if (!bcrypt.compareSync(password, user_exist[0].password)){
            return res.status(404).json({success: false ,msg: "Erro para validação de usuário e/ou senha"})
        }

        // retorno o jwt
        const token = jwt.sign({
            id: user_exist[0].id,
            username: user_exist[0].username
        }, jwt_hash, {expiresIn: "24h"})

        return res.status(200).json({success: true, msg: "Acessado com sucesso", token})

    }
}