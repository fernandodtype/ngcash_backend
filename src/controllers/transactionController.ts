import { Request, Response } from "express";
import { Transaction } from "../entities/Transactions";
import accountRepository from "../repositories/accountRepository";
import { transactionRepository } from "../repositories/transactionRepository";
import { userRepository } from "../repositories/userRepository";

export class TransactionController{
    static async create(req: Request, res:Response){
       let {cashOut, username} = req.body
       cashOut = Number(cashOut)
       
       const user_id = Number(req.token)
       const user_debited = await userRepository.findOne({relations: {accountId: true}, where: {id: user_id}})
       const balance_to_debit = user_debited?.accountId
       
       if (username === user_debited?.username) {
           return res.status(200).json({erro: "Não é possível realizar movimentação para a mesma conta"})
        }

        if (!balance_to_debit || balance_to_debit.balance <= cashOut){
            res.status(400).json({erro: "Não foi possível realizar a transação"})
       }
        
        const user_credited = await userRepository.findOne({relations: {accountId: true}, where: {username: username}})
        const balance_to_credit = user_credited?.accountId

        try {
            if (balance_to_debit?.balance){
                let new_balance_debited = balance_to_debit?.balance - cashOut
                balance_to_debit.balance = new_balance_debited
                await accountRepository.save(balance_to_debit)

            }

            if (balance_to_credit?.balance){
                let new_balance_credit = balance_to_credit?.balance + cashOut
                balance_to_credit.balance = new_balance_credit
                await accountRepository.save(balance_to_credit)
            }

            if (balance_to_credit && balance_to_debit){

                let transaction = new Transaction()
                transaction.value = cashOut
                transaction.createdAt = new Date()
                transaction.creditedAccountId = balance_to_credit
                transaction.debitedAccountId = balance_to_debit
                await transactionRepository.manager.save(transaction)

                balance_to_credit.transactions = [transaction]
                balance_to_debit.transactions = [transaction]

                accountRepository.manager.save(balance_to_credit)
                accountRepository.manager.save(balance_to_debit)

            }

            
        } catch  {

            return res.status(500).json({erro: "Houve um erro interno na transação"})
            
        }

               

       return res.status(200).json({"data": "Movimentação realizada com sucesso"})
    }
}