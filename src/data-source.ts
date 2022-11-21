import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm";
import { Account } from "./entities/Accounts";
import { Transaction } from "./entities/Transactions";
import { User } from "./entities/User";
const port = process.env.DB_PORT as number | undefined

export const ApppDataSource = new DataSource({
    type:"postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities:[Account, Transaction, User],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`]

})