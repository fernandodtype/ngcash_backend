import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Accounts";
import { User } from "./User";

@Entity('transactions')
export class Transaction{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'float'})
    value: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Account, account => account.transactions)
    debitedAccountId: Account

    @ManyToOne(() => Account, account => account.transactions)
    creditedAccountId: Account
    
}