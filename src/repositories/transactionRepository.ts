import { ApppDataSource } from "../data-source";
import { Transaction } from "../entities/Transactions";

export const transactionRepository = ApppDataSource.getRepository(Transaction)