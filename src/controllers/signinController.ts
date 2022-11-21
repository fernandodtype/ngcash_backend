import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

export class SinginController{
    static async signin(req: Request, res: Response){
        // verificar se em um usuário cadastrado
        const {username, password} = req.body

        const user_exist = await userRepository.find({relations : {accountId: true},where: {username: username} })

        if (user_exist.length <= 0) {
            res.status(404).json({erro: "Usuário não encontrado"})
        }

        // Verificar se a senha está correta
        if (!bcrypt.compareSync(password, user_exist[0].password)){
            return res.status(404).json({erro: "Senha incorreta"})
        }

        // retorno o jwt
        const token = jwt.sign({
            id: user_exist[0].id,
            username: user_exist[0].username
        }, "s3nh4C0MPR1D4", {expiresIn: "24h"})

        return res.status(200).json({"data": "Acessadi", token})

    }
}