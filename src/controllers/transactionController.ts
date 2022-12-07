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
           return res.status(200).json({
               success: false,
               msg: "Não é possível realizar movimentação para a mesma conta"
           })
       }

        if (!balance_to_debit || balance_to_debit.balance <= cashOut){
            res.status(400).json({
                success: false,
                msg: "Não foi possível realizar a transação, por saldo insuficiente"
            })
       }
        
        const user_credited = await userRepository.findOne({
            relations: {accountId: true},
            where: {username: username}
        })
        if (!user_credited) {
            return res.status(404).json({success: false, msg: "Não foi possível realizar a transação"})
           }
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

            }
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({success: false, msg: "Houve um erro interno na transação"})
            
        }

       return res.status(200).json({success: true, msg: "Movimentação realizada com sucesso"})
    }

    static async myTransactions(req: Request, res: Response){
        const {date, typeTransaction} = req.body

        const user = await userRepository.findOne({relations: {
            accountId: true
        }, where: {
            id: Number(req.token)
        }})

        const accountId = user?.accountId.id
        
        let transactions 

        switch (typeTransaction) {
            case "cash-out":
                
                transactions = await transactionRepository
                .createQueryBuilder("transactions").orderBy("transactions.id", "DESC")
                .leftJoinAndSelect("transactions.debitedAccountId", "debit_accounts")
                .leftJoinAndSelect("transactions.creditedAccountId", "credit_account")
                .where("transactions.debitedAccountId.id = :id", {id: accountId}).getMany()
       
                break
            
            case "cash-in":
                transactions = await transactionRepository
                .createQueryBuilder("transactions").orderBy("transactions.id", "DESC")
                .leftJoinAndSelect("transactions.debitedAccountId", "debit_accounts")
                .leftJoinAndSelect("transactions.creditedAccountId", "credit_account")
                .where("transactions.creditedAccountId.id = :id", {id: accountId}).getMany()

                break
        
            default:
                transactions = await transactionRepository
                .createQueryBuilder("transactions").orderBy("transactions.id", "DESC")
                .leftJoinAndSelect("transactions.debitedAccountId", "debit_account")
                .leftJoinAndSelect("transactions.creditedAccountId", "credit_account")
                .leftJoinAndSelect("credit_account.user", "credit_account_user")
                .where("transactions.debitedAccountId.id = :id OR transactions.creditedAccountId.id = :id", {id: accountId}).getMany()

       
                break;
        }

        let n_transactions
        
        if (date){
            n_transactions = transactions.filter((el) => { 
                   
                    if (date === el.createdAt.toLocaleDateString()){
                        return el
                    }
                })
        } else {
            n_transactions = transactions
        }

        return res.status(200).json({success: true, "data": n_transactions})
    }
}