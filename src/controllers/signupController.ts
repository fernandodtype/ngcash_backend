import { Request, Response } from "express"
import { Account } from "../entities/Accounts"
import { User } from "../entities/User"
import accountRepository from "../repositories/accountRepository"
import { userRepository } from "../repositories/userRepository"
import checkPassword from "../services/checkPassword"
import generatePassword from "../services/hashPassword"

export class SignupController{
    static async signup(req: Request, res: Response){
        const {username, password} = req.body

        if (username.length < 3){
            return res.status(400).json({success: false, msg: "Tamanho mínimo de usuário é de 3 caracteres"})
        } else if (checkPassword(password)) {
            return res.status(400).json({success: false, msg: "A senha deve conter 8 caracteres, incluindo uma letra maiúscula e um número"})
        }

        //Verificar se o usuário já é existente
        const user_exist = await userRepository.count({where: {username: username}})

        if (user_exist > 0) {
            return res.status(400).json({success: false, msg: "Não foi possível criar este usuário"})
        }        

        // Fazer o hash da senha
        const hashedPassword = generatePassword(password)

        // Salvar o usuário no banco de dados
        try {
            const new_user = new User()
            new_user.username = username
            new_user.password = hashedPassword
            await userRepository.manager.save(new_user)

            const new_account = new Account()
            new_account.balance = 100.00
            await accountRepository.manager.save(new_account)

            new_user.accountId = new_account
            await userRepository.manager.save(new_user)

        } catch (error) {
            console.error(error)
            res.status(500).json({success: false, msg: "Erro interno"})
            
        }
    

        res.status(200).json({success: true, msg: "OK"})
    }
}