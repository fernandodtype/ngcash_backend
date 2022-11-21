import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Accounts";
import { Transaction } from "./Transactions";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, type: "text", nullable: false})
    username: string

    @Column({type: "text"})
    password: string

    @OneToOne(() => Account, account => account.user)
    @JoinColumn({name: "account_id"})
    accountId: Account

}