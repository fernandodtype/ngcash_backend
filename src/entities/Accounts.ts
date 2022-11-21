import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transactions";
import { User } from "./User";

@Entity('accounts')
export class Account{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "float"})
    balance: number

    @OneToOne(() => User, user => user.id)
    user: User

    @OneToMany(() => Transaction, transaction => transaction.id)
    transactions: Transaction[]
}