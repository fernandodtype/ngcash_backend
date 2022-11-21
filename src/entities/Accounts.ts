import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transactions";
import { User } from "./User";

@Entity('accounts')
export class Account{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "float", nullable: false, default: 100.00})
    balance: number

    @OneToOne(() => User, user => user.accountId)
    user: User

    @OneToMany(() => Transaction, transaction => transaction.id)
    transactions: Transaction[]
}